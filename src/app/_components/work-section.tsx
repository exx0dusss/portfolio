import { Reveal } from "@/components/motion/reveal";

import { ProjectCard } from "./project-card";
import { PROJECTS } from "./projects";

/** Work section: the four project cards. */
export function WorkSection() {
  return (
    <section className="card" id="work">
      <Reveal as="div" className="clabel">
        <span className="num">01</span> Work
      </Reveal>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.slotId} project={project} />
      ))}
    </section>
  );
}
