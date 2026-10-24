import Link from "next/link";

import { AnimatedGrid } from "@/components/backgrounds/animated-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/** Hero: headline, intro, availability, and the two primary CTAs. */
export function HeroSection() {
  return (
    <header className="card hero" id="top" data-navlabel="Intro">
      <AnimatedGrid />
      <Reveal as="div" className="eye">
        Front-End Engineer &amp; UX/UI Designer
      </Reveal>
      <Reveal as="h1" delay={1}>
        I design and build interfaces — <span className="q">in TypeScript, across the stack.</span>
      </Reveal>
      <Reveal as="p" className="intro" delay={2}>
        I&#8217;m Tymur, a front-end engineer and designer based in Warsaw. I take
        products from Figma to production — React and Next.js on the front,
        Node.js and Postgres underneath — and I&#8217;m increasingly building AI
        features and agentic tooling into them. Recent projects include{" "}
        <Link href="/projects/exdbots">ExdBots</Link>, a research data platform,
        and an e-commerce store.
      </Reveal>
      <Reveal as="div" className="now" delay={3}>
        <span className="dot" />
        Open to front-end, full-stack TypeScript &amp; AI product roles · Warsaw, PL
      </Reveal>
      <Reveal as="div" className="cta" delay={3}>
        <Button asChild variant="primary">
          <Link href="/#work">
            See my work <span className="arrow">→</span>
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/#contact">Get in touch</Link>
        </Button>
      </Reveal>
    </header>
  );
}
