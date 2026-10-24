import type { Metadata } from "next";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { ProjectCard } from "../_components/project-card";
import { PROJECTS } from "../_components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies by Tymur Mustafaiev — ExdBots, a Telegram app platform; Giga Psych, a research data platform; MyLamp, a full-stack e-commerce store; and exd-tiktok-bot.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal className="clabel">Projects</Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            Things I’ve built.
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            Products I’ve designed and built end to end — from Telegram platforms and research
            tooling to e-commerce. Each one has a full case study.
          </Reveal>
        </header>

        <section className="card">
          <Reveal as="div" className="clabel">
            <span className="num">01</span> Work
          </Reveal>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slotId} project={project} />
          ))}
        </section>
      </main>
      <NavDots />
    </>
  );
}
