import Image from "next/image";

import { StaggerItem } from "@/components/motion/stagger";
import { ArrowUpRightIcon } from "@/components/ui/icons";

import type { Book } from "./books";

import "./book-card.css";

/** One book on the shelf: cover, title, author, and an external link to the
 *  book's source. Every cover fills the same 3:4 slot so the cards line up.
 *  The whole card is the link (external, so a real <a href> rather than
 *  next/link). Each card stretches to its row's height (grid items stretch;
 *  the StaggerItem passes that on), so the source link can sit at the bottom
 *  and line up across the row. */
export function BookCard({ book }: { book: Book }) {
  return (
    <StaggerItem className="flex">
      <a
        className="group/book flex min-w-0 flex-1 flex-col"
        href={book.href}
        target="_blank"
        rel="noopener"
      >
        {/* the spine's fold and highlight are drawn by book-card.css */}
        <div
          data-slot="book-cover"
          className="relative aspect-3/4 overflow-hidden rounded-l-3 rounded-r-8 bg-card-2 shadow-book transition-book group-hover/book:-translate-y-2 group-hover/book:-rotate-tilt group-hover/book:shadow-book-lift group-focus-visible/book:-translate-y-2 group-focus-visible/book:-rotate-tilt group-focus-visible/book:shadow-book-lift"
        >
          <Image
            src={book.cover}
            alt={`Cover of ${book.title}`}
            fill
            placeholder="blur"
            sizes="(max-width: 640px) 45vw, 180px"
            className="object-cover"
          />
        </div>
        <div className="mt-4 line-clamp-2 min-h-book-title text-14 leading-label font-medium tracking-snug">
          {book.title}
        </div>
        <div className="mt-1 text-12.5 text-fg-faint">{book.author}</div>
        <span className="mt-auto flex min-w-0 items-center gap-1.25 pt-2.5 font-mono text-11 text-fg-dim transition-colors duration-200 ease-standard group-hover/book:text-accent-ink">
          <span className="min-w-0 truncate">{book.sourceLabel}</span>
          <ArrowUpRightIcon aria-hidden />
        </span>
      </a>
    </StaggerItem>
  );
}
