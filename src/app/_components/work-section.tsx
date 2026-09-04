import { Reveal } from "@/components/motion/reveal";

import { ProjectCard } from "./project-card";
import type { Project } from "./projects";

/** Work section: the project cards. */
export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section className="card" id="work">
      <Reveal as="div" className="clabel">
        <span className="num">01</span> Work
      </Reveal>
      {projects.map((project) => (
        <ProjectCard key={project.slotId} project={project} />
      ))}
    </section>
  );
}
