import type { ReactNode } from "react";

/** Visual tone for the openness badge — maps to .openness.{open|source|client|nda}. */
export type OpennessTone = "open" | "source" | "client" | "nda";

export interface Openness {
  tone: OpennessTone;
  label: string;
}

export interface MetaItem {
  key: string;
  value: string;
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
  icon: string;
  name: string;
  tagline: ReactNode;
  meta: MetaItem[];
  openness: Openness;
  actions?: HeroAction[];
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
}

export interface NextProjectLinkData {
  name: string;
  href: string;
}
