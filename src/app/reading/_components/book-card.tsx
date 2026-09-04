import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/motion/reveal";

import type { Book } from "./books";

/** One book on the shelf: cover slot, title, author, and an external link to
 *  the book's source. The whole card is the link (external, so a real
 *  <a href> rather than next/link). */
export function BookCard({ book }: { book: Book }) {
  return (
    <Reveal>
      <a className="book" href={book.href} target="_blank" rel="noopener noreferrer">
        <ImageSlot
          className="cover"
          shape="rounded"
          radius={9}
          placeholder="Cover"
          style={{ height: "auto", aspectRatio: "2 / 3" }}
        />
        <div className="bt">{book.title}</div>
        <div className="ba">{book.author}</div>
        <span className="bn">{book.sourceLabel} ↗</span>
      </a>
    </Reveal>
  );
}
