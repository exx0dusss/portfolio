import Link from "next/link";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Section, SectionLabel, SectionNote } from "@/components/page";
import { type Dictionary, type Locale, localePath } from "@/i18n";

import { localizeTimeline, ROLES } from "../[lang]/experience/_components/timeline";

/** Experience section: work roles as a compact role / company / years list. */
export function ExperienceSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["experience"];
}) {
  const rows = localizeTimeline(ROLES, dict.roles, dict.now);

  return (
    <Section id="experience">
      <SectionLabel>
        {dict.label}
        <SectionNote>
          {dict.subBefore} <Link href={localePath(lang, "/experience")}>{dict.subLink}</Link>
        </SectionNote>
      </SectionLabel>
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
    </Section>
  );
}
