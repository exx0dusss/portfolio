import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import type { Dictionary } from "@/i18n";

import { ProjectCard } from "./project-card";
import { PROJECTS } from "./projects";

/** Work section: every project as a single-column row. */
export function WorkSection({ dict }: { dict: Dictionary["work"] }) {
  return (
    <section className="card" id="work">
      <Reveal as="h2" className="clabel">
        {dict.label}
        <span>{dict.sub}</span>
      </Reveal>
      <Stagger className="plist">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} dict={dict} />
        ))}
      </Stagger>
    </section>
  );
}
