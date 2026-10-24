import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { type Dictionary, type Locale, localePath } from "@/i18n";

import { localizeTimeline, ROLES } from "../[lang]/experience/_components/timeline";

/** Experience section: work roles as a compact role / company / years list. */
export function ExperienceSection({ lang, dict }: { lang: Locale; dict: Dictionary["experience"] }) {
  const rows = localizeTimeline(ROLES, dict.roles, dict.now);

  return (
    <section className="card" id="experience">
      <Reveal as="h2" className="clabel">
        {dict.label}
        <span>
          {dict.subBefore} <Link href={localePath(lang, "/experience")}>{dict.subLink}</Link>
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
