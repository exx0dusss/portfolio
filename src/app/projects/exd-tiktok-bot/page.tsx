import Link from "next/link";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import {
  ArchDiagram,
  FeatureGrid,
  NextProjectLink,
  ProjectHero,
  SectionLabel,
} from "../_components";

const ACCENT = { color: "var(--accent)" } as const;

export default function ExdTiktokBotPage() {
  return (
    <>
      <main className="shell">
        <ProjectHero
          icon="t"
          name="exd-tiktok-bot"
          tagline="A Telegram bot that downloads TikTok videos — and the project where the ExdBots system design was born."
          meta={[
            { key: "Year", value: "2023 — present" },
            { key: "Role", value: "Solo" },
            { key: "Type", value: "Telegram bot" },
          ]}
          openness={{ tone: "open", label: "Open source" }}
          actions={[
            {
              variant: "primary",
              label: "View on GitHub",
              href: "https://github.com/exx0dusss",
              external: true,
            },
          ]}
        />

        <section className="card">
          <SectionLabel num="01">Overview</SectionLabel>
          <Reveal className="prose">
            <p className="lead-q">
              It looks simple — send a link, get a video. Under the hood it&#8217;s where I figured out
              how to structure a bot that could actually grow.
            </p>
            <p style={{ marginTop: 18 }}>
              exd-tiktok-bot does one job well: you send it a TikTok link and it returns the video.
              But it was written before the agentic-engineering era, by hand, and it became my testing
              ground for <strong>system design</strong> — the menu system, the per-user state, the way
              flows are structured.
            </p>
            <p>
              Those patterns worked well enough that I pulled them out into reusable libraries. The
              SDK idea and the internal packages that now power{" "}
              <Link href="/projects/exdbots" style={ACCENT}>
                ExdBots
              </Link>{" "}
              all started here. It&#8217;s the template the platform grew from.
            </p>
          </Reveal>
        </section>

        <section className="card">
          <SectionLabel num="02">Highlights</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "UX",
                title: "Menu system",
                description:
                  "A structured, navigable menu — some of the best UX you'll find in a Telegram bot, and the seed of the ExdBots UI model.",
              },
              {
                fn: "Core",
                title: "Strong back-end",
                description:
                  "A solid back-end and system design I keep improving — robust enough to keep running and extend years later.",
              },
              {
                fn: "Origin",
                title: "Birthplace of the SDK",
                description:
                  "The internal libraries and the SDK concept behind ExdBots were first written and proven here.",
              },
              {
                fn: "Open",
                title: "Fully open source",
                description:
                  "The code is public — a real, readable example of how I structure a bot from scratch.",
              },
            ]}
          />
        </section>

        <section className="card" id="architecture">
          <SectionLabel num="03">Architecture</SectionLabel>
          <div style={{ marginBottom: 22 }}>
            <Reveal className="prose">
              <p>
                A small, deliberate pipeline: the menu/state core is the part that later generalized
                into the SDK.
              </p>
            </Reveal>
          </div>
          <ArchDiagram
            columns={[
              {
                title: "Input",
                nodes: [
                  { title: "Telegram update", sub: "message / link" },
                  { title: "Menu & state", sub: "→ became the SDK", accent: true },
                ],
              },
              {
                title: "Work",
                nodes: [
                  { title: "Resolver", sub: "parse TikTok URL" },
                  { title: "Downloader", sub: "fetch video" },
                ],
              },
              {
                title: "Output",
                nodes: [{ title: "Delivery", sub: "send to chat" }],
              },
            ]}
            note="// the menu/state core is what generalized into @exdbots"
          />
        </section>

        <section className="card">
          <SectionLabel num="04">How it was built</SectionLabel>
          <Reveal className="prose">
            <p>
              This one was written the old way — no agents, no scaffolding, just figuring it out. That
              constraint is exactly why it matters to me: every structural decision was deliberate,
              because I had to make it myself.
            </p>
            <p>
              The breakthrough was realizing the menu and state handling weren&#8217;t specific to
              TikTok at all — they were a general way to run any bot. Recognizing that, and extracting
              it cleanly, is what turned a single bot into the foundation for a platform.
            </p>
          </Reveal>
        </section>

        <NextProjectLink name="ExdBots" href="/projects/exdbots" />
      </main>
      <NavDots />
    </>
  );
}
