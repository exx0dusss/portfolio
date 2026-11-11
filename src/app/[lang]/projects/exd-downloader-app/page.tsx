import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionGroup, SectionLabel } from "@/components/page";
import { StackList } from "@/components/stack-list";
import { Reveal } from "@/components/motion/reveal";
import {
  BooksIcon,
  ChatTextIcon,
  CubeIcon,
  FileTextIcon,
  PencilRulerIcon,
  PlugsConnectedIcon,
  RobotIcon,
  ShieldCheckIcon,
  StackIcon,
  TimerIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import {
  Spec,
  SpecContent,
  SpecDescription,
  SpecIcon,
  SpecList,
  SpecTerm,
  SpecTitle,
} from "@/components/ui/spec-list";
import { TechLink } from "@/components/tech-link";
import { hasLocale } from "@/i18n";

import {
  ComparisonTable,
  DesignNote,
  DrawingGallery,
  FeatureSpecs,
  FeatureGroups,
  Gallery,
  GalleryCover,
  ModuleTable,
  NextProjectLink,
  OpenGalleryButton,
  ProjectBanner,
  ProjectCover,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
  projectTheme,
  SketchDiagram,
  SpeedBars,
  Timeline,
} from "../_components";
import { BotDemo } from "./_components/bot-demo";
import { RichMessageAnatomy } from "./_components/rich-message-anatomy";

/** The cover is also the first gallery slide, so all eight images open together. */
const COVER = {
  placeholder: "Mini App",
  src: "/projects/exd-downloader-app/cover.webp",
  alt: "Three Mini App screens on a phone: Download with recent TikTok downloads, the Library with two playlists, and Stats with 57 downloads in 30 days",
};

const SEO = {
  slug: "exd-downloader-app",
  title: "ExdDownloaderApp",
  description:
    "A Telegram bot and Mini App that downloads TikTok videos without watermarks, plus YouTube, SoundCloud and posts from 12 more platforms. 90,000+ users and over 4 million downloads since 2023.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function ExdDownloaderAppPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* the bot's avatar: mostly black, with the Mini App's red and the
          TikTok cyan glowing through, dissolving into the page */}
      <ProjectBanner
        colors={{
          light: ["#8e8e96", "#ff9a92", "#c9c9ce", "#9feeea", "#ffffff"],
          dark: ["#000000", "#d62a36", "#050505", "#12939b", "#0c0c0c"],
        }}
        pattern={{ offsetX: -0.1, offsetY: -0.15, rotation: 40 }}
      />
      {/* accents in the Mini App's red: AA-checked shades for shapes and text */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#e0262e", ink: "#b31b23" },
          dark: { accent: "#ff5a52", ink: "#ff8a80" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="ExdDownloaderApp"
          favicon="/projects/exd-downloader-app/favicon.png"
          faviconShape="round"
          aka="@TikTokDownloaderExdBot"
          tagline="A Telegram bot that downloads TikTok videos without watermarks, plus YouTube, SoundCloud and 12 more platforms, with a Mini App for your library. My longest-running project: four rewrites since 2023."
          meta={[
            { key: "Year", value: "2023 — present", sub: "rewritten four times" },
            { key: "Users", value: "90K+", sub: "26K active monthly" },
            { key: "Downloads", value: "4 million+", sub: "delivered to chats" },
            { key: "Role", value: "Solo full-stack", sub: "bot, Mini App, hosting" },
          ]}
          difficulty={{ level: 4, label: "Hard" }}
          openness={{ tone: "nda", label: "Own product · closed source" }}
          stack={[
            "deno",
            "grammy",
            "hono",
            "trpc",
            "neverthrow",
            "drizzle",
            "postgresql",
            "redis",
            "bullmq",
            "ffmpeg",
            "react",
            "vite",
            "telegram-bot-api",
            "docker",
            "coolify",
            "sentry",
          ]}
          actions={[
            {
              variant: "primary",
              label: "Open in Telegram",
              href: "https://t.me/ExdDownloadApp",
              external: true,
            },
          ]}
          extraActions={
            <>
              <BotDemo />
              <OpenGalleryButton count={8} />
            </>
          }
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
              Send a link, and the bot sends the video, photos or audio straight back to the chat,
              in the highest quality the platform offers: a TikTok without its watermark, a YouTube
              video up to 8K, a SoundCloud track.
            </p>
            <p style={{ marginTop: 18 }}>
              That’s what people want from a downloader: fast, simple and convenient. Those
              qualities grew the bot organically to <strong>over 90,000 users</strong> and{" "}
              <strong>over 4 million downloads</strong>, now more than 16,000 a day. It started as a
              simple TikTok downloader, then added YouTube and SoundCloud to give people more
              options for video and audio. The latest update, on 31 October 2026, brought 12 more
              platforms, from X and Instagram to Reddit and Pinterest.
            </p>
            <p>
              It’s also the project I’ve rewritten the most. It started in 2023 as a single file and
              was rebuilt four times, not because it fell short, but because I wanted a better
              system and cared about its quality. Each rewrite made it more stable and faster, and
              moved it closer to what I was after: natural modularity, where a new feature fits in
              without touching the rest. The fourth, v4, finally achieved it, built on{" "}
              <TechLink id="grammy" />
              ’s patterns and what I had learned across the JavaScript ecosystem.
            </p>
            <p>
              It became the foundation I broke down into my own SDK, behind the ExdBots
              organisation.
            </p>
          </Prose>
        </Section>

        <Section id="chat">
          <SectionLabel>In the chat</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                Every bot message was carefully designed after the best UI practices: readable,
                engaging and clean. The bot supports two modes, classic and rich.
              </p>
              <p>
                Classic is what it had from the start: minimal Telegram messages, with workarounds
                for their limitations in displaying media content. With Telegram’s{" "}
                <TechLink id="telegram-rich-messages">rich text support</TechLink>, added to the Bot
                API in June 2026, the messages became closer to the real web. They follow
                composition principles, with a clear header, content, footer and formatting, which
                made the bot look even more mature and clean.
              </p>
            </Prose>
          </div>
          <div className="mb-5.5">
            <RichMessageAnatomy />
          </div>
          <div className="mb-5.5">
            <Prose>
              <p>
                The demo shows the rich format: open the <strong>Menu</strong> for its commands, or
                send a link or a few words. In the real bot, <TechLink id="exd-downloader-bot" />,
                downloads arrive in the classic format by default, and rich downloads are a beta you
                can turn on in /settings. The screens and their text are the bot’s own; the person,
                the posts and the search results here are made up.
              </p>
            </Prose>
          </div>
          <BotDemo />
        </Section>

        <Section id="features">
          <SectionLabel>What’s in it</SectionLabel>
          <FeatureGroups
            groups={[
              {
                title: "Downloading",
                features: [
                  {
                    fn: "TikTok",
                    emoji: "tiktok",
                    title: "Every kind of post",
                    description:
                      "Videos without the watermark, sent with the author and a link back to the post. Slideshows four ways: Telegram's carousel, an album of up to ten photos a message, a video of the photos with the original sound, or a ZIP. The sound alone as an MP3, and the author's avatar.",
                  },
                  {
                    fn: "Formats",
                    emoji: "film",
                    title: "Switch without resending",
                    description:
                      "Buttons under each download fetch the same post in another format, so a video becomes its audio or a slideshow becomes an album without pasting the link again.",
                  },
                  {
                    fn: "YouTube",
                    emoji: "youtube",
                    title: "Up to 8K",
                    description:
                      "Videos up to 1080p for everyone; 1440p, 4K and 8K with Premium, merged into an MP4 and sent as a file. Playlists and channels open as a menu to pick from, and typing a few words searches YouTube.",
                  },
                  {
                    fn: "SoundCloud",
                    emoji: "soundcloud",
                    title: "Tracks and sets",
                    description:
                      "Tracks as MP3 or the original M4A, whole sets, and search with sc: in front of the words. Tracks only available with DRM are reported as protected rather than failing.",
                  },
                  {
                    fn: "Social",
                    emoji: "globe",
                    title: "12 more platforms",
                    description:
                      "Links and short links come back as a video, MP3, photo or album, with the same Options switch.",
                    chips: [
                      { label: "X", emoji: "x" },
                      { label: "Instagram", emoji: "instagram" },
                      { label: "Reddit", emoji: "reddit" },
                      { label: "Facebook", emoji: "facebook" },
                      { label: "Pinterest", emoji: "pinterest" },
                      { label: "Twitch", emoji: "twitch" },
                      { label: "Vimeo", emoji: "vimeo" },
                      { label: "Snapchat", emoji: "snapchat" },
                      { label: "Tumblr", emoji: "tumblr" },
                      { label: "VK", emoji: "vk" },
                      { label: "Bilibili", emoji: "bilibili" },
                      { label: "LinkedIn", emoji: "linkedin" },
                    ],
                  },
                  {
                    fn: "Inline",
                    emoji: "chat",
                    title: "In any chat",
                    description:
                      "Type the bot's name and a link in any conversation, and the media is posted there, without opening the bot.",
                  },
                  {
                    fn: "Queue",
                    emoji: "hourglass",
                    title: "Fair and visible",
                    description:
                      "The same link is never queued twice in a chat: a repeat gets a 👀 reaction. A failed download has a Retry button, a full queue says to try again in a few minutes, and files go up to 2 GB.",
                  },
                ],
              },
              {
                title: "The Mini App",
                features: [
                  {
                    fn: "Library",
                    emoji: "folder",
                    title: "Everything downloaded",
                    description:
                      "Every download by day, searchable by title and author, filtered by platform and type, and downloadable again in another format.",
                  },
                  {
                    fn: "Playlists",
                    emoji: "telegram",
                    title: "Played in Telegram",
                    description:
                      "Up to 200 items each, reordered by dragging or sorted by date, title or platform, and played through Telegram's own player.",
                  },
                  {
                    fn: "Download",
                    emoji: "inbox",
                    title: "Links, playlists, search",
                    description:
                      "Several links at once, whole playlists, or a search, with each format's size shown before choosing; waiting downloads can be cancelled.",
                  },
                  {
                    fn: "Stats",
                    emoji: "rocket",
                    title: "Your own numbers",
                    description:
                      "Downloads over 7 or 30 days or all time, the day streak, active days, activity per day, and the split by platform and format.",
                  },
                  {
                    fn: "Groups",
                    emoji: "people",
                    title: "The groups you run",
                    description:
                      "Each group's on/off switch, download mode, photo format, caption and download message, for the groups where you're an admin.",
                  },
                  {
                    fn: "Profile",
                    emoji: "person",
                    title: "Premium, invites, settings",
                    description:
                      "Premium plans and payments, an invite link that earns 7 days of Premium per friend, settings with a live preview of the bot's caption, and a short tour on first launch.",
                  },
                ],
              },
              {
                title: "Groups",
                features: [
                  {
                    fn: "Quiet",
                    emoji: "bellOff",
                    title: "Never reacts to everything",
                    description:
                      "In groups it downloads only when asked: a reply to the bot or /download by default, or every link if the admins choose. Command answers show only to whoever asked.",
                  },
                  {
                    fn: "Admins",
                    emoji: "lock",
                    title: "Per-group settings",
                    description:
                      "Admins switch the bot on or off and set the language, download mode and photo format. It welcomes itself when added, tracks the member count, and follows a group upgraded to a supergroup.",
                  },
                  {
                    fn: "Premium",
                    emoji: "gift",
                    title: "Group Premium",
                    description:
                      "Bought for a whole group in Stars, it unlocks the caption toggles and a custom download message for every member's downloads.",
                  },
                ],
              },
              {
                title: "How it pays for itself",
                features: [
                  {
                    fn: "Stars",
                    emoji: "star",
                    title: "Premium",
                    description:
                      "Monthly or yearly in Telegram Stars, as a renewing subscription with a reminder before it ends. It removes the sponsor step and ads, keeps the full history, takes all your links and playlists at once and unlocks your own caption. Refunds go through Telegram.",
                  },
                  {
                    fn: "Sponsors",
                    emoji: "megaphone",
                    title: "Sponsor subscriptions",
                    description:
                      "Before downloading, free users join the sponsor channels, groups or bots, checked with Telegram before letting them through.",
                  },
                  {
                    fn: "Ads",
                    emoji: "sparkles",
                    title: "Affiliate ads",
                    description:
                      "Promoted bots and Mini Apps shown around a download, with frequency caps, counted impressions and earnings synced from the networks.",
                  },
                  {
                    fn: "Referrals",
                    emoji: "link",
                    title: "Where users come from",
                    description:
                      "Short referral links for traffic sources, campaigns and affiliates, each counting the users it brings, plus the friend invites.",
                  },
                ],
              },
              {
                title: "Running it",
                features: [
                  {
                    fn: "Admin",
                    emoji: "phone",
                    title: "An admin panel inside Telegram",
                    description:
                      "A dashboard and growth statistics, users with roles, bans and Premium, groups, sponsors, referrals, ads, payments, message presets, broadcasts, channels and News posts, feedback, support and CSV exports.",
                  },
                  {
                    fn: "Support",
                    emoji: "question",
                    title: "Feedback and support",
                    description:
                      "/support opens a ticket about a download, a payment or the account, answered from the panel. /feedback takes ratings and ideas, prompted now and then after downloads, and hands anything broken over to support. Both work from a group too, through a private link.",
                  },
                  {
                    fn: "Bans",
                    emoji: "cross",
                    title: "Bans with a reason",
                    description:
                      "Permanent or timed, with the reason shown to the user, checked before anything else runs and lifted on their own when they expire.",
                  },
                  {
                    fn: "MCP",
                    emoji: "bulb",
                    title: "Run from Claude Code",
                    description:
                      "The panel's data as MCP tools. Anything that reaches users or moves Stars shows a preview first, and the owner approves it in Telegram.",
                  },
                  {
                    fn: "Stats",
                    emoji: "cards",
                    title: "A statistics engine",
                    description:
                      "Daily rollups of downloads, users, retention, the Premium funnel, revenue and download timing, so the dashboard never has to recount the whole history.",
                  },
                  {
                    fn: "i18n",
                    emoji: "globe",
                    title: "Seven languages",
                    description:
                      "English, Ukrainian, Russian, Spanish, French, Arabic and Turkish with Fluent, chosen per user or per group, or following the Telegram app.",
                  },
                ],
              },
            ]}
          />
        </Section>

        <Section id="how-it-was-built">
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              Every version was engineered by hand, v4 included: planned on the canvas, then written
              module by module. What changed with v4 was the aim: not a bot that works, but one that
              would keep taking features without being rebuilt.
            </p>
            <p>
              In 2026, once I knew Claude Code well, that architecture became a generator. Every
              part already had a written pattern and a fixed shape, so I turned them into scaffolds
              and let Claude Code write new modules inside them. Because I knew the codebase and
              reviewed what it wrote against those patterns, a module came together about{" "}
              <strong>20 times faster</strong> with the same quality. YouTube, SoundCloud, 12 more
              platforms, the Mini App, ads, support and the admin MCP all arrived that way, as
              modules, workers and services in the existing shape. Working with AI, below, has the
              setup and the numbers.
            </p>
            <p>
              Downloads go through a <TechLink id="bullmq" /> queue on <TechLink id="redis" />. The
              same link is never queued twice in one chat: a repeat while it waits gets a 👀
              reaction instead. Each worker runs eight downloads at a time, and when the queue is
              full people are told to try again in a few minutes rather than shown an error.
            </p>
            <p>
              Telegram’s public Bot API caps uploads at 50 MB, too small for long videos. The bot
              runs its own <TechLink id="telegram-bot-api" />, which raises the limit to 2 GB.
              YouTube above 1080p comes as separate VP9 or AV1 video and AAC audio, so{" "}
              <TechLink id="ffmpeg" /> merges them into an MP4, sent as a document because many
              players can’t open those codecs inline.
            </p>
            <p>
              The bot is <TechLink id="grammy" /> on <TechLink id="deno" />, with menus and per-user
              state built on its plugins. The Mini App is <TechLink id="react" /> on{" "}
              <TechLink id="vite" />, talking to the bot over <TechLink id="trpc" /> on{" "}
              <TechLink id="hono" />, with data in <TechLink id="postgresql" /> through{" "}
              <TechLink id="drizzle" />. It runs in <TechLink id="docker" /> under{" "}
              <TechLink id="coolify" />, with errors reported to <TechLink id="sentry" />.
            </p>
          </Prose>
        </Section>

        <Section id="review">
          <SectionLabel>My review</SectionLabel>
          <Prose>
            <p>
              This bot is, I can say, <strong>my most favourite and dear project</strong>. It is
              what set me apart from my usual work. Exploring the <TechLink id="telegram-api" /> is
              my hobby, and I have been learning it for years. GPT-3 had just been released at the
              time.
            </p>
            <p>
              The goal of the rewrites was not only performance or a “proper” architecture: it was
              my way of learning. I was reading lots of books at that time, and that knowledge had
              to go somewhere, so I trained on this project. I tried different paradigms, runtimes,
              sets of libraries, patterns and architectures, and finally got to a point where I saw
              this project as a <strong>masterpiece</strong>. I have always seen code as art,
              because it is beautiful when it is written by patterns, and I wanted to reach that, to
              feel it.
            </p>
            <p>
              This project was also how I learned <TechLink id="javascript" />. I fell in love with
              the language in 2022 and decided to master it, while keeping <TechLink id="java" />{" "}
              from university as a nice backup.
            </p>
          </Prose>
        </Section>

        <Section id="whats-next">
          <SectionLabel>What’s next</SectionLabel>
          <Prose>
            <p>
              In October 2026 <TechLink id="cloudflare" /> acquired <TechLink id="deno" />. The Deno
              runtime now gets only bug fixes and security updates for a year, and then its official
              development ends. The bot is built on Deno, so it has to move to another runtime
              before then.
            </p>
            <p>
              Nothing breaks overnight: the bot runs in Docker on its own server, not on Deno
              Deploy, which closes sooner. The move is in the code, about 200 calls to Deno’s own
              APIs, mostly files and the processes that run FFmpeg. <TechLink id="grammy" /> already
              runs on Node.js, and I’m following its news on moving runtimes before choosing where
              the bot goes next.
            </p>
          </Prose>
        </Section>

        <Section id="gallery">
          <SectionLabel>Gallery</SectionLabel>
          <Gallery
            cover={COVER}
            items={[
              {
                placeholder: "Stats on desktop",
                wide: true,
                src: "/projects/exd-downloader-app/desktop-stats.webp",
                alt: "The Stats screen on a desktop: downloads over 30 days, streak, activity per day, platforms and formats",
              },
              {
                placeholder: "Download on desktop",
                src: "/projects/exd-downloader-app/desktop-download.webp",
                alt: "The Download screen on a desktop: a box for a link or search, and the recent downloads beside it",
              },
              {
                placeholder: "Library on desktop",
                src: "/projects/exd-downloader-app/desktop-library.webp",
                alt: "The Library on a desktop: playlists, search and filters above the downloads",
              },
              {
                placeholder: "Profile, Premium, groups",
                wide: true,
                src: "/projects/exd-downloader-app/profile-premium-groups.webp",
                alt: "Three phone screens: Mia's profile with Premium, the Premium plans at 99 and 950 Stars, and the two groups she runs",
              },
              {
                placeholder: "Onboarding, playlist, group",
                wide: true,
                src: "/projects/exd-downloader-app/onboarding-playlist-group.webp",
                alt: "Three phone screens: the welcome tour, a Road trip mix playlist, and the Weekend Hikers group's settings",
              },
              {
                placeholder: "A group on desktop",
                src: "/projects/exd-downloader-app/desktop-group.webp",
                alt: "A group's settings on a desktop: download mode and the caption the bot posts",
              },
              {
                placeholder: "Settings on desktop",
                src: "/projects/exd-downloader-app/desktop-settings.webp",
                alt: "Settings on a desktop beside a preview of the message the bot sends",
              },
            ]}
          />
        </Section>
        <SectionGroup label="Engineering">
          <Section id="architecture">
            <SectionLabel>Architecture</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  The bot only answers and queues; the slow part runs in a separate worker. Telegram
                  talks to a self-hosted Bot API server, which lets the bot send files up to 2 GB
                  instead of the public API’s 50 MB.
                </p>
              </Prose>
            </div>
            <SketchDiagram
              slug="exd-downloader-app"
              alt="Architecture sketch. A user's Telegram app sends messages to Telegram's servers, which pass them over MTProto to a self-hosted Bot API server; it delivers them to the bot by webhook. The phone also opens the Mini App, served by the bot. The bot, built with grammY, queues each download in Redis with BullMQ; a worker takes it, fetches the media from TikTok, YouTube, SoundCloud or 12 more platforms such as X, Instagram and Reddit, with ffmpeg and yt-dlp, and uploads it back through the Bot API server. Bot and worker store users and downloads in Postgres through Drizzle. Everything runs in containers under Coolify, deployed when main changes on GitHub."
              note="// the bot answers at once; downloads wait in the queue, not in the chat"
            />
            <Reveal className="mt-10">
              <SpecList>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <CubeIcon />
                    </SpecIcon>
                    Modules
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Features that register themselves</SpecTitle>
                    <SpecDescription>
                      <p>
                        Every feature is a module: one grammY composer that registers itself with{" "}
                        <code>defineModule</code>, naming the chats it handles and the modules that
                        must run before it. Nothing lists them in order. At startup the bot sorts
                        them by those dependencies and refuses a cycle, so a new feature is a new
                        folder and one line of requirements.
                      </p>
                      <p>
                        The plumbing every module relies on (Redis sessions, the language, roles,
                        the rate limit, conversations) runs ahead of them in a fixed order.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
              </SpecList>
            </Reveal>
            <div className="mt-5.5">
              <ModuleTable
                modules={[
                  {
                    name: "events",
                    chats: "all",
                    requires: [],
                    owns: "The bot added or removed, members joining, groups becoming supergroups",
                  },
                  {
                    name: "userBan",
                    chats: "private",
                    requires: ["events"],
                    owns: "Stops a banned user before any other module sees the message",
                  },
                  {
                    name: "admin",
                    chats: "private",
                    requires: [],
                    owns: "The admin panel and its tabs",
                  },
                  {
                    name: "msub",
                    chats: "private",
                    requires: [],
                    owns: "The sponsor step and its Verify button",
                  },
                  {
                    name: "feedback",
                    chats: "all",
                    requires: [],
                    owns: "Ratings, reports and support replies",
                  },
                  {
                    name: "dismiss",
                    chats: "all",
                    requires: [],
                    owns: "Close buttons on notices",
                  },
                  {
                    name: "downloader",
                    chats: "all",
                    requires: ["msub"],
                    owns: "Links from every platform, pickers, format switching, retries",
                  },
                  {
                    name: "search",
                    chats: "private",
                    requires: ["downloader"],
                    owns: "Plain text as a YouTube or SoundCloud search",
                  },
                  {
                    name: "commands",
                    chats: "all",
                    requires: ["events", "userBan", "admin", "msub", "downloader"],
                    owns: "/start, /download, /premium, /profile, /settings and the rest",
                  },
                ]}
              />
            </div>
            <Reveal className="mt-8">
              <SpecList>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <StackIcon />
                    </SpecIcon>
                    Layers
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Thin handlers, shared services</SpecTitle>
                    <SpecDescription>
                      <p>
                        Inside a module the handlers stay thin. Every screen is a pure render
                        function sent as a Telegram Rich Message. Data goes through services: tRPC
                        procedures called in the same process, which return a{" "}
                        <TechLink id="neverthrow" /> Result instead of throwing. Telegram’s own
                        errors become values too: a grammY plugin adds safe edits that return a
                        typed error, such as “message is not modified”, rather than an exception.
                      </p>
                      <p>
                        Business rules live in a domain layer of plain functions, one per file, that
                        never import grammY, with Drizzle underneath. The Mini App’s API and the
                        admin MCP call the same services, so a rule is written once for all three.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <TimerIcon />
                    </SpecIcon>
                    Workers
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Slow work, off the chat</SpecTitle>
                    <SpecDescription>
                      <p>
                        Anything slower than a reply is a BullMQ job in a separate process:
                        downloads eight at a time, FFmpeg slideshows one at a time to cap memory,
                        menu edits, broadcasts and exports. Jobs run once, never retried, so a
                        hiccup can never send the same video twice.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <BooksIcon />
                    </SpecIcon>
                    Patterns
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>A scaffold for every shape</SpecTitle>
                    <SpecDescription>
                      <p>
                        Each of these has a written pattern and a scaffold: a module, an admin tab,
                        a queue, a screen. A new feature starts in the shape of the ones before it,
                        which is what keeps v4 from needing a v5.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
              </SpecList>
            </Reveal>
          </Section>

          <Section id="planning">
            <SectionLabel>Planning</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  v4 started on an Excalidraw canvas, not in code. I drew the requirements, the use
                  cases, the admin tree, the order of every middleware, and the ways the bot and a
                  web app could share an API, and crossed out the ones that wouldn’t hold. A few of
                  those drawings, as I left them:
                </p>
              </Prose>
            </div>
            <DrawingGallery
              items={[
                {
                  title: "App architecture",
                  src: "/projects/exd-downloader-app/canvas/app-architecture.svg",
                  alt: "Four ways to wire a bot and a website to one API, through backends-for-frontends or tRPC; two are crossed out in red, with notes on type safety and maintenance beside the others.",
                  width: 3223,
                  height: 2548,
                },
                {
                  title: "Server architecture",
                  src: "/projects/exd-downloader-app/canvas/server-architecture.svg",
                  alt: "Five versions of the server: Postgres, the repo and the Bot API server on a VPS; then Docker; then docker-compose with Redis; then Coolify with the bot and website sharing an API.",
                  width: 3269,
                  height: 2724,
                },
                {
                  title: "Architecture",
                  src: "/projects/exd-downloader-app/canvas/architecture.svg",
                  alt: "The plan for 2025: Coolify on a VPS running the bot beside a self-hosted Bot API server and Redis, the bot and its API talking over tRPC, with naming conventions and the provider notes beside it.",
                  width: 3620,
                  height: 1468,
                },
                {
                  title: "Middleware graph",
                  src: "/projects/exd-downloader-app/canvas/middleware-graph.svg",
                  alt: "The bot's middleware in order, from sessions and i18n through hydration, session prefetch, the rate limiter and conversations, then the feature composers, with the commands composer branching into start, language, terms and test handlers.",
                  width: 2153,
                  height: 7274,
                },
                {
                  title: "Admin panel tree",
                  src: "/projects/exd-downloader-app/canvas/admin-panel-tree.svg",
                  alt: "The admin panel as a tree: statistics with activity and the user list, sponsor subscriptions with view, add and remove, users, mailing and referrals.",
                  width: 3188,
                  height: 1279,
                },
                {
                  title: "Use cases",
                  src: "/projects/exd-downloader-app/canvas/use-cases.svg",
                  alt: "Use-case diagrams with their basic and alternative flows: starting the bot, adding and removing it from a group, downloading a TikTok, adding and editing a sponsor subscription, and checking a user's ban.",
                  width: 4203,
                  height: 5261,
                },
              ]}
            />
            <div className="mt-8">
              <Prose>
                <p>
                  Beside the canvas I kept the rules in Obsidian, written before the code they
                  govern. Modules know nothing outside their own scope and are registered in one
                  place. Every admin tab (a message with a menu) is built from the same files. Menu
                  state travels in the buttons’ payloads. Translations come in three tiers: general,
                  module and scoped. And every feature had to pass a checklist before it counted as
                  done: conventions first, then configuration, naming, schemas, documentation and
                  translations.
                </p>
                <p>
                  Those notes end with this, from July 2025: “Years past, this is the most properly
                  architected application I have ever built. It encompasses the knowledge I have
                  acquired from popular and essential technical literature, as well as from diverse
                  practice during my university years and work projects.”
                </p>
              </Prose>
            </div>
          </Section>

          <Section id="performance">
            <SectionLabel>Performance</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  I measured how fast each version turns a TikTok link into the video, on the same
                  ten public videos, from the same machine, on 29 October 2026, using each version’s
                  own fetching code and library. The time below is from receiving the link to having
                  the media address, the median of three runs:
                </p>
              </Prose>
            </div>
            <SpeedBars
              caption="Speed comparison, from link to media address. Less is better."
              rows={[
                {
                  label: "v1",
                  sub: "direct API calls",
                  failed: "0 of 10: the API it called is closed",
                },
                {
                  label: "v2",
                  sub: "tiktok-api-dl 1.1.1",
                  failed: "0 of 10: rate-limited on every request",
                },
                { label: "v3", sub: "tiktok-api-dl 1.2.0", ms: 6836 },
                {
                  label: "v4",
                  sub: "its own client",
                  ms: 580,
                  current: true,
                },
              ]}
            />
            <div className="mt-5.5">
              <Prose>
                <p>
                  v4 resolves a link about <strong>12 times faster</strong> than v3 (0.58 s against
                  6.8 s; 0.68 s against 11.1 s at the 90th percentile), and the whole file is on
                  disk in 0.66 s. It uses its own client, and only falls back to the library when
                  that fails. v1 and v2 can’t run at all any more: the API they called has since
                  closed.
                </p>
                <p>
                  In production, from the queue to the video arriving in the chat, upload to
                  Telegram included, October 2026 medians were 3.5 s for TikTok (7.8 s at the 90th
                  percentile), 1.8 s for SoundCloud and 11.6 s for YouTube, whose files are far
                  larger. A download waits a median of 2 ms in the queue, and 97% of TikTok
                  downloads succeed.
                </p>
              </Prose>
            </div>
          </Section>

          <Section id="history">
            <SectionLabel>History</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  Five codebases over three years, across two GitHub accounts, and why each change
                  was made. The dates come from the commits.
                </p>
              </Prose>
            </div>
            <Timeline
              entries={[
                {
                  date: "2023 — Mar 2024",
                  title: "v1 · one file",
                  stack: "Node.js · node-telegram-bot-api · Postgres",
                  body: "The first @TikTokDownloaderExdBot: a single bot.js polling Telegram, with the TikTok scraper, the database and the admin list beside it, plus shell scripts to clean downloads and restart it.",
                },
                {
                  date: "Feb — Aug 2024",
                  title: "v2 · grammY",
                  stack: "Telegraf → grammY · Sequelize · Redis",
                  why: "node-telegram-bot-api was buggy, and with everything in one file there was no place for the next feature.",
                  body: "A new repository with real structure. It began on Telegraf and moved to grammY within weeks for its plugins: menus, conversations, i18n and Redis sessions came ready-made. It added a self-hosted Bot API server, slideshows, audio and an admin panel with statistics, mailing, sponsor subscriptions and referrals. In August it was ported to Deno.",
                },
                {
                  date: "Nov 2024 — Feb 2025",
                  title: "v3 · NestJS",
                  stack: "NestJS · Prisma · grammY · Supabase",
                  why: "v2 had grown messy. NestJS's modules and dependency injection gave it a structure to grow into.",
                  body: "A rewrite on NestJS and Prisma in the new ExdBots organisation, deployed with Docker against Supabase's Postgres.",
                },
                {
                  date: "Jan — Apr 2025",
                  title: "Turborepo split",
                  stack: "Turborepo · grammY bot · NestJS API",
                  why: "Getting the bot ready for a web app, I thought the app needed its own API, apart from the bot.",
                  body: "One monorepo with two apps: the bot, and a NestJS API with users and TikTok modules.",
                  dropped:
                    "An architecture mismatch: the apps didn't need to be separate. The Mini App's API now runs inside the bot process.",
                },
                {
                  date: "Apr 2025 — now",
                  title: "v4 · Deno",
                  stack: "Deno · grammY · Hono · tRPC · Drizzle",
                  why: "NestJS's dependency injection and MVC patterns fought the functional nature of a bot, whose code is middleware and handlers.",
                  body: "The current codebase, back on Deno and one codebase again, written to last. Features register as modules that declare what they depend on, over a layer of services and plain domain functions. Hono and tRPC serve the Mini App from the bot itself, Drizzle replaced Prisma, and a short-lived MongoDB session store gave way to Redis. It hasn't needed a rewrite since. On 9 July 2025 its dashboard counted 10,163 users and 45,127 downloads recorded; by October 2026, 90,900 users and over 3 million recorded.",
                },
                {
                  date: "Sep 2025 — now",
                  title: "v4 · queue and workers",
                  stack: "BullMQ · Redis",
                  current: true,
                  why: "Downloads ran inside the bot process, so long ones held up its replies.",
                  body: "Downloads moved to a BullMQ queue with separate workers, so the bot only answers and queues. YouTube and SoundCloud, Sentry and an admin MCP server came after, and on 31 October 2026 posts from 12 more platforms, from X and Instagram to Reddit and Pinterest.",
                },
              ]}
            />
          </Section>

          <Section id="ai">
            <SectionLabel>Working with AI</SectionLabel>
            <Prose>
              <p>
                AI came into this project in two stages. In April 2025, while planning v4, I used a
                chat model as a sounding board: a written brief of the stack, the monorepo and its
                constraints, asking how to keep it maintainable. The answers went onto the canvas;
                the code was still written by hand.
              </p>
              <p>
                On 2 March 2026 <TechLink id="claude-code" /> moved into the repository, and from
                then on the codebase was built as a place for agents to work in: everything an agent
                needs to write a feature the way I would is written down, and everything it writes
                is checked against it.
              </p>
            </Prose>
            <div className="mt-5.5">
              <div className="mb-2.5 text-13 text-fg-faint">Tools</div>
              <StackList stack={["claude-code", "codex", "context7"]} />
            </div>
            <div className="mt-5.5">
              <FeatureSpecs
                features={[
                  {
                    fn: "AGENTS.md",
                    icon: <FileTextIcon />,
                    title: "One source of truth",
                    description:
                      "The stack, the commands, the architecture on one screen, and a table pointing every area to its pattern doc and its skill. CLAUDE.md is a symlink to it, so every tool reads the same rules.",
                  },
                  {
                    fn: "Patterns",
                    icon: <BooksIcon />,
                    title: "29 written patterns",
                    description:
                      "One doc per area (modules, screens, queues, the database, i18n, Premium gating and the rest), each with its rules, examples and anti-patterns. They are the law: every skill opens with 'if this scaffold and the doc disagree, the doc wins'.",
                  },
                  {
                    fn: "Skills",
                    icon: <WrenchIcon />,
                    title: "30 project skills",
                    description:
                      "Scaffolds that write a feature in the codebase's shape (/create-module, /create-tab, /create-queue, /create-router, /create-rich-view) and checks that keep it honest (/verify, /type-check, /harden, /deploy-check).",
                  },
                  {
                    fn: "Agents",
                    icon: <RobotIcon />,
                    title: "9 specialised subagents",
                    description: (
                      <>
                        Each with one job and a model sized to it. On Sonnet: the code and security
                        reviewers, a <TechLink id="grammy" /> debugger and a test writer. On Haiku:
                        the migration reviewer, the i18n and log auditors, a refactor checker, and a
                        docs updater that keeps AGENTS.md and the patterns in step with the code.
                      </>
                    ),
                  },
                  {
                    fn: "Specs",
                    icon: <PencilRulerIcon />,
                    title: "Designs before code",
                    description:
                      "Bigger features start as a written design and an implementation plan, reviewed before anything is built: the emoji pack, affiliate ads, the statistics engine, the Mini App, channels.",
                  },
                  {
                    fn: "Guardrails",
                    icon: <ShieldCheckIcon />,
                    title: "CI and branch rules",
                    description:
                      "No direct pushes to protected branches; formatting, lint and imports checked on every pull request; branches and commit messages follow written rules.",
                  },
                  {
                    fn: "MCP",
                    icon: <PlugsConnectedIcon />,
                    title: "AI inside the product",
                    description: (
                      <>
                        The admin MCP server lets <TechLink id="claude-code" /> run the bot’s admin
                        panel. Anything that reaches users or moves Stars shows a preview first and
                        waits for the owner’s approval in Telegram.
                      </>
                    ),
                  },
                  {
                    fn: "Prompting",
                    icon: <ChatTextIcon />,
                    title: "Prompts are documents",
                    description:
                      "Briefs state the goal, the constraints and what is ruled out; patterns are written for a reader with no context; skills name their inputs and the files they create. The best prompt turned out to be a well-documented codebase.",
                  },
                ]}
              />
            </div>
            <div className="mt-8">
              <ComparisonTable
                columns={["Period", "Commits", "With AI", "Pull requests"]}
                rows={[
                  ["Apr 2025 – Feb 2026, by hand", "308", "0", "31"],
                  ["Mar – Oct 2026, with Claude Code", "720", "691", "236"],
                  ["October 2026 alone", "498", "498", "210"],
                ]}
                highlight={2}
              />
            </div>
            <div className="mt-5.5">
              <Prose>
                <p>
                  Counted from the repository: commits and merged pull requests on the development
                  branch. October 2026 alone had more commits than the eleven hand-written months
                  before it, across 210 reviewed pull requests. Per module I put it at about{" "}
                  <strong>20 times faster</strong>, at the same quality. The speed came from the
                  architecture: an agent writes fast when there is one obvious place and one obvious
                  shape for everything.
                </p>
                <p>
                  The models changed as they were released (Claude Opus 4.6 to Opus 5.5, with Sonnet
                  and Haiku for narrower jobs), and Context7 kept library docs current. Codex had a
                  short trial in April 2026, through T3 Code, before the work settled on Claude
                  Code. What didn’t change is that I read and decide on every change.
                </p>
              </Prose>
            </div>
          </Section>
        </SectionGroup>

        <Section id="design">
          <SectionLabel>Design</SectionLabel>
          <DesignNote
            callout="This page is dressed like the bot’s own avatar."
            swatches={[
              { name: "Screen black", hex: "#0c0c0c" },
              { name: "Download red", hex: "#fe3b3b" },
              { name: "TikTok cyan", hex: "#25f4ee" },
            ]}
          >
            <p>
              Open the bot in Telegram and the first thing you see is its avatar: a download arrow
              on black, split into red and cyan like TikTok’s own logo, as if the picture were
              trembling on a phone screen at night. The page starts there. Most of the gradient is
              black, and through it glow the red of the Mini App’s download button and the cyan of
              TikTok’s glitch, drifting the way a video does between two frames.
            </p>
            <p>
              It is the app at 2 a.m.: a dark room, one bright screen, one more video to save. Every
              link on the page takes the same red, the colour of the button people have pressed over
              four million times.
            </p>
          </DesignNote>
        </Section>

        <NextProjectLink name="ExdBots" href="/projects/exdbots" />
      </PageShell>
    </>
  );
}
