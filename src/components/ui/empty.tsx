import { cn } from "@/lib/utils/cn";

/**
 * Empty state, after shadcn's `empty`: a centred block for "nothing here
 * yet", built from parts.
 *
 *   <Empty>
 *     <EmptyHeader>
 *       <EmptyMedia><BuildingIcon /></EmptyMedia>
 *       <EmptyTitle>Working on the content</EmptyTitle>
 *       <EmptyDescription>What to do meanwhile.</EmptyDescription>
 *     </EmptyHeader>
 *     <EmptyContent>…actions…</EmptyContent>
 *   </Empty>
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty" className={cn("empty", className)} {...props} />;
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("empty-header", className)} {...props} />;
}

function EmptyMedia({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-media" className={cn("empty-media", className)} {...props} />;
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 data-slot="empty-title" className={cn("empty-title", className)} {...props} />;
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="empty-description" className={cn("empty-description", className)} {...props} />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-content" className={cn("empty-content", className)} {...props} />;
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
