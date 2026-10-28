"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * shadcn dialog (base-nova) on Base UI. Same parts as the registry
 * component, painted with the site's tokens.
 *
 *   <Dialog>
 *     <DialogTrigger render={<Button variant="ghost" />}>Open</DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Title</DialogTitle>
 *         <DialogDescription>What this is.</DialogDescription>
 *       </DialogHeader>
 *       …
 *     </DialogContent>
 *   </Dialog>
 *
 * `size="wide"` is the same dialog at 640px, for an image worth reading.
 * `size="viewer"` is a near-fullscreen dialog laid out as bar, stage and
 * note (the live preview), edge to edge on phones; its title and
 * description then use `size="sm"`.
 */
function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-70 bg-overlay backdrop-blur-overlay transition-opacity duration-200 ease-pop data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

const dialogContentVariants = cva(
  "fixed top-1/2 left-1/2 z-71 -translate-1/2 rounded-16 border border-line-strong bg-card text-fg shadow-dialog transition duration-200 ease-pop data-ending-style:-translate-y-12/25 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:-translate-y-12/25 data-starting-style:scale-98 data-starting-style:opacity-0",
  {
    variants: {
      size: {
        default: "w-dialog p-5",
        /** Room for an image worth reading, such as a certificate. */
        wide: "max-h-dialog w-dialog-wide overflow-y-auto p-5",
        viewer:
          "grid h-viewer w-viewer grid-rows-viewer gap-3.5 p-4 max-phone:h-dvh max-phone:w-screen max-phone:rounded-none max-phone:border-none max-phone:p-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function DialogContent({
  className,
  size,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogContentVariants> & { showCloseButton?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-3.5 right-3.5 grid size-8.5 cursor-pointer place-items-center rounded-full bg-transparent p-0 text-fg-dim transition-colors duration-150 hover:bg-card-2 hover:text-fg"
          >
            <XIcon aria-hidden />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-footer" className={cn("flex justify-end gap-2", className)} {...props} />
  );
}

const dialogTitleVariants = cva("m-0", {
  variants: {
    size: {
      default: "text-16 font-semibold",
      /** One line, for a viewer's bar. */
      sm: "truncate text-13 font-medium text-fg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function DialogTitle({
  className,
  size,
  ...props
}: DialogPrimitive.Title.Props & VariantProps<typeof dialogTitleVariants>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(dialogTitleVariants({ size }), className)}
      {...props}
    />
  );
}

const dialogDescriptionVariants = cva("m-0", {
  variants: {
    size: {
      default: "text-14 text-fg-dim",
      sm: "text-12 text-fg-faint",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function DialogDescription({
  className,
  size,
  ...props
}: DialogPrimitive.Description.Props & VariantProps<typeof dialogDescriptionVariants>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(dialogDescriptionVariants({ size }), className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
