/**
 * What is kept about ref visits, and the numbers /stats shows.
 *
 * A visit is one browser tab's stay that arrived through a ref link. Its
 * events collect on the visit, and Telegram gets one message per visit that
 * is updated as they arrive. No IP address and nothing about the person is
 * kept: the ref, what was opened, when, the country and the device kind.
 */
import { redis } from "./store";

/** [seconds since epoch, event, path, detail] */
export type VisitEvent = [number, string, string, string?];

export interface Visit {
  ref: string;
  country: string | null;
  device: "phone" | "desktop";
  /** The Telegram message that shows this visit, once one is sent. */
  messageId?: number;
  events: VisitEvent[];
}

/** A visit's events past this many are dropped from its message. */
const MAX_EVENTS = 40;
/** Visits are kept this long; the counters stay. */
const VISIT_TTL = 60 * 60 * 24 * 30;
/** A quiet visit that resumes after this long starts a new message. */
export const WINDOW_SECONDS = 30 * 60;

/** The store is public-facing, so what a stranger can make it hold is
 *  bounded: only refs the owner issued are written at all, each ref keeps
 *  its most opened pages, and reports are budgeted per minute. */
const MAX_PAGES = 100;
const PER_CLIENT_MINUTE = 15;
const PER_MINUTE = 60;
const PER_REF_MINUTE = 30;
export const MAX_ISSUED = 100;

const visitKey = (id: string) => `ref:visit:${id}`;
const ISSUED = "ref:issued";

/** The refs in use: issued through the bot (/add), plus REF_NAMES. */
export async function issuedRefs(): Promise<string[]> {
  const [members] = (await redis([["SMEMBERS", ISSUED]])) as [string[] | null];
  return [...new Set([...fromEnv(), ...(members ?? [])])].sort();
}

function fromEnv(): string[] {
  return (process.env.REF_NAMES ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

/** Issues a ref; false when the list is full. */
export async function issueRef(ref: string): Promise<boolean> {
  const [size] = (await redis([["SCARD", ISSUED]])) as [number];
  if (size >= MAX_ISSUED) return false;
  await redis([["SADD", ISSUED, ref]]);
  return true;
}

export async function revokeRef(ref: string): Promise<void> {
  await redis([["SREM", ISSUED, ref]]);
}

/**
 * True when this report may be written. In order, so that a stranger's
 * reports cost as little as possible and cannot starve real ones:
 * the ref must be one the owner issued (a read; nothing is written for any
 * other); then this client's own budget; only then the shared budgets.
 * `client` is a short-lived hash of the address, kept for two minutes.
 */
export async function admit(ref: string, client: string): Promise<boolean> {
  if (!fromEnv().includes(ref)) {
    const [issued] = (await redis([["SISMEMBER", ISSUED, ref]])) as [number];
    if (issued !== 1) return false;
  }
  const minute = Math.floor(Date.now() / 60_000);
  const clientKey = `ref:rate:${minute}:c:${client}`;
  const [own] = (await redis([
    ["INCR", clientKey],
    ["EXPIRE", clientKey, 120],
  ])) as [number];
  if (own > PER_CLIENT_MINUTE) return false;

  const [all, mine] = (await redis([
    ["INCR", `ref:rate:${minute}`],
    ["INCR", `ref:rate:${minute}:${ref}`],
    ["EXPIRE", `ref:rate:${minute}`, 120],
    ["EXPIRE", `ref:rate:${minute}:${ref}`, 120],
  ])) as number[];
  return all <= PER_MINUTE && mine <= PER_REF_MINUTE;
}

export async function loadVisit(id: string): Promise<Visit | null> {
  const [raw] = await redis([["GET", visitKey(id)]]);
  return typeof raw === "string" ? (JSON.parse(raw) as Visit) : null;
}

export async function saveVisit(id: string, visit: Visit): Promise<void> {
  visit.events = visit.events.slice(-MAX_EVENTS);
  await redis([["SET", visitKey(id), JSON.stringify(visit), "EX", VISIT_TTL]]);
}

/** One visit at a time: true when this request may write it. */
export async function lockVisit(id: string): Promise<boolean> {
  const [locked] = await redis([["SET", `ref:lock:${id}`, "1", "NX", "EX", 5]]);
  return locked === "OK";
}

export async function unlockVisit(id: string): Promise<void> {
  await redis([["DEL", `ref:lock:${id}`]]);
}

/** Counts one event toward its ref's totals. */
export async function count(
  ref: string,
  id: string,
  event: VisitEvent,
  first: boolean,
): Promise<void> {
  const [time, name, path] = event;
  const commands: (string | number)[][] = [
    ["SADD", "ref:names", ref],
    ["HINCRBY", `ref:stat:${ref}`, name, 1],
    ["HSET", `ref:stat:${ref}`, "last", time],
    ["LREM", "ref:recent", 0, id],
    ["LPUSH", "ref:recent", id],
    ["LTRIM", "ref:recent", 0, 7],
  ];
  if (first) commands.push(["HINCRBY", `ref:stat:${ref}`, "visits", 1]);
  if (name === "open" || name === "page") {
    commands.push(
      ["ZINCRBY", `ref:pages:${ref}`, 1, path],
      // keep only the most opened pages
      ["ZREMRANGEBYRANK", `ref:pages:${ref}`, 0, -(MAX_PAGES + 1)],
    );
  }
  await redis(commands);
}

/** What the stats widget draws; short keys, since it travels as chat data. */
export interface Stats {
  /** when it was read, seconds */
  t: number;
  /** per ref: name, visits, pages, cv, email, outbound, last seen, top pages */
  r: {
    n: string;
    v: number;
    p: number;
    c: number;
    m: number;
    o: number;
    l: number;
    top: string[];
  }[];
  /** latest visits: ref, last event time, country, events */
  v: { n: string; t: number; c: string | null; e: number }[];
}

function toObject(flat: unknown): Record<string, string> {
  const list = Array.isArray(flat) ? (flat as string[]) : [];
  const object: Record<string, string> = {};
  for (let i = 0; i < list.length; i += 2) object[list[i]] = list[i + 1];
  return object;
}

export async function readStats(): Promise<Stats> {
  const [names, recent] = (await redis([
    ["SMEMBERS", "ref:names"],
    ["LRANGE", "ref:recent", 0, 4],
  ])) as [string[] | null, string[] | null];

  const refs = (names ?? []).slice(0, 30);
  const perRef = await redis(
    refs.flatMap((ref) => [
      ["HGETALL", `ref:stat:${ref}`],
      ["ZREVRANGE", `ref:pages:${ref}`, 0, 2, "WITHSCORES"],
    ]),
  );
  const r = refs
    .map((n, i) => {
      const stat = toObject(perRef[i * 2]);
      const pages = Array.isArray(perRef[i * 2 + 1]) ? (perRef[i * 2 + 1] as string[]) : [];
      return {
        n,
        v: Number(stat.visits ?? 0),
        p: Number(stat.open ?? 0) + Number(stat.page ?? 0),
        c: Number(stat.cv ?? 0),
        m: Number(stat.contact ?? 0),
        o: Number(stat.outbound ?? 0),
        l: Number(stat.last ?? 0),
        top: pages.filter((_, index) => index % 2 === 0),
      };
    })
    .sort((a, b) => b.l - a.l);

  const visits = recent?.length
    ? ((await redis(recent.map((id) => ["GET", visitKey(id)]))) as (string | null)[])
    : [];
  const v = visits
    .filter((raw): raw is string => typeof raw === "string")
    .map((raw) => JSON.parse(raw) as Visit)
    .map((visit) => ({
      n: visit.ref,
      t: visit.events.at(-1)?.[0] ?? 0,
      c: visit.country,
      e: visit.events.length,
    }));

  return { t: Math.floor(Date.now() / 1000), r, v };
}
