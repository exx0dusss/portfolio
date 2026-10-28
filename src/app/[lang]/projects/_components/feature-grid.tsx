import { Reveal } from "@/components/motion/reveal";

import type { FeatureCard } from "./projects-detail";

/** 2-column feature grid: each card is an `fn` tag, a title, and a blurb. */
export function FeatureGrid({ features }: { features: FeatureCard[] }) {
  return (
    <Reveal className="grid grid-cols-2 gap-3.5 max-phone:grid-cols-1">
      {features.map((feature) => (
        <div className="rounded-card border border-line px-5 py-4.5" key={feature.title}>
          <div className="flex items-center gap-2.25 text-14.5 font-medium text-fg">
            <span className="font-mono text-12 text-accent-ink">{feature.fn}</span> {feature.title}
          </div>
          <div className="mt-2 text-13 leading-copy text-fg-dim">{feature.description}</div>
        </div>
      ))}
    </Reveal>
  );
}
