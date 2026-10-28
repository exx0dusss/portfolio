"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { POP } from "@/components/motion/springs";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

const RESET_MS = 1400;

/** The email address, large: clicking it opens the visitor's mail app
 *  (mailto:), and the icon beside it copies the address for webmail users.
 *  The copy icon swaps to a check to confirm. */
export function EmailContact({
  email,
  copyLabel,
  copiedLabel,
}: {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard?.writeText(email);
    } finally {
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_MS);
    }
  }

  return (
    // the address plus icon, in one line that scales with the viewport
    // (text-mail); the gap, padding and icon are in em so they scale too
    <div className="relative mt-3 inline-flex items-center gap-mail-gap text-mail leading-mail font-semibold tracking-display text-fg">
      <a
        className="whitespace-nowrap underline decoration-transparent decoration-3 underline-offset-8 transition-colors duration-200 ease-standard hover:decoration-accent focus-visible:decoration-accent"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      <button
        type="button"
        className="-m-mail-pad inline-flex cursor-pointer rounded-mail p-mail-pad transition-transform duration-200 ease-pop hover:scale-108 focus-visible:outline-offset-2"
        onClick={copy}
        aria-label={`${copyLabel} ${email}`}
        title={copyLabel}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            className="inline-flex"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ ...POP, duration: 0.25 }}
          >
            {copied ? (
              <CheckIcon className="block size-mail-icon text-accent" aria-hidden />
            ) : (
              <CopyIcon className="block size-mail-icon text-accent" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
      <span
        className="absolute top-full left-0 mt-2.5 text-14 font-medium tracking-normal text-accent-ink"
        aria-live="polite"
      >
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
