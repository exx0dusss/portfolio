import { Reveal } from "@/components/motion/reveal";

const STACK = [
  { label: "Languages", value: "TypeScript, JavaScript, SQL, Python" },
  { label: "Frameworks", value: "Next.js, TanStack Start, React, Node.js" },
  { label: "UI & Design", value: "shadcn/ui, Base UI, Tailwind, Radix, Figma" },
  { label: "Backend & Data", value: "Supabase, PostgreSQL, Drizzle, tRPC, Redis" },
  { label: "Platforms", value: "Vercel, Stripe, Telegram Bot API, Mini Apps" },
] as const;

/** Stack section: a labelled list of tools by category. */
export function StackSection({
  stack = STACK,
}: {
  stack?: ReadonlyArray<{ label: string; value: string }>;
}) {
  return (
    <section className="card" id="stack">
      <Reveal as="div" className="clabel">
        <span className="num">02</span> Stack
      </Reveal>
      <Reveal>
        {stack.map((row) => (
          <div className="srow" key={row.label}>
            <div className="sk">{row.label}</div>
            <div className="sv">{row.value}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
