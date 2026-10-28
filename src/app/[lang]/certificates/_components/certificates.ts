import type { TechId } from "@/lib/tech";

import images from "./certificate-images.json";
import data from "./certificates.json";

/** A credential as written in certificates.json (the LinkedIn list). */
interface CertificateEntry {
  /** Title as printed on the certificate. */
  title: string;
  /** The issuing platform, from the tech registry (its name and logo). */
  issuer: TechId;
  /** Year and month, "2025-06". */
  issued: string;
  credentialId: string;
  /** The public credential page. */
  href: string;
  /** Source of the certificate image, saved by `pnpm certificates:images`. */
  image: string;
  /** Course length in hours, as printed on the certificate. */
  hours?: number;
  skills: string[];
  /** The issuer has rewritten the course since. */
  outdated?: boolean;
}

export interface Certificate extends Omit<CertificateEntry, "image"> {
  id: string;
  /** The saved certificate image, with its size. */
  image?: { src: string; width: number; height: number };
}

/** Credentials in display order, newest first. */
export const CERTIFICATES: Certificate[] = Object.entries(
  data as Record<string, CertificateEntry>,
).map(([id, entry]) => ({
  ...entry,
  id,
  image: (images as Record<string, Certificate["image"]>)[id],
}));
