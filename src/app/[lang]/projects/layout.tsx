import { SectionRail } from "@/components/section-rail";

/** Every project page gets the section rail; it stays away from pages with
 *  too few sections to need it. */
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SectionRail />
    </>
  );
}
