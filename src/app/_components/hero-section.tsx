import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  BrowserIcon,
  DatabaseIcon,
  FileTextIcon,
  PenNibIcon,
  SparkleIcon,
} from "@/components/ui/icons";

import { StickFigure } from "./stick-figure";

/** What I do, in the client's words rather than the stack's. */
const SCOPE = [
  { icon: PenNibIcon, text: "Design products customers enjoy using" },
  { icon: BrowserIcon, text: "Build fast, reliable websites and online stores" },
  { icon: DatabaseIcon, text: "Connect payments, delivery and business systems" },
  { icon: SparkleIcon, text: "Automate routine work with AI and chatbots" },
] as const;

/** Hero: one-line title, what I do as a short list, then the two actions,
 *  with the waving figure on the right. */
export function HeroSection() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <Reveal as="h1">
          I design and build web products<em>.</em>
        </Reveal>
        <Stagger as="ul" className="scope">
          {SCOPE.map(({ icon: Icon, text }) => (
            <StaggerItem as="li" key={text}>
              <Icon aria-hidden />
              {text}
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="hero-actions" delay={3}>
          <Button asChild>
            <Link href="/#work">
              <ArrowDownIcon aria-hidden /> See work
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/resume">
              <FileTextIcon aria-hidden /> Résumé
            </Link>
          </Button>
        </Reveal>
      </div>
      <Reveal className="hero-figure" delay={2}>
        <StickFigure />
      </Reveal>
    </header>
  );
}
