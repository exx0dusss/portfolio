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
    <div className="mail">
      <a className="mail-addr" href={`mailto:${email}`}>
        {email}
      </a>
      <button
        type="button"
        className="mail-copy"
        onClick={copy}
        aria-label={`${copyLabel} ${email}`}
        title={copyLabel}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            className="mail-icon"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ ...POP, duration: 0.25 }}
          >
            {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="mail-hint" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
