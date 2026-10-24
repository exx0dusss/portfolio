/** Waving stick figure beside the hero, saying "HI" in a comic speech
 *  bubble. Drawn as SVG so it is transparent, crisp at any size and inherits
 *  the ink colour. Face, bubble and features use --figure-*, so in the dark
 *  theme he keeps a light face and bubble with dark features.
 *  The legs are short and the drawing ends at the feet, so
 *  the figure stands on the section rule below the hero. The bubble pops in
 *  on load and the raised arm waves on
 *  hover (see .figure-* in globals.css). Decorative, hidden from AT. */
export function StickFigure({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 -20 570 570"
      fill="none"
      stroke="currentColor"
      strokeWidth={14}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <defs>
        <clipPath id="figure-head">
          <circle cx="362" cy="155" r="75" />
        </clipPath>
      </defs>
      {/* head: white face with a soft shaded crescent at the bottom */}
      <circle cx="362" cy="155" r="75" fill="var(--figure-shade)" stroke="none" />
      <circle
        cx="352"
        cy="136"
        r="74"
        fill="var(--figure-face)"
        stroke="none"
        clipPath="url(#figure-head)"
      />
      <circle cx="362" cy="155" r="82" />
      <circle cx="325" cy="143" r="8" fill="var(--figure-features)" stroke="none" />
      <circle cx="399" cy="143" r="8" fill="var(--figure-features)" stroke="none" />
      <path d="M338 166 Q362 174 386 166" stroke="var(--figure-features)" strokeWidth={6} />
      {/* body and legs */}
      <path d="M362 237 L357 415" />
      <path d="M357 415 Q318 480 286 540" />
      <path d="M252 543 H296" />
      <path d="M357 415 Q412 455 430 540" />
      <path d="M428 543 H472" />
      {/* lowered arm */}
      <path d="M360 270 Q258 288 206 392" />
      <circle cx="199" cy="405" r="18" fill="currentColor" stroke="none" />
      {/* speech bubble: one path (ellipse + tail toward the head) */}
      <g className="figure-bubble">
        <path
          d="M233.8 120.9 A120 85 0 1 0 202.1 150.1 L258 178 Z"
          fill="var(--figure-face)"
          strokeWidth={10}
        />
        <text
          x="125"
          y="122"
          textAnchor="middle"
          fontSize="104"
          fontWeight="600"
          letterSpacing="-3"
          fill="var(--figure-features)"
          stroke="var(--figure-features)"
          strokeWidth={4}
          transform="rotate(-6 125 85)"
        >
          HI
        </text>
      </g>
      {/* raised, waving arm */}
      <g className="figure-arm">
        <path d="M360 270 L456 302 L530 222" />
        <circle cx="540" cy="210" r="18" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
