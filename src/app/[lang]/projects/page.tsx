import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Stagger } from "@/components/motion/stagger";
import {
  PageEyebrow,
  PageHeader,
  PageLead,
  PageShell,
  PageTitle,
  Section,
  SectionLabel,
} from "@/components/page";
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
    <PageShell>
      <PageHeader>
        <PageEyebrow>{page.title}</PageEyebrow>
        <PageTitle>{page.heading}</PageTitle>
        <PageLead>{page.lead}</PageLead>
      </PageHeader>

      <Section>
        <SectionLabel>{page.label}</SectionLabel>
        <Stagger className="plist">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} dict={dict.work} />
          ))}
        </Stagger>
      </Section>
    </PageShell>
  );
}
