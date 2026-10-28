"use client";

// Client component on purpose: React preloads every <img> that a server
// component renders, even inside a closed hover card. Rendering the image
// here means the server only sends `src` as a string, and the browser
// fetches it when the card actually opens.
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
  return <div data-slot="link-preview" className={cn("link-preview", className)} {...props} />;
}

/** The 640×336 (≈1.9:1) preview image; pass children instead of `src` for a fallback. */
function LinkPreviewMedia({
  src,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { src?: string }) {
  return (
    <div data-slot="link-preview-media" className={cn("link-preview-media", className)} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element -- small local snapshot, fixed 640×336 */}
      {src ? <img src={src} alt="" width={640} height={336} decoding="async" /> : children}
    </div>
  );
}

function LinkPreviewBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="link-preview-body" className={cn("link-preview-body", className)} {...props} />
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
    <div data-slot="link-preview-site" className={cn("link-preview-site", className)} {...props}>
      {icon}
      {children}
    </div>
  );
}

function LinkPreviewTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="link-preview-title" className={cn("link-preview-title", className)} {...props} />
  );
}

/** Clamped to three lines. */
function LinkPreviewDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="link-preview-description"
      className={cn("link-preview-description", className)}
      {...props}
    />
  );
}

/** Defaults to the "Opens in a new tab ↗" hint. */
function LinkPreviewFooter({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="link-preview-footer" className={cn("link-preview-footer", className)} {...props}>
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
  LinkPreviewSite,
  LinkPreviewTitle,
};
