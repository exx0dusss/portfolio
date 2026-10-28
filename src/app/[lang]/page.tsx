import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page";
import { getDictionary, hasLocale, localizedMetadata } from "@/i18n";

import { ContactSection } from "../_components/contact-section";
import { EducationSection } from "../_components/education-section";
import { ExperienceSection } from "../_components/experience-section";
import { HeroSection } from "../_components/hero-section";
import { StackSection } from "../_components/stack-section";
import { WorkSection } from "../_components/work-section";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/", { description: getDictionary(lang).meta.description });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <PageShell>
      <HeroSection dict={dict.hero} />
      <WorkSection dict={dict.work} />
      <ExperienceSection lang={lang} dict={dict.experience} />
      <EducationSection label={dict.pages.experience.education} dict={dict.experience} />
      <StackSection dict={dict.skills} />
      <ContactSection dict={dict.contact} />
    </PageShell>
  );
}
