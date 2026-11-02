import type { ReactNode } from "react";

import type { TelegramEmojiName } from "@/components/telegram-emoji";
import type { TechId } from "@/lib/tech";

/** Visual tone for the openness badge: the color of its dot (TONE_DOT in project-hero). */
export type OpennessTone = "open" | "source" | "client" | "nda";

export interface Openness {
  tone: OpennessTone;
  label: string;
}

export interface MetaItem {
  key: string;
  value: string;
  /** Second, quieter line under the value. */
  sub?: string;
}

/** How hard the project was to build, on a 1–5 scale. */
export interface Difficulty {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
}

/** A hero action button (real external URL or in-page anchor). */
export interface HeroAction {
  variant: "primary" | "ghost";
  label: string;
  href: string;
  /** Trailing glyph: "↗" for external, none for in-page anchors. */
  external?: boolean;
}

export interface ProjectHeroData {
  name: string;
  /** The project site's own icon, shown beside the name. */
  favicon?: string;
  /** "round" for an icon that is a circle of its own (a Telegram avatar). */
  faviconShape?: "round";
  /** Another name the project goes by, shown under the title (a bot's
   *  username, a former name). */
  aka?: string;
  tagline: ReactNode;
  meta: MetaItem[];
  openness: Openness;
  difficulty?: Difficulty;
  /** Technologies shown as logo chips, each linking to its site. */
  stack?: TechId[];
  actions?: HeroAction[];
  /** Interactive buttons after the link actions (live preview, screenshots). */
  extraActions?: ReactNode;
}

export interface FeatureCard {
  fn: string;
  /** A Telegram custom emoji shown before the tag (pnpm telegram:emoji). */
  emoji?: TelegramEmojiName;
  /** Or one of the site's icons, for cards about the work rather than the
   *  product. */
  icon?: ReactNode;
  title: string;
  /** The blurb; a card made of steps can do without one. */
  description?: string;
  /** Names shown as chips under the blurb, each with its Telegram custom emoji
   *  (a name from scripts/telegram-emoji.mjs), as the bot shows its sources. */
  chips?: { label: string; emoji?: string }[];
  /** Numbered steps under the blurb, for a feature that runs in order (an
   *  upload wizard), each a sentence or two. */
  steps?: string[];
  /** A small note at the bottom of the card, under a rule: how it works
   *  rather than what it does. */
  footnote?: string;
}

/** One block in a FeatureSpecs list: a card's fields without the chips and
 *  steps, which belong to quick product cards. The description may hold
 *  links, like a TechLink to a package it names. */
export type FeatureSpec = Pick<FeatureCard, "fn" | "emoji" | "icon" | "title" | "footnote"> & {
  description?: ReactNode;
};

/** A titled set of feature cards (FeatureGroups). */
export interface FeatureGroup {
  title: string;
  features: FeatureCard[];
}

/** A component and its anatomy, the parts it is composed of
 *  (ComponentAnatomy). */
export interface AnatomyCard {
  fn: string;
  title: string;
  description: string;
  /** The parts as JSX, one per line, indented by nesting. */
  anatomy: string;
}

/** One architecture in a collection (ArchitectureCards): where it came
 *  from, what it is, the principles it holds to, and its stack. */
export interface ArchitectureCard {
  name: string;
  /** Where it came from, in a few words. */
  origin: string;
  description: string;
  principles: string[];
  stack: TechId[];
}

/** A package and what it brings (PluginList). */
export interface PluginItem {
  name: string;
  description: string;
}

/** One feature module of a bot, as it registers itself (ModuleTable). */
export interface BotModule {
  name: string;
  /** The chat types it handles, e.g. "private", "all". */
  chats: string;
  /** Modules that must run before it. */
  requires: string[];
  /** What it owns, in a few words. */
  owns: string;
}

/** One colour of a case study's palette (DesignNote). */
export interface Swatch {
  name: string;
  hex: string;
}

/** One measured version (SpeedBars): its time, or why it has none. */
export interface SpeedRow {
  label: string;
  /** What it ran on or how it fetched, one line. */
  sub: string;
  /** Median milliseconds; absent when it couldn't run. */
  ms?: number;
  /** Shown instead of a bar when there is no time. */
  failed?: string;
  /** The version running now; its bar takes the accent. */
  current?: boolean;
}

export interface ArchNode {
  title: string;
  sub: string;
  accent?: boolean;
}

export interface ArchColumn {
  title: string;
  nodes: ArchNode[];
}

export interface ArchData {
  columns: ArchColumn[];
  note: string;
}

/** A drawing from the project's planning (DrawingGallery): line art on a
 *  transparent background, with its drawn size. */
export interface DrawingItem {
  title: string;
  src: string;
  /** what it shows, in words */
  alt: string;
  width: number;
  height: number;
}

export interface GalleryItem {
  placeholder: string;
  /** 16:9 wide tile spans the row; otherwise 4:3. */
  wide?: boolean;
  /** Screenshot path under /public; the placeholder shows until one is set. */
  src?: string;
  alt?: string;
}

export interface TimelineEntry {
  /** When, as text: "2023", "Nov 2024 — Feb 2025". */
  date: string;
  title: string;
  /** What it ran on, one line. */
  stack?: string;
  body: ReactNode;
  /** Why the project moved to this version: the reason for the transition. */
  why?: ReactNode;
  /** An attempt that was abandoned, and why: shown with a dashed dot. */
  dropped?: ReactNode;
  /** The version running now; its dot is filled. */
  current?: boolean;
}

export interface NextProjectLinkData {
  name: string;
  href: string;
}
