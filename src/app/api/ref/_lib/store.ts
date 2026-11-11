/**
 * Where ref visits are kept: a Redis reached over Upstash's REST API (the
 * variables Vercel's Upstash integration sets). In development, with no
 * Redis configured, a small in-memory stand-in keeps the flow testable.
 *
 *   KV_REST_API_URL, KV_REST_API_TOKEN
 */
type Command = (string | number)[];

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

/** True when visits can be kept: a Redis is configured, or this is development. */
export const storeReady = Boolean(URL_ && TOKEN) || process.env.NODE_ENV !== "production";

/** Runs the commands in order and returns each one's result. */
export async function redis(commands: Command[]): Promise<unknown[]> {
  if (!URL_ || !TOKEN) return commands.map(memory);
  const response = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`redis: ${response.status}`);
  const results = (await response.json()) as { result?: unknown; error?: string }[];
  return results.map((entry) => {
    if (entry.error) throw new Error(`redis: ${entry.error}`);
    return entry.result;
  });
}

// --- development stand-in: just the commands used here ---
const strings = new Map<string, string>();
const hashes = new Map<string, Map<string, string>>();
const sets = new Map<string, Set<string>>();
const sorted = new Map<string, Map<string, number>>();
const lists = new Map<string, string[]>();

function memory(command: Command): unknown {
  const [name, key, ...rest] = command.map(String);
  switch (name.toUpperCase()) {
    case "GET":
      return strings.get(key) ?? null;
    case "SET": {
      if (rest.includes("NX") && strings.has(key)) return null;
      strings.set(key, rest[0]);
      return "OK";
    }
    case "DEL":
      return Number(strings.delete(key));
    case "HINCRBY": {
      const hash = hashes.get(key) ?? new Map<string, string>();
      hashes.set(key, hash);
      const next = Number(hash.get(rest[0]) ?? 0) + Number(rest[1]);
      hash.set(rest[0], String(next));
      return next;
    }
    case "HSET": {
      const hash = hashes.get(key) ?? new Map<string, string>();
      hashes.set(key, hash);
      hash.set(rest[0], rest[1]);
      return 1;
    }
    case "HGETALL":
      return [...(hashes.get(key) ?? [])].flat();
    case "SADD":
      sets.set(key, (sets.get(key) ?? new Set()).add(rest[0]));
      return 1;
    case "SMEMBERS":
      return [...(sets.get(key) ?? [])];
    case "ZINCRBY": {
      const zset = sorted.get(key) ?? new Map<string, number>();
      sorted.set(key, zset);
      zset.set(rest[1], (zset.get(rest[1]) ?? 0) + Number(rest[0]));
      return zset.get(rest[1]);
    }
    case "ZREVRANGE":
      return [...(sorted.get(key) ?? [])]
        .sort((a, b) => b[1] - a[1])
        .slice(Number(rest[0]), Number(rest[1]) + 1)
        .flatMap(([member, score]) => [member, String(score)]);
    case "LPUSH":
      lists.set(key, [rest[0], ...(lists.get(key) ?? []).filter((item) => item !== rest[0])]);
      return 1;
    case "LREM":
      lists.set(
        key,
        (lists.get(key) ?? []).filter((item) => item !== rest[1]),
      );
      return 1;
    case "LTRIM":
      lists.set(key, (lists.get(key) ?? []).slice(Number(rest[0]), Number(rest[1]) + 1));
      return "OK";
    case "LRANGE":
      return (lists.get(key) ?? []).slice(Number(rest[0]), Number(rest[1]) + 1);
    case "EXPIRE":
      return 1;
    default:
      throw new Error(`memory store: ${name} is not implemented`);
  }
}
