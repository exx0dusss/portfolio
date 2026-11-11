import diagrams from "@/lib/diagrams.json";

import {
  TelegramButton,
  TelegramChat,
  TelegramKeyboard,
  TelegramKeyboardRow,
  TelegramMessage,
  TelegramReply,
  TelegramRichText,
} from "../../_components";

const LINK = "https://youtu.be/q3Fz8rWdN1k";

/** The bot's rich download for a made-up YouTube video, as one string of the
 *  rich HTML it sends: downloader/youtube/message-service.ts fills the slots
 *  and lib/rich-html.ts `card()` lays them out (an `<h5>`, a `<figure>` with
 *  its `<figcaption>`, its blocks a blank line apart, then the button rows). */
const HTML = [
  '<h5><tg-emoji emoji-id="youtube">▶️</tg-emoji> No-yeast cinnamon rolls</h5>',
  "<figure>",
  '<video src="tg://video?id=media-video" width="1280" height="720" duration="00:24" poster="/projects/exd-download-app/cinnamon-rolls.jpg"></video>',
  "<figcaption>",
  '👤 <a href="https://www.youtube.com/@milabakes">MilaBakes</a><br/><i>📝 Ready in 20 minutes, no mixer needed.</i>',
  "<br/><br/>",
  "👁 1.3M  ❤️ 48.2K  ⏱ 0:24",
  "<br/><br/>",
  "🏷️ #youtube_video",
  "</figcaption>",
  "</figure>",
  '<tg-button-row><tg-button type="url" url="https://www.youtube.com/watch?v=q3Fz8rWdN1k"><tg-emoji emoji-id="youtube">▶️</tg-emoji> Open on YouTube</tg-button></tg-button-row>',
  '<tg-button-row><tg-button type="url" style="primary" url="https://t.me/ExdDownloadApp">Open in 🤖 @ExdDownloadApp</tg-button></tg-button-row>',
].join("");

/** What each slot is, for narrow screens, where the sketch beside the chat is hidden. */
const SLOTS = [
  ["Title", "an animated icon, then the title"],
  ["Media", "the video, photo or track"],
  ["Body", "the author and the description"],
  ["Meta", "facts: views, likes, length"],
  ["Footer", "the format’s hashtag"],
  ["Actions", "open the original, or the bot"],
] as const;

/**
 * The bot's rich download taken apart: the chat drawn as the demo draws it
 * (TelegramChat), the message from the bot's own rich HTML
 * (TelegramRichText), and a hand-drawn sketch beside it
 * (scripts/diagrams/rich-message.mjs) naming each slot with an arrow. The
 * chat is a fixed width and the sketch lies over it, drawn in its pixels, so
 * the arrows meet the parts they name; on narrow screens it gives way to a
 * list.
 */
export function RichMessageAnatomy() {
  const sketch = (diagrams as Record<string, { width: number; height: number }>)["rich-message"];
  return (
    <figure data-slot="rich-message-anatomy" className="m-0">
      <div className="relative w-85 max-tablet:w-full max-tablet:max-w-chat">
        <TelegramChat name="ExdDownloadApp" avatar="/projects/exd-download-app/favicon.png">
          <div className="flex flex-col gap-2 px-3 py-4">
            <TelegramMessage side="out" time="18:42">
              {LINK}
            </TelegramMessage>
            <TelegramMessage side="in" time="18:42">
              <TelegramReply author="Anna">{LINK}</TelegramReply>
              <TelegramRichText html={HTML} />
            </TelegramMessage>
            <TelegramKeyboard aria-label="Download options">
              <TelegramKeyboardRow>
                <TelegramButton>⚙️ Options</TelegramButton>
              </TelegramKeyboardRow>
            </TelegramKeyboard>
          </div>
        </TelegramChat>
        {sketch && (
          // eslint-disable-next-line @next/next/no-img-element -- the static sketch at its drawn size, so its arrows meet the chat
          <img
            src="/diagrams/rich-message.svg"
            alt=""
            width={sketch.width}
            height={sketch.height}
            className="pointer-events-none absolute top-0 left-0 max-w-none -translate-x-2 -translate-y-2 max-tablet:hidden dark:hue-rotate-180 dark:invert-93"
          />
        )}
      </div>
      <figcaption className="mt-3.5 hidden text-13 leading-copy text-fg-dim max-tablet:block">
        {SLOTS.map(([slot, what]) => (
          <span key={slot} className="block">
            <strong className="font-medium text-fg">{slot}</strong>: {what}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
