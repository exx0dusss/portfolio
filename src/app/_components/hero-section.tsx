import Link from "next/link";

import { AnimatedGrid } from "@/components/backgrounds/animated-grid";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/motion/reveal";

/** Hero: avatar, headline, intro, availability, and the two primary CTAs. */
export function HeroSection() {
  return (
    <header className="card hero" id="top" data-navlabel="Intro">
      <AnimatedGrid />
      <Reveal>
        <ImageSlot
          className="avatar"
          shape="rounded"
          radius={12}
          fit="contain"
          placeholder="Photo"
        />
      </Reveal>
      <Reveal as="div" className="eye">
        Middle Front-End Developer &amp; UX/UI Designer
      </Reveal>
      <Reveal as="h1" delay={1}>
        I build full-stack web apps — <span className="q">and design the interfaces.</span>
      </Reveal>
      <Reveal as="p" className="intro" delay={2}>
        I&#8217;m Tymur, a developer based in Warsaw. I work across the stack in
        TypeScript — frontend, backend, and the data model — and design as I go.
        My work ranges from web apps and internal tools to developer tooling.
        Recent projects include <Link href="/#work">ExdBots</Link>, a research
        data platform, and an e-commerce store.
      </Reveal>
      <Reveal as="div" className="now" delay={3}>
        <span className="dot" />
        Looking for a Design Engineer role · Warsaw, PL
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
