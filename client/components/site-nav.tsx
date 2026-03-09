import Link from "next/link";

type SiteNavProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function SiteNav({
  ctaHref = "/#generate",
  ctaLabel = "Generate Portfolio",
}: SiteNavProps) {
  return (
    <header className="container top-nav">
      <Link className="brand" href="/">
        PortForge AI
      </Link>
      <nav>
        <Link href="/features">Features</Link>
        <Link href="/examples">Examples</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/docs">Docs</Link>
      </nav>
      <Link href={ctaHref} className="button ghost">
        {ctaLabel}
      </Link>
    </header>
  );
}
