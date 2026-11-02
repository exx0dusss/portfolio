"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

/**
 * A labelled button that copies `value`: the icon swaps to a check and the
 * label to "Copied" for two seconds, announced to screen readers.
 *
 *   <CopyButton value={prompt}>Copy prompt</CopyButton>
 */
function CopyButton({
  value,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Button
      data-slot="copy-button"
      data-copied={copied || undefined}
      onClick={() =>
        navigator.clipboard
          .writeText(value)
          .then(() => setCopied(true))
          .catch(() => {})
      }
      {...props}
    >
      {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
      <span aria-live="polite">{copied ? "Copied" : children}</span>
    </Button>
  );
}

export { CopyButton };
