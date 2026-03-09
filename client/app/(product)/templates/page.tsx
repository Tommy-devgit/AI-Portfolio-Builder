import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function TemplatesPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/builder" ctaLabel="Generate Content" />
      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Template Gallery</p>
          <h1>Choose a visual style</h1>
          <p className="hero-subtext">Starter route for minimal, modern, and creative portfolio templates.</p>
          <div className="hero-actions">
            <Link className="button solid" href="/editor">Use Selected Template</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

