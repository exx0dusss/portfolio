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
  slug: "exdbots",
  title: "ExdBots",
  description:
    "A platform for building and running Telegram apps: design bots in a no-code editor, connect existing ones, and run ads, analytics and monitoring from one console.",
};

export const metadata: Metadata = projectMetadata(SEO);

/** Still in development: the project's colours, the hero and a note that
 *  its case study will follow. */
export default async function ExdbotsPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* ExdBots' own Telegram palette (packages/theme/src/tokens.css): the
          blue of its buttons fading into a sky tint for light, into its
          night-navy panels for dark */}
      <ProjectBanner
        colors={{
          light: ["#8cc4f6", "#dcedfd", "#b3d8fa", "#ffffff"],
          dark: ["#1d77c2", "#2b5278", "#17212b", "#0c0c0c"],
        }}
        pattern={{ offsetX: 0.2, offsetY: -0.05, rotation: -20 }}
      />
      {/* accents in ExdBots' Telegram blue #3390ec: shapes 3.3:1 on white,
          its pressed #1d77c2 for text 4.7:1; on dark the blue and its hover
          #52a4f0 */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#3390ec", ink: "#1d77c2" },
          dark: { accent: "#3390ec", ink: "#52a4f0" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="ExdBots"
          favicon="/projects/exdbots/favicon.png"
          tagline="A platform for building and running Telegram applications — design bots in a no-code web editor, connect existing ones, and manage ads, analytics, and monitoring from a single console."
          meta={[{ key: "Status", value: "In development" }]}
          openness={{ tone: "source", label: "Source-available" }}
        />

        <CaseStudyEmpty name="ExdBots" />

        <NextProjectLink name="Kosmetik Profi" href="/projects/kosmetik-profi" />
      </PageShell>
    </>
  );
}
