"use client";

import { useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { StickToBottomContext } from "use-stick-to-bottom";

import { DemoDialog } from "@/components/demo-dialog";
import { DialogContent } from "@/components/ui/dialog";
import { ChatsCircleIcon } from "@/components/ui/icons";

import { openGallery } from "../../_components/gallery";
import {
  TelegramChat,
  TelegramChatMessages,
  TelegramComposer,
  TelegramMenu,
  TelegramMenuItem,
  TelegramMenuLabel,
  TelegramMessage,
  TelegramToast,
} from "../../_components/telegram-chat";

import {
  type ChatApi,
  DownloadMessage,
  FeedbackMessage,
  HelpMessage,
  type MessageApi,
  platformOf,
  PremiumMessage,
  ProfileMessage,
  SearchMessage,
  SettingsMessage,
  StartMessage,
  SupportMessage,
  TIKTOK_LINK,
  UnsupportedMessage,
} from "./bot-messages";

/** A private chat's "/" menu, in the bot's order (commands/command-group.ts)
 *  with its English descriptions. */
const COMMANDS = [
  ["/start", "▶️ Start the bot"],
  ["/settings", "⚙️ Bot settings"],
  ["/profile", "👤 Manage profile"],
  ["/premium", "⭐️ Manage Premium"],
  ["/support", "🛟 Get help with a problem"],
  ["/feedback", "💬 Send feedback"],
  ["/help", "❓ How to use the bot"],
] as const;

/** Messages a visitor can send without a link of their own. */
const EXAMPLES = [
  ["A TikTok link", TIKTOK_LINK],
  ["An Instagram link", "https://www.instagram.com/p/C8xYz12AbCd/"],
  ["A link from another site", "https://example.com/watch/42"],
  ["Some words", "lofi cooking music"],
] as const;

type Render = (self: MessageApi) => React.ReactNode;
/** The user's messages are text; the bot's render themselves. */
type Content = { text: string } | { render: Render };
type Message = { id: number; time: string } & Content;

const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

/**
 * The bot in a Telegram chat, answering as it does: each command with its
 * own message, a TikTok link with the download, any other link with "not
 * supported", and words with a search. Scripted: nothing reaches the real
 * bot. The messages (bot-messages.tsx) keep their own state; this keeps the
 * list, the input and the menu.
 */
function BotChat({
  inputRef,
  onOpenApp,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onOpenApp: () => void;
}) {
  const scroller = useRef<StickToBottomContext>(null);
  const composer = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  /** the highlighted menu item, or -1 for none */
  const [active, setActive] = useState(-1);
  const menuId = useId();
  const [toast, setToast] = useState<{ text: string; long: boolean } | null>(null);
  /** a message waiting for the user's next text (a feedback description) */
  const [captured, setCaptured] = useState<((text: string) => void) | null>(null);
  /** /settings' Rich downloads (beta), off as for a new user */
  // rich, as the case study shows it; the real bot's default is classic
  const [richDownloads, setRichDownloads] = useState(true);
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 0, time: "18:41", text: "/start" },
    { id: 1, time: "18:41", render: (self) => <StartMessage chat={self} /> },
  ]);

  // a toast fades on its own; an alert stays longer
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), toast.long ? 4500 : 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  // the menu closes on a click anywhere outside the input bar
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: PointerEvent) => {
      if (!composer.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);

  /** appends a message with the next id: one past the highest in the list */
  const append = (message: { time: string } & Content) =>
    setMessages((list) => [
      ...list,
      { ...message, id: Math.max(-1, ...list.map((m) => m.id)) + 1 },
    ]);

  const chat: ChatApi = {
    botSay: (render) => append({ time: now(), render }),
    toast: (text, long = false) => setToast({ text, long }),
    openApp: onOpenApp,
    capture: (handler) => setCaptured(() => handler),
    richDownloads,
    setRichDownloads,
  };
  const remove = (id: number) => setMessages((list) => list.filter((m) => m.id !== id));

  /** The bot's answer to what the user sent. */
  function reply(text: string) {
    const replies: Record<string, Render> = {
      "/start": (self) => <StartMessage chat={self} />,
      "/help": (self) => <HelpMessage chat={self} />,
      "/settings": (self) => <SettingsMessage chat={self} />,
      "/profile": (self) => <ProfileMessage chat={self} />,
      "/premium": (self) => <PremiumMessage chat={self} />,
      "/support": (self) => <SupportMessage chat={self} />,
      "/feedback": (self) => <FeedbackMessage chat={self} />,
    };
    const command = text.split(/\s/)[0].toLowerCase();
    // a command leaves an open flow; anything else is that flow's answer
    // until it ends (it stops capturing)
    if (replies[command]) {
      setCaptured(null);
      return chat.botSay(replies[command]);
    }
    if (captured) return captured(text);
    // other commands get no answer, as in the bot
    if (text.startsWith("/")) return;
    if (/^https?:\/\//i.test(text)) {
      return chat.botSay(
        platformOf(text)
          ? (self) => <DownloadMessage chat={self} link={text} />
          : (self) => <UnsupportedMessage chat={self} />,
      );
    }
    chat.botSay((self) => <SearchMessage chat={self} query={text} />);
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    append({ time: now(), text: trimmed });
    // what the user sends brings the chat back down, even if they'd scrolled up
    scroller.current?.scrollToBottom();
    setDraft("");
    setMenuOpen(false);
    setActive(-1);
    // a short beat, as a bot takes to answer
    setTimeout(() => reply(trimmed), 350);
  }

  // typing "/" opens the commands, narrowed to what's typed
  const typing = draft.startsWith("/");
  const commands = COMMANDS.filter(([command]) => command.startsWith(draft.toLowerCase()));
  const showMenu = menuOpen || (typing && commands.length > 0);
  // what the menu lists, in order: the arrows walk this
  const items = [
    ...(typing ? commands : COMMANDS).map(([command, description]) => ({
      label: command,
      description,
      text: command,
    })),
    ...(typing ? [] : EXAMPLES.map(([label, text]) => ({ label, description: text, text }))),
  ];
  const itemId = (index: number) => `${menuId}-${index}`;
  const commandCount = typing ? commands.length : COMMANDS.length;

  // the highlighted item stays in view as the arrows move it; the first one
  // brings back the top, its group's label included
  useEffect(() => {
    if (active < 0) return;
    const item = document.getElementById(`${menuId}-${active}`);
    if (active === 0) item?.parentElement?.scrollTo({ top: 0 });
    else item?.scrollIntoView({ block: "nearest" });
  }, [active, menuId]);

  function onDraftChange(value: string) {
    setDraft(value);
    // a typed command highlights the first match, so Enter sends it
    setActive(value.startsWith("/") ? 0 : -1);
  }

  /** Opening from the Menu button highlights the first item and moves focus
   *  into the menu, so the arrows work straight away. */
  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
      setActive(-1);
      return;
    }
    // render the menu now, so it can take focus
    flushSync(() => {
      setMenuOpen(true);
      setActive(0);
    });
    menu.current?.focus();
  }

  /** Keys anywhere in the input bar (the Menu button, the input, the menu):
   *  arrows move the highlight, Enter sends it, Escape closes the menu. */
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && showMenu) {
      setMenuOpen(false);
      setActive(-1);
      inputRef.current?.focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!showMenu) setMenuOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      // from none, down starts at the top and up at the bottom; both wrap
      setActive((index) =>
        index < 0
          ? step > 0
            ? 0
            : items.length - 1
          : (index + step + items.length) % items.length,
      );
    } else if (event.key === "Enter" && showMenu && items[active]) {
      event.preventDefault();
      send(items[active].text);
    }
  }

  const renderItem = (item: (typeof items)[number], index: number) => (
    <TelegramMenuItem
      key={item.label}
      id={itemId(index)}
      label={item.label}
      description={item.description}
      active={index === active}
      onPointerMove={() => setActive(index)}
      onClick={() => send(item.text)}
    />
  );

  return (
    <TelegramChat name="ExdDownloadApp" avatar="/projects/exd-download-app/favicon.png">
      <TelegramChatMessages
        contextRef={scroller}
        aria-label="Chat with ExdDownloadApp"
        aria-live="polite"
      >
        {messages.map((message) =>
          "text" in message ? (
            <TelegramMessage
              key={message.id}
              side="out"
              time={message.time}
              className={/^https?:\/\//.test(message.text) ? "text-tg-link" : undefined}
            >
              {message.text}
            </TelegramMessage>
          ) : (
            <div key={message.id} className="contents">
              {message.render({ ...chat, time: message.time, remove: () => remove(message.id) })}
            </div>
          ),
        )}
      </TelegramChatMessages>
      {toast && <TelegramToast>{toast.text}</TelegramToast>}
      <div ref={composer} onKeyDown={onKeyDown}>
        <TelegramComposer
          value={draft}
          menuOpen={showMenu}
          menuId={menuId}
          activeId={active >= 0 ? itemId(active) : undefined}
          onMenu={toggleMenu}
          onValueChange={onDraftChange}
          inputRef={inputRef}
          onSend={() => send(draft)}
          menu={
            showMenu && (
              <TelegramMenu
                ref={menu}
                id={menuId}
                aria-label="Commands and examples"
                aria-activedescendant={active >= 0 ? itemId(active) : undefined}
              >
                <TelegramMenuLabel>Commands</TelegramMenuLabel>
                {items.slice(0, commandCount).map(renderItem)}
                {!typing && (
                  <>
                    <TelegramMenuLabel>Try sending</TelegramMenuLabel>
                    {items
                      .slice(commandCount)
                      .map((item, index) => renderItem(item, commandCount + index))}
                  </>
                )}
              </TelegramMenu>
            )
          }
        />
      </div>
    </TelegramChat>
  );
}

/** The chat in a dialog, behind a button: the page stays short, and the
 *  chat opens fresh each time, ready to type in. "Open app" closes it first,
 *  so the screenshots open on the page rather than under a modal. */
export function BotDemo() {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <DemoDialog
      icon={<ChatsCircleIcon aria-hidden />}
      label="Try the demo"
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent size="chat" aria-label="Chat with ExdDownloadApp" initialFocus={input}>
        <BotChat
          inputRef={input}
          onOpenApp={() => {
            setOpen(false);
            openGallery(0);
          }}
        />
      </DialogContent>
    </DemoDialog>
  );
}
