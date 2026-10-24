import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
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
          {page.books}
        </Reveal>
        {/* book titles stay in their original English */}
        <Stagger className="shelf">
          {BOOKS.map((book) => (
            <BookCard key={book.slotId} book={book} />
          ))}
        </Stagger>
      </section>
    </main>
  );
}
