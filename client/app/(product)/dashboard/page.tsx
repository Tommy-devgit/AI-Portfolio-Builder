import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function DashboardPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/builder" ctaLabel="Create Portfolio" />
      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Dashboard</p>
          <h1>Your portfolio control center</h1>
          <p className="hero-subtext">Create, edit, preview, and deploy your portfolio from one place.</p>
          <div className="hero-actions">
            <Link className="button solid" href="/builder">New Portfolio</Link>
            <Link className="button outline" href="/templates">Browse Templates</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

