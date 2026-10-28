import { Section, SectionLabel } from "@/components/page";
import type { Dictionary } from "@/i18n";

import { EDUCATION, localizeTimeline } from "../[lang]/experience/_components/timeline";
import { RoleList } from "./role-list";

interface EducationSectionProps {
  label: string;
  dict: Dictionary["experience"];
}

/** Education section: degrees in the same compact list style as Experience. */
export function EducationSection({ label, dict }: EducationSectionProps) {
  const rows = localizeTimeline(EDUCATION, dict.education, dict.now);

  return (
    <Section id="education">
      <SectionLabel>{label}</SectionLabel>
      <RoleList rows={rows} />
    </Section>
  );
}
