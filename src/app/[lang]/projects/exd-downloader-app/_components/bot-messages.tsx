"use client";

import { useEffect, useState } from "react";

import { isTelegramEmojiName, TelegramEmoji } from "@/components/telegram-emoji";

import {
  TelegramActions,
  TelegramAudio,
  TelegramButton,
  TelegramChip,
  TelegramChips,
  TelegramFooter,
  TelegramHeading,
  TelegramKeyboard,
  TelegramKeyboardRow,
  TelegramList,
  TelegramMessage,
  TelegramNotice,
  TelegramPhoto,
  TelegramQuote,
  TelegramReply,
  TelegramSectionLabel,
  TelegramVideo,
} from "../../_components/telegram-chat";
import { TelegramRichText } from "../../_components/telegram-rich-text";

/*
 * The bot's messages, as it sends them: each mirrors one of its renderers
 * and keyboards in exd-tiktok-bot (named on each), with the English strings
 * from its locales/en/*.ftl. Their buttons do what the bot's do, scripted:
 * nothing reaches the real bot. Only the person, their numbers, the posts
 * and the search results are made up.
 */

/** What a message can ask of the chat around it. */
export interface ChatApi {
  /** Posts a bot message. */
  botSay: (render: (self: MessageApi) => React.ReactNode) => void;
  /** The short answer over the chat after a tap; `long` for an alert. */
  toast: (text: string, long?: boolean) => void;
  /** The Mini App: here, the page's own screenshots of it. */
  openApp: () => void;
  /** Sends the next thing the user types here instead of to the bot's usual
   *  reply (a feedback description); `null` to stop. */
  capture: (handler: ((text: string) => void) | null) => void;
  /** /settings' Rich downloads (beta): downloads sent while it's on arrive
   *  as cards, otherwise classic. */
  richDownloads: boolean;
  setRichDownloads: (on: boolean) => void;
}

export interface MessageApi extends ChatApi {
  time: string;
  /** Deletes this message (Close, Dismiss). */
  remove: () => void;
}

const BOT_URL = "https://t.me/ExdDownloadApp";
/** commands/start/start-links.ts */
const ADD_TO_GROUP_URL = `${BOT_URL}?startgroup=true&admin=delete_messages`;
/** commands/premium/premium-deep-link.ts */
const PREMIUM_URL = `${BOT_URL}?start=premium`;
const DEMO_USER = "Anna";
const MADE_UP = "The posts here are made up, so this link goes nowhere.";
export const TIKTOK_LINK = "https://vm.tiktok.com/ZMh3kQ7pL/";

/** The download message stays this long before the media replaces it. */
const WORK_MS = 1400;

/** One of the bot's animated custom emoji: the saved animation when the site
 *  has it (pnpm telegram:emoji), otherwise the plain emoji it stands for. */
function BotEmoji({ name, alt }: { name: string; alt: string }) {
  if (isTelegramEmojiName(name)) return <TelegramEmoji name={name} className="size-4.5" />;
  return <span aria-hidden>{alt}</span>;
}

const OpenApp = ({ chat, label = "Open app" }: { chat: ChatApi; label?: string }) => (
  <TelegramButton onClick={chat.openApp}>{label}</TelegramButton>
);

/** The plain notice the bot edits a closed flow into. */
function Notice({
  time,
  icon,
  children,
}: {
  time: string;
  icon: React.ReactNode;
  children: string;
}) {
  return (
    <TelegramMessage side="in" time={time}>
      <TelegramNotice icon={icon}>{children}</TelegramNotice>
    </TelegramMessage>
  );
}

// ─── /start, /help ───────────────────────────────────────────────────────────

/** downloader/source-chips.ts: every platform the bot reads, the three core
 *  ones first. Instagram, Reddit and Vimeo show while their logins work. */
const SOURCES = [
  { id: "tiktok", name: "TikTok", alt: "🎵" },
  { id: "youtube", name: "YouTube", alt: "▶️" },
  { id: "soundcloud", name: "SoundCloud", alt: "☁️" },
  ...[
    "X",
    "Instagram",
    "Reddit",
    "Facebook",
    "Pinterest",
    "Twitch",
    "Vimeo",
    "Snapchat",
    "Tumblr",
    "VK",
    "Bilibili",
    "LinkedIn",
  ].map((name) => ({ id: name.toLowerCase(), name, alt: "" })),
];

/** The sources as chips, a logo and a name each; a tap asks for a link of
 *  that source, as the bot does (handle-source-chip.ts). */
function SourceChips({ chat }: { chat: ChatApi }) {
  return (
    <TelegramChips>
      {SOURCES.map((source) => (
        <TelegramChip
          key={source.id}
          onClick={() =>
            chat.botSay((self) => (
              <TelegramMessage side="in" time={self.time}>
                Send me a {source.name} link.
              </TelegramMessage>
            ))
          }
        >
          {(source.alt || isTelegramEmojiName(source.id)) && (
            <BotEmoji name={source.id} alt={source.alt} />
          )}
          {source.name}
        </TelegramChip>
      ))}
    </TelegramChips>
  );
}

/** commands/start/start.rich.ts, renderStartPrivate (not Premium yet, so it
 *  ends with "Get Premium") */
export function StartMessage({ chat }: { chat: MessageApi }) {
  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name="wave" alt="👋" />}>
        Welcome, {DEMO_USER}
      </TelegramHeading>
      <p>
        Glad you’re here! I download videos, photos and music — without watermarks, in the format
        you prefer.
      </p>
      <p>
        <b>Supported platforms</b>
      </p>
      <SourceChips chat={chat} />
      <p>
        <b>What I can do</b>
        <br />• Download videos without watermarks
        <br />• Photo slideshows, video slideshows, albums and ZIPs
        <br />• Extract original soundtrack
        <br />• Get avatars of authors
      </p>
      <p>
        <b>How to download</b>
        <br />
        Share a link from any platform above — video, photo post, Short, track or a shortened link.
      </p>
      <p>
        Use /settings to change the default format and language, or to try Rich downloads (beta).
        <br />
        Use /feedback to share your thoughts.
      </p>
      <TelegramQuote>Ready when you are — send me a link.</TelegramQuote>
      <TelegramActions>
        <OpenApp chat={chat} />
        <TelegramButton href={ADD_TO_GROUP_URL}>
          <BotEmoji name="plus" alt="➕" /> Add me to a group
        </TelegramButton>
        <TelegramButton href={PREMIUM_URL} variant="success">
          <BotEmoji name="star" alt="⭐️" /> Get Premium
        </TelegramButton>
      </TelegramActions>
    </TelegramMessage>
  );
}

const FORMATS: [string, string, string][] = [
  ["film", "🎬", "Video — watermark-free, up to 1080p on YouTube"],
  ["picture", "🖼", "Photo slideshow — swipe the slides in a native carousel"],
  ["tv", "📺", "Video slideshow — the photos turned into a video with the original sound"],
  ["cards", "🗂", "Photo album — every photo at once"],
  ["folder", "📁", "Photo ZIP — the original files, untouched"],
  ["music", "🎵", "Audio — the original sound, YouTube audio, SoundCloud tracks"],
  ["person", "👤", "Avatar — the author's profile picture"],
];

/** commands/help/help.rich.ts, renderHelpPrivate */
export function HelpMessage({ chat }: { chat: MessageApi }) {
  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name="question" alt="❓" />}>Help</TelegramHeading>
      <p>
        Send a link from any platform below — after the download, tap Options to switch the format.
      </p>
      <SourceChips chat={chat} />
      <TelegramSectionLabel>Options</TelegramSectionLabel>
      <TelegramList>
        {FORMATS.map(([name, alt, text]) => (
          <li key={name}>
            <BotEmoji name={name} alt={alt} /> {text}
          </li>
        ))}
      </TelegramList>
      <TelegramSectionLabel>Commands</TelegramSectionLabel>
      <p className="mt-1">
        /settings — language, formats, Rich downloads, download message
        <br />
        /profile — your stats
        <br />
        /premium — Premium removes ads
        <br />
        /feedback — share your experience
      </p>
      <p>In groups I download links automatically. Admins configure me with /settings.</p>
      <TelegramActions>
        <OpenApp chat={chat} />
        <TelegramButton href={ADD_TO_GROUP_URL}>
          <BotEmoji name="plus" alt="➕" /> Add me to a group
        </TelegramButton>
      </TelegramActions>
    </TelegramMessage>
  );
}

// ─── /settings ───────────────────────────────────────────────────────────────

/** commands/settings/private-settings.tab.ts: the option lists, in order */
const PHOTO_FORMATS = [
  "📺 Video slideshow",
  "🏞️ Photo album",
  "📷 Photo slideshow",
  "📦 ZIP archive",
];
const QUALITIES = ["1080p Full HD", "720p HD", "480p SD", "360p"];
const AUDIO_FORMATS = ["MP3", "M4A · original quality"];
const LANGUAGES = [
  "🇬🇧 English",
  "🇺🇦 Ukrainian",
  "🇷🇺 Russian",
  "🇪🇸 Spanish",
  "🇫🇷 French",
  "🇸🇦 Arabic",
  "🇹🇷 Turkish",
  "🌐 System",
];
/** lib/list-filters.ts, radioText */
const radio = (label: string, on: boolean) => `${on ? "●" : "○"} ${label}`;

/** commands/settings/settings.rich.ts and private-settings.tab.ts: the
 *  settings card with Language and Download settings under it, their
 *  submenus, and the Rich downloads screen (a new user's defaults). The
 *  Rich downloads switch is the chat's: downloads sent after it follow it. */
export function SettingsMessage({ chat }: { chat: MessageApi }) {
  const [view, setView] = useState<
    "main" | "language" | "download" | "photo" | "youtube" | "rich" | "closed"
  >("main");
  const [photo, setPhoto] = useState("📷 Photo slideshow");
  const [quality, setQuality] = useState("720p HD");
  const [audio, setAudio] = useState("MP3");
  const [language, setLanguage] = useState("🌐 System");
  const [prompts, setPrompts] = useState(true);
  const rich = chat.richDownloads;

  if (view === "closed") {
    return (
      <Notice time={chat.time} icon={<BotEmoji name="check" alt="✅" />}>
        Menu closed
      </Notice>
    );
  }

  /** a keyboard row; without `onClick`, a label the bot puts over a group */
  const row = (label: string, onClick?: () => void) => (
    <TelegramKeyboardRow key={label}>
      <TelegramButton onClick={onClick}>{label}</TelegramButton>
    </TelegramKeyboardRow>
  );
  const backTo = (to: typeof view) => row("⬅️ Back", () => setView(to));
  const premiumRequired = () => chat.botSay((self) => <PremiumRequiredMessage chat={self} />);
  const setRich = (on: boolean) => {
    if (on === rich) return;
    chat.setRichDownloads(on);
    chat.toast(
      on
        ? "✅ Downloads now arrive as Rich Messages (beta)"
        : "✅ Downloads now arrive in the classic format",
    );
  };

  const keyboards = {
    main: [
      row("🌎 Language", () => setView("language")),
      row("📥 Download settings", () => setView("download")),
      row("Close", () => setView("closed")),
    ],
    language: [
      ...LANGUAGES.map((option) =>
        row(radio(option, option === language), () => {
          if (option === language) return chat.toast("ℹ️ Language is already set.");
          setLanguage(option);
          chat.toast("✅ Language changed successfully.");
          setView("main");
        }),
      ),
      backTo("main"),
    ],
    download: [
      row("🖼️ Photo format", () => setView("photo")),
      row("📺 YouTube", () => setView("youtube")),
      row(`✨ Rich downloads: ${rich ? "On" : "Off"}`, () => setView("rich")),
      row("⭐ Caption preferences", premiumRequired),
      row("⭐ Download message", premiumRequired),
      row(`💬 Feedback prompts: ${prompts ? "On" : "Off"}`, () => {
        chat.toast(prompts ? "❌ Feedback prompts disabled" : "✅ Feedback prompts enabled");
        setPrompts(!prompts);
      }),
      backTo("main"),
    ],
    photo: [
      ...PHOTO_FORMATS.map((format) =>
        row(radio(format, format === photo), () => {
          setPhoto(format);
          if (format === "📺 Video slideshow") {
            chat.toast(
              "✅ Format set to video slideshow. Note: video slideshows take 30-60s to generate (video with transitions + music). During high load, this may take longer.",
              true,
            );
          } else chat.toast("✅ Photo format changed");
        }),
      ),
      backTo("download"),
    ],
    youtube: [
      row("🎥 Video quality"),
      ...QUALITIES.map((option) =>
        row(radio(option, option === quality), () => {
          setQuality(option);
          chat.toast("Video quality changed");
        }),
      ),
      row("🎵 Audio format"),
      ...AUDIO_FORMATS.map((option) =>
        row(radio(option, option === audio), () => {
          setAudio(option);
          chat.toast("Audio format changed");
        }),
      ),
      backTo("download"),
    ],
    rich: [
      <TelegramKeyboardRow key="switch">
        <TelegramButton onClick={() => setRich(true)}>{radio("On", rich)}</TelegramButton>
        <TelegramButton onClick={() => setRich(false)}>{radio("Off", !rich)}</TelegramButton>
      </TelegramKeyboardRow>,
      backTo("download"),
    ],
  };

  return (
    <>
      {view === "rich" ? (
        <TelegramMessage side="in" time={chat.time}>
          <TelegramHeading icon={<BotEmoji name="sparkles" alt="✨" />}>
            Rich downloads (beta)
          </TelegramHeading>
          <p>
            On: each download arrives as a card with the post’s details and its buttons. Off: as a
            plain video, photo or audio with a short caption.
          </p>
          <p>
            Status: <b>{rich ? "On" : "Off"}</b>
          </p>
          <TelegramFooter>Multi-photo posts and playlists always arrive as cards.</TelegramFooter>
        </TelegramMessage>
      ) : (
        <TelegramMessage side="in" time={chat.time}>
          <TelegramHeading>⚙️ Settings</TelegramHeading>
          <p>
            Language: <b>{language}</b>
            <br />
            Photo format: <b>{photo}</b>
          </p>
          <p>
            <b>YouTube</b>
            <br />
            Video quality: <b>{quality}</b>
            <br />
            Audio format: <b>{audio.split(" ·")[0]}</b>
          </p>
          <TelegramActions>
            <OpenApp chat={chat} label="Open in app" />
          </TelegramActions>
          <TelegramFooter>
            Photo format: TikTok photo posts and multi-photo posts from other sources.
            <br />
            YouTube quality and audio format: YouTube links only. Other sources send the highest
            quality.
          </TelegramFooter>
        </TelegramMessage>
      )}
      <TelegramKeyboard aria-label="Settings">{keyboards[view]}</TelegramKeyboard>
    </>
  );
}

/** commands/premium/premium.rich.ts, renderPremiumRequired */
export function PremiumRequiredMessage({ chat }: { chat: MessageApi }) {
  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name="star" alt="⭐️" />}>Premium feature</TelegramHeading>
      <p>This setting is part of Premium.</p>
      <TelegramActions>
        <TelegramButton
          variant="primary"
          onClick={() => chat.botSay((self) => <PremiumMessage chat={self} />)}
        >
          <BotEmoji name="star" alt="⭐️" /> Get Premium
        </TelegramButton>
        <TelegramButton onClick={chat.remove}>Dismiss</TelegramButton>
      </TelegramActions>
    </TelegramMessage>
  );
}

// ─── /profile, /premium ──────────────────────────────────────────────────────

/** commands/profile/profile.rich.ts, renderProfileOverview */
export function ProfileMessage({ chat }: { chat: MessageApi }) {
  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name="person" alt="👤" />}>{DEMO_USER}</TelegramHeading>
      <p>
        Downloads: <b>128</b> · 3 a day
        <br />
        <span className="inline-flex items-center gap-1">
          <BotEmoji name="tiktok" alt="🎵" /> TikTok: <b>104</b>
        </span>
        <br />
        <span className="inline-flex items-center gap-1">
          <BotEmoji name="youtube" alt="▶️" /> YouTube: <b>19</b>
        </span>
        <br />
        <span className="inline-flex items-center gap-1">
          <BotEmoji name="soundcloud" alt="☁️" /> SoundCloud: <b>5</b>
        </span>
      </p>
      <p className="flex items-center gap-1.5">
        Premium:
        <button
          type="button"
          onClick={() => chat.botSay((self) => <PremiumMessage chat={self} />)}
          className="inline-flex cursor-pointer items-center gap-1 rounded-10 bg-tg-link px-2 py-0.5 text-13 font-medium text-on-scrim"
        >
          <BotEmoji name="star" alt="⭐️" /> Get Premium
        </button>
      </p>
      <TelegramActions>
        <OpenApp chat={chat} label="Open in app" />
      </TelegramActions>
      <TelegramFooter>Joined Mar 3, 2026 · active now</TelegramFooter>
    </TelegramMessage>
  );
}

/** commands/premium/premium.rich.ts, renderPremiumView (no Premium yet; the
 *  prices from its own doc comment). Buying goes to the real bot. */
export function PremiumMessage({ chat }: { chat: MessageApi }) {
  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name="star" alt="⭐️" />}>
        Premium from 99 ⭐ / month
      </TelegramHeading>
      <p>Pay with Telegram Stars — monthly or for a year.</p>
      <TelegramSectionLabel>Included</TelegramSectionLabel>
      <p className="mt-1">
        • No mandatory subscriptions
        <br />• Custom download message
        <br />• Caption preferences
      </p>
      <TelegramActions>
        <TelegramButton href={PREMIUM_URL}>99 ⭐ / month · auto-renews</TelegramButton>
        <TelegramButton href={PREMIUM_URL} variant="primary">
          365 days · 950 ⭐ · save 20%
        </TelegramButton>
        <OpenApp chat={chat} label="Open in app" />
      </TelegramActions>
      <TelegramFooter>
        Renews every 30 days from your Stars balance. Cancel anytime in /premium or Telegram →
        Settings → My Stars.
      </TelegramFooter>
    </TelegramMessage>
  );
}

// ─── /feedback, /support ─────────────────────────────────────────────────────

type FlowStep =
  | { kind: "feedback" }
  | { kind: "format" }
  | { kind: "category" }
  | { kind: "rate" }
  | { kind: "describe" }
  | { kind: "support" }
  | { kind: "problem"; payment: boolean }
  | { kind: "sent"; ticket: boolean }
  | { kind: "cancelled" };

/** feedback/support-flow.ts: a text step's limit, and links where they're not
 *  allowed */
const MAX_TEXT = 300;
const HAS_LINK = /https?:\/\/|www\.|\.[a-z]{2,}\//i;

/**
 * feedback/feedback.rich.ts and support.rich.ts: one prompt message, edited
 * at each step, with Back and Cancel. /feedback: topic → format (downloader)
 * → category → rating (not for a feature request) → an optional description;
 * "Something's broken" hands over to /support. /support: topic → a required
 * description → a ticket. Typing answers a description step; on a button
 * step it gets "Please use the buttons above."
 */
function FlowMessage({ chat, start }: { chat: MessageApi; start: FlowStep }) {
  const [steps, setSteps] = useState<FlowStep[]>([start]);
  const [warning, setWarning] = useState<string | null>(null);
  const step = steps.at(-1)!;
  const go = (next: FlowStep) => {
    setWarning(null);
    setSteps((list) => [...list, next]);
  };
  const finish = (next: FlowStep) => {
    chat.capture(null);
    setSteps([next]);
  };

  // while the flow is open, what the user types is its answer
  const open = step.kind !== "sent" && step.kind !== "cancelled";
  useEffect(() => {
    if (!open) return;
    chat.capture((text) => {
      if (step.kind !== "describe" && step.kind !== "problem") {
        chat.toast("Please use the buttons above.");
      } else if (text.length > MAX_TEXT) {
        setWarning(`⚠️ Too long: up to ${MAX_TEXT} characters.`);
      } else if (step.kind === "describe" && HAS_LINK.test(text)) {
        setWarning(
          "Links can't be feedback. Describe the problem in words — paste the link to the bot outside this form to download it.",
        );
      } else {
        finish({ kind: "sent", ticket: step.kind === "problem" });
      }
    });
    return () => chat.capture(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-armed per step only
  }, [step]);

  if (step.kind === "sent") {
    return (
      <Notice time={chat.time} icon={<BotEmoji name="check" alt="✅" />}>
        {step.ticket
          ? "Thanks! We got your request and will reply here."
          : "Thanks for your feedback!"}
      </Notice>
    );
  }
  if (step.kind === "cancelled") {
    return (
      <Notice time={chat.time} icon={<BotEmoji name="cross" alt="❌" />}>
        Action cancelled
      </Notice>
    );
  }

  const exit = (
    <div className="flex gap-1">
      {steps.length > 1 && (
        <TelegramButton
          onClick={() => {
            setWarning(null);
            setSteps((list) => list.slice(0, -1));
          }}
        >
          ⬅️ Back
        </TelegramButton>
      )}
      <TelegramButton onClick={() => finish({ kind: "cancelled" })}>Cancel</TelegramButton>
    </div>
  );
  const pairs = (labels: string[], pick: (label: string) => void) => {
    const rows = [];
    for (let i = 0; i < labels.length; i += 2) {
      rows.push(
        <div key={labels[i]} className="flex gap-1">
          {labels.slice(i, i + 2).map((label) => (
            <TelegramButton key={label} onClick={() => pick(label)}>
              {label}
            </TelegramButton>
          ))}
        </div>,
      );
    }
    return rows;
  };

  const chatIcon = <BotEmoji name="chat" alt="💬" />;
  const screens: Record<
    Exclude<FlowStep["kind"], "sent" | "cancelled">,
    {
      icon: React.ReactNode;
      title: string;
      body: string;
      rule?: string;
      footer?: string;
      choices: React.ReactNode[];
    }
  > = {
    feedback: {
      icon: chatIcon,
      title: "Feedback",
      body: "What is your feedback about?",
      choices: pairs(["📲 Downloader", "💬 General"], (label) =>
        go({ kind: label === "📲 Downloader" ? "format" : "category" }),
      ),
    },
    format: {
      icon: <BotEmoji name="phone" alt="📲" />,
      title: "Downloader",
      body: "Which format is this about?",
      choices: pairs(
        [
          "🎥 Video",
          "📷 Photo slideshow",
          "📺 Video slideshow",
          "🏞️ Photo album",
          "🎵 Audio",
          "👤 Avatar",
        ],
        () => go({ kind: "category" }),
      ),
    },
    category: {
      icon: chatIcon,
      title: "Share your feedback",
      body: "Choose a category below.",
      choices: pairs(
        ["🎥 Quality", "⚡ Speed", "💡 Feature request", "🛠 Something's broken", "💬 Other"],
        (label) =>
          go(
            label === "🛠 Something's broken"
              ? { kind: "support" }
              : { kind: label === "💡 Feature request" ? "describe" : "rate" },
          ),
      ),
    },
    rate: {
      icon: <BotEmoji name="star" alt="⭐️" />,
      title: "Rate your experience",
      body: "Choose a rating from 1 to 5 stars.",
      choices: [
        <div key="stars" className="flex gap-1">
          {[1, 2, 3, 4, 5].map((stars) => (
            <TelegramButton key={stars} className="px-1" onClick={() => go({ kind: "describe" })}>
              <BotEmoji name="star" alt="⭐️" />
              {stars}
            </TelegramButton>
          ))}
        </div>,
      ],
    },
    describe: {
      icon: chatIcon,
      title: "Describe your feedback",
      body: "Type your message.",
      rule: `Text, up to ${MAX_TEXT} characters, no links.`,
      footer: "Or press Skip to submit without a description.",
      choices: [
        <TelegramButton key="skip" onClick={() => finish({ kind: "sent", ticket: false })}>
          ⏭️ Skip
        </TelegramButton>,
      ],
    },
    support: {
      icon: chatIcon,
      title: "Support",
      body: "What do you need help with?",
      choices: pairs(["📥 Downloads", "💳 Payment", "👤 Account", "💬 Other"], (label) =>
        go({ kind: "problem", payment: label === "💳 Payment" }),
      ),
    },
    problem: {
      icon: chatIcon,
      title: "Describe the problem",
      body:
        step.kind === "problem" && step.payment
          ? "Tell us what happened with your payment or Premium."
          : "Tell us what happened. For a download problem, include the link.",
      rule: `Text, up to ${MAX_TEXT} characters.`,
      footer: "The team reads every request and replies here.",
      choices: [],
    },
  };
  const screen = screens[step.kind];

  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={screen.icon}>{screen.title}</TelegramHeading>
      <p>{screen.body}</p>
      {screen.rule && <p className="text-13 text-tg-muted">{screen.rule}</p>}
      {warning && <p>{warning}</p>}
      {screen.footer && <TelegramFooter>{screen.footer}</TelegramFooter>}
      <TelegramActions>
        {screen.choices}
        {exit}
      </TelegramActions>
    </TelegramMessage>
  );
}

export const FeedbackMessage = ({ chat }: { chat: MessageApi }) => (
  <FlowMessage chat={chat} start={{ kind: "feedback" }} />
);

export const SupportMessage = ({ chat }: { chat: MessageApi }) => (
  <FlowMessage chat={chat} start={{ kind: "support" }} />
);

// ─── a link: TikTok or another platform ──────────────────────────────────────

type Format = "video" | "avatar" | "audio";
/** downloader/tiktok/tiktok.ts: a format's label on its Options button */
const FORMAT_LABELS: Record<Format, string> = {
  video: "🎥 Video",
  avatar: "👤 Avatar",
  audio: "🎵 Audio",
};

/** The platform a downloadable link is from, by its host (downloader.utils.ts
 *  and social/platforms.ts); anything else is not supported. */
export function platformOf(link: string): { id: string; name: string } | null {
  const host = (() => {
    try {
      return new URL(link).hostname.replace(/^(www|m|vm|vt)\./, "");
    } catch {
      return "";
    }
  })();
  if (host === "tiktok.com") return { id: "tiktok", name: "TikTok" };
  const social = SOURCES.slice(3).find((source) =>
    [`${source.id}.com`, ...(source.id === "x" ? ["twitter.com"] : [])].includes(host),
  );
  return social ? { id: social.id, name: social.name } : null;
}

/**
 * A download as the rich HTML the bot sends for it: lib/rich-html.ts `card()`
 * laying out the slots tiktok/message-service.ts or social/message-service.ts
 * fill. The title says what and whose; the media follows with a caption (body,
 * meta and the format's hashtag a blank line apart; an avatar has none); then
 * "Open on …" and "Open in 🤖 @ExdDownloadApp" as button rows.
 */
function richDownloadHtml(platform: { id: string; name: string }, format: Format): string {
  const tiktok = platform.id === "tiktok";
  const icon = `<tg-emoji emoji-id="${platform.id}">${tiktok ? "🎵" : "📱"}</tg-emoji>`;
  const author = '<a href="https://www.tiktok.com/@mila.bakes">@mila.bakes</a> (Mila)';
  const title = {
    video: `${platform.name} video by ${author}`,
    audio: `${platform.name} sound by ${author}`,
    avatar: `${platform.name} avatar of ${author}`,
  }[format];
  const media = {
    video: '<video src="tg://video?id=media-video" duration="00:24"></video>',
    audio:
      '<audio src="tg://audio?id=media-audio" title="Sunday Morning" performer="Lofi Kitchen" duration="0:24"></audio>',
    avatar: '<img src="tg://photo?id=media-photo"/>',
  }[format];
  const gap = "\u00A0\u00A0";
  // social/message-service.ts counts views first and reposts; TikTok its own
  const stats = tiktok
    ? `❤️ 48.2K${gap}💬 612${gap}👁 1.3M${gap}🔗 3.9K`
    : `👁 1.3M${gap}❤️ 48.2K${gap}🔁 3.9K${gap}💬 612`;
  const meta = [
    ...(tiktok ? ["🎵 <b>Sunday Morning</b> — Lofi Kitchen"] : []),
    stats,
    `📅 <tg-time unix="1760373720" format="wDT">${tiktok ? "Mon, Oct 13, 2025, 6:42 PM" : "Mon Oct 13 2025"}</tg-time>`,
  ];
  const caption =
    format === "avatar"
      ? ""
      : `<figcaption><i>📝 3-ingredient cinnamon rolls, no yeast, ready in 20 minutes</i><br/><br/>${meta.join("<br/>")}<br/><br/>🏷️ #${platform.id}_${format}</figcaption>`;
  return [
    `<h5>${icon} ${title}</h5>`,
    `<figure>${media}${caption}</figure>`,
    `<tg-button-row><tg-button type="url" url="${TIKTOK_LINK}">${icon} Open on ${platform.name}</tg-button></tg-button-row>`,
    `<tg-button-row><tg-button type="url" style="primary" url="${BOT_URL}">Open in 🤖 @ExdDownloadApp</tg-button></tg-button-row>`,
  ].join("");
}

/**
 * A download: the download message "⏳" while it runs, then the media in the
 * style set when it was sent. Rich (the demo's default): the bot's card, drawn
 * from the rich HTML it sends (richDownloadHtml). Classic (the real bot's
 * default; classic.ts with tiktok/message-service.ts or
 * social/message-service.ts): the file with a caption, and "Open on …",
 * "Open in 🤖 @ExdDownloadApp" and "Options" under it. A picked format turns Options into
 * one busy button, then the message becomes that format. TikTok switches to
 * the avatar or the sound; another platform between video and audio.
 */
export function DownloadMessage({ chat, link }: { chat: MessageApi; link: string }) {
  const platform = platformOf(link) ?? { id: "tiktok", name: "TikTok" };
  const tiktok = platform.id === "tiktok";
  const [rich] = useState(chat.richDownloads);
  const [format, setFormat] = useState<Format | "loading">("loading");
  const [keys, setKeys] = useState<"closed" | "open" | Format>("closed");

  useEffect(() => {
    const timer = setTimeout(() => setFormat("video"), WORK_MS);
    return () => clearTimeout(timer);
  }, []);

  if (format === "loading") {
    return (
      <TelegramMessage side="in" time={chat.time}>
        <p className="text-28 leading-none">⏳</p>
      </TelegramMessage>
    );
  }

  const pick = (next: Format) => {
    setKeys(next);
    setTimeout(() => {
      setFormat(next);
      setKeys("closed");
    }, WORK_MS);
  };
  const options: Format[] = (tiktok ? ["video", "avatar", "audio"] : ["video", "audio"]).filter(
    (option) => option !== format,
  ) as Format[];
  const author = (
    <>
      <span className="text-tg-link">@mila.bakes</span> (Mila)
    </>
  );
  const title = {
    video: (
      <>
        {platform.name} video by {author}
      </>
    ),
    audio: (
      <>
        {platform.name} sound by {author}
      </>
    ),
    avatar: (
      <>
        {platform.name} avatar of {author}
      </>
    ),
  }[format];
  const icon = <BotEmoji name={platform.id} alt={platform.id === "tiktok" ? "🎵" : "📱"} />;
  const media = (
    <>
      {format === "video" && <TelegramVideo duration="00:24" />}
      {format === "audio" && (
        <TelegramAudio title="Sunday Morning" performer="Lofi Kitchen" duration="0:24" />
      )}
      {format === "avatar" && <TelegramPhoto round />}
    </>
  );
  // social/message-service.ts counts views first and reposts; TikTok its own
  const stats = tiktok ? "❤️ 48.2K  💬 612  👁 1.3M  🔗 3.9K" : "👁 1.3M  ❤️ 48.2K  🔁 3.9K  💬 612";
  const details = format !== "avatar" && (
    <>
      <p>
        <i>📝 3-ingredient cinnamon rolls, no yeast, ready in 20 minutes</i>
      </p>
      <p className="mt-2">
        {tiktok && (
          <>
            🎵 <b>Sunday Morning</b> — Lofi Kitchen
            <br />
          </>
        )}
        {stats}
        <br />
        📅 {tiktok ? "Mon, Oct 13, 2025, 6:42 PM" : "Mon Oct 13 2025"}
      </p>
    </>
  );
  const openOn = (
    <TelegramButton url onClick={() => chat.toast(MADE_UP)}>
      {icon} Open on {platform.name}
    </TelegramButton>
  );
  const openInBot = (
    <TelegramButton href={BOT_URL} variant="primary">
      Open in 🤖 @ExdDownloadApp
    </TelegramButton>
  );

  return (
    <>
      {rich ? (
        <TelegramMessage side="in" time={chat.time}>
          <TelegramReply author={DEMO_USER}>{link}</TelegramReply>
          <TelegramRichText html={richDownloadHtml(platform, format)} />
        </TelegramMessage>
      ) : (
        <TelegramMessage side="in" time={chat.time}>
          <TelegramReply author={DEMO_USER}>{link}</TelegramReply>
          {media}
          <p>
            <b>
              {icon} {title}
            </b>
          </p>
          {details}
          <p className="mt-2">
            🏷️ #{platform.id}_{format}
          </p>
        </TelegramMessage>
      )}
      <TelegramKeyboard aria-label="Download options">
        {!rich && (
          <>
            <TelegramKeyboardRow>{openOn}</TelegramKeyboardRow>
            <TelegramKeyboardRow>{openInBot}</TelegramKeyboardRow>
          </>
        )}
        {keys === "closed" && (
          <TelegramKeyboardRow>
            <TelegramButton onClick={() => setKeys("open")}>⚙️ Options</TelegramButton>
          </TelegramKeyboardRow>
        )}
        {keys === "open" && (
          <>
            {options.map((option) => (
              <TelegramKeyboardRow key={option}>
                <TelegramButton onClick={() => pick(option)}>
                  {FORMAT_LABELS[option]}
                </TelegramButton>
              </TelegramKeyboardRow>
            ))}
            <TelegramKeyboardRow>
              <TelegramButton onClick={() => setKeys("closed")}>⬅️ Back</TelegramButton>
            </TelegramKeyboardRow>
          </>
        )}
        {keys !== "closed" && keys !== "open" && (
          <TelegramKeyboardRow>
            <TelegramButton>⏳ Downloading {FORMAT_LABELS[keys]}…</TelegramButton>
          </TelegramKeyboardRow>
        )}
      </TelegramKeyboard>
    </>
  );
}

/** downloader/download-error.rich.ts: a link the bot can't download */
export function UnsupportedMessage({ chat }: { chat: MessageApi }) {
  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name="link" alt="🔗" />}>Link not supported</TelegramHeading>
      <p>Send a link to a post, video or track instead.</p>
      <TelegramSectionLabel>Supported</TelegramSectionLabel>
      <SourceChips chat={chat} />
      <TelegramFooter>Or type a few words to search YouTube or SoundCloud.</TelegramFooter>
      <TelegramActions>
        <TelegramButton onClick={chat.remove}>Dismiss</TelegramButton>
      </TelegramActions>
    </TelegramMessage>
  );
}

// ─── words: a search ─────────────────────────────────────────────────────────

type Source = "youtube" | "soundcloud";
type Result = { title: string; by: string; length: string; cached?: boolean };

/** Made-up results, five a page, as the bot pages them. */
const RESULTS: Record<Source, Result[]> = {
  youtube: [
    { title: "Sunday Morning", by: "Lofi Kitchen", length: "3:12", cached: true },
    { title: "Cinnamon rolls in 20 minutes", by: "Mila Bakes", length: "8:45" },
    { title: "Rainy café jazz for cooking", by: "Night Shift", length: "1:12:04" },
    { title: "Lofi kitchen mix", by: "Lofi Kitchen", length: "45:00" },
    { title: "Morning bakes, slow music", by: "Slow Sundays", length: "12:30" },
    { title: "Soft piano for dinner", by: "Quiet Rooms", length: "58:20" },
    { title: "Bread that never fails", by: "Home Oven", length: "10:02" },
    { title: "Late night kitchen beats", by: "Night Shift", length: "1:01:10" },
    { title: "Pasta from scratch", by: "Mila Bakes", length: "14:18" },
    { title: "Café sounds, no music", by: "Ambient Corner", length: "2:00:00" },
  ],
  soundcloud: [
    { title: "kitchen tapes vol. 2", by: "lofi kitchen", length: "24:41" },
    { title: "sunday morning (slowed)", by: "night shift", length: "3:58" },
    { title: "cooking with rain", by: "ambient corner", length: "31:07" },
    { title: "warm bread", by: "slow sundays", length: "2:47" },
    { title: "midnight pasta", by: "quiet rooms", length: "4:12" },
  ],
};
const PER_PAGE = 5;

/** downloader/youtube/search.rich.ts, renderYoutubeSearchResults (and its
 *  SoundCloud twin): the source switch, one button a result, paging; a
 *  picked result shows its loading line, then the audio replaces the card. */
export function SearchMessage({ chat, query }: { chat: MessageApi; query: string }) {
  const [source, setSource] = useState<Source>("youtube");
  const [page, setPage] = useState(0);
  const [picked, setPicked] = useState<Result | null>(null);
  const [done, setDone] = useState(false);

  const results = RESULTS[source];
  const pages = Math.ceil(results.length / PER_PAGE);
  const name = source === "youtube" ? "YouTube" : "SoundCloud";
  const clipped = query.length > 40 ? `${query.slice(0, 39)}…` : query;
  /** search.rich.ts, resultLabel */
  const label = (r: Result) =>
    `${r.cached ? "🚀 " : ""}${r.title.length > 28 ? `${r.title.slice(0, 27)}…` : r.title} — ${r.by} (${r.length})`;

  const pick = (r: Result) => {
    setPicked(r);
    setTimeout(() => setDone(true), WORK_MS);
  };

  if (picked && done) {
    return (
      <TelegramMessage side="in" time={chat.time}>
        <TelegramHeading icon={<BotEmoji name={source} alt={source === "youtube" ? "▶️" : "☁️"} />}>
          {picked.title}
        </TelegramHeading>
        <TelegramAudio title={picked.title} performer={picked.by} duration={picked.length} />
        <TelegramActions>
          <TelegramButton url onClick={() => chat.toast(MADE_UP)}>
            Open on {name}
          </TelegramButton>
        </TelegramActions>
      </TelegramMessage>
    );
  }

  return (
    <TelegramMessage side="in" time={chat.time}>
      <TelegramHeading icon={<BotEmoji name={source} alt={source === "youtube" ? "▶️" : "☁️"} />}>
        {name} results for “{clipped}”
      </TelegramHeading>
      {picked ? (
        <TelegramNotice icon={<BotEmoji name="hourglass" alt="⏳" />}>
          Downloading {label(picked)}…
        </TelegramNotice>
      ) : (
        <>
          <TelegramActions>
            <div className="flex gap-1">
              {(["youtube", "soundcloud"] as const).map((option) => (
                <TelegramButton
                  key={option}
                  variant={option === source ? "primary" : "default"}
                  onClick={() => {
                    setSource(option);
                    setPage(0);
                  }}
                >
                  <BotEmoji name={option} alt={option === "youtube" ? "▶️" : "☁️"} />{" "}
                  {option === "youtube" ? "YouTube" : "SoundCloud"}
                </TelegramButton>
              ))}
            </div>
            {results.slice(page * PER_PAGE, (page + 1) * PER_PAGE).map((r) => (
              <TelegramButton
                key={r.title}
                className="justify-start text-left"
                onClick={() => pick(r)}
              >
                {label(r)}
              </TelegramButton>
            ))}
            {pages > 1 && (
              <div className="flex gap-1">
                {page > 0 && (
                  <TelegramButton onClick={() => setPage(page - 1)}>‹ Previous</TelegramButton>
                )}
                {page < pages - 1 && (
                  <TelegramButton onClick={() => setPage(page + 1)}>Next ›</TelegramButton>
                )}
              </div>
            )}
          </TelegramActions>
          <TelegramFooter>
            {results.length} results{pages > 1 && ` · 📄 Page (${page + 1}/${pages})`}
          </TelegramFooter>
        </>
      )}
    </TelegramMessage>
  );
}
