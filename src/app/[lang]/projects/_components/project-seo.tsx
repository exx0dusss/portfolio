import type { Metadata } from "next";

import { getDictionary } from "@/i18n";
import { SITE } from "@/lib/site";

import { PROJECTS } from "../../../_components/projects";

export interface ProjectSeo {
  slug: string;
  title: string;
  /** ~150 characters: search snippets and link previews show this. */
  description: string;
}

const path = (slug: string) => `/projects/${slug}`;

/** The per-project card, from opengraph-image.tsx in the project's folder.
 *  Case studies are English-only, so it is always the /en/ render. */
const cardUrl = (slug: string) => `${SITE.url}/en/projects/${slug}/opengraph-image`;

/**
 * Metadata for a case study: canonical URL plus Open Graph (Facebook,
 * LinkedIn, WhatsApp, Telegram, Slack, Discord, iMessage, Mastodon) and X
 * card tags. Titles inherit the "— Tymur Mustafaiev" template; the preview
 * image comes from the folder's opengraph-image.tsx.
 */
export function projectMetadata({ slug, title, description }: ProjectSeo): Metadata {
  const facets = getDictionary("en").work.projects[slug]?.facets ?? [];
  return {
    title,
    description,
    keywords: [title, ...facets, SITE.name, "case study"],
    authors: [{ name: SITE.name, url: SITE.url }],
    alternates: { canonical: path(slug) },
    openGraph: {
      type: "article",
      url: path(slug),
      siteName: SITE.name,
      locale: "en_US",
      description,
      authors: [SITE.url],
      // no publishedTime: only the year is known, and a made-up day would be wrong
      tags: facets,
    },
    twitter: { card: "summary_large_image", creator: "@exx0dvs", description },
  };
}

/** schema.org CreativeWork for the case study, authored by the site's Person. */
export function ProjectStructuredData({ slug, title, description }: ProjectSeo) {
  const project = PROJECTS.find((p) => p.slug === slug);
  const facets = getDictionary("en").work.projects[slug]?.facets ?? [];
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE.url}${path(slug)}#work`,
    name: title,
    headline: `${title} — case study`,
    description,
    url: `${SITE.url}${path(slug)}`,
    image: cardUrl(slug),
    inLanguage: "en",
    ...(project?.since && { dateCreated: String(project.since) }),
    keywords: facets.join(", "),
    author: { "@id": SITE.personId },
    creator: { "@id": SITE.personId },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };
  // escape "<" so no string in the data can close the <script> early
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
