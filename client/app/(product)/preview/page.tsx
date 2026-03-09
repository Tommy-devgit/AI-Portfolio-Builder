import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function PreviewPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/dashboard" ctaLabel="Deploy" />
      <main className="container main-stack">
        <section className="panel split-panel">
          <div>
            <p className="eyebrow">Preview</p>
            <h1>Validate Before Publishing</h1>
            <p className="hero-subtext">
              Preview in desktop and mobile modes, then publish to subdomain or custom domain.
            </p>
            <div className="hero-actions">
              <Link className="button solid" href="/dashboard">Deploy Flow</Link>
              <Link className="button outline" href="/editor">Back to Editor</Link>
            </div>
          </div>
          <div className="card">
            <p className="card-tag">Preview Modes</p>
            <h3>Desktop + Mobile + Theme</h3>
            <p>Foundation route for side-by-side render checks and theme toggles.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

