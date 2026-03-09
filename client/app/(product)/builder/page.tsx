import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function BuilderPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/dashboard" ctaLabel="Dashboard" />
      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Portfolio Builder</p>
          <h1>Generate portfolio content with AI</h1>
          <p className="hero-subtext">This route is ready for structured input forms and async generation jobs.</p>
          <div className="hero-actions">
            <Link className="button solid" href="/">Start with GitHub Flow</Link>
            <Link className="button outline" href="/editor">Go to Editor</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

