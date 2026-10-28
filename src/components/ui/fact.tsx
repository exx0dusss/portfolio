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
/** Grid columns per `columns` value, from 761px up. */
const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

function Facts({
  columns = 4,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** Columns from 761px up; phones always get two. */
  columns?: number;
}) {
  return (
    <div
      data-slot="facts"
      className={cn(
        "grid gap-2.5 max-phone:grid-cols-2 max-phone:gap-2",
        COLUMNS[columns],
        className,
      )}
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
  return (
    <div
      data-slot="fact"
      data-span={span}
      className={cn(
        "flex min-w-0 flex-col gap-1 rounded-card border border-line bg-card-2 px-3.5 pt-3 pb-3.25 data-[span=full]:col-span-full max-phone:gap-0.5 max-phone:px-3 max-phone:pt-2.5 max-phone:pb-2.75",
        className,
      )}
      {...props}
    />
  );
}

function FactHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="fact-header"
      className={cn(
        "mb-1.5 flex items-center gap-2 max-phone:mb-1.25 max-phone:gap-1.75",
        className,
      )}
      {...props}
    />
  );
}

/** A small framed thumbnail for a 13px icon. */
function FactIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="fact-icon"
      aria-hidden
      className={cn(
        "grid size-6 place-items-center rounded-7 border border-line bg-card text-fg-dim [&_svg]:size-3.25 max-phone:size-5.5 max-phone:rounded-md max-phone:[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

function FactLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="fact-label"
      className={cn("text-12.5 text-fg-faint max-phone:text-12", className)}
      {...props}
    />
  );
}

function FactValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="fact-value"
      className={cn("text-14 text-fg max-phone:text-13.5", className)}
      {...props}
    />
  );
}

function FactDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="fact-description"
      className={cn("text-12.5 text-fg-dim max-phone:text-12 max-phone:leading-compact", className)}
      {...props}
    />
  );
}

export { Fact, FactDescription, FactHeader, FactIcon, FactLabel, Facts, FactValue };
