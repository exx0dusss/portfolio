export interface Certificate {
  /** Course / certification title. */
  title: string;
  /** Issuing platform — shown as the issuer badge. */
  issuer: string;
  /** simpleicons slug for the issuer's brand glyph, when one exists. */
  badgeIcon?: string;
  /** External course / verification URL. Plain-text entries omit this. */
  href?: string;
  imageUrl?: string;
}

/** Credentials list, mirroring the prototype's `.creds` order exactly.
 *  The first four link out (with issuer badges); the last three are plain. */
export function certificateFromCms(certificate: import("@/lib/cms/types").CmsCertificate): Certificate {
  return {
    title: certificate.title,
    issuer: certificate.issuer,
    badgeIcon: certificate.badgeIcon,
    href: certificate.href ?? certificate.file?.asset?.url,
    imageUrl: certificate.image?.asset?.url,
  };
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "Next.js App Router Fundamentals",
    issuer: "Vercel",
    badgeIcon: "vercel",
    href: "https://nextjs.org/learn/dashboard-app",
  },
  {
    title: "React Foundations for Next.js",
    issuer: "Vercel",
    badgeIcon: "vercel",
    href: "https://nextjs.org/learn/react-foundations",
  },
  {
    title: "NestJS: Zero to Hero — Modern TypeScript Back-end",
    issuer: "Udemy",
    badgeIcon: "udemy",
    href: "https://www.udemy.com/course/nestjs-zero-to-hero/",
  },
  {
    title: "The Complete SQL Bootcamp: Zero to Hero",
    issuer: "Udemy",
    badgeIcon: "udemy",
    href: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
  },
  { title: "React — Full Course, Redux & Redux Toolkit", issuer: "Course" },
  { title: "Understanding NPM — Node.js Package Manager", issuer: "Course" },
  { title: "Introduction to Programming Using JavaScript", issuer: "Course" },
];
