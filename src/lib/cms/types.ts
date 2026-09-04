export interface SanityAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface SanityImage {
  asset?: SanityAsset;
}

export interface SanityFile {
  asset?: SanityAsset & { originalFilename?: string };
}

export interface CmsSiteSettings {
  name: string;
  seoTitle?: string;
  seoDescription?: string;
  eyebrow?: string;
  headline?: string;
  intro?: string;
  about?: import("@portabletext/types").PortableTextBlock[];
  contactHeading?: string;
  contactIntro?: string;
  availability?: string;
  location?: string;
  email?: string;
  portrait?: SanityImage;
  resume?: SanityFile;
  stack?: Array<{ label: string; value: string }>;
  socials?: Array<{ label: string; url: string }>;
}

export interface CmsPage {
  title: string;
  slug: string;
  eyebrow?: string;
  heading: string;
  lead?: string;
}

export interface CmsProject {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  icon?: string;
  year?: string;
  kind?: string;
  tagline?: string;
  description?: string;
  role?: string;
  type?: string;
  opennessTone?: "open" | "source" | "client" | "nda";
  opennessLabel?: string;
  tags?: string[];
  githubUrl?: string;
  githubLabel?: string;
  architectureIntro?: string;
  architectureNote?: string;
  noticeTitle?: string;
  noticeBody?: string;
  nextProjectName?: string;
  nextProjectSlug?: string;
  downloads?: Array<{ label: string; file?: SanityFile }>;
  cover?: SanityImage;
  features?: Array<{ label?: string; title: string; description?: string }>;
  architecture?: Array<{
    title: string;
    nodes?: Array<{ title: string; sub?: string; accent?: boolean }>;
  }>;
  overview?: import("@portabletext/types").PortableTextBlock[];
  buildNotes?: import("@portabletext/types").PortableTextBlock[];
  gallery?: SanityImage[];
}

export interface CmsTimelineEntry {
  _id: string;
  year: string;
  where?: string;
  role: string;
  company: string;
  description?: string;
  tags?: string[];
}

export interface CmsCertificate {
  _id: string;
  title: string;
  issuer: string;
  badgeIcon?: string;
  href?: string;
  file?: SanityFile;
  image?: SanityImage;
}

export interface CmsBook {
  _id: string;
  title: string;
  author: string;
  sourceLabel?: string;
  href: string;
  cover?: SanityImage;
}
