import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { TechLink } from "@/components/tech-link";
import { hasLocale } from "@/i18n";

import {
  DesignNote,
  FeatureGrid,
  Gallery,
  GalleryCover,
  NextProjectLink,
  OpenGalleryButton,
  ProjectBanner,
  ProjectCover,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
  projectTheme,
} from "../_components";

/** The cover is also the first gallery slide, so all nine screenshots open together.
 *  Screenshots are of the console running on its own mock data. */
const COVER = {
  placeholder: "All bots",
  src: "/projects/exdbots/cover.webp",
  alt: "The ExdBots console's workspace overview: nine connected bots as cards, each with its monthly users, the week's change and its connection state, from healthy to not reporting and token revoked",
};

const SEO = {
  slug: "exdbots",
  title: "ExdBots",
  description:
    "A platform for Telegram bots, in development: connect a bot to one console to monitor it, manage it and build flows, or build a new one with the SDK. A visual no-code constructor is planned, and the platform will be open source at launch.",
};

export const metadata: Metadata = projectMetadata(SEO);

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
          faviconFilled
          tagline="A platform for Telegram bots: connect a bot to one console to monitor it, manage it and build flows, or build a new one with the SDK. It is in development."
          meta={[
            { key: "Year", value: "2026 — present", sub: "started in March 2026" },
            { key: "Role", value: "Solo full-stack", sub: "console, SDK and bot contract" },
            { key: "Type", value: "Platform", sub: "console, SDK packages, CLI" },
            { key: "Status", value: "In development", sub: "open source at launch" },
          ]}
          openness={{ tone: "source", label: "Open source at launch" }}
          stack={[
            "tanstack-start",
            "react",
            "base-ui",
            "tanstack-query",
            "trpc",
            "hono",
            "drizzle",
            "postgresql",
            "redis",
            "better-auth",
            "bun",
            "deno",
            "grammy",
            "openapi",
            "zod",
            "docker",
          ]}
          extraActions={<OpenGalleryButton count={9} />}
        />

        <Section>
          <ProjectCover>
            <GalleryCover cover={COVER} />
          </ProjectCover>
        </Section>

        <Section id="overview">
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="max-w-tagline">
              ExdBots grew out of ExdDownloadApp. Running one bot for 90,000 people meant building
              its statistics, broadcasts, user management and monitoring by hand, inside the bot.
              ExdBots takes those parts out, so that any Telegram bot can have them.
            </p>
            <p style={{ marginTop: 18 }}>
              It has two sides. The <strong>console</strong> is a web app where a team sees all its
              bots in one place. The <strong>SDK</strong> is the set of packages those bots are
              built from, the same layers ExdDownloadApp runs on.
            </p>
            <p>
              <strong>It is in development.</strong> The console and the SDK work and I use them
              with my own bots, but the platform isn’t open to the public yet. It will be open
              source when it launches. The screenshots here show the console on mock data: the bots,
              people and numbers are made up.
            </p>
          </Prose>
        </Section>

        <Section id="features">
          <SectionLabel>What it does</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "Connect",
                title: "Any bot, through one contract",
                description:
                  "A bot joins the console through the connect package: a small, documented API the bot exposes. It doesn’t depend on a bot framework, so an existing bot in any language can implement it.",
              },
              {
                fn: "Monitor",
                title: "See every bot at once",
                description:
                  "A workspace shows all its bots with their monthly users and state: healthy, not reporting, unreachable or token revoked. Each bot has its status, incidents and a live trace of the updates it handled.",
              },
              {
                fn: "Manage",
                title: "Run the bot from the console",
                description:
                  "Users and groups, broadcasts, required subscriptions, referrals and Premium tiers, with analytics for audience, retention and revenue.",
              },
              {
                fn: "Flows",
                title: "Automations without a deploy",
                description:
                  "Triggers react to what happens in the bot, such as a first message, a week of silence or a block, and answer with a message, a tag, a campaign or a webhook.",
              },
              {
                fn: "SDK",
                title: "Build on existing layers",
                description:
                  "New bots start from the SDK: 37 packages for the layers every bot needs, from users, menus and i18n to broadcasts, ads and Premium, with a CLI that scaffolds a project.",
              },
              {
                fn: "Planned",
                title: "A visual no-code constructor",
                description:
                  "Next is an editor where a bot’s flows are drawn as a graph and run without writing code. It isn’t built yet.",
              },
            ]}
          />
        </Section>

        <Section id="gallery">
          <SectionLabel>Gallery</SectionLabel>
          <Gallery
            cover={COVER}
            items={[
              {
                placeholder: "A bot",
                wide: true,
                src: "/projects/exdbots/bot.webp",
                alt: "A bot’s page in the console: its profile and connection, totals for users, daily users and Premium, a feed of live events and the audience beside it",
              },
              {
                placeholder: "Activity and trace",
                src: "/projects/exdbots/bot-monitor.webp",
                alt: "Activity & Trace: every update the bot handled as a list, filtered by type, each one opening its full trace",
              },
              {
                placeholder: "Triggers",
                src: "/projects/exdbots/bot-automation.webp",
                alt: "Automation triggers: a welcome series, a day-3 onboarding tip, a win-back after a week and others, each with its event and action",
              },
              {
                placeholder: "Bot analytics",
                src: "/projects/exdbots/bot-analytics.webp",
                alt: "A bot’s analytics as a table: daily users, new users, retention, messages, commands and revenue for today, 7, 30 and 365 days",
              },
              {
                placeholder: "Workspace analytics",
                src: "/projects/exdbots/ws-analytics.webp",
                alt: "Workspace analytics: daily and monthly users, session length and retention above a 30-day chart, with top commands and languages",
              },
              {
                placeholder: "Status",
                src: "/projects/exdbots/bot-status.webp",
                alt: "A bot’s status: its connection, version and mode, API reachability and latency, the day’s restarts and an incidents timeline",
              },
              {
                placeholder: "Users",
                src: "/projects/exdbots/bot-users.webp",
                alt: "A bot’s users: totals for active, admins and banned above a searchable list",
              },
              {
                placeholder: "Connect a bot",
                src: "/projects/exdbots/connect.webp",
                alt: "The Connect dialog: start a new bot, or add an environment to one already connected",
              },
            ]}
          />
        </Section>

        <Section id="how-it-was-built">
          <SectionLabel>How it’s built</SectionLabel>
          <Prose>
            <p>
              One monorepo holds the console, the SDK packages and the tooling. The console is a{" "}
              <TechLink id="tanstack-start" /> app on <TechLink id="react" />, talking over{" "}
              <TechLink id="trpc" /> to an API on <TechLink id="hono" /> and <TechLink id="bun" />,
              with <TechLink id="drizzle" /> on <TechLink id="postgresql" />,{" "}
              <TechLink id="redis" /> and <TechLink id="better-auth" /> for accounts and workspaces.
            </p>
            <p>
              Bots are separate programs. The SDK builds them on <TechLink id="grammy" /> and{" "}
              <TechLink id="deno" />, and the console reaches each one through the contract, an{" "}
              <TechLink id="openapi" /> description checked with <TechLink id="zod" />. Keeping the
              contract apart from the SDK is the decision the rest follows from: the console never
              assumes how a bot was written.
            </p>
            <p>
              The console has a full mock mode, with every API answered in the browser from seeded
              data. It is how the interface is developed without a running backend, and where these
              screenshots come from.
            </p>
          </Prose>
        </Section>

        <Section id="design">
          <SectionLabel>Design</SectionLabel>
          <DesignNote
            callout="This page uses ExdBots’ own Telegram blue."
            swatches={[
              { name: "Telegram blue", hex: "#3390ec" },
              { name: "Pressed blue", hex: "#1d77c2" },
              { name: "Sky tint", hex: "#dcedfd" },
              { name: "Night navy", hex: "#17212b" },
            ]}
          >
            <p>
              The console is built to feel like a part of Telegram, so it borrows Telegram’s blue
              for its buttons and its night navy for dark panels. The gradient behind the title is
              that blue fading into a sky tint, and into the navy in the dark theme.
            </p>
          </DesignNote>
        </Section>

        <NextProjectLink name="Kosmetik Profi" href="/projects/kosmetik-profi" />
      </PageShell>
    </>
  );
}
