import { Reveal } from "@/components/motion/reveal";

/** Two tiers: what I use daily vs. what I've shipped with. The long tail
 *  (Vue, Three.js, Python, …) lives on the résumé and in JSON-LD only. */
const STACK = [
  {
    tier: "Daily",
    rows: [
      {
        label: "Front-end",
        value: "TypeScript, React & Server Components, Next.js, TanStack, Tailwind + shadcn/ui",
      },
      { label: "Design", value: "Figma, design systems & tokens, prototyping, usability testing" },
      { label: "Quality", value: "Accessibility (WCAG), Core Web Vitals, Playwright, Vitest" },
      { label: "AI", value: "LLM features with the AI SDK, agentic engineering" },
    ],
  },
  {
    tier: "Shipped with",
    rows: [
      {
        label: "Back-end & data",
        value: "Node.js, NestJS, PostgreSQL, auth (sessions, OAuth), queues, WebSockets",
      },
      { label: "Infra", value: "Docker, Coolify, GitHub Actions, Cloudflare, Vercel, Sentry" },
    ],
  },
] as const;

/** Stack section: tiered, labelled list of tools by category. */
export function StackSection() {
  return (
    <section className="card" id="stack">
      <Reveal as="div" className="clabel">
        <span className="num">02</span> Stack
      </Reveal>
      {STACK.map((group) => (
        <Reveal key={group.tier} className="sgroup">
          <div className="stier">{group.tier}</div>
          {group.rows.map((row) => (
            <div className="srow" key={row.label}>
              <div className="sk">{row.label}</div>
              <div className="sv">{row.value}</div>
            </div>
          ))}
        </Reveal>
      ))}
    </section>
  );
}
