import Link from "next/link";
import GithubGeneratorForm from "@/components/github-generator-form";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const processSteps = [
  {
    step: "Step 1",
    title: "Paste your GitHub profile",
    description: "Drop your GitHub URL and choose repositories to highlight.",
  },
  {
    step: "Step 2",
    title: "AI analyzes your repositories",
    description: "We detect languages, projects, commits, and profile signals.",
  },
  {
    step: "Step 3",
    title: "Portfolio generated instantly",
    description: "Publish immediately with custom themes and your own domain.",
  },
];

const features = [
  "Automatic Project Import",
  "AI Bio Generator",
  "Multiple Themes",
  "Custom Domain",
];

export default function HomePage() {
  return (
    <div className="page-wrap">
      <div className="glow glow-top" aria-hidden="true" />
      <div className="glow glow-bottom" aria-hidden="true" />

      <SiteNav />

      <main className="container main-stack">
        <section className="hero panel">
          <p className="eyebrow">AI Portfolio Builder</p>
          <h1>Build Your Developer Portfolio in 30 Seconds</h1>
          <p className="hero-subtext">
            Paste your GitHub profile and our AI generates a beautiful,
            professional portfolio website instantly.
          </p>

          <GithubGeneratorForm />

          <div className="hero-actions">
            <a href="#generate" className="button solid">Generate My Portfolio</a>
            <Link href="/examples" className="button outline">View Example</Link>
          </div>

          <div className="hero-flow" aria-label="Portfolio generation flow">
            <span>GitHub Link</span>
            <span className="arrow">-&gt;</span>
            <span>AI Processing</span>
            <span className="arrow">-&gt;</span>
            <span>Portfolio Website</span>
          </div>
        </section>

        <section className="social-proof panel-soft">
          <div className="stat">
            <strong>12,000+</strong>
            <p>portfolios generated</p>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <p>countries with active users</p>
          </div>
          <div className="logo-strip" aria-label="Trusted platforms">
            <span>GitHub</span>
            <span>Vercel</span>
            <span>Netlify</span>
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <p className="eyebrow">How It Works</p>
            <h2>Simple 3-step process</h2>
          </div>
          <div className="card-grid three">
            {processSteps.map((item) => (
              <article key={item.title} className="card">
                <p className="card-tag">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block panel-soft">
          <div className="section-head">
            <p className="eyebrow">Core Features</p>
            <h2>Built for modern developer workflows</h2>
          </div>
          <div className="chip-grid">
            {features.map((feature) => (
              <span key={feature} className="feature-chip">{feature}</span>
            ))}
          </div>
          <div className="hero-actions">
            <Link href="/features" className="button outline">Explore All Features</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
