import Link from "next/link";

import { StaggerItem } from "@/components/motion/stagger";
import { ArrowUpRightIcon, ImagesIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n";

import type { Project } from "./projects";

/** One project in a Stagger work list: the site's favicon, name and status, a
 *  one-line description, then scale, screenshot count and facets. The whole
 *  row links to the case study. */
export function ProjectCard({ project, dict }: { project: Project; dict: Dictionary["work"] }) {
  const copy = dict.projects[project.slug];
  const meta = [...copy.facets, project.since && `${project.since} →`].filter(Boolean);

  return (
    <StaggerItem>
      <Link className="prow" href={project.href}>
        <div className="prow-head">
          {project.favicon && (
            // eslint-disable-next-line @next/next/no-img-element -- 128px local icon shown at 22px
            <img className="prow-icon" src={project.favicon} alt="" width={22} height={22} />
          )}
          <h3>{project.title}</h3>
          <span className="pstatus" data-status={project.status}>
            {dict.status[project.status]}
          </span>
          <ArrowUpRightIcon className="prow-go" aria-hidden />
        </div>
        <p className="prow-desc">{copy.description}</p>
        <div className="prow-meta">
          {project.scale && (
            <span className="prow-scale">
              <b>{project.scale}</b> {copy.scaleLabel}
            </span>
          )}
          {project.photos && (
            <span className="prow-photos">
              <ImagesIcon aria-hidden />
              {project.photos}{" "}
              {project.photos === 1 ? dict.photos.one : dict.photos.other}
            </span>
          )}
          <span className="prow-facets">{meta.join(" · ")}</span>
        </div>
      </Link>
    </StaggerItem>
  );
}
