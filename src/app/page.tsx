import type { Metadata } from "next";

import { NavDots } from "@/components/layout/nav-dots";

import { AboutSection } from "./_components/about-section";
import { ContactSection } from "./_components/contact-section";
import { HeroSection } from "./_components/hero-section";
import { PrinciplesSection } from "./_components/principles-section";
import { StackSection } from "./_components/stack-section";
import { WorkSection } from "./_components/work-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <main className="shell">
        <HeroSection />
        <WorkSection />
        <StackSection />
        <PrinciplesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <NavDots />
    </>
  );
}
