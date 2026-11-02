import { Reveal } from "@/components/motion/reveal";
import { isTelegramEmojiName, TelegramEmoji } from "@/components/telegram-emoji";

import type { FeatureCard } from "./projects-detail";

/** 2-column feature grid: each card has a top line with its `fn` tag (after
 *  a Telegram emoji or an icon, if it has one), then a title and a blurb, and
 *  any numbered steps, a footnote or chips below it. */
export function FeatureGrid({ features }: { features: FeatureCard[] }) {
  return (
    <Reveal className="grid grid-cols-2 gap-3.5 max-phone:grid-cols-1">
      {features.map((feature) => (
        <div className="rounded-card border border-line px-5 py-4.5" key={feature.title}>
          <div className="flex items-center gap-2.25">
            {feature.emoji && <TelegramEmoji name={feature.emoji} className="size-6" />}
            {feature.icon && (
              <span
                aria-hidden
                className="grid size-6 flex-none place-items-center text-fg-dim [&_svg]:size-5"
              >
                {feature.icon}
              </span>
            )}
            <span className="font-mono text-12 text-accent-ink">{feature.fn}</span>
          </div>
          <div className="mt-2.5 text-14.5 font-medium text-fg">{feature.title}</div>
          {feature.description && (
            <div className="mt-2 text-13 leading-copy text-fg-dim">{feature.description}</div>
          )}
          {feature.steps && (
            <ol className="mt-3 flex flex-col gap-3">
              {feature.steps.map((step, index) => (
                <li
                  key={step}
                  data-slot="feature-step"
                  className="flex flex-col items-start gap-1.5"
                >
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-11 font-medium text-accent-ink">
                    Step {index + 1}
                  </span>
                  <span className="text-13 leading-copy text-fg-dim">{step}</span>
                </li>
              ))}
            </ol>
          )}
          {feature.footnote && (
            <div
              data-slot="feature-footnote"
              className="mt-3.5 border-t border-line pt-2.5 text-12 leading-copy text-fg-faint"
            >
              {feature.footnote}
            </div>
          )}
          {feature.chips && (
            <ul className="mt-3.5 flex flex-wrap gap-1.5">
              {feature.chips.map((chip) => (
                <li
                  key={chip.label}
                  data-slot="feature-chip"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-12 text-fg"
                >
                  {chip.emoji && isTelegramEmojiName(chip.emoji) && (
                    <TelegramEmoji name={chip.emoji} className="size-4" />
                  )}
                  {chip.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </Reveal>
  );
}
