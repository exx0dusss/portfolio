import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

import type { TimelineEntry } from "./timeline";

/** One row of a `.tl` timeline — year/location on the left, role details
 *  right. With `href`, the company name links to its case study. */
export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <Reveal className="tl">
      <div className="tl-when">
        <span className="yr">{entry.year}</span>
        <div className="tl-where">{entry.where}</div>
      </div>
      <div>
        <div className="tl-role">{entry.role}</div>
        <div className="tl-co">
          {entry.href ? (
            <Link className="tl-co-link" href={entry.href}>
              {entry.company} <ArrowRightIcon aria-hidden />
            </Link>
          ) : (
            entry.company
          )}
        </div>
        {entry.description ? <p className="tl-desc">{entry.description}</p> : null}
        {entry.tags ? <div className="tl-tags">{entry.tags.join(" · ")}</div> : null}
      </div>
    </Reveal>
  );
}
