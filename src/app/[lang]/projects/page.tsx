import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { getDictionary, hasLocale, localizedMetadata } from "@/i18n";

import { ProjectCard } from "../../_components/project-card";
import { PROJECTS } from "../../_components/projects";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/projects", getDictionary(lang).pages.projects);
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.pages.projects;

  return (
    <main className="shell">
      <header className="card">
        <Reveal className="clabel">{page.title}</Reveal>
        <Reveal as="h1" delay={1} className="page-title">
          {page.heading}
        </Reveal>
        <Reveal as="p" delay={2} className="page-lead">
          {page.lead}
        </Reveal>
      </header>

      <section className="card">
        <Reveal as="h2" className="clabel">
          {page.label}
        </Reveal>
        <Stagger className="plist">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} dict={dict.work} />
          ))}
        </Stagger>
      </section>
    </main>
  );
}
