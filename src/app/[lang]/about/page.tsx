import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import {
  PageEyebrow,
  PageHeader,
  PageLead,
  PageShell,
  PageTitle,
  Section,
} from "@/components/page";
import { LocaleLink } from "@/components/locale-link";
import { ButtonLink } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CraneTowerIcon } from "@/components/ui/icons";
import { getDictionary, hasLocale, localizedMetadata } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/about", getDictionary(lang).pages.about);
}

/** About me: written later. For now an empty state that points to the work,
 *  résumé and certificates, so the page is never a dead end. */
export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = getDictionary(lang).pages.about;

  return (
    <PageShell>
      <PageHeader>
        <PageEyebrow>{page.title}</PageEyebrow>
        <PageTitle>{page.heading}</PageTitle>
        <PageLead>{page.lead}</PageLead>
      </PageHeader>

      <Section>
        <Reveal>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CraneTowerIcon aria-hidden />
              </EmptyMedia>
              <EmptyTitle>{page.empty.title}</EmptyTitle>
              <EmptyDescription>{page.empty.description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <ButtonLink render={<LocaleLink href="/projects" />}>{page.actions.work}</ButtonLink>
              {/* the résumé is English-only */}
              <ButtonLink render={<LocaleLink href="/resume" />} variant="ghost">
                {page.actions.resume}
              </ButtonLink>
              <ButtonLink render={<LocaleLink href="/certificates" />} variant="ghost">
                {page.actions.certificates}
              </ButtonLink>
            </EmptyContent>
          </Empty>
        </Reveal>
      </Section>
    </PageShell>
  );
}
