import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

import { EDUCATION, ROLES } from "../experience/_components/timeline";

/** Experience section: a compact role / company / years list. */
export function ExperienceSection() {
  const rows = [...ROLES, EDUCATION[0]];

  return (
    <section className="card" id="experience">
      <Reveal as="h2" className="clabel">
        Experience
        <span>
          Full history on the <Link href="/experience">Experience page</Link>
        </span>
      </Reveal>
      <Stagger className="xp">
        {rows.map((row) => (
          <StaggerItem className="xp-row" key={`${row.company}-${row.year}`}>
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
