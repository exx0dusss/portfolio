import { Stagger } from "@/components/motion/stagger";
import type { Dictionary } from "@/i18n";

import { ProjectCard } from "./project-card";
import { PROJECTS } from "./projects";

/** Every project as a row, divided by hairlines; the rows spring in one
 *  after another. Shared by the home page's Work section and /projects.
 *
 *    <ProjectList dict={dict.work} />
 */
export function ProjectList({ dict }: { dict: Dictionary["work"] }) {
  return (
    <Stagger className="*:border-b *:border-line">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.slug} project={project} dict={dict} />
      ))}
    </Stagger>
  );
}
