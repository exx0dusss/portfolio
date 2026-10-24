"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { POP } from "@/components/motion/springs";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

const RESET_MS = 1400;

/** The email address as a large button that copies itself to the clipboard;
 *  the copy icon swaps to a check to confirm. */
export function CopyEmailButton({
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
    <button type="button" className="mail" onClick={copy} aria-label={`${copyLabel} ${email}`}>
      <span className="mail-addr">{email}</span>
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
      <span className="mail-hint" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
