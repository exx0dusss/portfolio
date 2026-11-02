import { Reveal } from "@/components/motion/reveal";
import { TelegramEmoji } from "@/components/telegram-emoji";
import {
  Spec,
  SpecContent,
  SpecDescription,
  SpecIcon,
  SpecList,
  SpecNote,
  SpecTerm,
  SpecTitle,
} from "@/components/ui/spec-list";

import type { FeatureSpec } from "./projects-detail";

/** How something was built, one full-width block per part: its `fn` tag
 *  (after an icon or a Telegram emoji) on the left, the title, description
 *  and any footnote on the right. FeatureGrid's cards say what a product
 *  does at a glance; these explain how and why, and are read in order.
 *  A string description becomes one paragraph; JSX (paragraphs, a list,
 *  links) is placed as it is. */
export function FeatureSpecs({ features }: { features: FeatureSpec[] }) {
  return (
    <Reveal>
      <SpecList>
        {features.map((feature) => (
          <Spec key={feature.title}>
            <SpecTerm>
              {feature.emoji && <TelegramEmoji name={feature.emoji} className="size-5" />}
              {feature.icon && <SpecIcon>{feature.icon}</SpecIcon>}
              {feature.fn}
            </SpecTerm>
            <SpecContent>
              <SpecTitle>{feature.title}</SpecTitle>
              {feature.description && (
                <SpecDescription>
                  {typeof feature.description === "string" ? (
                    <p>{feature.description}</p>
                  ) : (
                    feature.description
                  )}
                </SpecDescription>
              )}
              {feature.footnote && <SpecNote>{feature.footnote}</SpecNote>}
            </SpecContent>
          </Spec>
        ))}
      </SpecList>
    </Reveal>
  );
}
