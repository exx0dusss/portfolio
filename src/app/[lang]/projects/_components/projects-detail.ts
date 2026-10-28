import type { ReactNode } from "react";

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
  title: string;
  description: string;
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

export interface GalleryItem {
  placeholder: string;
  /** 16:9 wide tile spans the row; otherwise 4:3. */
  wide?: boolean;
  /** Screenshot path under /public; the placeholder shows until one is set. */
  src?: string;
  alt?: string;
}

export interface NextProjectLinkData {
  name: string;
  href: string;
}
