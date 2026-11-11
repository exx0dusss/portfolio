/**
 * Ref links: a link sent to one company carries `?ref=<name>`, and what that
 * visitor does is reported here by `RefBeacon` (components/layout/ref-beacon).
 *
 * Events collect on the visit. Telegram gets one message per visit, a widget
 * listing its events, which is updated in place while the visit goes on; a
 * visit that resumes after half an hour of quiet starts a new message. The
 * bot's /stats (./telegram/route.ts) shows the totals.
 *
 * Only visits that arrived with a ref are reported, and nothing about the
 * person is kept: no cookie, no IP address. See ./_lib/visits.ts for what is.
 *
 * It stays silent until the bot (./_lib/telegram.ts) is configured. Without
 * a store (./_lib/store.ts) nothing can collect, and each event is sent as
 * its own plain message. With a store, a ref is reported only once the
 * owner has issued it: /add in the bot, or REF_NAMES ("supabase,vercel").
 *
 * The endpoint is public, so a report is treated as untrusted: every field
 * has a narrow shape (a slug, a known event, a route-like path, a host name),
 * so a forged report can only produce an entry that looks like a real one,
 * never free text. Nothing is written for a ref the owner didn't issue, and
 * reports are budgeted per client and overall (./_lib/visits.ts, admit).
 * The per-client budget keys on a salted hash of the address that expires
 * after two minutes; the address itself is never kept.
 */
import { storeReady } from "./_lib/store";
import { CHAT_ID, telegram, telegramReady } from "./_lib/telegram";
import {
  admit,
  count,
  loadVisit,
  lockVisit,
  saveVisit,
  unlockVisit,
  WINDOW_SECONDS,
  type Visit,
  type VisitEvent,
} from "./_lib/visits";
import { VISIT_WIDGET, visitCaption, visitData } from "./_lib/widgets";

const EVENTS = new Set(["open", "page", "cv", "contact", "outbound"]);

const REF = /^[a-z0-9][a-z0-9-]{0,31}$/;
const VISIT_ID = /^[a-z0-9]{8,32}$/;
const PATH = /^\/[A-Za-z0-9/_.-]{0,199}$/;
const HOST = /^[a-z0-9]([a-z0-9.-]{0,78}[a-z0-9])?$/i;
const BOT = /bot|crawl|spider|preview|slurp|headless|lighthouse|facebookexternalhit/i;

/** Without a store, the flood guard is per server instance: reports a minute. */
const PER_MINUTE = 30;
let seen: number[] = [];

/** A short-lived stand-in for the caller, for the per-client budget: a hash
 *  of the address, never the address itself (./_lib/visits.ts, admit). */
async function clientKey(request: Request): Promise<string> {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const salt = process.env.REF_TELEGRAM_WEBHOOK_SECRET ?? "ref";
  const bytes = new TextEncoder().encode(`${salt}:${address}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest).slice(0, 8), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

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
  // one line of plain text: no control characters reach a message
  return /^[\x20-\x7e]+$/.test(value) ? value : null;
}

/** Sends the visit's message, or updates the one it has. */
async function show(visit: Visit, fresh: boolean): Promise<void> {
  const caption = visitCaption(visit);
  if (visit.messageId && !fresh) {
    const target = { chat_id: CHAT_ID, message_id: visit.messageId };
    await telegram("editMessageWidgetData", { ...target, chat_data: visitData(visit) });
    await telegram("editMessageCaption", {
      ...target,
      caption,
      parse_mode: "HTML",
      show_caption_above_media: true,
    });
    return;
  }
  const sent =
    (await telegram<{ message_id: number }>("sendWidget", {
      chat_id: CHAT_ID,
      html: VISIT_WIDGET,
      chat_data: visitData(visit),
      caption,
      parse_mode: "HTML",
      show_caption_above_media: true,
      allow_queries: false,
    })) ??
    // a server without widgets: the caption alone says it
    (await telegram<{ message_id: number }>("sendMessage", {
      chat_id: CHAT_ID,
      text: caption,
      parse_mode: "HTML",
    }));
  visit.messageId = sent?.message_id;
}

export async function POST(request: Request) {
  const done = new Response(null, { status: 204 });

  // only the site's own pages report here
  if (!sameOrigin(request)) return done;
  const agent = request.headers.get("user-agent") ?? "";
  if (BOT.test(agent)) return done;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const ref = clean(body.ref, 32);
  const id = clean(body.visit, 32);
  const name = clean(body.event, 16);
  const path = clean(body.path, 200);
  const detail = body.detail === undefined ? undefined : clean(body.detail, 80);
  if (
    !ref ||
    !REF.test(ref) ||
    !id ||
    !VISIT_ID.test(id) ||
    !name ||
    !EVENTS.has(name) ||
    !path ||
    !PATH.test(path) ||
    (body.detail !== undefined && (!detail || !HOST.test(detail)))
  ) {
    return new Response(null, { status: 400 });
  }

  if (!telegramReady) return done;

  const now = Date.now();

  const event: VisitEvent = detail
    ? [Math.floor(now / 1000), name, path, detail]
    : [Math.floor(now / 1000), name, path];

  // no store yet: nothing can collect, so each event is its own plain message,
  // for the refs REF_NAMES lists (all of them when it is unset), within a
  // budget this server instance keeps
  if (!storeReady) {
    const names = (process.env.REF_NAMES ?? "").split(",").map((entry) => entry.trim());
    if (names.some(Boolean) && !names.includes(ref)) return done;
    seen = seen.filter((time) => now - time < 60_000);
    if (seen.length >= PER_MINUTE) return done;
    seen.push(now);
    const lone: Visit = {
      ref,
      country: clean(request.headers.get("x-vercel-ip-country"), 2),
      device: /Mobi|Android|iPhone/i.test(agent) ? "phone" : "desktop",
      events: [event],
    };
    const text = visitCaption(lone).replace(/\n1 event · last: /, "\n");
    await telegram("sendMessage", { chat_id: CHAT_ID, text, parse_mode: "HTML" });
    return done;
  }

  try {
    if (!(await admit(ref, await clientKey(request)))) return done;
    // two reports of one visit arrive close together (the link, then a page):
    // wait for the other to finish so they share one message
    let locked = await lockVisit(id);
    for (let tries = 0; !locked && tries < 8; tries++) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      locked = await lockVisit(id);
    }
    try {
      const existing = await loadVisit(id);
      // a visit id belongs to the ref it started with
      if (existing && existing.ref !== ref) return done;
      const visit: Visit = existing ?? {
        ref,
        country: clean(request.headers.get("x-vercel-ip-country"), 2),
        device: /Mobi|Android|iPhone/i.test(agent) ? "phone" : "desktop",
        events: [],
      };
      const last = visit.events.at(-1)?.[0];
      const resumed = last !== undefined && event[0] - last > WINDOW_SECONDS;
      if (resumed) visit.events = [];
      visit.events.push(event);

      await count(ref, id, event, !existing);
      await show(visit, resumed);
      await saveVisit(id, visit);
    } finally {
      await unlockVisit(id);
    }
  } catch {
    // a failed report must never surface to the visitor
  }
  return done;
}
