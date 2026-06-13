import Link from "next/link";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";
import { ImageSlot } from "@/components/ui/image-slot";

import {
  ArchDiagram,
  FeatureGrid,
  Gallery,
  NextProjectLink,
  ProjectHero,
  SectionLabel,
} from "../_components";

const ACCENT = { color: "var(--accent)" } as const;

export default function ExdbotsPage() {
  return (
    <>
      <main className="shell">
        <ProjectHero
          icon="E"
          name="ExdBots"
          tagline="A platform for building and running Telegram applications — design bots in a no-code web editor, connect existing ones, and manage ads, analytics, and monitoring from a single console."
          meta={[
            { key: "Year", value: "2026 — present" },
            { key: "Role", value: "Solo — design & engineering" },
            { key: "Type", value: "Developer platform" },
          ]}
          openness={{ tone: "source", label: "Source-available" }}
          actions={[
            { variant: "primary", label: "View the org", href: "https://github.com/ExdBots", external: true },
            { variant: "ghost", label: "See architecture", href: "#architecture" },
          ]}
        />

        <section className="card">
          <div className="p-cover">
            <ImageSlot
              shape="rect"
              placeholder="Drop a cover screenshot (console / editor)"
              style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16/9" }}
            />
          </div>
        </section>

        <section className="card">
          <SectionLabel num="01">Overview</SectionLabel>
          <Reveal className="prose">
            <p className="lead-q">
              Most bot frameworks make you choose between a quick script and a real product. ExdBots
              is the second thing — the tooling I wished existed when I was hand-rolling bots.
            </p>
            <p style={{ marginTop: 18 }}>
              ExdBots is a platform for people who build on Telegram. It bundles the parts that every
              serious bot ends up needing — a typed UI layer, reusable mini-app blocks, an SDK, and a
              management console — so a bot can grow from a weekend project into something with real
              users without a rewrite.
            </p>
            <p>
              The web console acts as the control center: you assemble bot flows, connect bots you
              already run, and watch analytics, ad performance, and health in one place. It grew
              directly out of{" "}
              <Link href="/projects/exd-tiktok-bot" style={ACCENT}>
                exd-tiktok-bot
              </Link>{" "}
              — the patterns that worked there became the foundation here.
            </p>
          </Reveal>
        </section>

        <section className="card">
          <SectionLabel num="02">What&#8217;s inside</SectionLabel>
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
        </section>

        <section className="card" id="architecture">
          <SectionLabel num="03">Architecture</SectionLabel>
          <div style={{ marginBottom: 22 }}>
            <Reveal className="prose">
              <p>
                A bot definition is authored once and runs two ways — as a chat interface and as a
                Mini App — over a shared SDK and data layer.
              </p>
            </Reveal>
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
        </section>

        <section className="card">
          <SectionLabel num="04">How it was built</SectionLabel>
          <Reveal className="prose">
            <p>
              The platform started as extraction, not invention. After shipping several bots by hand,
              the same primitives kept reappearing — a menu system, per-user state, a way to render
              the same flow in chat and in a web view. I pulled those into an SDK, then built the
              console on top of it.
            </p>
            <p>
              The hardest design problem was the <strong>dual surface</strong>: the same bot has to
              feel right as a chat conversation and as a Mini App. The fix was to treat the UI as a
              component model that both renderers consume, so a flow authored once stays consistent
              everywhere.
            </p>
            <p>
              It&#8217;s built in TypeScript end to end — Next.js for the console, the SDK and UI
              packages published under the{" "}
              <a href="https://github.com/ExdBots" target="_blank" rel="noopener" style={ACCENT}>
                @exdbots
              </a>{" "}
              org, Postgres for storage. Parts are being opened up as they stabilize.
            </p>
          </Reveal>
        </section>

        <section className="card">
          <SectionLabel num="05">Gallery</SectionLabel>
          <Gallery
            items={[
              { placeholder: "Console / dashboard", wide: true },
              { placeholder: "Bot editor" },
              { placeholder: "Mini App view" },
            ]}
          />
        </section>

        <NextProjectLink name="Giga Psych" href="/projects/giga-psych" />
      </main>
      <NavDots />
    </>
  );
}
