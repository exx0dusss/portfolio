import { Reveal } from "@/components/motion/reveal";

import type { FeatureCard } from "./projects-detail";

/** 2-column feature grid: each card is an `fn` tag, a title, and a blurb. */
export function FeatureGrid({ features }: { features: FeatureCard[] }) {
  return (
    <Reveal className="feat">
      {features.map((feature) => (
        <div className="f" key={feature.title}>
          <div className="ft">
            <span className="fn">{feature.fn}</span> {feature.title}
          </div>
          <div className="fd">{feature.description}</div>
        </div>
      ))}
    </Reveal>
  );
}
