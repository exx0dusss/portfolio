import type { Metadata } from "next";

import { ContactSection } from "./_components/contact-section";
import { ExperienceSection } from "./_components/experience-section";
import { HeroSection } from "./_components/hero-section";
import { StackSection } from "./_components/stack-section";
import { WorkSection } from "./_components/work-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="shell">
      <HeroSection />
      <WorkSection />
      <ExperienceSection />
      <StackSection />
      <ContactSection />
    </main>
  );
}
