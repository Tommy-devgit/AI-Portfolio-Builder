import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="container footer">
      <Link href="/">Product</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/docs">Documentation</Link>
      <a href="https://github.com" target="_blank" rel="noreferrer">
        Twitter / GitHub
      </a>
      <Link href="/#generate">Contact</Link>
    </footer>
  );
}
