import type { StaticImageData } from "next/image";

import apisStrategyGuide from "./covers/apis-strategy-guide.jpg";
import atomicDesign from "./covers/atomic-design.jpg";
import cssDefinitiveGuide from "./covers/css-definitive-guide.jpg";
import ddia from "./covers/ddia.jpg";
import fundamentalsSoftwareArchitecture from "./covers/fundamentals-software-architecture.jpg";
import learningTypescript from "./covers/learning-typescript.jpg";
import nodejsDesignPatterns from "./covers/nodejs-design-patterns.jpg";
import refactoringUi from "./covers/refactoring-ui.jpg";

export interface Book {
  /** Stable key. */
  slotId: string;
  title: string;
  author: string;
  /** Source-domain hint shown on the .bn line (with the ↗ glyph appended). */
  sourceLabel: string;
  /** Real external source URL. */
  href: string;
  /** Static import, so next/image knows the cover's true aspect ratio. */
  cover: StaticImageData;
}

/** Reading shelf content, roughly design → front-end → back-end. Covers are
 *  the editions on my shelf. */
export const BOOKS: Book[] = [
  {
    slotId: "refactoring-ui",
    title: "Refactoring UI",
    author: "Wathan & Schoger",
    sourceLabel: "refactoringui.com",
    href: "https://www.refactoringui.com/",
    cover: refactoringUi,
  },
  {
    slotId: "atomic-design",
    title: "Atomic Design",
    author: "Brad Frost",
    sourceLabel: "bradfrost.com",
    href: "https://atomicdesign.bradfrost.com/",
    cover: atomicDesign,
  },
  {
    slotId: "css-definitive-guide",
    title: "CSS: The Definitive Guide",
    author: "Meyer & Weyl",
    sourceLabel: "oreilly.com",
    href: "https://www.oreilly.com/library/view/css-the-definitive/9781098117603/",
    cover: cssDefinitiveGuide,
  },
  {
    slotId: "learning-typescript",
    title: "Learning TypeScript",
    author: "Josh Goldberg",
    sourceLabel: "learningtypescript.com",
    href: "https://www.learningtypescript.com/",
    cover: learningTypescript,
  },
  {
    slotId: "nodejs-design-patterns",
    title: "Node.js Design Patterns",
    author: "Casciaro & Mammino",
    sourceLabel: "nodejsdesignpatterns.com",
    href: "https://www.nodejsdesignpatterns.com/",
    cover: nodejsDesignPatterns,
  },
  {
    slotId: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    sourceLabel: "dataintensive.net",
    href: "https://dataintensive.net/",
    cover: ddia,
  },
  {
    slotId: "fundamentals-software-architecture",
    title: "Fundamentals of Software Architecture",
    author: "Richards & Ford",
    sourceLabel: "fundamentalsofsoftwarearchitecture.com",
    href: "https://fundamentalsofsoftwarearchitecture.com/",
    cover: fundamentalsSoftwareArchitecture,
  },
  {
    slotId: "apis-strategy-guide",
    title: "APIs: A Strategy Guide",
    author: "Jacobson, Brail & Woods",
    sourceLabel: "oreilly.com",
    href: "https://www.oreilly.com/library/view/apis-a-strategy/9781449321628/",
    cover: apisStrategyGuide,
  },
];
