import { Reveal } from "@/components/motion/reveal";

import type { TimelineEntry } from "./timeline";

/** One row of a `.tl` timeline — year/location on the left, role details right. */
export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <Reveal className="tl">
      <div className="tl-when">
        <span className="yr">{entry.year}</span>
        <div className="tl-where">{entry.where}</div>
      </div>
      <div>
        <div className="tl-role">{entry.role}</div>
        <div className="tl-co">{entry.company}</div>
        {entry.description ? <p className="tl-desc">{entry.description}</p> : null}
        {entry.tags ? (
          <div className="proj-tags">
            {entry.tags.map((tag) => (
              <span key={tag} className="ptag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
