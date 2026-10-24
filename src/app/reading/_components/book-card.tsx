import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

import type { Book } from "./books";

/** One book on the shelf: cover, title, author, and an external link to the
 *  book's source. Covers keep their own proportions and stand on a shared
 *  baseline, so nothing is cropped. The whole card is the link (external, so
 *  a real <a href> rather than next/link). */
export function BookCard({ book }: { book: Book }) {
  const ratio = book.cover.width / book.cover.height;
  return (
    <Reveal>
      <a className="book" href={book.href} target="_blank" rel="noopener">
        <div className="cover-slot">
          <div className="cover" style={{ "--r": ratio } as React.CSSProperties}>
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              placeholder="blur"
              sizes="(max-width: 640px) 45vw, 180px"
            />
          </div>
        </div>
        <div className="bt">{book.title}</div>
        <div className="ba">{book.author}</div>
        <span className="bn">
          <span className="bn-host">{book.sourceLabel}</span>
          <span aria-hidden>↗</span>
        </span>
      </a>
    </Reveal>
  );
}
