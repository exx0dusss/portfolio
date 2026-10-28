"use client";

import { useRender } from "@base-ui/react/use-render";

import { Reveal } from "@/components/motion/reveal";
import { SectionAnchor } from "@/components/section-anchor";
import { cn } from "@/lib/utils/cn";

/**
 * The page shell every route shares: sections stacked in the page column,
 * divided by ink rules, each with its name in a left column on a 12-column
 * grid. Sub-pages open with a full-width header above the first rule.
 *
 *   <PageShell>
 *     <PageHeader>
 *       <PageEyebrow>Work</PageEyebrow>
 *       <PageTitle>Projects</PageTitle>
 *       <PageLead>Everything I've built.</PageLead>
 *     </PageHeader>
 *     <Section>
 *       <SectionLabel>
 *         Selected
 *         <SectionNote>newest first</SectionNote>
 *       </SectionLabel>
 *       <Prose>
 *         <p>…</p>
 *       </Prose>
 *     </Section>
 *   </PageShell>
 *
 * The labels, titles, leads and prose spring in with Reveal (`delay` steps
 * it, as Reveal's own prop).
 */
function PageShell({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="page-shell"
      className={cn("mx-auto max-w-page px-gutter pb-6", className)}
      {...props}
    />
  );
}

/** A sub-page's header: runs full width above the first rule. */
function PageHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header data-slot="page-header" className={cn("relative pt-18 pb-13", className)} {...props} />
  );
}

type RevealPartProps = {
  children: React.ReactNode;
  className?: string;
  delay?: React.ComponentProps<typeof Reveal>["delay"];
};

/** The page's name, small and grey above its title. */
function PageEyebrow({ className, delay, children }: RevealPartProps) {
  return (
    <Reveal
      data-slot="page-eyebrow"
      delay={delay}
      className={cn("mb-3.5 text-14 leading-compact font-medium text-fg-faint", className)}
    >
      {children}
    </Reveal>
  );
}

function PageTitle({ className, delay = 1, children }: RevealPartProps) {
  return (
    <Reveal
      as="h1"
      data-slot="page-title"
      delay={delay}
      className={cn(
        "text-title leading-none font-semibold tracking-display max-tiny:text-title-sm",
        className,
      )}
    >
      {children}
    </Reveal>
  );
}

function PageLead({ className, delay = 2, children }: RevealPartProps) {
  return (
    <Reveal
      as="p"
      data-slot="page-lead"
      delay={delay}
      className={cn("mt-3.75 max-w-lead text-16.5 leading-prose text-fg-dim", className)}
    >
      {children}
    </Reveal>
  );
}

/**
 * One section of a page, under an ink rule. With a SectionLabel, the label
 * takes the left three columns beside all of the content; without one
 * (cover shots, the next-project link) the content runs full width. A child
 * marked data-span="full" (a wide diagram) spans all twelve columns anyway,
 * placed below the label. Below 860px the label stacks above the content.
 * Give a labelled section an id (short, English, the same in every
 * language): its label's link button shares it (links to it clear the
 * sticky nav through the page's scroll-padding).
 *
 *   <Section id="work">…</Section>
 *   <Section render={<Link href="/next" />}>…</Section>
 */
function Section({ className, render, ...props }: useRender.ComponentProps<"section">) {
  return useRender({
    defaultTagName: "section",
    render,
    props: {
      "data-slot": "section",
      className: cn(
        "relative grid grid-cols-12 gap-x-6 border-t border-fg pt-11 pb-14 *:not-data-[slot=section-label]:col-span-full has-[>[data-slot=section-label]]:*:not-data-[slot=section-label]:not-data-[span=full]:col-start-4 max-tablet:block max-tablet:pt-9 max-tablet:pb-11",
        className,
      ),
      ...props,
    },
  });
}

/** A section's name, in its left column (spanning every row of content),
 *  followed by a button that copies a link to the section (its Section's
 *  id); a SectionNote wraps onto its own line below both. */
function SectionLabel({ className, delay, children }: RevealPartProps) {
  return (
    <Reveal
      as="h2"
      data-slot="section-label"
      delay={delay}
      className={cn(
        "group/label col-span-3 col-start-1 row-span-40 row-start-1 flex flex-wrap items-center gap-x-1.5 self-start text-15 leading-compact font-semibold text-fg max-tablet:mb-5.5 [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-3 [&>[data-slot=section-note]]:order-2 [&>[data-slot=section-note]]:basis-full",
        className,
      )}
    >
      <SectionAnchor />
      {children}
    </Reveal>
  );
}

/** A grey line under a section's name. */
function SectionNote({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="section-note"
      className={cn("mt-1 block text-13.5 font-normal text-fg-faint", className)}
      {...props}
    />
  );
}

/** Long-form copy: paragraphs at a reading measure, bold in full ink. */
function Prose({ className, delay, children }: RevealPartProps) {
  return (
    <Reveal
      data-slot="prose"
      delay={delay}
      className={cn(
        "max-w-copy [&_p]:mb-3.75 [&_p]:text-15.5 [&_p]:leading-prose [&_p]:text-fg-dim [&_p:last-child]:mb-0 [&_strong]:font-medium [&_strong]:text-fg",
        className,
      )}
    >
      {children}
    </Reveal>
  );
}

export {
  PageEyebrow,
  PageHeader,
  PageLead,
  PageShell,
  PageTitle,
  Prose,
  Section,
  SectionLabel,
  SectionNote,
};
