"use client";

import { useEffect, useState } from "react";

import { CircleHalfIcon, MoonIcon, SunIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { THEME_KEY } from "@/lib/theme";

type Mode = "system" | "light" | "dark";

const ORDER: Mode[] = ["system", "light", "dark"];
const ICONS = { system: CircleHalfIcon, light: SunIcon, dark: MoonIcon } as const;

function apply(mode: Mode) {
  const root = document.documentElement;
  try {
    if (mode === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, mode);
  } catch {
    // storage blocked (private mode): the choice lasts for this page only
  }
  const swap = () => {
    if (mode === "system") delete root.dataset.theme;
    else root.dataset.theme = mode;
  };

  // crossfade the whole page via the View Transitions API (see
  // ::view-transition-* in globals.css); instant where unsupported or when
  // the visitor prefers reduced motion
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) swap();
  else document.startViewTransition(swap);
}

/** Cycles System → Light → Dark. "System" follows prefers-color-scheme. */
export function ThemeToggle({ labels }: { labels: Dictionary["nav"]["theme"] }) {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const saved = document.documentElement.dataset.theme;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot read of the theme THEME_SCRIPT applied before hydration
    if (saved === "light" || saved === "dark") setMode(saved);
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    setMode(next);
    apply(next);
  }

  const Icon = ICONS[mode];
  const label = `${labels.label}: ${labels[mode]}`;

  return (
    <button type="button" className="theme-toggle" onClick={cycle} aria-label={label} title={label}>
      <Icon aria-hidden />
    </button>
  );
}
