import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { CopyButton } from "@/components/copy-button";
import { TechLink } from "@/components/tech-link";
import { ButtonLink } from "@/components/ui/button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@/components/ui/code-block";
import {
  ArrowsClockwiseIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  RobotIcon,
  SparkleIcon,
} from "@/components/ui/icons";
import { hasLocale } from "@/i18n";

import {
  ArchitectureCards,
  DesignNote,
  FeatureSpecs,
  NextProjectLink,
  PluginList,
  ProjectBanner,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
  projectTheme,
  Timeline,
} from "../_components";

const INSTALL = `claude plugin marketplace add exx0dusss/architectures
claude plugin install arch-tanstack-start@architectures --scope project`;

/** For Claude Code, which installs plugins: it picks the plugin for the
 *  project's stack and installs it. */
const AGENT_PROMPT = `Install the Architectures plugins (https://github.com/exx0dusss/architectures) into this project.

1. Read the repository's README to see which plugin fits.
2. Find this project's stack in package.json: Next.js → arch-nextjs, TanStack Start → arch-tanstack-start, NestJS → arch-nestjs-backend.
3. Run \`claude plugin marketplace add exx0dusss/architectures\`, then \`claude plugin install <plugin>@architectures --scope project\`.
4. Tell me what you installed, and remind me to restart Claude Code and run /arch-init.`;

/** For a claude.ai chat, which reads the repository and advises; the
 *  prompt is prefilled through the URL's q parameter. */
const ASK_CLAUDE = `https://claude.ai/new?q=${encodeURIComponent(
  "Read the Architectures playbook at https://github.com/exx0dusss/architectures (overview: https://tymurmustafaiev.com/projects/architectures). Help me choose the architecture that fits my project, and walk me through installing it as a Claude Code plugin.",
)}`;

const SEO = {
  slug: "architectures",
  title: "Architectures",
  description:
    "My engineering playbook: opinionated architectures for Next.js, TanStack Start and NestJS, shipped as Claude Code plugins with skills, agents and hooks. Open source.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function ArchitecturesPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* a cutting mat's green over white drafting paper; deeper greens on
          the page's black for dark */}
      <ProjectBanner
        colors={{
          light: ["#d9f2ee", "#ffffff", "#a8e0d8", "#f3f5f4"],
          dark: ["#0b3b36", "#0c0c0c", "#12665d", "#0c0c0c"],
        }}
        pattern={{ offsetX: 0.1, offsetY: -0.1, rotation: 15 }}
      />
      {/* accents in the mat's green: AA-checked shades for shapes and text */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#0f7f74", ink: "#0a5f57" },
          dark: { accent: "#2fc2b0", ink: "#86e3d6" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="Architectures"
          favicon="/projects/architectures/favicon.png"
          tagline="My engineering playbook: opinionated architectures for Next.js, TanStack Start and NestJS, shipped as Claude Code plugins, so every project and every agent works from the same patterns. It began in March 2026 as a template of Giga Psych’s architecture."
          meta={[
            { key: "Year", value: "2026 — present", sub: "template in March, public in August" },
            { key: "Role", value: "Solo", sub: "doctrine, plugins, tooling" },
            { key: "Type", value: "Developer tooling", sub: "Claude Code plugins" },
          ]}
          openness={{ tone: "open", label: "Open source · MIT" }}
          stack={[
            "nextjs",
            "tanstack-start",
            "tanstack-query",
            "base-ui",
            "nestjs",
            "drizzle",
            "bullmq",
            "claude-code",
            "codex",
          ]}
          actions={[
            {
              variant: "primary",
              label: "View on GitHub",
              href: "https://github.com/exx0dusss/architectures",
              external: true,
            },
          ]}
        />

        <Section id="overview">
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="max-w-tagline">
              How I build software, written down once and installed into every project that follows
              it.
            </p>
            <p style={{ marginTop: 18 }}>
              Each architecture is a set of rules and patterns for one stack: the folder layout, the
              data layer, auth, forms, components and the rules that must never be broken. Around
              them sit the tools that keep a project on them: <strong>skills</strong> that load the
              right rules when the work touches them, <strong>agents</strong> that scaffold and
              audit, and <strong>hooks</strong> that remind.
            </p>
            <p>
              It started as a template of my own code and grew into three stacks, two for the
              frontend and one for the backend. People and agents read the same doctrine, so a
              project built with <TechLink id="claude-code" /> looks the way I would have written
              it.
            </p>
            <p>
              It’s still under maintenance: I polish the repository in my free time, and any
              contribution is appreciated.
            </p>
          </Prose>
        </Section>

        <Section id="architectures">
          <SectionLabel>The architectures</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                Three stacks, each from a different source: one from code I wrote by hand, one
                translated from it, and one from the framework’s own guidance.
              </p>
            </Prose>
          </div>
          <ArchitectureCards
            architectures={[
              {
                name: "Next.js",
                origin: "Derived from Giga Psych",
                description:
                  "Written down from the frontend I built by hand for Giga Psych: the route groups, the proxy to the backend, a folder of the same files for every resource, TanStack Query on the server and the client, URL state with nuqs, and shadcn-style composition. Every rule in it was a working pattern first.",
                principles: [
                  "Zod schemas at every API boundary, with types inferred from them.",
                  "TanStack Query is the only caching layer: no fetch cache, ISR or revalidateTag.",
                  "Server actions return a Result instead of throwing.",
                  "Services are organised by backend domain, and pages keep their components beside them.",
                  "The browser never talks to a backend: API routes proxy every call.",
                ],
                stack: ["nextjs", "react", "tanstack-query", "zod", "nuqs", "base-ui", "msw"],
              },
              {
                name: "TanStack Start",
                origin: "Ported from Next.js",
                description:
                  "Translated from the Next.js architecture pattern by pattern, with a migration guide that maps each one: the proxy becomes server functions, a resource’s actions and queries merge into one file, middleware becomes beforeLoad. Since then it has been kept in sync with TanStack’s official documentation as the framework changed, and it is the stack that gets new conventions first.",
                principles: [
                  "Server functions instead of a proxy: createServerFn replaces the API routes.",
                  "URL state is TanStack Router’s typed search params: a Zod schema in validateSearch, no extra library.",
                  "The Start session is the source of truth for auth; backend tokens stay on the server.",
                  "Flat, dot-named files per resource: {resource}.schema.ts, {resource}.functions.ts.",
                  "No React Server Components directives: no “use client” or “use server”.",
                  "shadcn on Base UI, not Radix.",
                ],
                stack: ["tanstack-start", "react", "tanstack-query", "zod", "base-ui", "bun"],
              },
              {
                name: "NestJS",
                origin: "From the official patterns",
                description:
                  "Built entirely from NestJS’s official patterns and documentation, not from a project of mine: a modular monolith where each part of the domain is a module, with its own data, events and jobs, and a typed contract for the frontends.",
                principles: [
                  "A modular monolith: each part of the domain is a NestJS module, not a microservice.",
                  "Modules never import each other’s internals; they talk through domain events.",
                  "Two processes from one image: HTTP and WebSockets in one, BullMQ workers in the other.",
                  "Zod for every DTO, instead of class-validator decorators.",
                  "The OpenAPI spec is the contract, and typed clients are generated from it.",
                ],
                stack: ["nestjs", "drizzle", "postgresql", "redis", "bullmq", "zod", "openapi"],
              },
            ]}
          />
        </Section>

        <Section id="plugins">
          <SectionLabel>The plugins</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                The repository is a <TechLink id="claude-code" /> plugin marketplace. Projects
                install the architectures instead of copying them, so one update brings the latest
                rules, skills and agents to every project at once.
              </p>
            </Prose>
          </div>
          <FeatureSpecs
            features={[
              {
                fn: "Skills",
                icon: <SparkleIcon />,
                title: "Rules that load when needed",
                description:
                  "Eight doctrine skills, for services, state, UI, auth, forms, modules, decisions and contributing. Each loads only when the work touches its area, and reads the stack from package.json, so one set serves all three architectures.",
              },
              {
                fn: "Agents",
                icon: <RobotIcon />,
                title: "Scaffold and audit",
                description:
                  "Each frontend stack ships fourteen agents: they plan a migration, scaffold pages, services and widgets, review a project against the architecture, and catch a useQuery that should suspend or a colour that isn’t a token.",
              },
              {
                fn: "Hooks",
                icon: <FileTextIcon />,
                title: "Reminders after edits",
                description:
                  "After an agent edits a file, a hook reminds it of the rules for that kind of file. They are advice, not gates: the checks that must hold run in the project’s CI.",
              },
              {
                fn: "Sync",
                icon: <ArrowsClockwiseIcon />,
                title: "Know what a project runs",
                description:
                  "A script reports which plugins a project has and whether each is current, behind or missing; an audit agent judges what a script can’t, like a local fork of an agent or a rule that drifted.",
              },
            ]}
          />
          <div className="mt-8">
            <PluginList
              plugins={[
                {
                  name: "arch-core",
                  description:
                    "The doctrine skills, the drift audit and every stack’s reference; the others need it",
                },
                {
                  name: "arch-nextjs",
                  description: "Next.js agents, hooks and a settings template",
                },
                {
                  name: "arch-tanstack-start",
                  description: "TanStack Start agents, hooks and a settings template",
                },
                {
                  name: "arch-nestjs-backend",
                  description: "NestJS doctrine, with module scaffolding and audit agents",
                },
                {
                  name: "product-design",
                  description:
                    "A prototyping skill, visual-language doctrine and a review agent for rendered pages",
                },
              ]}
            />
          </div>
        </Section>

        <Section id="install">
          <SectionLabel>Install</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                Add the marketplace once, then install the plugin for the project’s stack. Here,
                TanStack Start:
              </p>
            </Prose>
          </div>
          <CodeBlock>
            <CodeBlockActions>
              <CodeBlockCopyButton value={INSTALL} />
            </CodeBlockActions>
            <CodeBlockContent>{INSTALL}</CodeBlockContent>
          </CodeBlock>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <CopyButton value={AGENT_PROMPT} variant="ghost" size="sm">
              Copy prompt
            </CopyButton>
            <ButtonLink
              href={ASK_CLAUDE}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- 16px local logo */}
              <img
                src="/tech-logos/claude-code.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              Open in Claude <ArrowUpRightIcon aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-5.5">
            <Prose>
              <p>
                Or let an agent do it: <strong>Copy prompt</strong> gives Claude Code the steps to
                pick the plugin for your stack and install it, and <strong>Open in Claude</strong>{" "}
                starts a chat that reads the repository and helps you choose.
              </p>
              <p>
                <code>--scope project</code> writes the plugin into the project’s{" "}
                <code>.claude/settings.json</code>, so everyone who clones it gets the same
                architecture from git. Then run <code>/arch-init</code> once for what a plugin can’t
                do by itself: the project’s own <code>AGENTS.md</code> index, permissions and
                component registry. <code>claude plugin update</code> brings later versions.
              </p>
              <p>
                <TechLink id="codex" /> installs the same skills from the repository’s own Codex
                marketplace.
              </p>
            </Prose>
          </div>
        </Section>

        <Section id="history">
          <SectionLabel>History</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>From the private history and the public repository.</p>
            </Prose>
          </div>
          <Timeline
            entries={[
              {
                date: "24 Mar 2026",
                title: "A template of Giga Psych",
                stack: "Next.js · Claude Code agents",
                body: "Giga Psych’s frontend architecture, written down as the Next.js stack with its building blocks and file templates; by midnight, the first Claude Code agents.",
              },
              {
                date: "25 Mar 2026",
                title: "TanStack Start",
                stack: "TanStack Start · Base UI",
                body: "The Next.js stack, translated to TanStack Start the next night, and SalonSvitlo’s storefront started from it.",
              },
              {
                date: "Apr 2026",
                title: "NestJS",
                stack: "NestJS · Drizzle · BullMQ",
                body: "A backend architecture from NestJS’s own patterns, with new agents beside it.",
              },
              {
                date: "Aug 2026",
                title: "Plugins and decisions",
                stack: "Claude Code plugins",
                body: "The architectures shipped as Claude Code plugins on 17 August, and a log of architecture decisions began the next day.",
              },
              {
                date: "28 Aug 2026",
                title: "Open source",
                current: true,
                body: "Published under MIT with a fresh history. Giga Psych now installs it back, like any other project.",
              },
            ]}
          />
        </Section>

        <Section id="design">
          <SectionLabel>Design</SectionLabel>
          <DesignNote
            callout="This page is drawn on a cutting mat."
            swatches={[
              { name: "Drafting white", hex: "#ffffff" },
              { name: "Mat green", hex: "#0f7f74" },
              { name: "Deep mat", hex: "#0b3b36" },
            ]}
          >
            <p>
              Architectures is where plans are drawn before anything is built, so its page borrows
              the green of a designer’s cutting mat: the surface under every careful line, marked
              with a grid you can measure against.
            </p>
            <p>
              White drafting paper takes up most of the gradient and the green runs through it like
              the mat showing at the edges, quiet and precise, a colour that says “measure twice”.
              The avatar is the same green: a blueprint on a blob of mat.
            </p>
          </DesignNote>
        </Section>

        <NextProjectLink name="SalonSvitlo" href="/projects/salonsvitlo" />
      </PageShell>
    </>
  );
}
