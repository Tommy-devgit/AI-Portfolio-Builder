import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const inputs = [
  "Name and title",
  "Skills and stack",
  "Projects and links",
  "GitHub profile",
  "Optional resume upload",
];

const outputs = [
  "Hero bio",
  "About narrative",
  "Project descriptions",
  "Skills summary",
  "Experience draft",
];

export default function BuilderPage() {
  return (
    <div className="page-wrap">
      <SiteNav ctaHref="/dashboard" ctaLabel="Dashboard" />
      <main className="container main-stack">
        <section className="panel split-panel">
          <div>
            <p className="eyebrow">Builder</p>
            <h1>Generate Structured Portfolio Content</h1>
            <p className="hero-subtext">
              This route is the orchestration point for AI generation jobs. Inputs map to deterministic section schema.
            </p>
            <div className="hero-actions">
              <Link className="button solid" href="/">Run GitHub Generation</Link>
              <Link className="button outline" href="/templates">Select Template</Link>
            </div>
          </div>
          <div className="card">
            <p className="card-tag">Pipeline</p>
            <h3>Input -&gt; AI -&gt; Edit -&gt; Publish</h3>
            <p>Designed for async job execution and versioned results storage.</p>
          </div>
        </section>

        <section className="section-block">
          <div className="card-grid two">
            <article className="card">
              <p className="card-tag">Expected Inputs</p>
              <h3>What user provides</h3>
              <ul className="plain-list">
                {inputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <p className="card-tag">AI Outputs</p>
              <h3>What gets generated</h3>
              <ul className="plain-list">
                {outputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
