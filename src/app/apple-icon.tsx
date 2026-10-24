import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the stick figure's head (same drawing as icon.svg) on
 *  a white tile, since iOS doesn't use SVG favicons. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <svg width={132} height={132} viewBox="264 57 196 196" fill="none" stroke="#0a0a0a" strokeLinecap="round">
          <circle cx="362" cy="155" r="80" fill="#e5e5e5" stroke="none" />
          <circle cx="352" cy="138" r="76" fill="#fff" stroke="none" />
          <circle cx="362" cy="155" r="84" strokeWidth={20} />
          <circle cx="327" cy="143" r="13" fill="#0a0a0a" stroke="none" />
          <circle cx="397" cy="143" r="13" fill="#0a0a0a" stroke="none" />
          <path d="M332 178 Q362 192 392 178" strokeWidth={12} />
        </svg>
      </div>
    ),
    size,
  );
}
