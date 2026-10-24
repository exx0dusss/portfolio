import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";

import { SiteDock } from "@/components/layout/site-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { SITE } from "@/lib/site";
import "@/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat-handwriting",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Polish-Japanese Academy of Information Technologies",
  },
  sameAs: SITE.sameAs,
  knowsAbout: SITE.knowsAbout,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${caveat.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <SiteNav />
        {children}
        <SiteFooter />
        <SiteDock />
      </body>
    </html>
  );
}
