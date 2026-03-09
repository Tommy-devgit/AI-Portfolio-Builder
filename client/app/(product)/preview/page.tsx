import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function PreviewPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/dashboard" ctaLabel="Deploy" />
      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Preview</p>
          <h1>Validate before publishing</h1>
          <p className="hero-subtext">Starter route for desktop and mobile previews, themes, and publish actions.</p>
          <div className="hero-actions">
            <Link className="button solid" href="/dashboard">Back to Dashboard</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

