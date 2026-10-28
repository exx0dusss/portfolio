"use client";

// Client component on purpose: React preloads every <img> that a server
// component renders, even inside a closed hover card. Rendering the image
// here means the server only sends `src` as a string, and the browser
// fetches it when the card actually opens.
import { cva, type VariantProps } from "class-variance-authority";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * The body of a link preview, built from parts like shadcn's Card so callers
 * compose only what they have:
 *
 *   <LinkPreview>
 *     <LinkPreviewMedia src="/link-previews/react.webp" />
 *     <LinkPreviewBody>
 *       <LinkPreviewSite icon={…}>react.dev</LinkPreviewSite>
 *       <LinkPreviewTitle>React</LinkPreviewTitle>
 *       <LinkPreviewDescription>…</LinkPreviewDescription>
 *       <LinkPreviewFooter />
 *     </LinkPreviewBody>
 *   </LinkPreview>
 *
 * Usually placed inside HoverCardContent.
 */
function LinkPreview({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="link-preview" className={className} {...props} />;
}

const linkPreviewMediaVariants = cva(
  "grid aspect-640/336 w-full place-items-center border-line bg-card-2",
  {
    variants: {
      variant: {
        /** Flush with its card's top edge, ruled off from the body. */
        edge: "border-b",
        /** Free-standing inside padded content (a dialog). */
        framed: "overflow-hidden rounded-10 border",
      },
    },
    defaultVariants: {
      variant: "edge",
    },
  },
);

/** The 640×336 (≈1.9:1) preview image; pass children instead of `src` for a fallback. */
function LinkPreviewMedia({
  src,
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof linkPreviewMediaVariants> & { src?: string }) {
  return (
    <div
      data-slot="link-preview-media"
      data-variant={variant ?? "edge"}
      className={cn(linkPreviewMediaVariants({ variant }), className)}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- small local snapshot, fixed 640×336
        <img
          src={src}
          alt=""
          width={640}
          height={336}
          decoding="async"
          className="block size-full object-cover"
        />
      ) : (
        children
      )}
    </div>
  );
}

function LinkPreviewBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="link-preview-body"
      className={cn("px-3.5 pt-3 pb-3.25", className)}
      {...props}
    />
  );
}

/** Host line, with an optional leading icon (e.g. a BrandIcon). */
function LinkPreviewSite({
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ReactNode }) {
  return (
    <div
      data-slot="link-preview-site"
      className={cn("flex items-center gap-1.75 text-12 text-fg-faint", className)}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}

function LinkPreviewTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="link-preview-title"
      className={cn("mt-2 text-14 leading-title font-medium text-fg", className)}
      {...props}
    />
  );
}

/** Clamped to three lines. */
function LinkPreviewDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="link-preview-description"
      className={cn("m-0 mt-1 line-clamp-3 text-12.5 leading-normal text-fg-dim", className)}
      {...props}
    />
  );
}

/** Defaults to the "Opens in a new tab ↗" hint. */
function LinkPreviewFooter({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="link-preview-footer"
      className={cn("mt-2.5 flex items-center gap-1 text-11.5 text-fg-faint", className)}
      {...props}
    >
      {children ?? (
        <>
          Opens in a new tab <ArrowUpRightIcon aria-hidden />
        </>
      )}
    </div>
  );
}

export {
  LinkPreview,
  LinkPreviewBody,
  LinkPreviewDescription,
  LinkPreviewFooter,
  LinkPreviewMedia,
  linkPreviewMediaVariants,
  LinkPreviewSite,
  LinkPreviewTitle,
};
