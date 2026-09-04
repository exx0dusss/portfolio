import Link from "next/link";

import { AnimatedGrid } from "@/components/backgrounds/animated-grid";
import { Button } from "@/components/ui/button";
import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/motion/reveal";

interface HeroContent {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  availability?: string;
  location?: string;
  portraitUrl?: string;
}

/** Hero: avatar, headline, intro, availability, and the two primary CTAs. */
export function HeroSection({ content }: { content?: HeroContent }) {
  return (
    <header className="card hero" id="top" data-navlabel="Intro">
      <AnimatedGrid />
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal as="div" className="eye">
            {content?.eyebrow ?? "Middle Front-End Developer & UX/UI Designer"}
          </Reveal>
          <Reveal as="h1" delay={1}>
            {content?.headline ?? (
              <>I build full-stack web apps — <span className="q">and design the interfaces.</span></>
            )}
          </Reveal>
          <Reveal as="p" className="intro" delay={2}>
            {content?.intro ?? (
              <>
                I&#8217;m Tymur, a developer based in Warsaw. I work across the stack in TypeScript —
                frontend, backend, and the data model — and design as I go. My work ranges from web apps
                and internal tools to developer tooling. Recent projects include <Link href="/#work">ExdBots</Link>,
                a research data platform, and an e-commerce store.
              </>
            )}
          </Reveal>
          <Reveal as="div" className="now" delay={3}>
            <span className="dot" />
            {content?.availability ?? "Looking for a Design Engineer role"} · {content?.location ?? "Warsaw, PL"}
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
        </div>
        <Reveal className="hero-portrait" delay={1}>
          <ImageSlot
            className="avatar"
            shape="rounded"
            radius={18}
            src={content?.portraitUrl}
            alt={content?.portraitUrl ? "Portrait of Tymur Mustafaiev" : ""}
            fit="cover"
            placeholder="Photo"
          />
        </Reveal>
      </div>
    </header>
  );
}
