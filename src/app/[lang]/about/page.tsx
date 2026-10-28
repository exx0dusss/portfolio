import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BuildingIcon } from "@/components/building-icon";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getDictionary, hasLocale, localePath, localizedMetadata } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/about", getDictionary(lang).pages.about);
}

/** About me: written later. For now an empty state that points to the work
 *  and résumé, so the page is never a dead end. */
export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = getDictionary(lang).pages.about;

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
        <Reveal>
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <BuildingIcon />
              </EmptyMedia>
              <EmptyTitle>{page.empty.title}</EmptyTitle>
              <EmptyDescription>{page.empty.description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <ButtonLink render={<Link href={localePath(lang, "/projects")} />}>
                {page.actions.work}
              </ButtonLink>
              {/* the résumé is English-only */}
              <ButtonLink render={<Link href="/resume" />} variant="ghost">
                {page.actions.resume}
              </ButtonLink>
            </EmptyContent>
          </Empty>
        </Reveal>
      </section>
    </main>
  );
}
