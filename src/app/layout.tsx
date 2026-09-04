import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";

import { SiteDock } from "@/components/layout/site-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { getCmsSiteSettings } from "@/lib/cms/repository";
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getCmsSiteSettings();
  const name = settings?.name ?? "Tymur Mustafaiev";

  return {
    title: {
      default: settings?.seoTitle ?? `${name} — Developer & Designer`,
      template: `%s · ${name}`,
    },
    description:
      settings?.seoDescription ??
      "Tymur Mustafaiev — a Warsaw-based front-end developer and UX/UI designer working across the stack in TypeScript.",
    keywords: [name, "frontend developer", "design engineer", "TypeScript", "Warsaw"],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getCmsSiteSettings();
  const name = settings?.name;

  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${caveat.variable}`}
      >
        <SiteNav name={name} />
        {children}
        <SiteFooter name={name} />
        <SiteDock name={name} email={settings?.email} socials={settings?.socials} />
      </body>
    </html>
  );
}
