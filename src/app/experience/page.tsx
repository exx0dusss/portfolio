import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";

import { TimelineRow } from "./_components/timeline-row";
import { EDUCATION, ROLES } from "./_components/timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles and education of Tymur Mustafaiev — front-end, UX/UI design, and full-stack work at Softica Tech, SalonSvitlo, and PCEXPERT; Master’s student at PJATK in Warsaw.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal className="clabel">Experience</Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            Where I’ve worked.
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            A history of the teams and products I’ve built with — front-end, design, and full-stack
            roles, mostly remote from Warsaw.
          </Reveal>
        </header>

        <section className="card">
          <Reveal as="div" className="clabel">
            Roles
          </Reveal>
          {ROLES.map((entry) => (
            <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
          ))}
        </section>

        <section className="card">
          <Reveal as="div" className="clabel">
            Education
          </Reveal>
          {EDUCATION.map((entry) => (
            <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
          ))}
        </section>
      </main>
    </>
  );
}
