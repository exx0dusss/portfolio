import Image from "next/image";

import { StaggerItem } from "@/components/motion/stagger";
import { ArrowUpRightIcon } from "@/components/ui/icons";

import type { Book } from "./books";

/** One book on the shelf: cover, title, author, and an external link to the
 *  book's source. Every cover fills the same 3:4 slot so the cards line up.
 *  The whole card is the link (external, so a real <a href> rather than
 *  next/link). */
export function BookCard({ book }: { book: Book }) {
  return (
    <StaggerItem>
      <a className="book" href={book.href} target="_blank" rel="noopener">
        <div className="cover">
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            placeholder="blur"
            sizes="(max-width: 640px) 45vw, 180px"
          />
        </div>
        <div className="bt">{book.title}</div>
        <div className="ba">{book.author}</div>
        <span className="bn">
          <span className="bn-host">{book.sourceLabel}</span>
          <ArrowUpRightIcon aria-hidden />
        </span>
      </a>
    </StaggerItem>
  );
}
