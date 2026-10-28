import { Section, SectionLabel, SectionNote } from "@/components/page";
import type { Dictionary } from "@/i18n";

import { ProjectList } from "./project-list";

/** Work section: every project as a single-column row. */
export function WorkSection({ dict }: { dict: Dictionary["work"] }) {
  return (
    <Section id="work">
      <SectionLabel>
        {dict.label}
        <SectionNote>{dict.sub}</SectionNote>
      </SectionLabel>
      <ProjectList dict={dict} />
    </Section>
  );
}
