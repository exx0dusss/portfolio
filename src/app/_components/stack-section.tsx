import { Reveal } from "@/components/motion/reveal";
import { Section, SectionLabel } from "@/components/page";
import type { Dictionary } from "@/i18n";

/** Skills section: two plain lists — what I use daily vs. what I've shipped
 *  with. The long tail (Vue, Three.js, Python, …) lives on the résumé and in
 *  JSON-LD only. */
export function StackSection({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <Section id="skills">
      <SectionLabel>{dict.label}</SectionLabel>
      <Reveal className="skills">
        {dict.tiers.map((group) => (
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
    </Section>
  );
}
