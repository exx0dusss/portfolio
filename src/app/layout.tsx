import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";

import { SiteDock } from "@/components/layout/site-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
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
  title: "Tymur Mustafaiev — Full-Stack Developer & Designer",
  description:
    "Tymur Mustafaiev — a Warsaw-based front-end developer and UX/UI designer working across the stack in TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${caveat.variable}`}
      >
        <SiteNav />
        {children}
        <SiteFooter />
        <SiteDock />
      </body>
    </html>
  );
}
