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

import { BookCard } from "./_components/book-card";
import { BOOKS } from "./_components/books";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/reading", getDictionary(lang).pages.reading);
}

export default async function ReadingPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = getDictionary(lang).pages.reading;

  return (
    <PageShell>
      <PageHeader>
        <PageEyebrow>{page.title}</PageEyebrow>
        <PageTitle>{page.heading}</PageTitle>
        <PageLead>{page.lead}</PageLead>
      </PageHeader>

      <Section>
        <SectionLabel>{page.books}</SectionLabel>
        {/* book titles stay in their original English */}
        <Stagger className="shelf">
          {BOOKS.map((book) => (
            <BookCard key={book.slotId} book={book} />
          ))}
        </Stagger>
      </Section>
    </PageShell>
  );
}
