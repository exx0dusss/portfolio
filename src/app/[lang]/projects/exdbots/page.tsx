import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocaleLink } from "@/components/locale-link";
import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { ImageSlot } from "@/components/ui/image-slot";
import { hasLocale } from "@/i18n";

import {
  ArchDiagram,
  FeatureGrid,
  Gallery,
  NextProjectLink,
  ProjectCover,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
} from "../_components";

const SEO = {
  slug: "exdbots",
  title: "ExdBots",
  description:
    "A platform for building and running Telegram apps: design bots in a no-code editor, connect existing ones, and run ads, analytics and monitoring from one console.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function ExdbotsPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      <PageShell lang="en">
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="ExdBots"
          tagline="A platform for building and running Telegram applications — design bots in a no-code web editor, connect existing ones, and manage ads, analytics, and monitoring from a single console."
          meta={[
            { key: "Year", value: "2026 — present" },
            { key: "Role", value: "Solo — design & engineering" },
            { key: "Type", value: "Developer platform" },
          ]}
          openness={{ tone: "source", label: "Source-available" }}
          actions={[{ variant: "primary", label: "See architecture", href: "#architecture" }]}
        />

        <Section>
          <ProjectCover>
            <ImageSlot
              shape="rect"
              placeholder="Drop a cover screenshot (console / editor)"
              className="aspect-video h-auto w-full"
            />
          </ProjectCover>
        </Section>

        <Section>
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="max-w-tagline">
              Most bot frameworks make you choose between a quick script and a real product. ExdBots
              is the second thing — the tooling I wished existed when I was hand-rolling bots.
            </p>
            <p style={{ marginTop: 18 }}>
              ExdBots is a platform for people who build on Telegram. It bundles the parts that
              every serious bot ends up needing — a typed UI layer, reusable mini-app blocks, an
              SDK, and a management console — so a bot can grow from a weekend project into
              something with real users without a rewrite.
            </p>
            <p>
              The web console acts as the control center: you assemble bot flows, connect bots you
              already run, and watch analytics, ad performance, and health in one place. It grew
              directly out of{" "}
              <LocaleLink href="/projects/exd-downloader-app" className="text-accent">
                ExdDownloaderApp
              </LocaleLink>{" "}
              — the patterns that worked there became the foundation here.
            </p>
          </Prose>
        </Section>

        <Section>
          <SectionLabel>What&#8217;s inside</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "UI",
                title: "Component library",
                description:
                  "A Telegram-native UI layer built on shadcn/ui patterns — chat-based views and a custom React renderer share the same component model.",
              },
              {
                fn: "SDK",
                title: "Bot SDK & packages",
                description:
                  "Internal libraries that handle menus, state, and flow — typed end to end so the editor and hand-written code stay in sync.",
              },
              {
                fn: "App",
                title: "Mini-app blocks",
                description:
                  "Drop-in blocks for Telegram Mini Apps so a bot can present a full web view, not just chat.",
              },
              {
                fn: "Ops",
                title: "Console & analytics",
                description:
                  "A CRM-style console for managing bots, monitoring health, and tracking ads and usage across projects.",
              },
            ]}
          />
        </Section>

        <Section id="architecture">
          <SectionLabel>Architecture</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                A bot definition is authored once and runs two ways — as a chat interface and as a
                Mini App — over a shared SDK and data layer.
              </p>
            </Prose>
          </div>
          <ArchDiagram
            columns={[
              {
                title: "Author",
                nodes: [
                  { title: "Web Console", sub: "no-code editor", accent: true },
                  { title: "Bot definition", sub: "typed config" },
                ],
              },
              {
                title: "SDK / Runtime",
                nodes: [
                  { title: "@exdbots/sdk", sub: "menus · state · flow" },
                  { title: "UI library", sub: "shadcn-based" },
                ],
              },
              {
                title: "Surfaces",
                nodes: [
                  { title: "Chat UI", sub: "Telegram Bot API" },
                  { title: "Mini App", sub: "React web view" },
                ],
              },
              {
                title: "Data",
                nodes: [
                  { title: "PostgreSQL", sub: "bots · users · events" },
                  { title: "Analytics", sub: "ads · monitoring" },
                ],
              },
            ]}
            note="// one definition → chat + mini-app, one SDK, one data layer"
          />
        </Section>

        <Section>
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              The platform started as extraction, not invention. After shipping several bots by
              hand, the same primitives kept reappearing — a menu system, per-user state, a way to
              render the same flow in chat and in a web view. I pulled those into an SDK, then built
              the console on top of it.
            </p>
            <p>
              The hardest design problem was the <strong>dual surface</strong>: the same bot has to
              feel right as a chat conversation and as a Mini App. The fix was to treat the UI as a
              component model that both renderers consume, so a flow authored once stays consistent
              everywhere.
            </p>
            <p>
              It&#8217;s built in TypeScript end to end — Next.js for the console, the SDK and UI as
              their own packages, Postgres for storage.
            </p>
          </Prose>
        </Section>

        <Section>
          <SectionLabel>Gallery</SectionLabel>
          <Gallery
            items={[
              { placeholder: "Console / dashboard", wide: true },
              { placeholder: "Bot editor" },
              { placeholder: "Mini App view" },
            ]}
          />
        </Section>

        <NextProjectLink name="Kosmetik Profi" href="/projects/kosmetik-profi" />
      </PageShell>
    </>
  );
}
