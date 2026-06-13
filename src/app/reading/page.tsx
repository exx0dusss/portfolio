import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { BookCard } from "./_components/book-card";
import { BOOKS } from "./_components/books";

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
            A few books that shaped how I build and think — a mix of engineering
            and design. Each links out to its source. Drop the covers in and
            swap any title for your own.
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
