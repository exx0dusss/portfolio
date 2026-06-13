import type { CSSProperties } from "react";

export interface Sticker {
  kind: "mark" | "tag";
  text: string;
  tone?: "blue" | "coral" | "amber" | "ink";
  style: CSSProperties;
}

export interface Project {
  num: string;
  icon: string;
  iconStyle: CSSProperties;
  slotId: string;
  title: string;
  year: string;
  kind: string;
  description: string;
  tags: string[];
  href: string;
  stickers: Sticker[];
}

/** Work section content. Mirrors the approved design's four project cards,
 *  including the hand-placed doodle stickers (position + rotation). */
export const PROJECTS: Project[] = [
  {
    num: "01",
    icon: "E",
    iconStyle: { top: -14, left: -12 },
    slotId: "exdbots",
    title: "ExdBots",
    year: "2026 — now",
    kind: "Solo project · Telegram platform",
    description:
      "A platform for managing Telegram applications — build and monitor bots through a no-code web editor, connect existing bots, and handle ad management and statistics from one interface.",
    tags: ["Next.js", "shadcn/ui", "SDK", "PostgreSQL"],
    href: "/projects/exdbots",
    stickers: [
      { kind: "mark", text: "✦", style: { top: -17, right: 32, transform: "rotate(-13deg)" } },
      { kind: "tag", text: "telegram", tone: "blue", style: { bottom: -12, right: -10, transform: "rotate(6deg)" } },
      { kind: "tag", text: "bot!", tone: "ink", style: { bottom: 22, left: -16, transform: "rotate(-7deg)" } },
    ],
  },
  {
    num: "02",
    icon: "G",
    iconStyle: { top: -14, left: -12 },
    slotId: "gigapsych",
    title: "Giga Psych",
    year: "research",
    kind: "Full-stack · with PJATK XR Lab",
    description:
      "A platform for exploring research datasets, built with the PJATK XR Lab and researchers at the University of Amsterdam. It lets the team browse and query experimental data through a web interface.",
    tags: ["React", "Data viz", "Postgres"],
    href: "/projects/giga-psych",
    stickers: [
      { kind: "mark", text: "✱", tone: "coral", style: { top: -15, right: 22, transform: "rotate(11deg)" } },
      { kind: "tag", text: "research", tone: "ink", style: { bottom: -11, left: -14, transform: "rotate(-6deg)" } },
    ],
  },
  {
    num: "03",
    icon: "M",
    iconStyle: { top: -14, left: -12 },
    slotId: "mylamp",
    title: "MyLamp",
    year: "2024 — now",
    kind: "Full-stack · e-commerce",
    description:
      "Full-stack e-commerce for a lighting business with 20+ years in the trade — store, landing, CRM, and a Telegram bot with a web-app.",
    tags: ["Next.js", "Stripe", "CRM"],
    href: "/projects/mylamp",
    stickers: [
      { kind: "mark", text: "✦", tone: "ink", style: { top: -16, right: 34, transform: "rotate(-9deg)" } },
      { kind: "tag", text: "shop", tone: "amber", style: { bottom: -12, right: -8, transform: "rotate(7deg)" } },
    ],
  },
  {
    num: "04",
    icon: "t",
    iconStyle: { top: -14, left: -12 },
    slotId: "exdtiktok",
    title: "exd-tiktok-bot",
    year: "2023 — now",
    kind: "Side project · Telegram bot",
    description:
      "A Telegram bot for downloading TikTok videos, with a strong back-end I keep improving. My first bot project — its structure became the starting point for ExdBots.",
    tags: ["Node.js", "Telegram Bot API"],
    href: "/projects/exd-tiktok-bot",
    stickers: [
      { kind: "tag", text: "tiktok", tone: "coral", style: { top: -14, right: -8, transform: "rotate(-8deg)" } },
      { kind: "tag", text: "the OG", tone: "ink", style: { bottom: -11, right: 26, transform: "rotate(6deg)" } },
    ],
  },
];
