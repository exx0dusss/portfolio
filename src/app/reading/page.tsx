import type { Metadata } from "next";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { BookCard } from "./_components/book-card";
import { BOOKS } from "./_components/books";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "The books behind how Tymur Mustafaiev designs and builds — interface design, CSS, TypeScript, Node.js, data-intensive systems, and software architecture.",
  alternates: { canonical: "/reading" },
};

export default function ReadingPage() {
  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal className="clabel">Reading</Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            On my shelf.
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            The books behind how I design and build — from interfaces and CSS to
            Node.js, data systems, and architecture. Each links out to its
            source.
          </Reveal>
        </header>

        <section className="card">
          <Reveal className="clabel">
            <span className="num">01</span> Books
          </Reveal>
          <div className="shelf">
            {BOOKS.map((book) => (
              <BookCard key={book.slotId} book={book} />
            ))}
          </div>
        </section>
      </main>
      <NavDots />
    </>
  );
}
