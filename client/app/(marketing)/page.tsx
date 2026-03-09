import Link from "next/link";
import GithubGeneratorForm from "@/components/github-generator-form";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const buildFlow = [
  {
    step: "01",
    title: "Identity Input",
    description: "Paste GitHub, add skills, and optionally upload resume context.",
  },
  {
    step: "02",
    title: "AI Composition",
    description: "Generate bio, project stories, skills map, and experience blocks.",
  },
  {
    step: "03",
    title: "Visual Editing",
    description: "Edit sections in a focused studio before going live.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Publish to subdomain or custom domain in one click.",
  },
];

const killerFeatures = [
  "GitHub to portfolio extraction",
  "AI project description rewriting",
  "Resume to portfolio conversion path",
  "Template switching without content loss",
  "Deploy-ready production pages",
  "Structured service architecture",
];

export default function HomePage() {
  return (
    <div className="page-wrap">
      <div className="glow glow-top" aria-hidden="true" />
      <div className="glow glow-bottom" aria-hidden="true" />

      <SiteNav />

      <main className="container main-stack">
        <section className="hero panel split-panel">
          <div>
            <p className="eyebrow">AI Portfolio Builder</p>
            <h1>Build A Recruiter-Ready Portfolio With AI In Minutes</h1>
            <p className="hero-subtext">
              This is now a two-track product: marketing site for conversion and product workspace for building,
              editing, previewing, and deploying your portfolio.
            </p>

            <GithubGeneratorForm />

            <div className="hero-actions">
              <a href="#generate" className="button solid">Generate My Portfolio</a>
              <Link href="/dashboard" className="button outline">Open Workspace</Link>
            </div>
          </div>

          <div className="card stack-list">
            <p className="card-tag">Product Tracks</p>
            <h3>MVP Pipeline</h3>
            <p>Landing to Builder to Templates to Editor to Preview to Deploy.</p>
            <div className="chip-grid">
              <span className="feature-chip">OpenAI</span>
              <span className="feature-chip">GitHub APIs</span>
              <span className="feature-chip">Next.js App Router</span>
            </div>
          </div>
        </section>

        <section className="social-proof panel-soft kpi-grid">
          <article className="stat">
            <strong>12,000+</strong>
            <p>portfolios generated</p>
          </article>
          <article className="stat">
            <strong>4-stage</strong>
            <p>end-to-end generation flow</p>
          </article>
          <article className="stat">
            <strong>5</strong>
            <p>new product workspace routes</p>
          </article>
          <div className="logo-strip" aria-label="Trusted platforms">
            <span>GitHub</span>
            <span>OpenAI</span>
            <span>Vercel</span>
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <p className="eyebrow">How It Works</p>
            <h2>Full generation to deployment workflow</h2>
          </div>
          <div className="card-grid two">
            {buildFlow.map((item) => (
              <article key={item.title} className="card timeline-item">
                <p className="card-tag">Step {item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block panel-soft">
          <div className="section-head">
            <p className="eyebrow">Killer Features</p>
            <h2>Built to stand out from template-only portfolio tools</h2>
          </div>
          <div className="chip-grid">
            {killerFeatures.map((feature) => (
              <span key={feature} className="feature-chip">{feature}</span>
            ))}
          </div>
          <div className="hero-actions">
            <Link href="/builder" className="button solid">Start In Builder</Link>
            <Link href="/templates" className="button outline">Template Gallery</Link>
          </div>
        </section>

        <section className="final-cta">
          <h2>Ready to go from GitHub profile to live portfolio?</h2>
          <div className="hero-actions">
            <Link className="button solid" href="/builder">Build Now</Link>
            <Link className="button ghost" href="/examples">See Examples</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

