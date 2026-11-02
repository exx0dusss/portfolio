import emoji from "@/lib/telegram-emoji.json";
import { cn } from "@/lib/utils/cn";

export type TelegramEmojiName = keyof typeof emoji;

/** Whether `pnpm telegram:emoji` has rendered this emoji yet: a name added to
 *  the script but not yet rendered shows no image instead of a broken one. */
function isTelegramEmojiName(name: string): name is TelegramEmojiName {
  return name in emoji;
}

/**
 * A Telegram custom emoji as the bot shows it, animated: the looping WebP
 * `pnpm telegram:emoji` renders from the .tgs, or its first frame for
 * visitors who prefer reduced motion. Decorative: the text beside it names
 * what it stands for.
 *
 *   <TelegramEmoji name="tiktok" className="size-5" />
 */
function TelegramEmoji({
  name,
  className,
  ...props
}: { name: TelegramEmojiName } & Omit<React.ComponentProps<"img">, "src" | "alt">) {
  return (
    <picture data-slot="telegram-emoji" className="contents">
      <source media="(prefers-reduced-motion: reduce)" srcSet={`/telegram-emoji/${name}.png`} />
      <img
        src={`/telegram-emoji/${name}.webp`}
        alt=""
        {...emoji[name]}
        loading="lazy"
        decoding="async"
        className={cn("inline-block flex-none", className)}
        {...props}
      />
    </picture>
  );
}

export { isTelegramEmojiName, TelegramEmoji };
