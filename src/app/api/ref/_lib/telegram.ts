/**
 * The Telegram side of ref links: the bot that reports visits, and who it
 * reports to.
 *
 *   REF_TELEGRAM_BOT_TOKEN        the bot
 *   REF_TELEGRAM_CHAT_ID          the one chat it writes to and listens to
 *   REF_TELEGRAM_WEBHOOK_SECRET   the secret Telegram sends with each update
 *   REF_TELEGRAM_API_BASE         another Bot API server (tests); default Telegram's
 */
const TOKEN = process.env.REF_TELEGRAM_BOT_TOKEN;
const BASE = process.env.REF_TELEGRAM_API_BASE ?? "https://api.telegram.org";

export const CHAT_ID = process.env.REF_TELEGRAM_CHAT_ID;
export const WEBHOOK_SECRET = process.env.REF_TELEGRAM_WEBHOOK_SECRET;

/** True when the bot can send. */
export const telegramReady = Boolean(TOKEN && CHAT_ID);

/** Calls a Bot API method; returns its result, or null when Telegram refuses. */
export async function telegram<T = unknown>(
  method: string,
  payload: Record<string, unknown>,
): Promise<T | null> {
  try {
    const response = await fetch(`${BASE}/bot${TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const body = (await response.json()) as { ok: boolean; result?: T };
    return body.ok ? (body.result ?? null) : null;
  } catch {
    return null;
  }
}

/** Text for an HTML caption. */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
