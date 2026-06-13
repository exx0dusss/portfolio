"use client";

import { useEffect, useState } from "react";

interface Dot {
  id: string;
  label: string;
}

const ACTIVATION_OFFSET = 130;
const SCROLL_OFFSET = 72;

/**
 * Right-side scroll-spy rail, auto-built from the page's `.shell > .card`
 * sections (label from `data-navlabel`, else the card's `.clabel` text with
 * digits stripped). Highlights the section nearest the top of the viewport
 * and forces the last dot once the page bottom is reached. Renders nothing on
 * pages with fewer than two cards — same behaviour as the design prototype.
 */
export function NavDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".shell > .card"),
    );
    if (cards.length < 2) return;

    const built: Dot[] = cards.map((card, i) => {
      const explicit = card.getAttribute("data-navlabel");
      const fromLabel = card
        .querySelector(".clabel")
        ?.textContent?.replace(/[0-9]+/g, "")
        .trim();
      // Ensure every card has an id so we can scroll to it.
      if (!card.id) card.id = `section-${i}`;
      return { id: card.id, label: explicit || fromLabel || "Section" };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot read of the SSR'd card structure from the DOM after mount
    setDots(built);

    let ticking = false;
    function update() {
      ticking = false;
      let index = 0;
      built.forEach((dot, i) => {
        const element = document.getElementById(dot.id);
        if (element && element.getBoundingClientRect().top - ACTIVATION_OFFSET <= 0) {
          index = i;
        }
      });
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) index = built.length - 1;
      setActive(index);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  if (dots.length < 2) return null;

  return (
    <div className="navdots">
      {dots.map((dot, i) => (
        <button
          key={dot.id}
          type="button"
          className={`navdot${i === active ? " active" : ""}`}
          data-label={dot.label}
          aria-label={dot.label}
          onClick={() => scrollTo(dot.id)}
        />
      ))}
    </div>
  );
}
