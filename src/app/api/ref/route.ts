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
const BOT = /bot|crawl|spider|preview|slurp|headless|lighthouse|facebookexternalhit/i;

/** A flood guard, per server instance: at most this many messages a minute. */
const PER_MINUTE = 30;
let sent: number[] = [];

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string" || value.length === 0 || value.length > max) return null;
  // one line of plain text: no control characters reach the message
  return /^[\x20-\x7e]+$/.test(value) ? value : null;
}

export async function POST(request: Request) {
  const done = new Response(null, { status: 204 });

  // only the site's own pages report here
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return done;
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
  const detail = clean(body.detail, 80);
  if (!ref || !REF.test(ref) || !event || !(event in EVENTS) || !path?.startsWith("/")) {
    return new Response(null, { status: 400 });
  }

  const token = process.env.REF_TELEGRAM_BOT_TOKEN;
  const chat = process.env.REF_TELEGRAM_CHAT_ID;
  if (!token || !chat) return done;

  const now = Date.now();
  sent = sent.filter((time) => now - time < 60_000);
  if (sent.length >= PER_MINUTE) return done;
  sent.push(now);

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
