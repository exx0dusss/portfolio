export interface Book {
  /** Stable key + future cover-asset slot id. */
  slotId: string;
  title: string;
  author: string;
  /** Source-domain hint shown on the .bn line (with the ↗ glyph appended). */
  sourceLabel: string;
  /** Real external source URL. */
  href: string;
  coverUrl?: string;
}

/** Reading shelf content. Mirrors the approved design's eight books —
 *  titles, authors, source-domain hints, and real external source URLs. */
export function bookFromCms(book: import("@/lib/cms/types").CmsBook): Book {
  return {
    slotId: book._id,
    title: book.title,
    author: book.author,
    sourceLabel: book.sourceLabel ?? new URL(book.href).hostname,
    href: book.href,
    coverUrl: book.cover?.asset?.url,
  };
}

export const BOOKS: Book[] = [
  {
    slotId: "book_1",
    title: "Refactoring UI",
    author: "Wathan & Schoger",
    sourceLabel: "refactoringui.com",
    href: "https://www.refactoringui.com/",
  },
  {
    slotId: "book_2",
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    sourceLabel: "pragprog.com",
    href: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
  },
  {
    slotId: "book_3",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    sourceLabel: "dataintensive.net",
    href: "https://dataintensive.net/",
  },
  {
    slotId: "book_4",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    sourceLabel: "nngroup.com",
    href: "https://www.nngroup.com/books/design-everyday-things-revised/",
  },
  {
    slotId: "book_5",
    title: "Don’t Make Me Think",
    author: "Steve Krug",
    sourceLabel: "sensible.com",
    href: "https://sensible.com/dont-make-me-think/",
  },
  {
    slotId: "book_6",
    title: "Shape Up",
    author: "Ryan Singer",
    sourceLabel: "basecamp.com",
    href: "https://basecamp.com/shapeup",
  },
  {
    slotId: "book_7",
    title: "Clean Code",
    author: "Robert C. Martin",
    sourceLabel: "oreilly.com",
    href: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
  },
  {
    slotId: "book_8",
    title: "Atomic Habits",
    author: "James Clear",
    sourceLabel: "jamesclear.com",
    href: "https://jamesclear.com/atomic-habits",
  },
];
