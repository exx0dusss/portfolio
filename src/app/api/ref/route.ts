/**
 * Ref links: a link sent to one company carries `?ref=<name>`, and each page
 * that visitor opens is reported here and forwarded to Tymur as a Telegram
 * message. The browser side is `RefBeacon` (components/layout/ref-beacon).
 *
 * Only visits that arrived with a ref are reported. Nothing is stored: no
 * database, no cookie, no IP address. The message carries the ref, what
 * happened, the page, and the country and device kind.
 *
 * Needs two environment variables; without them the endpoint accepts the
 * report and does nothing:
 *   REF_TELEGRAM_BOT_TOKEN   the bot that sends the message
 *   REF_TELEGRAM_CHAT_ID     the chat it sends to
 * Optional:
 *   REF_NAMES                the refs in use, comma separated ("supabase,vercel");
 *                            when set, any other ref is ignored
 *
 * The endpoint is public, so a report is treated as untrusted: every field
 * has a narrow shape (a slug, a known event, a route-like path, a host name),
 * so a forged report can only produce a message that looks like a real one,
 * never free text, and messages are capped per ref and overall.
 */

/** What a visitor did; anything else is rejected. */
const EVENTS: Record<string, string> = {
  open: "opened the link",
  page: "opened",
  cv: "downloaded the CV",
  contact: "clicked the email",
  outbound: "left for",
};

const REF = /^[a-z0-9][a-z0-9-]{0,31}$/;
const PATH = /^\/[A-Za-z0-9/_.-]{0,199}$/;
const HOST = /^[a-z0-9]([a-z0-9.-]{0,78}[a-z0-9])?$/i;
const BOT = /bot|crawl|spider|preview|slurp|headless|lighthouse|facebookexternalhit/i;

/** Flood guards, per server instance: messages a minute overall and per ref. */
const PER_MINUTE = 30;
const PER_REF_MINUTE = 10;
let sent: { time: number; ref: string }[] = [];

/** True when the request names this site as its origin. Browsers send Origin
 *  on every POST, the beacon included; a request without one is not a page. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string" || value.length === 0 || value.length > max) return null;
  // one line of plain text: no control characters reach the message
  return /^[\x20-\x7e]+$/.test(value) ? value : null;
}

export async function POST(request: Request) {
  const done = new Response(null, { status: 204 });

  // only the site's own pages report here
  if (!sameOrigin(request)) return done;
  if (BOT.test(request.headers.get("user-agent") ?? "")) return done;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const ref = clean(body.ref, 32);
  const event = clean(body.event, 16);
  const path = clean(body.path, 200);
  const detail = body.detail === undefined ? null : clean(body.detail, 80);
  if (
    !ref ||
    !REF.test(ref) ||
    !event ||
    !(event in EVENTS) ||
    !path ||
    !PATH.test(path) ||
    (body.detail !== undefined && (!detail || !HOST.test(detail)))
  ) {
    return new Response(null, { status: 400 });
  }

  const token = process.env.REF_TELEGRAM_BOT_TOKEN;
  const chat = process.env.REF_TELEGRAM_CHAT_ID;
  if (!token || !chat) return done;

  const names = process.env.REF_NAMES?.split(",").map((name) => name.trim().toLowerCase());
  if (names?.length && !names.includes(ref)) return done;

  const now = Date.now();
  sent = sent.filter((entry) => now - entry.time < 60_000);
  if (sent.length >= PER_MINUTE) return done;
  if (sent.filter((entry) => entry.ref === ref).length >= PER_REF_MINUTE) return done;
  sent.push({ time: now, ref });

  const country = clean(request.headers.get("x-vercel-ip-country"), 2);
  const device = /Mobi|Android|iPhone/i.test(request.headers.get("user-agent") ?? "")
    ? "phone"
    : "desktop";
  const what =
    event === "page" ? `opened ${path}` : `${EVENTS[event]}${detail ? ` ${detail}` : ""}`;
  const where = event === "page" ? "" : ` (on ${path})`;
  const text = `🔗 ${ref}: ${what}${where}\n${[country, device].filter(Boolean).join(" · ")}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
    });
  } catch {
    // a failed notification must never surface to the visitor
  }
  return done;
}
