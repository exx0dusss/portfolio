/** Page footer, shared across every page. */
export function SiteFooter({ name = "Tymur Mustafaiev" }: { name?: string }) {
  return (
    <footer className="foot" data-slot="site-footer">
      <span>© 2026 {name}</span>
      <span>Built in TypeScript</span>
    </footer>
  );
}
