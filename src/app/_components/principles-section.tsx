import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";

const PRINCIPLES = [
  {
    label: "Systems over screens",
    text: "Tokens and components first, pages last — so the tenth screen is as consistent as the first.",
    books: ["Atomic Design", "Refactoring UI"],
  },
  {
    label: "Let the platform work",
    text: "Modern CSS and strict TypeScript catch more bugs than extra JavaScript ever will.",
    books: ["CSS: The Definitive Guide", "Learning TypeScript"],
  },
  {
    label: "Model the data early",
    text: "Most front-end pain is a data-model problem in disguise. I sketch the schema before the UI.",
    books: ["Designing Data-Intensive Applications", "Fundamentals of Software Architecture"],
  },
  {
    label: "APIs are products",
    text: "An API is an interface too — it deserves the same care for its users as a screen does.",
    books: ["APIs: A Strategy Guide", "Node.js Design Patterns"],
  },
] as const;

/** Principles section: how I work, each principle traced to the books on /reading. */
export function PrinciplesSection() {
  return (
    <section className="card" id="principles">
      <Reveal as="div" className="clabel">
        <span className="num">03</span> Principles
      </Reveal>
      <Reveal>
        {PRINCIPLES.map((principle) => (
          <div className="srow" key={principle.label}>
            <div className="sk">{principle.label}</div>
            <div className="sv">
              {principle.text}{" "}
              <Link href="/reading">{principle.books.join(" · ")}</Link>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
