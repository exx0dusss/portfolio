import { cva, type VariantProps } from "class-variance-authority";

import {
  ArrowUpRightIcon,
  ChecksIcon,
  ListIcon,
  PaperPlaneRightIcon,
  PlayIcon,
  SpeakerSimpleSlashIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

import { TelegramChatMessages } from "./telegram-chat-messages";

/**
 * A Telegram chat drawn on the page, for showing a bot's real messages: the
 * header, the wallpaper, bubbles, the parts of a bot's Rich Message card,
 * its keyboards and the input bar. In Telegram's own palette (the `tg-*`
 * tokens), light or dark with the site. Text is the caller's: these parts
 * only lay it out.
 *
 *   <TelegramChat name="ExdDownloadApp" avatar="/…/favicon.png">
 *     <TelegramChatMessages>
 *       <TelegramMessage side="out" time="18:41">/start</TelegramMessage>
 *       <TelegramMessage side="in" time="18:41">
 *         <TelegramHeading>Welcome, Anna</TelegramHeading>
 *         <p>…</p>
 *       </TelegramMessage>
 *     </TelegramChatMessages>
 *     <TelegramComposer … />
 *   </TelegramChat>
 */
function TelegramChat({
  name,
  avatar,
  status = "bot",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { name: string; avatar: string; status?: string }) {
  return (
    <div
      data-slot="telegram-chat"
      className={cn(
        "relative flex w-full max-w-chat flex-col overflow-hidden rounded-16 border border-line bg-tg-wall shadow-popover",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3 bg-tg-head px-4 py-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element -- 128px local icon shown at 40px */}
        <img src={avatar} alt="" width={40} height={40} className="size-10 rounded-full" />
        <div className="min-w-0">
          <div className="truncate text-15 font-semibold text-fg">{name}</div>
          <div className="text-13 text-tg-muted">{status}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

/** One message: a bubble on the left from the bot, on the right from the
 *  user, with its time (and, for the user's, the read ticks). Keyboards under
 *  a bot's message go after it as TelegramKeyboard. */
function TelegramMessage({
  side,
  time,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { side: "in" | "out"; time: string }) {
  // a message fits its text; one with buttons spans the column, as in Telegram
  return (
    <div
      data-slot="telegram-message"
      data-side={side}
      className={cn(
        "max-w-full rounded-16 px-3 pt-2 pb-1.5 text-14.5 leading-normal break-words text-fg data-[side=in]:mr-10 data-[side=in]:self-start data-[side=in]:rounded-bl-6 data-[side=in]:bg-tg-in data-[side=in]:has-data-[slot=telegram-actions]:self-stretch data-[side=out]:ml-10 data-[side=out]:self-end data-[side=out]:rounded-br-6 data-[side=out]:bg-tg-out [&_b]:font-semibold [&_p+p]:mt-2",
        className,
      )}
      {...props}
    >
      {children}
      <div
        className={cn(
          "mt-0.5 flex items-center justify-end gap-1 text-12 leading-none",
          side === "out" ? "text-tg-out-time" : "text-tg-time",
        )}
      >
        {time}
        {side === "out" && <ChecksIcon aria-label="read" className="size-3.5" />}
      </div>
    </div>
  );
}

/** The card's heading (the bot's `<h5>`), led by its icon. The icon is part
 *  of the heading's text, as the bot writes it, so a long heading wraps under
 *  it rather than beside it. */
function TelegramHeading({
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ReactNode }) {
  return (
    <div
      data-slot="telegram-heading"
      className={cn("mb-1.5 text-15 font-semibold [&_img]:align-text-bottom", className)}
      {...props}
    >
      {icon && <>{icon} </>}
      {children}
    </div>
  );
}

/** A section label inside a card (the bot's `<h6>`), after a rule. */
function TelegramSectionLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-section-label"
      className={cn(
        "mt-2.5 border-t border-tg-muted/25 pt-2 text-13 font-semibold text-tg-muted",
        className,
      )}
      {...props}
    />
  );
}

/** A list in a card, each item led by its own icon instead of a bullet. */
function TelegramList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="telegram-list"
      className={cn(
        "m-0 mt-1 grid list-none gap-0.5 p-0 [&>li]:flex [&>li]:items-center [&>li]:gap-1.5",
        className,
      )}
      {...props}
    />
  );
}

/** Fine print at the end of a text card (Telegram's `<footer>`), after a rule. */
function TelegramFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-footer"
      className={cn("mt-2.5 border-t border-tg-muted/25 pt-2 text-13 text-tg-muted", className)}
      {...props}
    />
  );
}

/** A one-line notice: italic, led by its icon, no heading or buttons. */
function TelegramNotice({
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ReactNode }) {
  return (
    <div
      data-slot="telegram-notice"
      className={cn("flex items-center gap-1.5 italic", className)}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

/** The bar along a quote's left edge, as Telegram draws it: square on its
 *  inner side, the block's own rounding clipping its outer corners. */
function QuoteBar() {
  return (
    <span
      aria-hidden
      data-slot="telegram-quote-bar"
      className="absolute inset-y-0 left-0 w-0.75 bg-tg-link"
    />
  );
}

/** A reply's quote of the message it answers: who, and the start of it. */
function TelegramReply({
  author,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { author: string }) {
  return (
    <div
      data-slot="telegram-reply"
      className={cn(
        "relative mb-1.5 truncate overflow-hidden rounded-6 bg-tg-link/10 py-1 pr-2 pl-3 text-13",
        className,
      )}
      {...props}
    >
      <QuoteBar />
      <div className="font-semibold text-tg-link">{author}</div>
      <div className="truncate text-fg-dim">{children}</div>
    </div>
  );
}

/** A video in the card: a still with a play button, and its length with the
 *  muted mark of a video that plays silently in the chat. It runs edge to edge
 *  across the bubble, as Telegram draws media. The still is a `poster` (a
 *  stock photo standing in for Telegram's thumbnail) or a gradient, square or
 *  `wide` (16:9, a YouTube video): never the
 *  post itself, since the case study shows the bot's message, not anyone's
 *  video. */
function TelegramVideo({
  duration,
  poster,
  wide,
  className,
  ...props
}: React.ComponentProps<"div"> & { duration?: string; poster?: string; wide?: boolean }) {
  return (
    <div
      data-slot="telegram-video"
      data-wide={wide || undefined}
      className={cn(
        "relative -mx-3 mb-2 grid aspect-square place-items-center overflow-hidden bg-linear-150 from-tg-out-time via-tg-link to-tg-wall data-wide:aspect-video",
        className,
      )}
      {...props}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element -- a small local still, cropped by CSS
        <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <span className="relative grid size-12 place-items-center rounded-full bg-scrim text-on-scrim">
        <PlayIcon weight="fill" aria-hidden className="size-5.5" />
      </span>
      {duration && (
        <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-scrim px-2 py-0.5 text-12 text-on-scrim">
          {duration}
          <SpeakerSimpleSlashIcon weight="fill" aria-label="muted" className="size-3.5" />
        </span>
      )}
    </div>
  );
}

/** Inline buttons inside a message's text, on one wrapping line, as the bot
 *  lists the platforms it downloads from: TelegramChip each. */
function TelegramChips({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-chips"
      className={cn("my-1.5 flex flex-wrap gap-1", className)}
      {...props}
    />
  );
}

/** One chip: an icon and a name, a real <button> when it does something. */
function TelegramChip({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="telegram-chip"
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-full bg-tg-link/10 px-2 py-0.5 text-13 font-medium text-tg-link transition-opacity hover:opacity-85",
        className,
      )}
      {...props}
    />
  );
}

/** The grey caption under media (Telegram's figcaption), one line each. */
function TelegramCaption({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-caption"
      className={cn("text-13.5 leading-normal text-tg-muted [&>*+*]:mt-0.5", className)}
      {...props}
    />
  );
}

/** A quoted line (the bot's `<blockquote>`), set off with a bar. */
function TelegramQuote({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-quote"
      className={cn(
        "relative mt-2 overflow-hidden rounded-6 bg-tg-link/10 py-1 pr-2 pl-3 text-14",
        className,
      )}
      {...props}
    >
      <QuoteBar />
      {children}
    </div>
  );
}

/** Buttons inside the message (the card's embedded rows). */
function TelegramActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-actions"
      className={cn("-mx-1 mt-2 grid gap-1", className)}
      {...props}
    />
  );
}

/** The inline keyboard under a message, as rows of buttons. */
function TelegramKeyboard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-keyboard"
      className={cn("mr-10 grid gap-1 self-stretch", className)}
      {...props}
    />
  );
}

function TelegramKeyboardRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="telegram-keyboard-row" className={cn("flex gap-1", className)} {...props} />
  );
}

/** A button's look: under a message (in a TelegramKeyboard) it sits on the
 *  wallpaper, inside one (TelegramActions) it takes the bubble's tint; the
 *  bot's `primary` and `success` styles fill it blue or green. */
const telegramButtonVariants = cva(
  "relative flex min-h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-10 px-3 text-center text-14 font-medium in-data-[slot=telegram-actions]:bg-tg-link/10 in-data-[slot=telegram-actions]:text-tg-link in-data-[slot=telegram-keyboard]:bg-tg-key in-data-[slot=telegram-keyboard]:text-on-scrim",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "in-data-[slot=telegram-actions]:bg-tg-link in-data-[slot=telegram-actions]:text-on-scrim in-data-[slot=telegram-keyboard]:bg-tg-link",
        success:
          "in-data-[slot=telegram-actions]:bg-status-green in-data-[slot=telegram-actions]:text-on-scrim",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/**
 * One button. `url` marks a link button with Telegram's corner arrow; with an
 * `href` it is a real link (opening in a new tab). Otherwise a real <button>
 * when it does something here (`onClick`, from a client part), or a
 * presentational <span>.
 */
function TelegramButton({
  url,
  href,
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof telegramButtonVariants> & { url?: boolean; href?: string }) {
  const look = cn(telegramButtonVariants({ variant }), className);
  const content = (
    <>
      {/* one line, cut with an ellipsis, as Telegram draws a long label */}
      <span className="truncate">{children}</span>
      {(url || href) && (
        <ArrowUpRightIcon aria-hidden className="absolute top-1.5 right-1.5 size-2.5" />
      )}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="telegram-button"
        className={cn(look, "transition-opacity hover:opacity-85")}
      >
        {content}
      </a>
    );
  }
  if (!props.onClick) {
    return (
      <span data-slot="telegram-button" className={look}>
        {content}
      </span>
    );
  }
  return (
    <button
      type="button"
      data-slot="telegram-button"
      className={cn(look, "cursor-pointer transition-opacity hover:opacity-85")}
      {...props}
    >
      {content}
    </button>
  );
}

/** A track in a card: Telegram's audio player, drawn (play button, title,
 *  performer and length). */
function TelegramAudio({
  title,
  performer,
  duration,
  className,
  ...props
}: React.ComponentProps<"div"> & { title: string; performer: string; duration: string }) {
  return (
    <div
      data-slot="telegram-audio"
      className={cn("mb-2 flex items-center gap-3", className)}
      {...props}
    >
      <span className="grid size-11 flex-none place-items-center rounded-full bg-tg-link text-on-scrim">
        <PlayIcon weight="fill" aria-hidden className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-14.5 font-semibold">{title}</span>
        <span className="block truncate text-13 text-tg-muted">
          {performer} · {duration}
        </span>
      </span>
    </div>
  );
}

/** A photo in a card, square or (an avatar) round: a tinted still, not
 *  anyone's real picture. */
function TelegramPhoto({
  round,
  className,
  ...props
}: React.ComponentProps<"div"> & { round?: boolean }) {
  return (
    <div
      data-slot="telegram-photo"
      className={cn(
        "-mx-1.5 mb-2 grid aspect-square place-items-center rounded-10 bg-tg-wall",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "bg-linear-150 from-tg-out-time via-tg-link to-tg-wall",
          round ? "size-3/5 rounded-full" : "size-full rounded-10",
        )}
      />
    </div>
  );
}

/** The short answer Telegram shows over the chat after a button tap
 *  ("Photo format changed"). The caller shows and hides it. */
function TelegramToast({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-toast"
      role="status"
      className={cn(
        "pointer-events-none absolute inset-x-6 top-18 z-20 rounded-14 bg-scrim px-4 py-2.5 text-center text-14 text-on-scrim",
        className,
      )}
      {...props}
    />
  );
}

/** The input bar: the menu button, the field and the send button, with the
 *  `menu` (a TelegramMenu) floating above it when open. The caller owns the
 *  value and what sending does. */
function TelegramComposer({
  value,
  placeholder = "Message",
  menu,
  menuOpen,
  menuId,
  activeId,
  onMenu,
  onValueChange,
  inputRef,
  onSend,
  className,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  value: string;
  placeholder?: string;
  menu?: React.ReactNode;
  menuOpen: boolean;
  /** the menu's id, and its highlighted item's: while typing, the input
   *  keeps focus and points at the item (a combobox) */
  menuId?: string;
  activeId?: string;
  onMenu: () => void;
  onValueChange: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  onSend: () => void;
}) {
  return (
    <div className="relative">
      {menu}
      <form
        data-slot="telegram-composer"
        className={cn("flex items-center gap-2 bg-tg-head px-2 py-2", className)}
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
        {...props}
      >
        <button
          type="button"
          onClick={onMenu}
          aria-expanded={menuOpen}
          aria-label="Commands and examples"
          className="flex h-8 flex-none cursor-pointer items-center gap-1 rounded-14 bg-tg-link px-2.5 text-13 font-medium text-on-scrim"
        >
          <ListIcon aria-hidden className="size-4" /> Menu
        </button>
        <input
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          ref={inputRef}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? menuId : undefined}
          aria-activedescendant={menuOpen ? activeId : undefined}
          placeholder={placeholder}
          aria-label="Message the bot"
          className="min-w-0 flex-1 bg-transparent text-15 text-fg outline-none placeholder:text-tg-muted"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!value.trim()}
          className="grid size-8 flex-none cursor-pointer place-items-center rounded-full text-tg-link disabled:cursor-default disabled:text-tg-muted"
        >
          <PaperPlaneRightIcon weight="fill" aria-hidden className="size-5" />
        </button>
      </form>
    </div>
  );
}

/** The menu over the chat, just above the input bar (TelegramComposer's
 *  `menu`): commands with their descriptions, and other suggestions, in
 *  titled groups. A popover: it floats over the messages, not between them.
 *  It takes focus when opened from the Menu button (point it at the
 *  highlighted item with aria-activedescendant). */
function TelegramMenu({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-menu"
      role="listbox"
      tabIndex={-1}
      className={cn(
        "absolute inset-x-2 bottom-full z-10 mb-2 max-h-72 overflow-y-auto overscroll-contain rounded-14 border border-line bg-tg-head py-1 shadow-popover outline-none",
        className,
      )}
      {...props}
    />
  );
}

function TelegramMenuLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="telegram-menu-label"
      role="presentation"
      className={cn("px-4 pt-2 pb-1 text-12 font-semibold text-tg-muted", className)}
      {...props}
    />
  );
}

/** One suggestion: the command (or message) and what it does. `active` is
 *  the highlighted one, moved by the arrows (or the pointer) from the input. */
function TelegramMenuItem({
  label,
  description,
  active = false,
  className,
  ...props
}: React.ComponentProps<"button"> & { label: string; description: string; active?: boolean }) {
  return (
    <button
      type="button"
      data-slot="telegram-menu-item"
      role="option"
      aria-selected={active}
      tabIndex={-1}
      className={cn(
        "flex w-full cursor-pointer items-baseline gap-3 px-4 py-1.5 text-left outline-none aria-selected:bg-tg-link/10",
        className,
      )}
      {...props}
    >
      <span className="flex-none text-14.5 font-medium text-fg">{label}</span>
      <span className="truncate text-13.5 text-tg-muted">{description}</span>
    </button>
  );
}

export {
  TelegramActions,
  TelegramAudio,
  TelegramButton,
  telegramButtonVariants,
  TelegramCaption,
  TelegramChip,
  TelegramChips,
  TelegramChat,
  TelegramChatMessages,
  TelegramComposer,
  TelegramFooter,
  TelegramHeading,
  TelegramKeyboard,
  TelegramKeyboardRow,
  TelegramList,
  TelegramMenu,
  TelegramMenuItem,
  TelegramMenuLabel,
  TelegramMessage,
  TelegramNotice,
  TelegramPhoto,
  TelegramQuote,
  TelegramReply,
  TelegramSectionLabel,
  TelegramToast,
  TelegramVideo,
};
