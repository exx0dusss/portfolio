import Link from "next/link";

/** "← Work" backlink shown at the top of every project hero. */
export function Backlink() {
  return (
    <Link className="backlink" href="/#work">
      <span className="a">←</span> Work
    </Link>
  );
}
