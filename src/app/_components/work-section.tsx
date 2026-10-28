import { Stagger } from "@/components/motion/stagger";
import { Section, SectionLabel, SectionNote } from "@/components/page";
import type { Dictionary } from "@/i18n";

import { ProjectCard } from "./project-card";
import { PROJECTS } from "./projects";

/** Work section: every project as a single-column row. */
export function WorkSection({ dict }: { dict: Dictionary["work"] }) {
  return (
    <Section id="work">
      <SectionLabel>
        {dict.label}
        <SectionNote>{dict.sub}</SectionNote>
      </SectionLabel>
      <Stagger className="plist">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} dict={dict} />
        ))}
      </Stagger>
    </Section>
  );
}
