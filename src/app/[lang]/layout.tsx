import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { InlineScript } from "@/components/inline-script";
import { HistoryScroll } from "@/components/layout/history-scroll";
import { RefBeacon } from "@/components/layout/ref-beacon";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { getDictionary, hasLocale, LOCALES, OG_LOCALE } from "@/i18n";
import { SITE } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "@/styles/globals.css";

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
  // referenced as the author of each case study (lib/project-seo)
  "@id": SITE.personId,
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
    // data-scroll-behavior="smooth": globals.css scrolls smoothly for in-page
    // anchors; this tells Next to jump instantly on route changes and
    // back/forward instead (Next 16 no longer does that by default)
    <html
      lang={lang}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* a saved theme applies before first paint, so the other one never
            flashes */}
        <InlineScript html={THEME_SCRIPT} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <HistoryScroll />
        <RefBeacon />
        <SiteNav lang={lang} dict={dict.nav} name={dict.name} />
        {children}
        <SiteFooter lang={lang} dict={dict.footer} name={dict.name} />
        <ScrollToTop label={dict.nav.toTop} />
      </body>
    </html>
  );
}
