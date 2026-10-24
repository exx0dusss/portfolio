import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { Dictionary } from "@/i18n";

import { EDUCATION, localizeTimeline } from "../[lang]/experience/_components/timeline";

interface EducationSectionProps {
  label: string;
  dict: Dictionary["experience"];
}

/** Education section: degrees in the same compact list style as Experience. */
export function EducationSection({ label, dict }: EducationSectionProps) {
  const rows = localizeTimeline(EDUCATION, dict.education, dict.now);

  return (
    <section className="card" id="education">
      <Reveal as="h2" className="clabel">
        {label}
      </Reveal>
      <Stagger className="xp">
        {rows.map((row) => (
          <StaggerItem className="xp-row" key={`${row.role}-${row.year}`}>
            <div>
              <b>{row.role}</b> <span>· {row.company}</span>
            </div>
            <span className="xp-year">{row.year}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
