import type { Metadata } from "next";

import { getCmsEducation, getCmsExperiences, getCmsPage } from "@/lib/cms/repository";
import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { TimelineRow } from "./_components/timeline-row";
import { EDUCATION, ROLES, type TimelineEntry } from "./_components/timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "The teams, products, and roles Tymur Mustafaiev has worked with.",
};

export default async function ExperiencePage() {
  const [cmsRoles, cmsEducation, pageCopy] = await Promise.all([
    getCmsExperiences(),
    getCmsEducation(),
    getCmsPage("experience"),
  ]);
  const mapEntry = (entry: Omit<TimelineEntry, "where"> & { where?: string }): TimelineEntry => ({
    ...entry,
    where: entry.where ?? "",
  });
  const roles: TimelineEntry[] = (cmsRoles?.length ? cmsRoles : ROLES).map(mapEntry);
  const education: TimelineEntry[] = (cmsEducation?.length ? cmsEducation : EDUCATION).map(mapEntry);

  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal className="clabel">{pageCopy?.eyebrow ?? "Experience"}</Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            {pageCopy?.heading ?? "Where I’ve worked."}
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            {pageCopy?.lead ??
              "A history of the teams and products I’ve built with — front-end, design, and full-stack roles, mostly remote from Warsaw."}
          </Reveal>
        </header>

        <section className="card">
          <Reveal as="div" className="clabel">
            <span className="num">01</span> Roles
          </Reveal>
          {roles.map((entry) => (
            <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
          ))}
        </section>

        <section className="card">
          <Reveal as="div" className="clabel">
            <span className="num">02</span> Education
          </Reveal>
          {education.map((entry) => (
            <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
          ))}
        </section>
      </main>
      <NavDots />
    </>
  );
}
