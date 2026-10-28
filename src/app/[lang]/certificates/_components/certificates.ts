import type { TechId } from "@/lib/tech";

import previews from "./certificate-previews.json";
import data from "./certificates.json";

/** A credential as written in certificates.json. */
interface CertificateEntry {
  /** Course / certification title, kept in its original English. */
  title: string;
  /** The issuing platform, from the tech registry (its name and logo).
   *  Courses without a known platform omit it. */
  issuer?: TechId;
  /** The public course / verification page. Plain entries omit it. */
  href?: string;
  /** Overrides the scraped description (for hosts that block scraping). */
  description?: string;
}

export interface Certificate extends CertificateEntry {
  id: string;
  /** Link-preview snapshot from `pnpm links:previews`, for linked entries. */
  preview?: { title?: string; description?: string; site: string; image?: string };
}

/** Credentials in display order: certificates.json is the single list, and
 *  `pnpm links:previews` snapshots each linked course's page beside it. */
export const CERTIFICATES: Certificate[] = Object.entries(
  data as Record<string, CertificateEntry>,
).map(([id, entry]) => ({
  id,
  ...entry,
  preview: (previews as Record<string, Certificate["preview"]>)[id],
}));
