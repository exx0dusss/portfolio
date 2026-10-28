"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { POP } from "@/components/motion/springs";
import { useLocale } from "@/components/locale-link";
import { CheckIcon, LinkSimpleIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";

const RESET_MS = 1400;

/** Its two strings, here rather than threaded through every section label. */
const COPY: Record<Locale, { copy: string; copied: string }> = {
  en: { copy: "Copy link to this section", copied: "Link copied" },
  uk: { copy: "Скопіювати посилання на розділ", copied: "Посилання скопійовано" },
  ru: { copy: "Скопировать ссылку на раздел", copied: "Ссылка скопирована" },
};

/**
 * The link button beside a section's name (SectionLabel renders it): copies
 * the page's URL with the section's #id, puts the hash in the address bar,
 * and swaps to a check to confirm. Sits right after the name (SectionLabel
 * orders it there); shown on hover or keyboard focus, and always on touch
 * screens. The id is the enclosing Section's, so labels take no props for it.
 */
export function SectionAnchor() {
  const lang = useLocale();
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const id = ref.current?.closest("[data-slot=section]")?.id;
    if (!id) return;
    const url = `${location.origin}${location.pathname}#${id}`;
    history.replaceState(history.state, "", `#${id}`);
    try {
      await navigator.clipboard?.writeText(url);
    } finally {
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_MS);
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      data-slot="section-anchor"
      className="order-1 grid size-5 flex-none cursor-pointer place-items-center rounded-6 bg-transparent p-0 text-fg-faint opacity-0 transition-opacity duration-150 ease-standard group-hover/label:opacity-100 hover:text-fg focus-visible:opacity-100 data-copied:opacity-100 pointer-coarse:opacity-100 [&_svg]:size-3.5"
      aria-label={COPY[lang].copy}
      title={COPY[lang].copy}
      data-copied={copied || undefined}
      onClick={copy}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "link"}
          className="inline-flex"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ ...POP, duration: 0.25 }}
        >
          {copied ? <CheckIcon className="text-accent" aria-hidden /> : <LinkSimpleIcon aria-hidden />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? COPY[lang].copied : ""}
      </span>
    </button>
  );
}
