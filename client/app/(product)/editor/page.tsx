import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const editableSections = [
  "Hero",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

export default function EditorPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/preview" ctaLabel="Preview Changes" />
      <main className="container main-stack">
        <section className="panel split-panel">
          <div>
            <p className="eyebrow">Editor</p>
            <h1>Visual Section Editing Studio</h1>
            <p className="hero-subtext">
              Every generated section stays editable. Future step is introducing saved versions and diff history.
            </p>
            <div className="hero-actions">
              <Link className="button solid" href="/preview">Preview Portfolio</Link>
              <Link className="button outline" href="/dashboard">Back to Dashboard</Link>
            </div>
          </div>
          <div className="card">
            <p className="card-tag">Editing Mode</p>
            <h3>Structured Sections</h3>
            <p>Schema-first sections reduce regressions and make template switching safer.</p>
          </div>
        </section>

        <section className="section-block">
          <div className="chip-grid">
            {editableSections.map((section) => (
              <span key={section} className="feature-chip">{section}</span>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

