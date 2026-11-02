import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page";
import { hasLocale } from "@/i18n";

import {
  CaseStudyEmpty,
  NextProjectLink,
  ProjectBanner,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
  projectTheme,
} from "../_components";

const SEO = {
  slug: "salonsvitlo",
  title: "SalonSvitlo",
  description:
    "A full-stack e-commerce product for a lighting business with 20+ years in the trade — its storefront, landing and Telegram bot.",
};

export const metadata: Metadata = projectMetadata(SEO);

/** Still in development: the project's colours, the hero and a note that
 *  its case study will follow. */
export default async function SalonSvitloPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* the storefront's palette (mylamp, design-tokens.md): its mustard
          glowing over white and the page's warm grey; graphite for dark */}
      <ProjectBanner
        colors={{
          light: ["#e9c60b", "#f8ecaa", "#ebeae8", "#ffffff"],
          dark: ["#a38700", "#3a3632", "#2b2825", "#0c0c0c"],
        }}
        pattern={{ offsetX: 0.05, offsetY: -0.2, rotation: 10 }}
      />
      {/* accents in the storefront's mustard #e9c60b: a deeper #a38700 for
          shapes (3.5:1 on white) and its own #7a6500 for text (5.7:1); the
          mustard itself and its hover #fdda1f on dark */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#a38700", ink: "#7a6500" },
          dark: { accent: "#e9c60b", ink: "#fdda1f" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="SalonSvitlo"
          favicon="/projects/salonsvitlo/favicon.png"
          faviconFilled
          tagline="A full-stack e-commerce product for a lighting business with 20+ years in the trade — its storefront, landing and Telegram bot."
          meta={[{ key: "Status", value: "In development" }]}
          openness={{ tone: "client", label: "Client work · private" }}
        />

        <CaseStudyEmpty name="SalonSvitlo" />

        <NextProjectLink name="ExdDownloaderApp" href="/projects/exd-downloader-app" />
      </PageShell>
    </>
  );
}
