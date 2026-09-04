import * as z from "zod";
import type { PortableTextBlock } from "@portabletext/types";

import { cmsFetch } from "./client";
import {
  booksQuery,
  certificatesQuery,
  educationQuery,
  experiencesQuery,
  pageBySlugQuery,
  projectBySlugQuery,
  projectsQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  CmsBook,
  CmsCertificate,
  CmsPage,
  CmsProject,
  CmsSiteSettings,
  CmsTimelineEntry,
} from "./types";

const portableTextBlock = z.custom<PortableTextBlock>();

const cmsProjectSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  order: z.number().optional(),
  icon: z.string().optional(),
  year: z.string().optional(),
  kind: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  role: z.string().optional(),
  type: z.string().optional(),
  opennessTone: z.enum(["open", "source", "client", "nda"]).optional(),
  opennessLabel: z.string().optional(),
  tags: z.array(z.string()).optional(),
  githubUrl: z.string().optional(),
  githubLabel: z.string().optional(),
  architectureIntro: z.string().optional(),
  architectureNote: z.string().optional(),
  noticeTitle: z.string().optional(),
  noticeBody: z.string().optional(),
  nextProjectName: z.string().optional(),
  nextProjectSlug: z.string().optional(),
  downloads: z.array(z.object({
    label: z.string(),
    file: z.object({ asset: z.object({ _id: z.string(), url: z.url(), originalFilename: z.string().optional() }).optional() }).optional(),
  })).optional(),
  cover: z.object({ asset: z.object({ _id: z.string(), url: z.string() }).optional() }).optional(),
  features: z.array(z.object({ label: z.string().optional(), title: z.string(), description: z.string().optional() })).optional(),
  architecture: z.array(z.object({
    title: z.string(),
    nodes: z.array(z.object({ title: z.string(), sub: z.string().optional(), accent: z.boolean().optional() })).optional(),
  })).optional(),
  overview: z.array(portableTextBlock).optional(),
  buildNotes: z.array(portableTextBlock).optional(),
  gallery: z.array(z.object({ asset: z.object({ _id: z.string(), url: z.string() }).optional() })).optional(),
});

const cmsSiteSettingsSchema = z.object({
  name: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  eyebrow: z.string().optional(),
  headline: z.string().optional(),
  intro: z.string().optional(),
  about: z.array(portableTextBlock).optional(),
  contactHeading: z.string().optional(),
  contactIntro: z.string().optional(),
  availability: z.string().optional(),
  location: z.string().optional(),
  email: z.string().optional(),
  portrait: z.object({ asset: z.object({ _id: z.string(), url: z.string() }).optional() }).optional(),
  resume: z.object({ asset: z.object({ _id: z.string(), url: z.string(), originalFilename: z.string().optional() }).optional() }).optional(),
  stack: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  socials: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
});

const cmsPageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  eyebrow: z.string().optional(),
  heading: z.string(),
  lead: z.string().optional(),
});

const cmsTimelineSchema = z.object({
  _id: z.string(),
  year: z.string(),
  where: z.string().optional(),
  role: z.string(),
  company: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const cmsCertificateSchema = z.object({
  _id: z.string(),
  title: z.string(),
  issuer: z.string(),
  badgeIcon: z.string().optional(),
  href: z.string().optional(),
  file: z.object({ asset: z.object({ _id: z.string(), url: z.url(), originalFilename: z.string().optional() }).optional() }).optional(),
  image: z.object({ asset: z.object({ _id: z.string(), url: z.string() }).optional() }).optional(),
});

const cmsBookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  author: z.string(),
  sourceLabel: z.string().optional(),
  href: z.url(),
  cover: z.object({ asset: z.object({ _id: z.string(), url: z.url() }).optional() }).optional(),
});

function omitNullFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(omitNullFields);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, child]) => child !== null)
      .map(([key, child]) => [key, omitNullFields(child)]),
  );
}

function parseCmsData<Result>(schema: z.ZodType<Result>, value: unknown): Result | null {
  const parsed = schema.safeParse(omitNullFields(value));
  if (parsed.success) return parsed.data;

  console.error("Sanity content failed validation", parsed.error);
  return null;
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  const result = await cmsFetch<unknown>(pageBySlugQuery, { slug });
  if (!result) return null;
  return parseCmsData(cmsPageSchema, result);
}

export async function getCmsProjects(): Promise<CmsProject[] | null> {
  const result = await cmsFetch<unknown[]>(projectsQuery);
  if (!result) return null;
  return parseCmsData(z.array(cmsProjectSchema), result);
}

export async function getCmsProject(slug: string): Promise<CmsProject | null> {
  const result = await cmsFetch<unknown>(projectBySlugQuery, { slug });
  if (!result) return null;
  return parseCmsData(cmsProjectSchema, result);
}

export async function getCmsSiteSettings(): Promise<CmsSiteSettings | null> {
  const result = await cmsFetch<unknown>(siteSettingsQuery);
  if (!result) return null;
  return parseCmsData(cmsSiteSettingsSchema, result);
}

export async function getCmsExperiences(): Promise<CmsTimelineEntry[] | null> {
  const result = await cmsFetch<unknown[]>(experiencesQuery);
  if (!result) return null;
  return parseCmsData(z.array(cmsTimelineSchema), result);
}

export async function getCmsEducation(): Promise<CmsTimelineEntry[] | null> {
  const result = await cmsFetch<unknown[]>(educationQuery);
  if (!result) return null;
  return parseCmsData(z.array(cmsTimelineSchema), result);
}

export async function getCmsCertificates(): Promise<CmsCertificate[] | null> {
  const result = await cmsFetch<unknown[]>(certificatesQuery);
  if (!result) return null;
  return parseCmsData(z.array(cmsCertificateSchema), result);
}

export async function getCmsBooks(): Promise<CmsBook[] | null> {
  const result = await cmsFetch<unknown[]>(booksQuery);
  if (!result) return null;
  return parseCmsData(z.array(cmsBookSchema), result);
}
