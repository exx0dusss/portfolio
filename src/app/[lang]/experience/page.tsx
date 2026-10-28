import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

import { TimelineRow } from "./_components/timeline-row";
import { EDUCATION, localizeTimeline, ROLES } from "./_components/timeline";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/experience", getDictionary(lang).pages.experience);
}

export default async function ExperiencePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.pages.experience;
  const roles = localizeTimeline(ROLES, dict.experience.roles, dict.experience.now);
  const education = localizeTimeline(EDUCATION, dict.experience.education, dict.experience.now);

  return (
    <PageShell>
      <PageHeader>
        <PageEyebrow>{page.title}</PageEyebrow>
        <PageTitle>{page.heading}</PageTitle>
        <PageLead>{page.lead}</PageLead>
      </PageHeader>

      <Section id="roles">
        <SectionLabel>{page.roles}</SectionLabel>
        {roles.map((entry) => (
          <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
        ))}
      </Section>

      <Section id="education">
        <SectionLabel>{page.education}</SectionLabel>
        {education.map((entry) => (
          <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
        ))}
      </Section>
    </PageShell>
  );
}
