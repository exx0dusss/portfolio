import { LocaleLink } from "@/components/locale-link";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/page";
import { ButtonLink } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CraneTowerIcon } from "@/components/ui/icons";

/** The body of a project that is still being built: an empty state under
 *  the hero that says so and points to a finished case study and back to the
 *  work, so the page is never a dead end. Case studies are English-only.
 *
 *    <ProjectHero … />
 *    <CaseStudyEmpty name="ExdBots" />
 */
export function CaseStudyEmpty({ name }: { name: string }) {
  return (
    <Section id="overview">
      <Reveal>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CraneTowerIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle>In development</EmptyTitle>
            <EmptyDescription>
              {name} is still being built, and its case study will follow once it ships.
              ExdDownloaderApp shows what a finished one looks like.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <ButtonLink render={<LocaleLink href="/projects/exd-downloader-app" />}>
              Read ExdDownloaderApp
            </ButtonLink>
            <ButtonLink render={<LocaleLink href="/projects" />} variant="ghost">
              All projects
            </ButtonLink>
          </EmptyContent>
        </Empty>
      </Reveal>
    </Section>
  );
}
