import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionGroup, SectionLabel } from "@/components/page";
import { LocaleLink } from "@/components/locale-link";
import { Reveal } from "@/components/motion/reveal";
import { PersonLink } from "@/components/person-link";
import { StackList } from "@/components/stack-list";
import { TechLink, techLinkVariants } from "@/components/tech-link";
import {
  ArrowsSplitIcon,
  BooksIcon,
  BrowserIcon,
  ChatsCircleIcon,
  CodeIcon,
  CubeIcon,
  FileTextIcon,
  GaugeIcon,
  HardDrivesIcon,
  KeyIcon,
  LinkSimpleIcon,
  MagnifyingGlassIcon,
  PathIcon,
  PencilRulerIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
  SparkleIcon,
  StackIcon,
  TableIcon,
  TimerIcon,
  TreeStructureIcon,
  UploadSimpleIcon,
  UserIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import {
  Spec,
  SpecContent,
  SpecDescription,
  SpecIcon,
  SpecList,
  SpecNote,
  SpecTerm,
  SpecTitle,
} from "@/components/ui/spec-list";
import { hasLocale } from "@/i18n";

import {
  ComponentAnatomy,
  DesignNote,
  FeatureGrid,
  FeatureSpecs,
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
  SketchDiagram,
  Timeline,
} from "../_components";

/** The cover is also the first gallery slide, so all nine images open together.
 *  Screenshots are of a local build with fictional demo data. */
const COVER = {
  placeholder: "Home",
  src: "/projects/giga-psych/cover.webp",
  alt: "Giga Psych's home page: a blue welcome banner with dataset search and popular tags, the researcher's own datasets and recent activity",
};

const SEO = {
  slug: "giga-psych",
  title: "Giga Psych",
  description:
    "An open-science platform where psychology researchers share, describe and explore datasets. My diploma project at PJAIT, with the XR Center and VU Amsterdam.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function GigaPsychPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* the app's own background (its .background class): slate-100
          washed with a periwinkle blue from one side and a little red in the far corner, with the page's white so it dissolves; for dark, the
          app's violet-grey on the page's black, with the same two tints */}
      <ProjectBanner
        colors={{
          light: ["#ffffff", "#f1f5f9", "#f1f5f9", "#e2ebfa", "#d3e0fa", "#c3d5fb", "#efe0e4"],
          dark: ["#0c0c0c", "#242428", "#242428", "#2f3953", "#374973", "#3a2428"],
        }}
        pattern={{ offsetX: -0.2, offsetY: -0.1, rotation: 60 }}
      />
      {/* accents in its blue (blue-700, ink blue-900; blue-500 and -300 for
          dark): AA-checked shades for shapes and text */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#0068f8", ink: "#0b489d" },
          dark: { accent: "#259efb", ink: "#81d7ff" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="Giga Psych"
          favicon="/projects/giga-psych/favicon.png"
          tagline="An open-science platform where psychology researchers publish documented datasets and explore each other’s. My diploma project at PJAIT, built in collaboration with researchers from the XR Center and Vrije Universiteit Amsterdam."
          meta={[
            { key: "Year", value: "2025 — present", sub: "diploma, then master’s" },
            { key: "Team", value: "4 people", sub: "my role was frontend" },
            { key: "Grade", value: "5", sub: "thesis with distinction" },
            { key: "Role", value: "Frontend", sub: "architecture, auth, UI" },
          ]}
          openness={{ tone: "client", label: "PJAIT · XR Center · not public yet" }}
          stack={[
            "nextjs",
            "react",
            "typescript",
            "tailwind",
            "base-ui",
            "tanstack-query",
            "nuqs",
            "zod",
            "msw",
            "falso",
            "openapi",
            "storybook",
            "bun",
            "jwt",
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
              Researchers upload a dataset together with its codebook and the instruments behind it,
              and Giga Psych maps every column to its meaning, so the data arrives documented
              instead of as a bare spreadsheet.
            </p>
            <p style={{ marginTop: 18 }}>
              Other researchers can browse, search, star and discuss it, and every dataset is
              reviewed before it’s published.
            </p>
            <p>
              It started as my <strong>diploma project</strong> at PJAIT. We built it with PJAIT’s{" "}
              <strong>XR Center</strong>, led by <PersonLink id="wieslaw-kopec" />, and with two
              psychologists from <strong>Vrije Universiteit Amsterdam</strong>.{" "}
              <PersonLink id="jacek-buczny" /> and <PersonLink id="antonis-koutsoumpis" /> brought
              the research side and reviewed the platform as it grew. Our diploma team had four
              people, and I was in the frontend role. <PersonLink id="piotr-gago" /> supervised us.
            </p>
            <p>
              It was one of my first projects with Next.js and shadcn, and my first time on the
              modern React stack, with TypeScript and the libraries around it.
            </p>
            <p>
              I got a <strong>5</strong> for the diploma, and the thesis was marked{" "}
              <strong>with distinction</strong>. We’re still building it, as our own independent
              work and as part of my master’s degree, which I finish in 2027.
            </p>
          </Prose>
        </Section>

        <Section id="features">
          <SectionLabel>What’s in it</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "Upload",
                icon: <UploadSimpleIcon />,
                title: "Upload in two steps",
                steps: [
                  "Title, description, instruments, the dataset and its codebook.",
                  "The server parses the data and Gemini maps each column. Review it in an editable grid: confidence per column, remap or delete in place, drop unmapped columns in one click.",
                ],
                footnote: "Composed forms that persist their data across navigation and reloads.",
              },
              {
                fn: "Dataset",
                icon: <TableIcon />,
                title: "A page per dataset",
                description:
                  "Overview with a virtualised data grid, a full-screen viewer for large tables, and discussion threads.",
              },
              {
                fn: "Browse",
                icon: <MagnifyingGlassIcon />,
                title: "A search page",
                description:
                  "Flexible filters, tags, relevance sort and grid or table view, all kept in the URL. Global search across datasets and people, plus trending datasets and popular tags.",
              },
              {
                fn: "Profiles",
                icon: <UserIcon />,
                title: "Researchers’ profiles",
                description:
                  "Recent and starred datasets, instruments, activity and follows for every researcher, and an editable profile of your own.",
              },
              {
                fn: "Sign-in",
                icon: <KeyIcon />,
                title: "Verified accounts",
                description:
                  "Email and password, Google or ORCID. New accounts confirm their email, join a waitlist with their affiliations and are verified by the team before approval, so the platform stays trusted.",
              },
              {
                fn: "Help",
                icon: <ChatsCircleIcon />,
                title: "Help centre and support chat",
                description:
                  "FAQ, guides, an about page and policies, plus a floating support chat with the team.",
              },
            ]}
          />
        </Section>

        <Section id="how-it-was-built">
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              I designed Giga Psych in <TechLink id="figma" /> first, then carried on by improvising
              in code and with <TechLink id="v0" />, which played a big role. The look is inspired
              by Microsoft’s design, GitHub’s layout and plain <TechLink id="shadcn" />.
            </p>
            <p>
              Before each feature, I looked for the library that did it best and fastest. I designed
              the skeletons with the devtools and Next.js’s new Suspense tab, and built the
              streaming, prefetching and other data patterns from the{" "}
              <TechLink id="tanstack-query" /> and Next.js docs.
            </p>
            <p>
              To get ready, I completed Vercel’s two Next.js courses, App Router Fundamentals and
              React Foundations, and received <strong>two Next.js certificates</strong>.
            </p>
            <p>
              I also practised frontend a lot, from videos, articles and official documentation, and
              tried to master each tool to a decent level, so I fully understood what I was doing.
              Thanks to the TypeScript open-source community and tech influencers, I was comfortable
              with full-stack development, and writing the project went smoothly. I think this
              project rewired my brain, and I became a much better developer.
            </p>
          </Prose>
          <div className="mt-5.5">
            <div className="mb-2.5 text-13 text-fg-faint">Design tools</div>
            <StackList stack={["figma", "v0", "shadcn"]} />
          </div>
        </Section>

        <Section id="review">
          <SectionLabel>My review</SectionLabel>
          <Prose>
            <p>
              This is not the best-looking project I’ve built, but it has one of the best system
              designs I’ve seen in frontend. Our supervisor rated it{" "}
              <strong>among the most well-written codebases</strong> of the groups defending that
              year.
            </p>
            <p>
              I tried to prioritise performance, clean code and easy navigation, and thanks to{" "}
              <TechLink id="shadcn" /> it still looks neat.
            </p>
            <p>
              I see this project as one of the <strong>biggest steps</strong> in my frontend career.
              After finishing the thesis, I felt like I had finally become part of the frontend
              community. I even became so obsessed with creating architectures that I started
              leaning towards becoming an architect, and bought{" "}
              <a
                href="https://fundamentalsofsoftwarearchitecture.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={techLinkVariants({ variant: "inline" })}
              >
                Fundamentals of Software Architecture
              </a>
              . I later decomposed the project’s architecture and stack into my{" "}
              <LocaleLink
                href="/projects/architectures"
                className={techLinkVariants({ variant: "inline" })}
              >
                Architectures
              </LocaleLink>{" "}
              repository, which became the core of all my frontend projects, including SalonSvitlo,
              my biggest work so far.
            </p>
          </Prose>
        </Section>

        <Section id="gallery">
          <SectionLabel>Gallery</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                This is a preview of a local build, with data seeded using <TechLink id="msw" /> and{" "}
                <TechLink id="falso" />
                *: 41 fictional researchers from 14 universities, eleven real public questionnaires,
                and 42 datasets of generated responses, about 144,000 values in all.
              </p>
            </Prose>
            <p className="mt-2.5 text-12.5 text-fg-faint">
              * falso is archived: its repository was removed with the rest of ngneat in June 2026,
              so the link goes to a read-only community copy.
            </p>
          </div>
          <Gallery
            cover={COVER}
            items={[
              {
                placeholder: "A dataset",
                wide: true,
                src: "/projects/giga-psych/dataset.webp",
                alt: "A dataset page: its title, author, stars and tags, with a preview of the data in a table and its details beside it",
              },
              {
                placeholder: "Browse datasets",
                src: "/projects/giga-psych/datasets.webp",
                alt: "Browse datasets: search, filters by instrument, domain and tag, and 36 results as cards",
              },
              {
                placeholder: "Discussion",
                src: "/projects/giga-psych/discussion.webp",
                alt: "A dataset's discussion: a question about a third wave, with the author's reply in the thread",
              },
              {
                placeholder: "Profile",
                src: "/projects/giga-psych/profile.webp",
                alt: "A researcher's profile: her recent datasets, details and the people she follows",
              },
              {
                placeholder: "Upload",
                src: "/projects/giga-psych/upload.webp",
                alt: "Step one of the upload wizard: title, description, the dataset and codebook files, and instruments",
              },
              {
                placeholder: "Upload, step two",
                src: "/projects/giga-psych/upload-review.webp",
                alt: "Step two of the upload wizard: the dataset in an editable grid, each column with its mapping and the AI's confidence, two unmapped columns flagged in red and a button to drop them",
              },
              {
                placeholder: "Remapping a column",
                src: "/projects/giga-psych/upload-mapping.webp",
                alt: "A column's properties in a side sheet: pss04 at 68% confidence, remapped to the PSS-10 item PSS_4",
              },
              {
                placeholder: "Landing page",
                src: "/projects/giga-psych/landing.webp",
                alt: "The landing page: Advancing Psychology Through Open Collaborative Data",
              },
            ]}
          />
        </Section>

        <Section id="thanks">
          <SectionLabel>Thanks</SectionLabel>
          <Prose>
            <p>
              Thank you to our supervisor, <PersonLink id="piotr-gago" />, for the chance to build
              this and a good place to work; to the XR Center at PJAIT, led by{" "}
              <PersonLink id="wieslaw-kopec" />, where Giga Psych began; and to{" "}
              <PersonLink id="jacek-buczny" /> and <PersonLink id="antonis-koutsoumpis" />, for the
              research behind it and their reviews.
            </p>
          </Prose>
        </Section>
        <SectionGroup label="Engineering">
          <Section id="architecture">
            <SectionLabel>Architecture</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  I developed the frontend’s architecture as the code was written. It was one of my
                  first major frontend projects, so I experimented a lot, and much of it changed
                  before the thesis was done: axios gave way to native fetch through the BFF, every
                  page moved to server rendering, and the result pattern, the services folders,
                  Zustand and the React Compiler arrived along the way. It was built around its
                  stack and above all around <TechLink id="nextjs" />: a Next.js 16 app with{" "}
                  <TechLink id="react" /> 19 and the React Compiler.
                </p>
                <p>
                  Next.js’s proxy and server act as a{" "}
                  <TechLink id="bff">backend for the frontend</TechLink> (BFF). Every call goes
                  through them, so the backend is never exposed to the client.
                </p>
                <p>
                  Data loads through server rendering and <TechLink id="tanstack-query" />{" "}
                  streaming. A page starts its queries on the server without waiting for them, each
                  result streams to the browser as soon as it resolves, and the client picks it up
                  without fetching again, so there is no waterfall of requests after the page loads.
                </p>
              </Prose>
            </div>
            <SketchDiagram
              slug="giga-psych"
              alt="Architecture sketch of Giga Psych's frontend. Inside Next.js 16, its proxy and server form a BFF box: the browser requests HTML and RSC from it and fetches /api, persisting the TanStack Query cache to IndexedDB. In the BFF, proxy.ts handles auth and RBAC before Server Components render and stream; the Server Components' prefetchQuery and /api/[...path], the API proxy, both go through serverFetch, which calls the Spring Boot backend over REST with a JWT. The backend uses PostgreSQL and Redis, and calls the Gemini API through Spring AI to map uploaded columns."
            />
            <Reveal className="mt-10">
              <SpecList>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <TreeStructureIcon />
                    </SpecIcon>
                    Routes
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Folders grouped by area</SpecTitle>
                    <SpecDescription>
                      <p>
                        The project uses Next.js’s file-based routing, where{" "}
                        <TechLink id="next-route-groups" /> gather routes in folders without
                        changing their URLs: the landing page, sign-in and the app under{" "}
                        <code>(public)</code>, the admin panel under <code>(protected)</code>.
                      </p>
                      <p>
                        Each group has its own layout, so the marketing page never loads the app’s
                        chrome.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <ShieldCheckIcon />
                    </SpecIcon>
                    Proxy
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Checks before a page renders</SpecTitle>
                    <SpecDescription>
                      <p>
                        Built around Next.js’s <TechLink id="next-proxy" /> (formerly middleware),
                        which runs before a route renders. It refreshes an expired access token,
                        sends a signed-out visitor to sign-in and back, shows non-admins a 404 for
                        the admin panel, sends an account still waiting for approval home with a
                        notice, and redirects old links to their new pages.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <PlugsConnectedIcon />
                    </SpecIcon>
                    API route
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>One door to the backend</SpecTitle>
                    <SpecDescription>
                      <p>
                        Every call from the browser goes through a single catch-all route handler,{" "}
                        <code>/api/[...path]</code>: it hands the call to <code>serverFetch</code>,
                        streams uploads, tags each call with a request id in the logs, and turns
                        every backend error into one JSON shape.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <HardDrivesIcon />
                    </SpecIcon>
                    serverFetch
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Server calls, straight to the backend</SpecTitle>
                    <SpecDescription>
                      <p>
                        A server-only wrapper around <code>fetch</code>, and how server code reaches
                        the backend. It adds the token from the httpOnly cookie, refreshes it once
                        on a 401 or 403, retries rate-limited calls with backoff and skips the
                        cache.
                      </p>
                      <p>
                        Server Components prefetch through it (a dataset’s page, a profile, the
                        search results), and server actions call it to sign in, post a comment, send
                        a message or follow a researcher.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <ArrowsSplitIcon />
                    </SpecIcon>
                    safeAction
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Errors as values</SpecTitle>
                    <SpecDescription>
                      <p>
                        A server action can’t throw an error to the client: in production Next.js
                        swaps the message for a generic one, and the code, status and field errors
                        never arrive. Next.js’s own <TechLink id="next-error-handling" /> guide says
                        to return expected errors as values instead.
                      </p>
                      <p>
                        So every server action runs inside <code>safeAction</code>. It checks the
                        role the action needs (a 401 for a signed-out visitor, a 403 for the wrong
                        role), runs it, logs server failures, and returns a serialized{" "}
                        <code>Result</code>: <code>ok</code> with the value, or <code>err</code>{" "}
                        with the error’s message, code, status and the errors per field. A form
                        reads it and shows each error under its field.
                      </p>
                      <p>
                        TanStack Query expects a failed mutation to throw, so on the client{" "}
                        <code>unwrap</code> turns an <code>err</code> back into an error, and
                        TanStack Query’s global handler catches it.
                      </p>
                    </SpecDescription>
                    <SpecNote>
                      Why not <TechLink id="neverthrow" />: its <code>Ok</code> and <code>Err</code>{" "}
                      are class instances, and a server action can only return{" "}
                      <TechLink id="react-serializable">plain, serializable objects</TechLink>, so
                      its results wouldn’t survive the trip to the client. The project’s{" "}
                      <code>Result</code> is the same idea as a plain object, in a few lines.
                    </SpecNote>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <BrowserIcon />
                    </SpecIcon>
                    apiClient
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Client calls, through the proxy</SpecTitle>
                    <SpecDescription>
                      <p>
                        A wrapper around the browser’s <code>fetch</code> for calls that can only
                        start after the page loads: the upload’s file, debounced checks of a dataset
                        name or an email while you type, more comments and messages as you scroll,
                        and refetches when a filter changes.
                      </p>
                      <p>
                        The browser can’t read the httpOnly token, so these go to <code>/api</code>,
                        which adds it and calls <code>serverFetch</code>. The wrapper parses each
                        answer with the resource’s <TechLink id="zod" /> schema and turns backend
                        errors into notices.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <StackIcon />
                    </SpecIcon>
                    Services
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>A folder per resource</SpecTitle>
                    <SpecDescription>
                      <p>
                        My pattern for backend integration. Each of the fifteen resources has its
                        own folder with the same files, so the code reads the same everywhere and
                        knowing one resource means knowing them all. A resource only has the files
                        it needs:
                      </p>
                      <ul>
                        <li>
                          <code>schema.ts</code>: the resource’s enums and data schemas, and the
                          types inferred from them
                        </li>
                        <li>
                          <code>api-schema.ts</code>: the request schemas, one per call
                        </li>
                        <li>
                          <code>queries.ts</code>: server-only fetching for Server Components
                        </li>
                        <li>
                          <code>query-options.ts</code>: the query keys and query options TanStack
                          Query runs
                        </li>
                        <li>
                          <code>actions.ts</code>: server actions, each wrapped in{" "}
                          <code>safeAction</code>
                        </li>
                        <li>
                          <code>{"use-{resource}.ts"}</code>: the client hooks for its queries and
                          mutations
                        </li>
                        <li>
                          <code>search-params.ts</code>: the URL’s nuqs parsers
                        </li>
                        <li>
                          <code>constants.ts</code>: page sizes, file limits and other fixed values
                        </li>
                        <li>
                          <code>validation.ts</code>: async form checks, like whether a dataset name
                          is taken
                        </li>
                        <li>
                          <code>utils.ts</code>: small transforms of its own data
                        </li>
                      </ul>
                      <p>
                        Every call follows the request pattern: it takes one request object,{" "}
                        <code>{"{ path, query, body }"}</code>, and its entry point, a query or a
                        server action, parses it with the matching request schema before anything
                        else. A path param can’t pass for a query param, and server actions, which
                        anyone can call over HTTP, never trust what they’re sent.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <LinkSimpleIcon />
                    </SpecIcon>
                    URL
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>The URL as state</SpecTitle>
                    <SpecDescription>
                      <p>
                        URL handling is built on <TechLink id="nuqs" />. Search, filters, sort,
                        layout and the page live in the URL, with typed parsers per resource, read
                        on the server to prefetch exactly that view and on the client to change it,
                        so every view is a link you can share.
                      </p>
                      <p>
                        Server data stays in <TechLink id="tanstack-query" />, persisted to
                        IndexedDB. <TechLink id="zustand" /> holds what lives only in the browser:
                        the upload wizard’s and sign-up form’s drafts, which survive a reload, stars
                        and follows waiting to sync, notifications and the snowfall setting.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <KeyIcon />
                    </SpecIcon>
                    Auth
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Hand-written auth for a separate backend</SpecTitle>
                    <SpecDescription>
                      <p>
                        A carefully hand-written auth layer that connects Next.js to a separate
                        backend, unlike the libraries of the time. In September 2025, weeks before
                        the project started, <TechLink id="authjs" />{" "}
                        <TechLink id="authjs-joins-better-auth">
                          became part of Better Auth
                        </TechLink>{" "}
                        and was left to security fixes, and <TechLink id="better-auth" /> wanted to
                        be the auth server itself, with its own database, while our accounts and
                        sign-in lived in the Spring Boot backend. Not long after the defence,{" "}
                        <TechLink id="better-auth-1-5" /> finally matched the requirements.
                      </p>
                      <p>
                        <TechLink id="jwt">JWTs</TechLink> sit in httpOnly cookies, never in
                        storage. The proxy, the server and the UI each check the role, and a
                        signed-in but unapproved user has a state of its own.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
                <Spec>
                  <SpecTerm>
                    <SpecIcon>
                      <CubeIcon />
                    </SpecIcon>
                    Components
                  </SpecTerm>
                  <SpecContent>
                    <SpecTitle>Composition and variants</SpecTitle>
                    <SpecDescription>
                      <p>
                        Based on modern <TechLink id="shadcn" /> composition rules: fifty parts, one
                        function per part, variants in <TechLink id="cva" />; now on{" "}
                        <TechLink id="base-ui" /> and documented in <TechLink id="storybook" />.
                      </p>
                    </SpecDescription>
                  </SpecContent>
                </Spec>
              </SpecList>
            </Reveal>
            <div className="mt-5.5">
              <Prose>
                <p>
                  <TechLink id="msw" /> let the frontend and backend teams work independently. We
                  discussed the API contract for every new resource, and I mocked it straight away
                  with realistic generated data, so I could build a screen’s layout first. Once the
                  backend published the <TechLink id="openapi" /> contract, I adapted my Zod schemas
                  to any changes, then flipped a switch and connected the screen to the real
                  backend.
                </p>
              </Prose>
            </div>
          </Section>

          <Section id="performance">
            <SectionLabel>Performance and data</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  Research data is heavy, and the first versions felt it. Most of the patterns that
                  made the app fast were new to me at the time.
                </p>
              </Prose>
            </div>
            <FeatureSpecs
              features={[
                {
                  fn: "Virtualization",
                  icon: <GaugeIcon />,
                  title: "Only the rows on screen",
                  description: (
                    <>
                      Datasets run to thousands of rows by dozens of columns, and rendering them
                      made the app lag. It was my first time learning virtualization: I built it
                      into the DataGrid component with <TechLink id="tanstack-virtual" /> on top of{" "}
                      <TechLink id="tanstack-table" />, so every view that reuses the grid is
                      virtualized, from the dataset overview to the full-screen viewer and the
                      upload summary.
                    </>
                  ),
                },
                {
                  fn: "Streaming",
                  icon: <PathIcon />,
                  title: "Loaded in parallel",
                  description: (
                    <>
                      Pages prefetch their <TechLink id="tanstack-query" /> queries on the server
                      without waiting for them, and pending queries are sent with the page. The
                      server prepares the data in chunks and streams them in parallel, each behind
                      its own skeleton, and the client hydrates them as they arrive. It follows the
                      streaming part of TanStack Query’s{" "}
                      <TechLink id="tanstack-query-advanced-ssr" /> guide.
                    </>
                  ),
                },
                {
                  fn: "Optimistic",
                  icon: <SparkleIcon />,
                  title: "A sync engine on TanStack Query",
                  description: (
                    <>
                      Each action runs on the client as if it were a local function: a star, a
                      follow or a comment shows at once and is synced everywhere in the app. If the
                      backend fails, it rolls back, and a global <TechLink id="sonner" /> toast says
                      what went wrong.
                    </>
                  ),
                },
                {
                  fn: "Debounce",
                  icon: <TimerIcon />,
                  title: "No spamming the backend",
                  description: (
                    <>
                      Search, filters and data tables are debounced (250–500 ms) with{" "}
                      <TechLink id="tanstack-pacer" /> and <TechLink id="nuqs" />, and so are{" "}
                      <TechLink id="tanstack-form" />
                      ’s async validators, like the dataset-name check. Star and follow debounce
                      their sync, so ten fast clicks send one request.
                    </>
                  ),
                },
                {
                  fn: "Zod",
                  icon: <ShieldCheckIcon />,
                  title: "Three kinds of schema",
                  description: (
                    <>
                      <p>
                        My first major use of <TechLink id="zod" /> on the frontend. I had to keep
                        the app’s layers carefully apart, so each resource has three kinds of
                        schema:
                      </p>
                      <ul>
                        <li>
                          <code>xSchema</code>: the data as the backend sends it. It parses every
                          response and maps it to the DTO the app works with.
                        </li>
                        <li>
                          <code>xRequestSchema</code>: a request’s path, query and body, built from
                          the create and update shapes beside <code>xSchema</code> (the request
                          pattern, under Architecture).
                        </li>
                        <li>
                          <code>xFormSchema</code>: lives next to its form and validates it in{" "}
                          <TechLink id="tanstack-form" />.
                        </li>
                      </ul>
                      <p>
                        The first two belong to the backend, so they sit in the resource’s service
                        folder (<code>schema.ts</code> and <code>api-schema.ts</code>), beside the
                        calls they describe.
                      </p>
                    </>
                  ),
                },
                {
                  fn: "Compiler",
                  icon: <CodeIcon />,
                  title: "React Compiler",
                  description: (
                    <>
                      My first use of the <TechLink id="react-compiler" />: it memoizes components
                      and values at build time, which removed the need to wrap each component in
                      memo or useMemo by hand. The virtual grid, which the compiler can’t follow,
                      opts out with “use no memo”.
                    </>
                  ),
                },
              ]}
            />
          </Section>

          <Section id="components">
            <SectionLabel>Components</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  The UI is consistent across the application because every screen is assembled from
                  the same parts, never designed again. Each part follows <TechLink id="shadcn" />
                  ’s composition: one function per part, a data-slot on each, variants in cva. A
                  grid holds cards, a list holds items, a sidebar holds widgets.
                </p>
                <p>
                  Some of them are shown the way shadcn documents its own, with what each is for and
                  then its anatomy.
                </p>
              </Prose>
            </div>
            <ComponentAnatomy
              components={[
                {
                  fn: "DataGrid",
                  title: "A data grid of my own",
                  description:
                    "Built for datasets: a sticky header, a body that renders only the visible rows with TanStack Virtual, column widths measured on a canvas from a sample of the data, and cells you move between with the keyboard. On the upload’s second step it becomes an editor: each header shows the AI’s confidence in green, amber or red, a menu remaps the column in a side sheet or deletes it, and columns that fail validation are marked in red until they are fixed.",
                  anatomy: `<DataGridContainer>
  <DataGridHeader>
    <DataGridHeaderRow>
      <DataGridHeaderCell />
    </DataGridHeaderRow>
  </DataGridHeader>
  <DataGridBody>
    <DataGridRow>
      <DataGridCell />
    </DataGridRow>
  </DataGridBody>
</DataGridContainer>`,
                },
                {
                  fn: "Section",
                  title: "Every block of a page",
                  description:
                    "The home, a profile and a dataset are built from sections with the same slots: a title, a description and an action in the header, then the content.",
                  anatomy: `<Section>
  <SectionHeader>
    <SectionTitle />
    <SectionDescription />
    <SectionAction />
  </SectionHeader>
  <SectionContent />
  <SectionFooter />
</Section>`,
                },
                {
                  fn: "Grid → card",
                  title: "Collections as cards",
                  description:
                    "Datasets on the home and browse pages: a grid of cards, each with its title, author and stars in the header, the description, and its tags in the footer.",
                  anatomy: `<SectionGrid>
  <Card>
    <CardHeader>
      <CardTitle />
      <CardDescription />
      <CardAction />
    </CardHeader>
    <CardContent />
    <CardFooter />
  </Card>
</SectionGrid>`,
                },
                {
                  fn: "List → item",
                  title: "Lists as items",
                  description:
                    "Stars, followed people, recent datasets and activity: a group of items with media, content and actions always in the same places. The same items go into an ItemGroupGrid when a page lays them out in columns.",
                  anatomy: `<ItemGroup>
  <Item>
    <ItemMedia />
    <ItemContent>
      <ItemTitle />
      <ItemDescription />
    </ItemContent>
    <ItemActions />
  </Item>
  <ItemSeparator />
</ItemGroup>`,
                },
                {
                  fn: "Sidebar",
                  title: "A sidebar of widgets",
                  description:
                    "Each page’s sidebar is a stack of widgets, a card each, streaming on its own behind Suspense. It measures its own width so the widgets fit it, and react-sticky-box keeps it in view however tall it gets.",
                  anatomy: `<AppSidebar>
  <AppSidebarContent>
    <DatasetInfoWidget />
    <MyActivitiesWidget />
    <MyStarsWidget />
  </AppSidebarContent>
</AppSidebar>`,
                },
                {
                  fn: "Widget",
                  title: "One widget, one shape",
                  description:
                    "Every widget is the same card: a titled header, a list that streams in behind its own Suspense and skeleton, and a link to the full page. Each comes twice: ProfileStarsWidget shows anyone’s stars, and MyStarsWidget binds it to the signed-in user.",
                  anatomy: `<Card variant="muted">
  <CardHeader>
    <CardTitle />
  </CardHeader>
  <CardContent>
    <Suspense fallback={…}>
      <ProfileStarsList />
    </Suspense>
  </CardContent>
  <CardFooter>
    <LinkButton>View All</LinkButton>
  </CardFooter>
</Card>`,
                },
                {
                  fn: "Message",
                  title: "Chat, before shadcn had one",
                  description:
                    "Built on shadcn’s principles, long before shadcn had chat components. A message knows its side, and the avatar, bubble and actions follow it.",
                  anatomy: `<Message side="right">
  <MessageAvatar />
  <MessageContent>
    <MessageHeader />
    <MessageBubble />
    <MessageFooter />
  </MessageContent>
  <MessageActions />
</Message>`,
                },
                {
                  fn: "Comments",
                  title: "Threads like YouTube’s",
                  description:
                    "Designed after YouTube’s nested comments: a thread line curves into every reply, and replies load only when a thread is opened.",
                  anatomy: `<CommentThread>
  <CommentNode depth={0}>
    <CommentItem />
    <CommentReplies>
      <CommentNode depth={1}>
        <CommentItem />
      </CommentNode>
    </CommentReplies>
  </CommentNode>
</CommentThread>`,
                },
                {
                  fn: "Overflow",
                  title: "Chips that fit",
                  description:
                    "Tags show as many chips as fit in the rows they are given (one by default, five in a dataset’s details, four for the popular tags in the filters), and the rest fold into a “+3” chip with the full list in a tooltip. It takes data, not children: react-responsive-overflow-list measures the space and calls renderItem for the tags that fit and renderOverflow for the rest.",
                  anatomy: `<TagsOverflowList
  items={tags}
  maxRows={5}
/>

// inside it
<OverflowList
  renderItem={(tag) => <Badge />}
  renderOverflow={(hidden) => (
    <Tooltip>
      <TooltipTrigger
        render={<Badge />}
      />
      <TooltipContent />
    </Tooltip>
  )}
/>`,
                },
              ]}
            />
          </Section>

          <Section id="history">
            <SectionLabel>History</SectionLabel>
            <div className="mb-5.5">
              <Prose>
                <p>
                  Two repositories during the diploma, one monorepo after it. The dates come from
                  the commits.
                </p>
              </Prose>
            </div>
            <Timeline
              entries={[
                {
                  date: "Oct 2025",
                  title: "Foundations before features",
                  stack: "Next.js 16 · React 19 · TanStack",
                  body: "The frontend repository opened on 3 October 2025. It began with the styles, the architecture and the landing page, before any feature.",
                },
                {
                  date: "Oct 2025 — Feb 2026",
                  title: "The diploma",
                  stack: "Next.js · Spring Boot · PostgreSQL",
                  body: "Frontend and backend in separate repositories, built side by side. On the frontend, in order: sign-in and registration, the upload wizard, the dataset page, browsing, home, profiles, rankings, trending and the help centre; then the backend integration, support chat, global search, activities and discussion threads, role access, and the fixes before production. Defended on 20 February 2026.",
                },
                {
                  date: "Mar 2026",
                  title: "Architectures begins",
                  stack: "Next.js · Claude Code agents",
                  body: "On 24 March 2026 the frontend’s architecture became a template: the Next.js stack of a new, private Architectures repository, with its building blocks, file templates and Claude Code agents. SalonSvitlo’s storefront was started from it the same night, and its API and CRM within the week.",
                },
                {
                  date: "Mar — Apr 2026",
                  title: "One monorepo",
                  stack: "Docker Compose",
                  body: (
                    <>
                      <PersonLink id="piotr-gago" /> brought the backend and the frontend together
                      into one repository, with Docker Compose for local development; a production
                      setup followed in April.
                    </>
                  ),
                },
                {
                  date: "Aug 2026",
                  title: "A new foundation",
                  stack: "Base UI · Bun · Storybook · Claude Code",
                  body: "Written conventions for people and agents, Git hooks and a formatting sweep, Bun as the package manager and runtime, the move to Base UI, a design foundation of semantic tokens, and Storybook.",
                },
                {
                  date: "Aug 2026",
                  title: "Architectures goes public",
                  stack: "Claude Code plugins · MIT",
                  body: "The template, grown by then with TanStack Start and NestJS stacks, was open-sourced on 28 August 2026 as Claude Code plugins. Giga Psych now installs it back, like any other project.",
                },
                {
                  date: "2026 — 2027",
                  title: "Master’s degree",
                  current: true,
                  body: "Still being built, as our own independent work and as part of my master’s degree, which I finish in 2027.",
                },
              ]}
            />
          </Section>

          <Section id="ai">
            <SectionLabel>Working with AI</SectionLabel>
            <Prose>
              <p>
                During the diploma, AI only assisted me. With the student plans of{" "}
                <TechLink id="cursor" /> and Google’s <TechLink id="gemini" />, I used it to analyse
                projects and to design small parts of code. <strong>The architecture</strong>, the
                patterns and auth I wrote by hand and tested myself.
              </p>
              <p>
                Once I became comfortable with the AI tools I used, I relied on them more in the
                project, and that let me finish it on time without sacrificing quality.
              </p>
              <p>
                In August 2026, before the second semester started, we slowly picked the project up
                again. By then I had already mastered <TechLink id="claude-code" /> to a decent
                level, an agent better than any AI tool I had used before. I had already applied
                many leading AI engineering patterns in other projects, so I applied them to this
                one. With Claude Code, the first thing I did was break the whole project down into
                markdown files for the agent to read. Then I installed my{" "}
                <LocaleLink
                  href="/projects/architectures"
                  className={techLinkVariants({ variant: "inline" })}
                >
                  Architectures
                </LocaleLink>{" "}
                plugin, now synced live with its repository, and moved the project to newer tools:
                from Node and pnpm to <TechLink id="bun" /> for faster development, and from Radix
                to <TechLink id="base-ui" />, its newer alternative.
              </p>
            </Prose>
            <div className="mt-5.5">
              <div className="mb-2.5 text-13 text-fg-faint">Tools</div>
              <StackList stack={["cursor", "gemini", "claude-code"]} />
            </div>
            <div className="mt-5.5">
              <FeatureSpecs
                features={[
                  {
                    fn: "AGENTS.md",
                    icon: <FileTextIcon />,
                    title: "An index, not a manual",
                    description: (
                      <>
                        <p>
                          <TechLink id="agents-md" /> is the general format for an agent’s context,
                          so I stuck to it, and <code>CLAUDE.md</code> only points to it, leaving
                          room for anything specific to Claude. It’s a common pattern when several
                          agents work on one codebase.
                        </p>
                        <p>
                          The file is an index of the project’s docs, to keep lookups quick and the
                          context small: six conventions load on every prompt (the stack, the
                          architecture, the workflow, the backend boundary, safety and comments),
                          and the other nine load only when the work touches them. It’s another main
                          pattern of using AI in the codebase: without it, the file bloats too soon
                          and stops working as the project grows.
                        </p>
                      </>
                    ),
                  },
                  {
                    fn: "Blueprint",
                    icon: <WrenchIcon />,
                    title: "The architecture, as plugins",
                    description: (
                      <>
                        The generic rules come from the Next.js blueprint, installed as{" "}
                        <TechLink id="claude-code" /> plugins, and the repository records which
                        version it runs. Now it’s easy to keep the project in sync with the
                        blueprint’s decision records, and the architecture can still diverge where
                        the project needs it: its own docs win over the blueprint’s.
                      </>
                    ),
                  },
                  {
                    fn: "Patterns",
                    icon: <BooksIcon />,
                    title: "The hard parts, written down",
                    description:
                      "Each pattern is a separate file the agent can consult: the upload wizard, the resource tables and mutation invalidation each have one, read before any work in that area.",
                  },
                  {
                    fn: "Plans",
                    icon: <PencilRulerIcon />,
                    title: "Decisions before code",
                    description: (
                      <>
                        A planning stage entered the project. The <TechLink id="bun" /> and{" "}
                        <TechLink id="base-ui" /> migrations started as written plans, with a
                        backlog of numbered tasks and a decision record for what was traded away.
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </Section>
        </SectionGroup>

        <Section id="design">
          <SectionLabel>Design</SectionLabel>
          <DesignNote
            callout="This page follows Giga Psych’s own 60-30-10."
            swatches={[
              { name: "White, 60%", hex: "#ffffff" },
              { name: "Gray, 30%", hex: "#e8e8e8" },
              { name: "Blue, 10%", hex: "#0068f8" },
            ]}
          >
            <p>
              Giga Psych is built on an old rule of interior design: sixty parts of the main colour,
              thirty of the second, ten of the accent. Its interface is mostly white; gray holds the
              structure, the tables and the borders; and blue marks the one thing to look at next.
            </p>
            <p>
              The gradient behind the title is the app’s own background: slate washed with
              periwinkle from one side and a little red in the far corner. It is the first thing a
              researcher sees behind every page of Giga Psych, so this page begins in it too.
            </p>
          </DesignNote>
        </Section>

        <NextProjectLink name="Architectures" href="/projects/architectures" />
      </PageShell>
    </>
  );
}
