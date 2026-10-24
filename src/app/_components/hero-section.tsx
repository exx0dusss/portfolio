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
import type { Dictionary } from "@/i18n";

import { StickFigure } from "./stick-figure";

/** Icons for the four scope lines (text comes from the dictionary). */
const SCOPE_ICONS = [PenNibIcon, BrowserIcon, DatabaseIcon, SparkleIcon] as const;

/** Hero: one-line title, what I do as a short list, then the two actions,
 *  with the waving figure on the right. */
export function HeroSection({ dict }: { dict: Dictionary["hero"] }) {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <Reveal as="h1">
          {dict.title}
          <em>.</em>
        </Reveal>
        <Stagger as="ul" className="scope">
          {dict.scope.map((text, i) => {
            const Icon = SCOPE_ICONS[i];
            return (
              <StaggerItem as="li" key={text}>
                <Icon aria-hidden />
                {text}
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="hero-actions" delay={3}>
          <Button asChild>
            {/* a plain fragment link: the browser scrolls natively, without the
                client router (which could append the hash twice) */}
            <a href="#work">
              <ArrowDownIcon aria-hidden /> {dict.seeWork}
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/resume">
              <FileTextIcon aria-hidden /> {dict.resume}
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
