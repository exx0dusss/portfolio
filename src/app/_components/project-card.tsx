import Link from "next/link";
import { ViewTransition } from "react";

import { StaggerItem } from "@/components/motion/stagger";
import { ArrowUpRightIcon, ImagesIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n";
import { projectIconTransition, projectTitleTransition } from "@/lib/view-transition";

import type { Project } from "./projects";

/** One project in a Stagger work list: the site's favicon, name and status, a
 *  one-line description, then scale, screenshot count and facets. The whole
 *  row links to the case study. */
export function ProjectCard({ project, dict }: { project: Project; dict: Dictionary["work"] }) {
  const copy = dict.projects[project.slug];
  const meta = [...copy.facets, project.since && `${project.since} →`].filter(Boolean);

  return (
    <StaggerItem>
      {/* hover tints an inset panel: the row reaches past the list's edges by
          its own padding */}
      <Link
        className="group my-1.5 -mx-5 block rounded-card px-5 py-5.5 transition-row hover:bg-card-2 active:scale-99 max-tablet:-mx-3 max-tablet:px-3 max-tablet:py-5"
        href={project.href}
      >
        <div className="flex items-center gap-3.5 max-tablet:flex-wrap max-tablet:gap-x-3 max-tablet:gap-y-1.5">
          {project.favicon && (
            // the project site's own icon, framed like a browser tab favicon;
            // it flies into the case-study heading beside the title
            <ViewTransition name={projectIconTransition(project.title)} share="morph">
              {/* eslint-disable-next-line @next/next/no-img-element -- 128px local icon shown at 22px */}
              <img
                className="size-5.5 flex-none rounded-6 border border-line bg-icon-tile object-cover"
                src={project.favicon}
                alt=""
                width={22}
                height={22}
              />
            </ViewTransition>
          )}
          <ViewTransition name={projectTitleTransition(project.title)} share="morph">
            <h3 className="text-19 font-semibold tracking-title transition-colors duration-150 ease-standard group-hover:text-accent-ink">
              {project.title}
            </h3>
          </ViewTransition>
          {/* a status dot before the label; it takes its own line on tablets */}
          <span
            className="ml-auto inline-flex items-center gap-1.75 text-13 whitespace-nowrap text-fg-dim before:size-1.75 before:rounded-full before:bg-fg-faint data-[status=development]:before:bg-status-dev data-[status=live]:before:bg-status-live max-tablet:order-3 max-tablet:ml-0 max-tablet:basis-full"
            data-status={project.status}
          >
            {dict.status[project.status]}
          </span>
          <ArrowUpRightIcon
            className="size-4.5 flex-none text-fg-faint transition-row-arrow group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-115 group-hover:text-accent"
            aria-hidden
          />
        </div>
        <p className="mt-2 max-w-desc text-15.5 leading-desc text-fg-soft">{copy.description}</p>
        <div className="mt-3.5 flex flex-wrap items-baseline gap-x-4.5 gap-y-1.5">
          {project.scale && (
            <span className="text-13.5 text-fg-dim">
              <b className="text-15 font-semibold text-fg">{project.scale}</b> {copy.scaleLabel}
            </span>
          )}
          {project.photos && (
            // screenshot count: the facets' mono line (text on their
            // baseline), with a stacked-images icon
            <span className="inline-flex items-baseline gap-1.25 font-mono text-12 text-fg-dim">
              <ImagesIcon className="size-3.5 flex-none self-center" aria-hidden />
              {project.photos} {project.photos === 1 ? dict.photos.one : dict.photos.other}
            </span>
          )}
          <span className="font-mono text-12 text-fg-faint">{meta.join(" · ")}</span>
        </div>
      </Link>
    </StaggerItem>
  );
}
