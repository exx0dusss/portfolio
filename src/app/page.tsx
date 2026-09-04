import { getCmsProjects, getCmsSiteSettings } from "@/lib/cms/repository";

import { NavDots } from "@/components/layout/nav-dots";

import { AboutSection } from "./_components/about-section";
import { ContactSection } from "./_components/contact-section";
import { HeroSection } from "./_components/hero-section";
import { StackSection } from "./_components/stack-section";
import { WorkSection } from "./_components/work-section";
import { mergeProjects } from "./_components/projects";

export default async function HomePage() {
  const [cmsProjects, settings] = await Promise.all([getCmsProjects(), getCmsSiteSettings()]);
  const projects = mergeProjects(cmsProjects);

  return (
    <>
      <main className="shell">
        <HeroSection
          content={
            settings
              ? {
                  eyebrow: settings.eyebrow,
                  headline: settings.headline,
                  intro: settings.intro,
                  availability: settings.availability,
                  location: settings.location,
                  portraitUrl: settings.portrait?.asset?.url,
                }
              : undefined
          }
        />
        <WorkSection projects={projects} />
        <StackSection stack={settings?.stack?.length ? settings.stack : undefined} />
        <AboutSection
          content={{
            portraitUrl: settings?.portrait?.asset?.url,
            body: settings?.about,
          }}
        />
        <ContactSection
          content={{
            email: settings?.email,
            heading: settings?.contactHeading,
            intro: settings?.contactIntro,
            socials: settings?.socials?.map(({ label, url }) => ({ label, href: url })),
          }}
        />
      </main>
      <NavDots />
    </>
  );
}
