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

/** The body of a case study that isn't written yet: an empty state under the
 *  hero that points to a finished case study and back to the work, so the
 *  page is never a dead end. Case studies are English-only.
 *
 *    <ProjectHero … />
 *    <CaseStudyEmpty />
 */
export function CaseStudyEmpty() {
  return (
    <Section id="overview">
      <Reveal>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CraneTowerIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle>Case study in progress</EmptyTitle>
            <EmptyDescription>
              This write-up is still being put together. Kosmetik Profi shows what the finished ones
              look like.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <ButtonLink render={<LocaleLink href="/projects/kosmetik-profi" />}>
              Read Kosmetik Profi
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
