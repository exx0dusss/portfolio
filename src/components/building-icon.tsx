/**
 * A building under construction: a crane lowers an orange block, and the
 * next floor rises as it lands, on a slow loop. Drawn in currentColor with
 * the accent only on the block; holds still under prefers-reduced-motion.
 * Decorative. Animation lives in globals.css (.building-*).
 */
export function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `building ${className}` : "building"}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* ground */}
      <path d="M12 104h96" />
      {/* the building: three finished floors with windows */}
      <rect x="26" y="62" width="44" height="42" rx="2" />
      <path d="M26 76h44M26 90h44" />
      <path className="building-windows" d="M36 69h6M54 69h6M36 83h6M54 83h6M36 97h6M54 97h6" />
      {/* the floor being built: rises from the roofline */}
      <g className="building-floor">
        <rect x="26" y="48" width="44" height="14" rx="2" />
        <path d="M36 55h6M54 55h6" />
      </g>
      {/* crane: mast, jib, counter-jib and the cable trolley */}
      {/* the jib reaches over the building so the load lands centred on it */}
      <path d="M90 104V18M40 18h64M90 26l8-8M90 34l8-8" />
      <path d="M104 18v6" />
      {/* flat cap: the cable is scaled, and a round cap would stretch above the jib */}
      <path className="building-cable" d="M48 18v12" strokeLinecap="butt" />
      <g className="building-load">
        <rect
          x="40"
          y="30"
          width="16"
          height="10"
          rx="1.5"
          fill="var(--accent)"
          stroke="var(--accent)"
        />
      </g>
    </svg>
  );
}
