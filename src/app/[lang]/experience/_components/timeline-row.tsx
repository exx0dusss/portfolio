import { LocaleLink } from "@/components/locale-link";

import { Reveal } from "@/components/motion/reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

import type { TimelineEntry } from "./timeline";

/** One row of a timeline — year/location on the left, role details right,
 *  at every width (the old CSS meant to stack them from 860px down, but that
 *  rule sat above the base one and never applied). With `href`, the company
 *  name links to its case study. The first and last rows sit tight against
 *  the section. */
export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <Reveal className="grid grid-cols-timeline gap-7.5 border-t border-line-soft py-6.5 first-of-type:border-t-0 first-of-type:pt-1 last-of-type:pb-1">
      <div className="text-13 text-fg-faint">
        <span className="font-mono text-fg-dim">{entry.year}</span>
        <div className="mt-1.25 text-12.5 text-fg-faint">{entry.where}</div>
      </div>
      <div>
        <div className="text-18 font-semibold tracking-role">{entry.role}</div>
        <div className="mt-0.75 text-14 text-fg-dim">
          {entry.href ? (
            // a company with a case study: underlined like the site's other inline links
            <LocaleLink
              className="group/co inline-flex items-center gap-1.25 font-medium text-fg underline decoration-line-strong underline-offset-3 transition-colors duration-150 ease-pop hover:decoration-fg focus-visible:decoration-fg"
              href={entry.href}
            >
              {entry.company}{" "}
              <ArrowRightIcon
                aria-hidden
                className="size-3.25 text-fg-faint transition-transform duration-200 ease-pop group-hover/co:translate-x-0.5"
              />
            </LocaleLink>
          ) : (
            entry.company
          )}
        </div>
        {entry.description ? (
          <p className="mt-2.75 max-w-entry text-14.5 leading-entry text-fg-dim">
            {entry.description}
          </p>
        ) : null}
        {entry.tags ? (
          <div className="mt-3 font-mono text-12 text-fg-faint">{entry.tags.join(" · ")}</div>
        ) : null}
      </div>
    </Reveal>
  );
}
