import { Reveal } from "@/components/motion/reveal";

/** Section heading on project pages; sits in the section's left column. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal as="h2" className="clabel">
      {children}
    </Reveal>
  );
}
