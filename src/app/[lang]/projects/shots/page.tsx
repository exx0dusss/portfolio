import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { LocaleLink } from "@/components/locale-link";
import { TechLink, techLinkVariants } from "@/components/tech-link";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@/components/ui/code-block";
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

const USAGE = `# a page in a Safari window, sized for an X post
shot https://example.com --preset x --out x.png

# the same page on an iPhone, for Instagram
shot https://example.com --device phone --preset instagram-portrait --out ig.webp

# a window with a phone in front, on your own colours
shot localhost:3000 localhost:3000 --device desktop,phone --canvas "#fde68a,#f59e0b,#7c2d12" --out both.png

# a Telegram Mini App, with Telegram's header over the page
shot localhost:5173 --device phone --frame telegram-app --title "My app" --out app.png`;

/** The cover is also the first gallery slide, so all six images open together.
 *  Every image on this page was made by the tool. */
const COVER = {
  placeholder: "Desktop and phone",
  src: "/projects/shots/cover.webp",
  alt: "This portfolio’s homepage in a drawn Safari window with an iPhone in front of it, on an orange canvas",
};

const SEO = {
  slug: "shots",
  title: "Shots",
  description:
    "A CLI and MCP server that frames a web page or a screenshot in a drawn Safari window, an iPhone or Telegram, on a canvas sized for X, Instagram and Open Graph. Built to shoot this portfolio. Open source.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function ShotsPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* the tool's default canvas: an orange glow (#ff9a63, #ff4f00,
          #c2410c) over white; embers on the page's black for dark */}
      <ProjectBanner
        colors={{
          light: ["#ffb38a", "#fff1e8", "#ffd2b8", "#ffffff"],
          dark: ["#c2410c", "#3a1a0c", "#7a2a08", "#0c0c0c"],
        }}
        pattern={{ offsetX: -0.05, offsetY: -0.15, rotation: 25 }}
      />
      {/* accents in that orange: #d9480f for shapes (4.2:1 on white) and
          #b03a0a for text (6:1); lighter on dark */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#d9480f", ink: "#b03a0a" },
          dark: { accent: "#ff7a3d", ink: "#ffa678" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="Shots"
          favicon="/projects/shots/favicon.png"
          faviconFilled
          tagline="A small tool that frames a web page or a screenshot in a drawn Safari window, an iPhone or Telegram, on a canvas sized for X, Instagram and Open Graph. I built it to shoot the case studies on this site."
          meta={[
            { key: "Year", value: "2026", sub: "started in November" },
            { key: "Role", value: "Solo", sub: "built with Claude Code" },
            { key: "Type", value: "Developer tooling", sub: "CLI and MCP server" },
            { key: "Status", value: "Open source", sub: "version 0.1" },
          ]}
          openness={{ tone: "open", label: "Open source · MIT" }}
          stack={["javascript", "claude-code", "telegram-mini-apps"]}
          actions={[
            {
              variant: "primary",
              label: "View on GitHub",
              href: "https://github.com/exx0dusss/shots",
              external: true,
            },
          ]}
          extraActions={<OpenGalleryButton count={6} />}
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
              A case study needs screenshots that look the same from one project to the next. Shots
              makes them: give it a URL or an image, and it returns a framed picture.
            </p>
            <p style={{ marginTop: 18 }}>
              It began as a script inside this portfolio, written to shoot the{" "}
              <LocaleLink
                href="/projects/salonsvitlo"
                className={techLinkVariants({ variant: "inline" })}
              >
                SalonSvitlo
              </LocaleLink>{" "}
              storefront. I looked at the apps that do this, and none of them could be driven by an
              agent, so the script became its own tool. The galleries of Kosmetik Profi, Giga Psych,
              ExdDownloadApp and ExdBots on this site were all shot with it.
            </p>
            <p>
              The frames are drawn by the tool itself, in HTML and CSS. It uses no artwork from
              Apple or Telegram, and nothing is uploaded anywhere: it runs on your machine with the
              Chrome you already have.
            </p>
          </Prose>
        </Section>

        <Section id="features">
          <SectionLabel>What it does</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "Frames",
                title: "Safari, iPhone and Telegram",
                description:
                  "A macOS Safari window, an iPhone with Safari, a Telegram Mini App with its header and main button, and a Telegram chat drawn from a JSON conversation. Light and dark.",
              },
              {
                fn: "Sizes",
                title: "Presets for where it’s posted",
                description:
                  "X at 16:9, Instagram at 4:5 and 1:1, Open Graph at exactly 1200×630, or any ratio. The canvas grows around the frame; the frame is never squeezed.",
              },
              {
                fn: "Canvases",
                title: "Your colours, or Telegram’s",
                description:
                  "Built-in glows and solids, any colours or CSS gradient, per-project brand colours from a config file, and patterned wallpapers in Telegram’s manner.",
              },
              {
                fn: "Layouts",
                title: "Two devices in one picture",
                description:
                  "Two phones fanned apart, a window with a phone in front, a chat beside its Mini App, with tilt and shadow strength to taste.",
              },
              {
                fn: "Sharp",
                title: "Native resolution",
                description:
                  "The page is captured and the canvas rendered at the same pixel ratio, so every captured pixel lands on one output pixel and small text stays crisp.",
              },
              {
                fn: "Agents",
                title: "An MCP server",
                description:
                  "The same tool as MCP calls, so an agent in any project can make a framed shot in one step. It is confined to one folder and refuses internal network addresses.",
              },
            ]}
          />
        </Section>

        <Section id="usage">
          <SectionLabel>Using it</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                One command per picture. A source is a URL, which is captured, or an image file,
                which is framed as it is.
              </p>
            </Prose>
          </div>
          <CodeBlock>
            <CodeBlockActions>
              <CodeBlockCopyButton value={USAGE} />
            </CodeBlockActions>
            <CodeBlockContent>{USAGE}</CodeBlockContent>
          </CodeBlock>
        </Section>

        <Section id="gallery">
          <SectionLabel>Gallery</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>Every image here, and the cover above, is the tool’s own output.</p>
            </Prose>
          </div>
          <Gallery
            cover={COVER}
            items={[
              {
                placeholder: "X preset",
                wide: true,
                src: "/projects/shots/desktop-x.webp",
                alt: "The Giga Psych case study in a Safari window on a blue canvas, at the 16:9 size of an X post",
              },
              {
                placeholder: "Dark and tilted",
                src: "/projects/shots/dark-tilt.webp",
                alt: "The portfolio’s dark homepage in a dark Safari window, tilted on a navy canvas",
              },
              {
                placeholder: "Two phones",
                src: "/projects/shots/two-phones.webp",
                alt: "Two iPhones fanned apart on a violet canvas, showing the homepage and the projects page",
              },
              {
                placeholder: "Telegram chat",
                src: "/projects/shots/telegram-chat.webp",
                alt: "A Telegram chat with a bot on an iPhone, drawn from a JSON conversation over a patterned blue wallpaper",
              },
              {
                placeholder: "Chat and Mini App",
                src: "/projects/shots/telegram-pair.webp",
                alt: "A Telegram chat beside a Mini App on two iPhones, on a violet Telegram wallpaper",
              },
            ]}
          />
        </Section>

        <Section id="how-it-was-built">
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              Shots is plain <TechLink id="javascript" /> on Node. It drives the installed Chrome
              through Playwright to capture a page, draws the frame and the canvas as a second page,
              and screenshots that. sharp handles resizing and the output formats.
            </p>
            <p>
              I built it with <TechLink id="claude-code" /> over two days: I set what it should do
              and reviewed what came back, and agents wrote the code and its tests. An automated
              security review ran on each push. It found real holes in the MCP server, such as a way
              to reach internal addresses through a host name, and each was fixed before the next
              feature. The one limit that remains is written in the README.
            </p>
            <p>
              It can’t do everything yet. It frames at most two devices in one picture, and it can’t
              sign in to an app or click through it before a capture. For those shots on this site I
              captured the page with a short script and used Shots for the frame.
            </p>
          </Prose>
        </Section>

        <Section id="design">
          <SectionLabel>Design</SectionLabel>
          <DesignNote
            callout="This page is on the tool’s default canvas."
            swatches={[
              { name: "Glow", hex: "#ff9a63" },
              { name: "Orange", hex: "#ff4f00" },
              { name: "Ember", hex: "#c2410c" },
            ]}
          >
            <p>
              Run Shots with no options and the picture comes out on an orange glow, lit from the
              top left. The gradient behind the title is that canvas, and the icon is a small Safari
              window sitting on it.
            </p>
          </DesignNote>
        </Section>

        <NextProjectLink name="SalonSvitlo" href="/projects/salonsvitlo" />
      </PageShell>
    </>
  );
}
