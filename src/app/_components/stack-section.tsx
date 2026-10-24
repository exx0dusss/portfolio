import { Reveal } from "@/components/motion/reveal";

/** Two lists: what I use daily vs. what I've shipped with. The long tail
 *  (Vue, Three.js, Python, …) lives on the résumé and in JSON-LD only. */
const STACK = [
  {
    tier: "Every day",
    items: [
      "TypeScript, React, Next.js, TanStack",
      "Figma, design systems and tokens",
      "Accessibility and Core Web Vitals",
      "AI features and AI-assisted development",
    ],
  },
  {
    tier: "Also shipped with",
    items: [
      "Node.js, NestJS, PostgreSQL",
      "Payments, delivery and messaging integrations",
      "Docker, GitHub Actions, Cloudflare, Vercel",
      "Playwright and Vitest",
    ],
  },
] as const;

/** Skills section: two plain lists. */
export function StackSection() {
  return (
    <section className="card" id="skills">
      <Reveal as="h2" className="clabel">
        Skills
      </Reveal>
      <Reveal className="skills">
        {STACK.map((group) => (
          <div key={group.tier}>
            <h3>{group.tier}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
