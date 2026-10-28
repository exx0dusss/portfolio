import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { requireEnglish } from "@/i18n";

import { PrintButton } from "./_components/print-button";
import {
  ResumeBullets,
  ResumeCompany,
  ResumeDetail,
  ResumeEntry,
  ResumeLanguage,
  ResumeLink,
  ResumeMeta,
  ResumeProject,
  ResumeRole,
  ResumeSection,
  ResumeSectionTitle,
  ResumeSkill,
  ResumeSubRole,
  ResumeWhen,
  ResumeYear,
} from "./_components/resume";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Tymur Mustafaiev — Front-End Engineer & UX/UI Designer based in Warsaw.",
  alternates: { canonical: "/resume" },
};

const EMAIL = "tymurmustafaiev029@gmail.com";
const LINKEDIN = "https://linkedin.com/in/tymur-mustafaiev-968b3724b";

export default async function ResumePage({ params }: { params: Promise<{ lang: string }> }) {
  await requireEnglish(params);
  return (
    // printed, the sheet fills the page; ! beats the unlayered .shell rule
    <main className="shell print:max-w-none! print:p-0!">
      <article className="mx-auto max-w-resume px-13 py-11.5 max-phone:px-6 max-phone:py-7.5 print:max-w-none print:p-0!">
        <div className="mb-6.5 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <span className="text-11.5 font-medium tracking-caps text-fg-faint uppercase">
            Résumé
          </span>
          <div className="flex gap-2.25">
            <ButtonLink
              variant="ghost"
              href="/tymur-mustafaiev-cv.pdf"
              download="tymur-mustafaiev-cv.pdf"
            >
              Download PDF
            </ButtonLink>
            <PrintButton />
          </div>
        </div>

        <header className="flex items-end justify-between gap-7 border-b-2 border-fg pb-4.5 max-phone:flex-col max-phone:items-start max-phone:gap-3 print:border-print-ink">
          <div>
            <h1 className="text-31 leading-none font-semibold tracking-name">Tymur Mustafaiev</h1>
            <div className="mt-1.75 text-15 text-fg-dim">
              Front-End Engineer &amp; UX/UI Designer
            </div>
          </div>
          <div className="text-right text-12.5 leading-address whitespace-nowrap text-fg-dim max-phone:text-left max-phone:whitespace-normal [&_a]:text-accent-ink print:[&_a]:text-accent">
            Warsaw, Poland
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <br />
            +48 571 945 966 · <a href={LINKEDIN}>LinkedIn</a>
          </div>
        </header>

        {/* print: the gap overrides the phone one too (A4 is under 760px wide) */}
        <div className="mt-6.5 grid grid-cols-resume gap-10 max-phone:grid-cols-resume-stacked max-phone:gap-7 print:gap-8.5!">
          <aside>
            <ResumeSection>
              <ResumeSectionTitle>Skills</ResumeSectionTitle>
              <ResumeSkill label="Languages">TypeScript, JavaScript, HTML, CSS, SQL</ResumeSkill>
              <ResumeSkill label="Frameworks">
                React, Next.js, TanStack Start, Node.js, NestJS, Deno, Bun
              </ResumeSkill>
              <ResumeSkill label="UI & Design">
                Figma, Tailwind, shadcn/ui (Radix, Base UI), design systems, interaction design,
                a11y
              </ResumeSkill>
              <ResumeSkill label="Testing">Playwright, Vitest, Jest, MSW, Storybook</ResumeSkill>
              <ResumeSkill label="Tooling & AI">
                Git, pnpm, Vite, TanStack Query/Form, AI SDK, agentic engineering (Claude Code,
                Cursor, Codex)
              </ResumeSkill>
            </ResumeSection>

            <ResumeSection>
              <ResumeSectionTitle>Languages</ResumeSectionTitle>
              <ResumeLanguage name="English" level="Fluent (C1)" />
              <ResumeLanguage name="Ukrainian" level="Native" />
              <ResumeLanguage name="Russian" level="Native" />
              <ResumeLanguage name="Japanese" level="Basic" />
              <ResumeLanguage name="Polish" level="Basic" />
            </ResumeSection>

            <ResumeSection>
              <ResumeSectionTitle>Education</ResumeSectionTitle>
              <ResumeEntry className="mb-3.25 last:mb-3.25">
                <ResumeRole size="sm">Master’s Degree</ResumeRole>
                <ResumeDetail className="mt-0.75">
                  Polish-Japanese Academy of IT (PJATK), Warsaw · 2026–present
                </ResumeDetail>
              </ResumeEntry>
              <ResumeEntry className="mb-3.25 last:mb-3.25">
                <ResumeRole size="sm">Bachelor’s Degree</ResumeRole>
                <ResumeDetail className="mt-0.75">
                  Polish-Japanese Academy of IT (PJATK), Warsaw · 2022–2026
                </ResumeDetail>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection>
              <ResumeSectionTitle>Links</ResumeSectionTitle>
              <ResumeLink>
                <Link href="/">Portfolio — this site</Link>
              </ResumeLink>
              <ResumeLink>
                <a href="https://github.com/exx0dusss">github.com/exx0dusss</a>
              </ResumeLink>
              <ResumeLink>
                <a href={LINKEDIN}>linkedin.com/in/tymur-mustafaiev</a>
              </ResumeLink>
              <ResumeLink>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </ResumeLink>
            </ResumeSection>
          </aside>

          <div>
            <ResumeSection>
              <ResumeSectionTitle>Summary</ResumeSectionTitle>
              <p className="text-13.5 leading-summary text-fg-dim">
                Front-end engineer and UX/UI designer who treats software as a craft and loves
                shipping beautiful, well-built things. I take products from Figma to production in
                TypeScript — interface, backend, and the systems behind them — and I&#8217;m
                increasingly building AI features into them.
              </p>
            </ResumeSection>

            <ResumeSection>
              <ResumeSectionTitle>Experience</ResumeSectionTitle>

              <ResumeEntry>
                <ResumeRole>Front-End Developer &amp; Designer</ResumeRole>
                <ResumeMeta>
                  <ResumeCompany>Softica Tech</ResumeCompany>
                  <ResumeWhen>2025 — May 2026 · Remote</ResumeWhen>
                </ResumeMeta>
                <ResumeSubRole role="Middle Front-End Developer" when="Feb 2026 — May 2026" />
                <ResumeSubRole role="Lead UX/UI Designer" when="Mar 2025 — May 2026" />
                <ResumeSubRole role="Junior Front-End Developer" when="Feb 2025 — Feb 2026" />
              </ResumeEntry>

              <ResumeEntry>
                <ResumeRole>Full-Stack Developer</ResumeRole>
                <ResumeMeta>
                  <ResumeCompany>SalonSvitlo</ResumeCompany>
                  <ResumeWhen>Oct 2024 — Present · Remote</ResumeWhen>
                </ResumeMeta>
                <ResumeBullets>
                  <li>
                    Designing and building a full-stack e-commerce product for a lighting business —
                    store, landing, CRM, and a Telegram bot with a web-app.
                  </li>
                </ResumeBullets>
              </ResumeEntry>

              <ResumeEntry>
                <ResumeRole>Lead Front-End Developer</ResumeRole>
                <ResumeMeta>
                  <ResumeCompany>PCEXPERT</ResumeCompany>
                  <ResumeWhen>Mar 2024 — Jul 2024 · Warsaw</ResumeWhen>
                </ResumeMeta>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection>
              <ResumeSectionTitle>Selected Projects</ResumeSectionTitle>
              <ResumeProject>
                <b>ExdBots</b> — a platform for managing Telegram applications: build &amp; monitor
                bots through a no-code web editor, connect existing bots, and handle ad management
                and statistics from one interface. <ResumeYear>2026 — present</ResumeYear>
              </ResumeProject>
              <ResumeProject>
                <b>SalonSvitlo</b> — full-stack e-commerce for a lighting business with 20+ years in
                the trade: store, landing, CRM and a Telegram web-app.{" "}
                <ResumeYear>2024 — present</ResumeYear>
              </ResumeProject>
              <ResumeProject>
                <b>TikTok Downloader Bot</b> — a Telegram-based application with a strong back-end,
                continuously improved. The origin of the ExdBots system design.{" "}
                <ResumeYear>2023 — present</ResumeYear>
              </ResumeProject>
              <ResumeProject>
                <b>Kosmetik Profi</b> — landing page for a German cosmetology brand.{" "}
                <ResumeYear>2024</ResumeYear>
              </ResumeProject>
            </ResumeSection>

            <ResumeSection>
              <ResumeSectionTitle>Certifications</ResumeSectionTitle>
              <ResumeProject>
                Next.js App Router Fundamentals — <b>Vercel</b>
              </ResumeProject>
              <ResumeProject>
                React Foundations for Next.js — <b>Vercel</b>
              </ResumeProject>
              <ResumeProject>NestJS: Zero to Hero — Modern TypeScript Back-end</ResumeProject>
              <ResumeProject>The Complete SQL Bootcamp: Zero to Hero</ResumeProject>
              <ResumeProject>React — Full Course, Redux &amp; Redux Toolkit</ResumeProject>
              <ResumeProject>
                Understanding NPM · Introduction to Programming Using JavaScript
              </ResumeProject>
            </ResumeSection>
          </div>
        </div>
      </article>
    </main>
  );
}
