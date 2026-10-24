import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";

import { ProjectCard } from "./project-card";
import { PROJECTS } from "./projects";

/** Work section: every project as a single-column row. */
export function WorkSection() {
  return (
    <section className="card" id="work">
      <Reveal as="h2" className="clabel">
        Work<span>Selected projects</span>
      </Reveal>
      <Stagger className="plist">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Stagger>
    </section>
  );
}
