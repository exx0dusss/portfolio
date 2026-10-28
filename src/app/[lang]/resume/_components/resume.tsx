import { cn } from "@/lib/utils/cn";

/**
 * Parts of the résumé sheet: titled sections in either column, with entries,
 * skill groups, language rows, links and one-line projects inside.
 *
 *   <ResumeSection>
 *     <ResumeSectionTitle>Experience</ResumeSectionTitle>
 *     <ResumeEntry>
 *       <ResumeRole>Full-Stack Developer</ResumeRole>
 *       <ResumeMeta>
 *         <ResumeCompany>SalonSvitlo</ResumeCompany>
 *         <ResumeWhen>Oct 2024 — Present · Remote</ResumeWhen>
 *       </ResumeMeta>
 *       <ResumeBullets><li>…</li></ResumeBullets>
 *     </ResumeEntry>
 *   </ResumeSection>
 *
 * Print: sections and entries never split across pages, and the orange ink
 * prints in the bright accent (the AA-safe shade is only needed on screen).
 */
function ResumeSection({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resume-section"
      className={cn("mb-6.5 last:mb-0 print:break-inside-avoid", className)}
      {...props}
    />
  );
}

function ResumeSectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="resume-section-title"
      className={cn(
        "mb-3.25 border-b border-b-line-strong pb-1.75 text-11 font-semibold tracking-caps text-fg-faint uppercase print:border-print-line",
        className,
      )}
      {...props}
    />
  );
}

/** A job or a degree: role, then where and when. */
function ResumeEntry({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resume-entry"
      className={cn("mb-4.25 last:mb-0 print:break-inside-avoid", className)}
      {...props}
    />
  );
}

function ResumeRole({
  size = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** "sm" for the sidebar's education entries. */
  size?: "default" | "sm";
}) {
  return (
    <div
      data-slot="resume-role"
      className={cn(
        "font-semibold tracking-snug",
        size === "sm" ? "text-13.5" : "text-14.5",
        className,
      )}
      {...props}
    />
  );
}

/** Company on the left, dates on the right. */
function ResumeMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resume-meta"
      className={cn("mt-0.5 flex items-baseline justify-between gap-3", className)}
      {...props}
    />
  );
}

function ResumeCompany({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="resume-company"
      className={cn("text-13 font-medium text-accent-ink print:text-accent", className)}
      {...props}
    />
  );
}

function ResumeWhen({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="resume-when"
      className={cn("font-mono text-11.5 whitespace-nowrap text-fg-faint", className)}
      {...props}
    />
  );
}

/** One of several roles held at the same company, with its own dates. */
function ResumeSubRole({
  role,
  when,
  className,
  ...props
}: React.ComponentProps<"div"> & { role: string; when: string }) {
  return (
    <div
      data-slot="resume-sub-role"
      className={cn("mt-1.25 flex items-baseline justify-between gap-3", className)}
      {...props}
    >
      <span className="text-13 font-medium text-fg">{role}</span>
      <span className="font-mono text-11 whitespace-nowrap text-fg-faint">{when}</span>
    </div>
  );
}

function ResumeBullets({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="resume-bullets"
      className={cn(
        "mt-2 pl-4.25 [&_li]:mb-1 [&_li]:text-12.8 [&_li]:leading-bullet [&_li]:text-fg-dim",
        className,
      )}
      {...props}
    />
  );
}

/** A sidebar skill group: a short label over a comma-separated list. */
function ResumeSkill({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: string }) {
  return (
    <div data-slot="resume-skill" className={cn("mb-3 last:mb-0", className)} {...props}>
      <div className="text-12 font-semibold">{label}</div>
      <ResumeDetail>{children}</ResumeDetail>
    </div>
  );
}

/** A dim secondary line: a skill list, a degree's school and years. */
function ResumeDetail({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resume-detail"
      className={cn("mt-0.5 text-12.5 leading-detail text-fg-dim", className)}
      {...props}
    />
  );
}

function ResumeLanguage({
  name,
  level,
  className,
  ...props
}: React.ComponentProps<"div"> & { name: string; level: string }) {
  return (
    <div
      data-slot="resume-language"
      className={cn("mb-1.5 flex justify-between gap-2.5 text-12.5 last:mb-0", className)}
      {...props}
    >
      <span>{name}</span>
      <span className="text-fg-faint">{level}</span>
    </div>
  );
}

/** A sidebar link row; the link inside is tinted with the accent. */
function ResumeLink({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resume-link"
      className={cn(
        "mb-1.5 text-12.5 last:mb-0 [&_a]:text-accent-ink print:[&_a]:text-accent",
        className,
      )}
      {...props}
    />
  );
}

/** A one-line project or certification; <b> marks its name or issuer. */
function ResumeProject({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="resume-project"
      className={cn(
        "mb-2.5 text-12.8 leading-detail text-fg-dim last:mb-0 [&_b]:font-medium [&_b]:text-fg",
        className,
      )}
      {...props}
    />
  );
}

/** A project's years, after its description. */
function ResumeYear({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="resume-year" className={cn("text-fg-faint", className)} {...props} />;
}

export {
  ResumeBullets,
  ResumeCompany,
  ResumeDetail,
  ResumeEntry,
  ResumeLanguage,
  ResumeLink,
  ResumeMeta,
  ResumeProject,
  ResumeRole,
  ResumeSection,
  ResumeSectionTitle,
  ResumeSkill,
  ResumeSubRole,
  ResumeWhen,
  ResumeYear,
};
