import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const quickActions = [
  { title: "Create Portfolio", href: "/builder", detail: "Start a new generation run from structured inputs." },
  { title: "Choose Template", href: "/templates", detail: "Pick a design direction before final editing." },
  { title: "Edit Content", href: "/editor", detail: "Refine hero copy, skills, projects, and experience." },
  { title: "Preview and Ship", href: "/preview", detail: "Check desktop and mobile before deployment." },
];

export default function DashboardPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/builder" ctaLabel="Create Portfolio" />
      <main className="container main-stack">
        <section className="panel split-panel">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Portfolio Command Center</h1>
            <p className="hero-subtext">
              Manage generation jobs, template selection, editing, and publish state from a single workspace.
            </p>
            <div className="hero-actions">
              <Link className="button solid" href="/builder">New Build</Link>
              <Link className="button outline" href="/preview">Open Latest Preview</Link>
            </div>
          </div>
          <div className="card">
            <p className="card-tag">Current Status</p>
            <h3>Workspace Ready</h3>
            <p>Generation services and routes are wired. Next step is persisting user projects in a database.</p>
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <p className="eyebrow">Quick Actions</p>
            <h2>Move through the pipeline fast</h2>
          </div>
          <div className="card-grid two">
            {quickActions.map((action) => (
              <article key={action.title} className="card">
                <h3>{action.title}</h3>
                <p>{action.detail}</p>
                <Link className="button outline small" href={action.href}>Open</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

