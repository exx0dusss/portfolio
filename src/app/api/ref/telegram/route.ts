/**
 * The ref bot's webhook: /stats, and the Refresh button on its widget.
 *
 * Telegram must send REF_TELEGRAM_WEBHOOK_SECRET with each update (set as
 * `secret_token` in setWebhook, with `allowed_updates` of "message" and
 * "widget_query"). Only REF_TELEGRAM_CHAT_ID is answered: anyone else's
 * message or query is ignored.
 */
import { storeReady } from "../_lib/store";
import { CHAT_ID, telegram, telegramReady, WEBHOOK_SECRET } from "../_lib/telegram";
import { readStats } from "../_lib/visits";
import { STATS_WIDGET, statsCaption } from "../_lib/widgets";

interface Update {
  message?: { chat: { id: number }; from?: { id: number }; text?: string };
  /** Bot API 10.4: a request made from inside a widget. */
  widget_query?: {
    id: string;
    from: { id: number };
    chat?: { id: number };
    message_id?: number;
    data: string;
  };
}

async function sendStats(): Promise<void> {
  const stats = await readStats();
  const caption = statsCaption(stats);
  const sent = await telegram("sendWidget", {
    chat_id: CHAT_ID,
    html: STATS_WIDGET,
    chat_data: JSON.stringify(stats),
    caption,
    parse_mode: "HTML",
    show_caption_above_media: true,
    allow_queries: true,
  });
  // a server without widgets: the same numbers as text
  if (!sent) await telegram("sendMessage", { chat_id: CHAT_ID, text: caption, parse_mode: "HTML" });
}

async function refreshStats(messageId: number): Promise<void> {
  const stats = await readStats();
  const target = { chat_id: CHAT_ID, message_id: messageId };
  await telegram("editMessageWidgetData", { ...target, chat_data: JSON.stringify(stats) });
  await telegram("editMessageCaption", {
    ...target,
    caption: statsCaption(stats),
    parse_mode: "HTML",
    show_caption_above_media: true,
  });
}

export async function POST(request: Request) {
  const ok = new Response(null, { status: 200 });
  if (!telegramReady || !storeReady || !WEBHOOK_SECRET) return new Response(null, { status: 503 });
  if (request.headers.get("x-telegram-bot-api-secret-token") !== WEBHOOK_SECRET) {
    return new Response(null, { status: 401 });
  }

  let update: Update;
  try {
    update = (await request.json()) as Update;
  } catch {
    return new Response(null, { status: 400 });
  }

  try {
    const owner = Number(CHAT_ID);
    const { message, widget_query: query } = update;

    if (message?.chat.id === owner && /^\/(stats|start)(@\w+)?$/.test(message.text ?? "")) {
      await sendStats();
    } else if (query) {
      const mine = query.from.id === owner && query.data === "r" && query.message_id;
      if (mine) await refreshStats(query.message_id!);
      await telegram("answerWidgetQuery", { widget_query_id: query.id, data: mine ? "1" : "0" });
    }
  } catch {
    // answer Telegram anyway, so it does not resend the update
  }
  return ok;
}
