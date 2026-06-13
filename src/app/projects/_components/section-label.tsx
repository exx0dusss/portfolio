import { Reveal } from "@/components/motion/reveal";

/** Numbered card heading, e.g. "01 Overview". */
export function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <Reveal as="div" className="clabel">
      <span className="num">{num}</span> {children}
    </Reveal>
  );
}
