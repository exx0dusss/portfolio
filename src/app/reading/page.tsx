import type { Metadata } from "next";

import { getCmsBooks, getCmsPage } from "@/lib/cms/repository";
import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { BookCard } from "./_components/book-card";
import { bookFromCms, BOOKS } from "./_components/books";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books about engineering, design, systems, and better work.",
};

export default async function ReadingPage() {
  const [cmsBooks, pageCopy] = await Promise.all([
    getCmsBooks(),
    getCmsPage("reading"),
  ]);
  const books = cmsBooks?.length ? cmsBooks.map(bookFromCms) : BOOKS;

  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal className="clabel">{pageCopy?.eyebrow ?? "Reading"}</Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            {pageCopy?.heading ?? "On my shelf."}
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            {pageCopy?.lead ??
              "A few books that shaped how I build and think — a mix of engineering and design. Each links out to its source."}
          </Reveal>
        </header>

        <section className="card">
          <Reveal className="clabel">
            <span className="num">01</span> Books
          </Reveal>
          <div className="shelf">
            {books.map((book) => (
              <BookCard key={book.slotId} book={book} />
            ))}
          </div>
        </section>
      </main>
      <NavDots />
    </>
  );
}
