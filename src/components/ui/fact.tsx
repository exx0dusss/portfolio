import { cn } from "@/lib/utils/cn";

/**
 * Fact tiles: a grid of matching cards for a project's key facts, built from
 * parts like shadcn's Card.
 *
 *   <Facts columns={3}>
 *     <Fact>
 *       <FactHeader>
 *         <FactIcon><CalendarBlankIcon /></FactIcon>
 *         <FactLabel>Year</FactLabel>
 *       </FactHeader>
 *       <FactValue>2024 — present</FactValue>
 *       <FactDescription>maintained since launch</FactDescription>
 *     </Fact>
 *     <Fact span="full">…</Fact>
 *   </Facts>
 */
function Facts({
  columns = 4,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  /** Columns from 761px up; phones always get two. */
  columns?: number;
}) {
  return (
    <div
      data-slot="facts"
      className={cn("facts", className)}
      style={{ "--fact-cols": columns, ...style } as React.CSSProperties}
      {...props}
    />
  );
}

function Fact({
  span = "auto",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** "full" spans the whole row, e.g. for a list of chips. */
  span?: "auto" | "full";
}) {
  return <div data-slot="fact" data-span={span} className={cn("fact", className)} {...props} />;
}

function FactHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="fact-header" className={cn("fact-header", className)} {...props} />;
}

/** A small framed thumbnail for a 13px icon. */
function FactIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="fact-icon" aria-hidden className={cn("fact-icon", className)} {...props} />
  );
}

function FactLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="fact-label" className={cn("fact-label", className)} {...props} />;
}

function FactValue({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="fact-value" className={cn("fact-value", className)} {...props} />;
}

function FactDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="fact-description" className={cn("fact-description", className)} {...props} />
  );
}

export { Fact, FactDescription, FactHeader, FactIcon, FactLabel, Facts, FactValue };
