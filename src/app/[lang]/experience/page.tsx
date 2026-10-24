import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
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
          {page.roles}
        </Reveal>
        {roles.map((entry) => (
          <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
        ))}
      </section>

      <section className="card">
        <Reveal as="h2" className="clabel">
          {page.education}
        </Reveal>
        {education.map((entry) => (
          <TimelineRow key={`${entry.company}-${entry.year}`} entry={entry} />
        ))}
      </section>
    </main>
  );
}
