import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PrintButton } from "./_components/print-button";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Tymur Mustafaiev — Middle Front-End Developer & UX/UI Designer based in Warsaw.",
};

const EMAIL = "tymurmustafaiev029@gmail.com";
const LINKEDIN = "https://linkedin.com/in/tymur-mustafaiev-968b3724b";

export default function ResumePage() {
  return (
    <main className="shell">
      <article className="card resume">
        <div className="r-bar">
          <span className="lbl">Résumé</span>
          <div className="acts">
            <Button variant="ghost" asChild>
              <a href="/resume.pdf" download>
                Download PDF
              </a>
            </Button>
            <PrintButton />
          </div>
        </div>

        <header className="r-head">
          <div>
            <h1>Tymur Mustafaiev</h1>
            <div className="r-title">Middle Front-End Developer &amp; UX/UI Designer</div>
          </div>
          <div className="r-contact">
            Warsaw, Poland
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <br />
            +48 571 945 966 · <a href={LINKEDIN}>LinkedIn</a>
          </div>
        </header>

        <div className="r-grid">
          <aside className="r-side">
            <div className="r-block">
              <h2 className="r-h">Skills</h2>
              <div className="sk">
                <div className="skk">Languages</div>
                <div className="skv">TypeScript, JavaScript, HTML, CSS, SQL</div>
              </div>
              <div className="sk">
                <div className="skk">Frameworks</div>
                <div className="skv">React, Next.js, TanStack Start, Node.js, Deno, NestJS</div>
              </div>
              <div className="sk">
                <div className="skk">UI &amp; Design</div>
                <div className="skv">
                  Figma, Tailwind, shadcn/ui (Radix, Base UI), design systems, interaction design,
                  a11y
                </div>
              </div>
              <div className="sk">
                <div className="skk">Testing</div>
                <div className="skv">Playwright, Vitest, Jest, MSW</div>
              </div>
              <div className="sk">
                <div className="skk">Tooling &amp; AI</div>
                <div className="skv">Git, pnpm, Vite, TanStack Query/Form, Claude, Cursor, Codex</div>
              </div>
            </div>

            <div className="r-block">
              <h2 className="r-h">Languages</h2>
              <div className="r-lang">
                <span>English</span>
                <span className="lv">Fluent (C1)</span>
              </div>
              <div className="r-lang">
                <span>Ukrainian</span>
                <span className="lv">Native</span>
              </div>
              <div className="r-lang">
                <span>Russian</span>
                <span className="lv">Native</span>
              </div>
              <div className="r-lang">
                <span>Japanese</span>
                <span className="lv">Basic</span>
              </div>
              <div className="r-lang">
                <span>Polish</span>
                <span className="lv">Basic</span>
              </div>
            </div>

            <div className="r-block r-edu">
              <h2 className="r-h">Education</h2>
              <div className="r-item">
                <div className="r-role">Master’s Degree</div>
                <div className="skv">
                  Polish-Japanese Academy of IT (PJATK), Warsaw · 2026–present
                </div>
              </div>
              <div className="r-item">
                <div className="r-role">Bachelor’s Degree</div>
                <div className="skv">Polish-Japanese Academy of IT (PJATK), Warsaw · 2022–2026</div>
              </div>
            </div>

            <div className="r-block">
              <h2 className="r-h">Links</h2>
              <div className="li">
                <Link href="/">Portfolio — this site</Link>
              </div>
              <div className="li">
                <a href="https://github.com/exx0dusss">github.com/exx0dusss</a>
              </div>
              <div className="li">
                Orgs: <a href="https://github.com/ExdBots">ExdBots</a> ·{" "}
                <a href="https://github.com/Salon-Svitlo">Salon-Svitlo</a>
              </div>
              <div className="li">
                <a href={LINKEDIN}>linkedin.com/in/tymur-mustafaiev</a>
              </div>
              <div className="li">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
          </aside>

          <div className="r-main">
            <div className="r-block">
              <h2 className="r-h">Summary</h2>
              <p className="r-summary">
                Full-stack engineer and UX/UI designer who treats software as a craft and loves
                shipping beautiful, well-built things. Adaptive and independent, with a focus on
                responsive, scalable applications across the whole stack — interface, backend, and
                the systems behind them.
              </p>
            </div>

            <div className="r-block">
              <h2 className="r-h">Experience</h2>

              <div className="r-item">
                <div className="r-role">Front-End Developer &amp; Designer</div>
                <div className="r-meta">
                  <span className="r-co">Softica Tech</span>
                  <span className="r-when">2025 — May 2026 · Remote</span>
                </div>
                <div className="r-sub">
                  <span className="rr">Middle Front-End Developer</span>
                  <span className="rw">Feb 2026 — May 2026</span>
                </div>
                <div className="r-sub">
                  <span className="rr">Lead UX/UI Designer</span>
                  <span className="rw">Mar 2025 — May 2026</span>
                </div>
                <div className="r-sub">
                  <span className="rr">Junior Front-End Developer</span>
                  <span className="rw">Feb 2025 — Feb 2026</span>
                </div>
              </div>

              <div className="r-item">
                <div className="r-role">Full-Stack Developer</div>
                <div className="r-meta">
                  <span className="r-co">MyLamp</span>
                  <span className="r-when">Oct 2024 — Present · Remote</span>
                </div>
                <ul className="r-bullets">
                  <li>
                    Designing and building a full-stack e-commerce product for a lighting business —
                    store, landing, CRM, and a Telegram bot with a web-app.
                  </li>
                </ul>
              </div>

              <div className="r-item">
                <div className="r-role">Lead Front-End Developer</div>
                <div className="r-meta">
                  <span className="r-co">PCEXPERT</span>
                  <span className="r-when">Mar 2024 — Jul 2024 · Warsaw</span>
                </div>
              </div>
            </div>

            <div className="r-block">
              <h2 className="r-h">Selected Projects</h2>
              <div className="r-proj">
                <b>ExdBots</b> — a platform for managing Telegram applications: build &amp; monitor
                bots through a no-code web editor, connect existing bots, and handle ad management
                and statistics from one interface. <span className="yr">2026 — present</span>
              </div>
              <div className="r-proj">
                <b>MyLamp</b> — full-stack e-commerce for a lighting business with 20+ years in the
                trade: store, landing, CRM and a Telegram web-app.{" "}
                <span className="yr">2024 — present</span>
              </div>
              <div className="r-proj">
                <b>TikTok Downloader Bot</b> — a Telegram-based application with a strong back-end,
                continuously improved. The origin of the ExdBots system design.{" "}
                <span className="yr">2023 — present</span>
              </div>
              <div className="r-proj">
                <b>Komsetik Profi</b> — landing page for a German cosmetology brand.{" "}
                <span className="yr">2024</span>
              </div>
            </div>

            <div className="r-block">
              <h2 className="r-h">Certifications</h2>
              <div className="r-proj">
                Next.js App Router Fundamentals — <b>Vercel</b>
              </div>
              <div className="r-proj">
                React Foundations for Next.js — <b>Vercel</b>
              </div>
              <div className="r-proj">NestJS: Zero to Hero — Modern TypeScript Back-end</div>
              <div className="r-proj">The Complete SQL Bootcamp: Zero to Hero</div>
              <div className="r-proj">React — Full Course, Redux &amp; Redux Toolkit</div>
              <div className="r-proj">
                Understanding NPM · Introduction to Programming Using JavaScript
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
