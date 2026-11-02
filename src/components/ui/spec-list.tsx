import { cn } from "@/lib/utils/cn";

/**
 * A spec list: one full-width block per part of a system, read like a
 * reference sheet rather than scanned like cards. The part's name sits in
 * mono on the left, its title and description on the right; on phones they
 * stack.
 *
 *   <SpecList>
 *     <Spec>
 *       <SpecTerm>
 *         <SpecIcon><HardDrivesIcon /></SpecIcon>
 *         serverFetch
 *       </SpecTerm>
 *       <SpecContent>
 *         <SpecTitle>Server calls, straight to the backend</SpecTitle>
 *         <SpecDescription>
 *           <p>A server-only wrapper around fetch…</p>
 *         </SpecDescription>
 *         <SpecNote>Server actions run inside safeAction…</SpecNote>
 *       </SpecContent>
 *     </Spec>
 *   </SpecList>
 */
function SpecList({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="spec-list" className={cn("border-t border-line", className)} {...props} />;
}

function Spec({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="spec"
      className={cn(
        "flex gap-6 border-b border-line py-5.5 max-phone:flex-col max-phone:gap-2.5 max-phone:py-4.5",
        className,
      )}
      {...props}
    />
  );
}

function SpecTerm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="spec-term"
      className={cn(
        "flex w-40 flex-none items-center gap-2.25 self-start pt-0.5 font-mono text-12 text-accent-ink",
        className,
      )}
      {...props}
    />
  );
}

function SpecIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="spec-icon"
      aria-hidden
      className={cn(
        "grid size-5 flex-none place-items-center text-fg-dim [&_svg]:size-4.5",
        className,
      )}
      {...props}
    />
  );
}

function SpecContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="spec-content"
      className={cn("max-w-copy min-w-0 flex-1", className)}
      {...props}
    />
  );
}

function SpecTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="spec-title"
      className={cn("text-15 leading-compact font-medium text-fg", className)}
      {...props}
    />
  );
}

/** Paragraphs and bulleted lists; code and bold come out in full ink. */
function SpecDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="spec-description"
      className={cn(
        "mt-2 text-14 leading-copy text-fg-dim [&_code]:font-mono [&_code]:text-13 [&_code]:text-fg [&_li]:marker:text-fg-faint [&_p+p]:mt-2.5 [&_strong]:font-medium [&_strong]:text-fg [&_ul]:mt-2.5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-4.5 [&_ul+p]:mt-2.5",
        className,
      )}
      {...props}
    />
  );
}

/** A small note under the description: how it works rather than what it does. */
function SpecNote({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="spec-note"
      className={cn(
        "mt-3 text-12.5 leading-copy text-fg-faint [&_code]:font-mono [&_code]:text-12 [&_code]:text-fg-dim",
        className,
      )}
      {...props}
    />
  );
}

export { Spec, SpecContent, SpecDescription, SpecIcon, SpecList, SpecNote, SpecTerm, SpecTitle };
