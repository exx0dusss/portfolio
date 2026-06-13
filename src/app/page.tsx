import { NavDots } from "@/components/layout/nav-dots";

import { AboutSection } from "./_components/about-section";
import { ContactSection } from "./_components/contact-section";
import { HeroSection } from "./_components/hero-section";
import { StackSection } from "./_components/stack-section";
import { WorkSection } from "./_components/work-section";

export default function HomePage() {
  return (
    <>
      <main className="shell">
        <HeroSection />
        <WorkSection />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>
      <NavDots />
    </>
  );
}
