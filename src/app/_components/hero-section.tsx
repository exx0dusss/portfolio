import { LocaleLink } from "@/components/locale-link";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import {
  ArrowDownIcon,
  BrowserIcon,
  DatabaseIcon,
  FileTextIcon,
  PenNibIcon,
  SparkleIcon,
} from "@/components/ui/icons";
import type { Dictionary } from "@/i18n";

import { StickFigure } from "./stick-figure";

/** Icons for the four scope lines (text comes from the dictionary). */
const SCOPE_ICONS = [PenNibIcon, BrowserIcon, DatabaseIcon, SparkleIcon] as const;

/** Hero: one-line title, what I do as a short list, then the two actions,
 *  with the waving figure on the right. */
export function HeroSection({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <header
      className="grid grid-cols-hero items-center gap-8 pt-22 pb-18 max-tablet:grid-cols-1 max-tablet:pt-14 max-tablet:pb-13"
      id="top"
    >
      <div className="max-w-hero">
        <Reveal as="h1" className="text-hero leading-hero font-semibold tracking-hero">
          {dict.title}
          <em className="text-accent not-italic">.</em>
        </Reveal>
        <Stagger as="ul" className="mt-9">
          {dict.scope.map((text, i) => {
            const Icon = SCOPE_ICONS[i];
            return (
              <StaggerItem
                as="li"
                key={text}
                className="flex items-center gap-3.5 py-3 text-18 leading-compact text-fg-soft max-tablet:items-start max-tablet:text-16.5"
              >
                <Icon className="size-5.5 flex-none text-fg" aria-hidden />
                {text}
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-9 flex flex-wrap gap-2.5" delay={3}>
          {/* a plain fragment link: the browser scrolls natively, without the
              client router (which could append the hash twice) */}
          <ButtonLink href="#work">
            <ArrowDownIcon aria-hidden /> {dict.seeWork}
          </ButtonLink>
          <ButtonLink render={<LocaleLink href="/resume" />} variant="ghost">
            <FileTextIcon aria-hidden /> {dict.resume}
          </ButtonLink>
        </Reveal>
      </div>
      {/* the drawing ends at the figure's feet; pulling it down over the
          hero's bottom padding stands him on the section rule. The lines and
          fists are gray in the dark theme. */}
      <Reveal
        className="-mb-18 w-figure self-end justify-self-end text-figure-ink max-tablet:hidden"
        delay={2}
      >
        <StickFigure className="block h-auto w-full" />
      </Reveal>
    </header>
  );
}
