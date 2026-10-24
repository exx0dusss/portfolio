/** The stick figure's head (same drawing as app/icon.svg), themed through
 *  the --figure-* tokens so it matches the hero figure in light and dark.
 *  Decorative. */
export function FaceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="264 57 196 196"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="362" cy="155" r="80" fill="var(--figure-shade)" stroke="none" />
      <circle cx="352" cy="138" r="76" fill="var(--figure-face)" stroke="none" />
      <circle cx="362" cy="155" r="84" strokeWidth={18} />
      <circle cx="327" cy="143" r="12" fill="var(--figure-features)" stroke="none" />
      <circle cx="397" cy="143" r="12" fill="var(--figure-features)" stroke="none" />
      <path d="M332 178 Q362 192 392 178" stroke="var(--figure-features)" strokeWidth={11} />
    </svg>
  );
}
