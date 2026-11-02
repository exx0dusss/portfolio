"use client";

import type { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

/**
 * Something to try on the page (the live site, the bot's chat), opened in a
 * dialog from the same dashed "try me" button everywhere. The dialog's
 * content is the caller's: pass a `DialogContent` with its own size and
 * focus. `open`/`onOpenChange` pass through, for a demo that closes itself.
 *
 *   <DemoDialog icon={<BrowserIcon aria-hidden />} label="Try it live">
 *     <DialogContent size="viewer">…</DialogContent>
 *   </DemoDialog>
 */
function DemoDialog({
  icon,
  label,
  children,
  ...props
}: Omit<DialogPrimitive.Root.Props, "children"> & {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogTrigger
        data-slot="demo-dialog-trigger"
        render={<Button variant="dashed" className="w-fit" />}
      >
        {icon} {label}
      </DialogTrigger>
      {children}
    </Dialog>
  );
}

export { DemoDialog };
