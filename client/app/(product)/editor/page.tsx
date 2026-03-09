import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function EditorPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/preview" ctaLabel="Preview" />
      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Editor</p>
          <h1>Edit every generated section</h1>
          <p className="hero-subtext">Starter route for visual editing of hero, about, skills, projects, and experience.</p>
          <div className="hero-actions">
            <Link className="button solid" href="/preview">Preview Portfolio</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

