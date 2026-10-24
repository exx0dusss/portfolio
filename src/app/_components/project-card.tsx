import Link from "next/link";

import { StaggerItem } from "@/components/motion/stagger";
import { ArrowUpRightIcon } from "@/components/ui/icons";

import { STATUS_LABEL, type Project } from "./projects";

/** One project in a Stagger work list: name and status, a one-line description,
 *  then scale and facets. The whole row links to the case study. */
export function ProjectCard({ project }: { project: Project }) {
  const meta = [...project.facets, project.since && `${project.since} →`].filter(Boolean);

  return (
    <StaggerItem>
      <Link className="prow" href={project.href}>
        <div className="prow-head">
          <h3>{project.title}</h3>
          <span className="pstatus" data-status={project.status}>
            {STATUS_LABEL[project.status]}
          </span>
          <ArrowUpRightIcon className="prow-go" aria-hidden />
        </div>
        <p className="prow-desc">{project.description}</p>
        <div className="prow-meta">
          {project.scale && (
            <span className="prow-scale">
              <b>{project.scale.value}</b> {project.scale.label}
            </span>
          )}
          <span className="prow-facets">{meta.join(" · ")}</span>
        </div>
      </Link>
    </StaggerItem>
  );
}
