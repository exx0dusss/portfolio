import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

/**
 * Empty state, after shadcn's `empty`: a centred block for "nothing here
 * yet", built from parts.
 *
 *   <Empty>
 *     <EmptyHeader>
 *       <EmptyMedia variant="icon"><CraneTowerIcon /></EmptyMedia>
 *       <EmptyTitle>Working on the content</EmptyTitle>
 *       <EmptyDescription>What to do meanwhile.</EmptyDescription>
 *     </EmptyHeader>
 *     <EmptyContent>…actions…</EmptyContent>
 *   </Empty>
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex flex-col items-center rounded-card border border-dashed border-line-strong bg-card-2 px-6 py-12 text-center",
        className,
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

const emptyMediaVariants = cva("mb-2 text-fg", {
  variants: {
    variant: {
      /** Whatever you put in, as is (an illustration). */
      default: "",
      /** An icon framed in a small rounded tile. */
      icon: "grid size-16 place-items-center rounded-16 border border-line bg-card text-fg-dim [&_svg]:size-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function EmptyMedia({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant ?? "default"}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="empty-title"
      className={cn("m-0 text-20 font-semibold tracking-snug text-fg", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("m-0 max-w-measure text-15 leading-copy text-fg-dim", className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn("mt-5.5 flex flex-wrap justify-center gap-2.5", className)}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  emptyMediaVariants,
  EmptyTitle,
};
