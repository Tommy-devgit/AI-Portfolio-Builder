import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const templates = [
  { name: "Developer Minimal", detail: "Fast, sharp, recruiter-focused hierarchy." },
  { name: "Modern Product", detail: "Balanced storytelling and metrics layout." },
  { name: "Creative Builder", detail: "Bolder visual rhythm for design + code hybrids." },
];

export default function TemplatesPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/editor" ctaLabel="Open Editor" />
      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Templates</p>
          <h1>Design Direction Gallery</h1>
          <p className="hero-subtext">Choose a design system first, then edit content inside a stable section schema.</p>
        </section>

        <section className="section-block">
          <div className="card-grid three">
            {templates.map((template) => (
              <article className="card" key={template.name}>
                <p className="card-tag">Template</p>
                <h3>{template.name}</h3>
                <p>{template.detail}</p>
                <Link className="button outline small" href="/editor">Use Template</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

