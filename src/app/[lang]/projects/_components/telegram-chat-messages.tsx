"use client";

import {
  StickToBottom,
  type StickToBottomContext,
  useStickToBottomContext,
} from "use-stick-to-bottom";

import { ArrowDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/** Snappier than the library's default spring (stiffness 0.05, mass 1.25,
 *  over a second for a long reply): settles in about a quarter second, as
 *  Telegram's own scroll does. Used by every smooth scroll here: following a
 *  growing message and scrollToBottom(). */
const SPRING = { damping: 0.7, stiffness: 0.07, mass: 1 };

/**
 * The messages, in a phone-height window that opens at the latest one and
 * follows new ones, as a chat does. Built like shadcn's AI Elements
 * Conversation, on use-stick-to-bottom: it stays at the bottom while the
 * reader is there (springing along as a message grows), stays put once they
 * scroll up, and offers a button back down. `contextRef` gives the caller
 * `scrollToBottom()`, for when the user sends a message.
 */
function TelegramChatMessages({
  className,
  children,
  contextRef,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  children: React.ReactNode;
  contextRef?: React.Ref<StickToBottomContext>;
}) {
  return (
    <StickToBottom
      data-slot="telegram-chat-messages"
      role="log"
      initial="instant"
      resize="smooth"
      {...SPRING}
      contextRef={contextRef}
      className={cn("relative h-160 max-phone:h-140", className)}
      {...props}
    >
      <StickToBottom.Content
        scrollClassName="overflow-y-auto overscroll-contain outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        className="flex flex-col gap-2 px-3 py-4"
      >
        {children}
      </StickToBottom.Content>
      <TelegramScrollButton />
    </StickToBottom>
  );
}

/** Telegram's round arrow back to the latest message, shown once the reader
 *  has scrolled up. */
function TelegramScrollButton() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();
  if (isAtBottom) return null;
  return (
    <button
      type="button"
      data-slot="telegram-scroll-button"
      aria-label="Scroll to the latest message"
      onClick={() => scrollToBottom()}
      className="absolute right-3 bottom-3 grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-tg-head text-tg-muted shadow-popover"
    >
      <ArrowDownIcon aria-hidden className="size-5" />
    </button>
  );
}

export { TelegramChatMessages };
