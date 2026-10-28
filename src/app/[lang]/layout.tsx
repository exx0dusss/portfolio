import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { getDictionary, hasLocale, LOCALES, OG_LOCALE } from "@/i18n";
import { SITE } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "@/styles/globals.css";

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(SITE.url),
    title: { default: dict.meta.title, template: `%s — ${dict.name}` },
    description: dict.meta.description,
    openGraph: { type: "website", siteName: dict.name, locale: OG_LOCALE[lang] },
    twitter: { card: "summary_large_image", creator: "@exx0dvs" },
    verification: { google: "uCjQlgPj32rIfxEi3FCAIj8jYjtoKdYXanH7NP6Peyk" },
  };
}

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: ["Тимур Мустафаєв", "Тимур Мустафаев"],
  url: SITE.url,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Polish-Japanese Academy of Information Technologies",
  },
  knowsLanguage: ["en", "uk", "ru", "pl", "ja"],
  sameAs: SITE.sameAs,
  knowsAbout: SITE.knowsAbout,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    // font variables go on <html>: the stacks in globals.css are declared on
    // :root, and var() resolves where the custom property is defined
    // suppressHydrationWarning: THEME_SCRIPT may set data-theme before React hydrates
    <html lang={lang} className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        {/* beforeInteractive: Next injects this into the server HTML's <head> so
            a saved theme applies before paint (a raw <script> in a component
            is flagged by React and never runs on client renders) */}
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <SiteNav lang={lang} dict={dict.nav} name={dict.name} />
        {children}
        <SiteFooter lang={lang} dict={dict.footer} name={dict.name} />
      </body>
    </html>
  );
}
