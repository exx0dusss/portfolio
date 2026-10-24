import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n";

/** Skills section: two plain lists — what I use daily vs. what I've shipped
 *  with. The long tail (Vue, Three.js, Python, …) lives on the résumé and in
 *  JSON-LD only. */
export function StackSection({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <section className="card" id="skills">
      <Reveal as="h2" className="clabel">
        {dict.label}
      </Reveal>
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
    </section>
  );
}
