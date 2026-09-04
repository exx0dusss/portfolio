import { PortableText } from "@portabletext/react";

import type { CmsProject } from "@/lib/cms/types";
import { NavDots } from "@/components/layout/nav-dots";
import { Button } from "@/components/ui/button";

import { ArchDiagram } from "./arch-diagram";
import { FeatureGrid } from "./feature-grid";
import { Gallery } from "./gallery";
import { LockedNote } from "./locked-note";
import { NextProjectLink } from "./next-project-link";
import { ProjectHero } from "./project-hero";
import { SectionLabel } from "./section-label";

export function CmsProjectPage({ project }: { project: CmsProject }) {
  const features = project.features?.map((feature) => ({
    fn: feature.label ?? "Feature",
    title: feature.title,
    description: feature.description ?? "",
  }));
  const architecture = project.architecture?.map((column) => ({
    title: column.title,
    nodes:
      column.nodes?.map((node) => ({
        title: node.title,
        sub: node.sub ?? "",
        accent: node.accent,
      })) ?? [],
  }));
  const downloads = project.downloads?.flatMap((download) =>
    download.file?.asset?.url
      ? [{ label: download.label, url: download.file.asset.url }]
      : [],
  );
  const gallery = project.gallery?.flatMap((image, index) =>
    image.asset?.url
      ? [
          {
            placeholder: `Project image ${index + 1}`,
            src: image.asset.url,
            alt: `${project.title} project image ${index + 1}`,
            wide: index === 0,
          },
        ]
      : [],
  );

  return (
    <>
      <main className="shell">
        <ProjectHero
          icon={project.icon ?? project.title.slice(0, 1)}
          name={project.title}
          tagline={project.tagline ?? project.description ?? ""}
          meta={[
            { key: "Year", value: project.year ?? "" },
            { key: "Role", value: project.role ?? "" },
            { key: "Type", value: project.type ?? project.kind ?? "" },
          ]}
          openness={{
            tone: project.opennessTone ?? "nda",
            label: project.opennessLabel ?? "Project details",
          }}
          actions={
            project.githubUrl
              ? [
                  {
                    variant: "primary",
                    label: project.githubLabel ?? "View project",
                    href: project.githubUrl,
                    external: true,
                  },
                ]
              : undefined
          }
        />

        {project.cover?.asset?.url ? (
          <section className="card">
            <div className="p-cover">
              <Gallery
                items={[
                  {
                    placeholder: "Project cover",
                    src: project.cover.asset.url,
                    alt: `${project.title} cover`,
                    wide: true,
                  },
                ]}
              />
            </div>
          </section>
        ) : null}

        {project.overview?.length ? (
          <section className="card">
            <SectionLabel num="01">Overview</SectionLabel>
            <div className="prose">
              <PortableText value={project.overview} />
            </div>
          </section>
        ) : null}

        {features?.length ? (
          <section className="card">
            <SectionLabel num="02">What&apos;s inside</SectionLabel>
            <FeatureGrid features={features} />
          </section>
        ) : null}

        {architecture?.length ? (
          <section className="card" id="architecture">
            <SectionLabel num="03">Architecture</SectionLabel>
            {project.architectureIntro ? (
              <div className="section-intro">
                <div className="prose">
                  <p>{project.architectureIntro}</p>
                </div>
              </div>
            ) : null}
            <ArchDiagram
              columns={architecture}
              note={project.architectureNote ?? "// authored in Sanity Studio"}
            />
          </section>
        ) : null}

        {project.buildNotes?.length ? (
          <section className="card">
            <SectionLabel num="04">How it was built</SectionLabel>
            <div className="prose">
              <PortableText value={project.buildNotes} />
            </div>
          </section>
        ) : null}

        {gallery?.length ? (
          <section className="card">
            <SectionLabel num="05">Gallery</SectionLabel>
            <Gallery items={gallery} />
          </section>
        ) : null}

        {project.noticeTitle && project.noticeBody ? (
          <section className="card">
            <LockedNote title={project.noticeTitle}>{project.noticeBody}</LockedNote>
          </section>
        ) : null}

        {downloads?.length ? (
          <section className="card">
            <SectionLabel num="06">Files</SectionLabel>
            <div className="cta">
              {downloads.map((download) => (
                <Button key={download.url} asChild variant="ghost">
                  <a href={download.url} target="_blank" rel="noopener noreferrer">
                    {download.label} ↗
                  </a>
                </Button>
              ))}
            </div>
          </section>
        ) : null}

        {project.nextProjectName && project.nextProjectSlug ? (
          <NextProjectLink
            name={project.nextProjectName}
            href={`/projects/${project.nextProjectSlug}`}
          />
        ) : null}
      </main>
      <NavDots />
    </>
  );
}
