const processSteps = [
  {
    step: "Step 1",
    title: "Paste your GitHub profile",
    description: "Drop your GitHub URL and choose the repositories you want to highlight.",
  },
  {
    step: "Step 2",
    title: "AI analyzes your work",
    description: "We parse repositories, commit history, languages, README content, and impact signals.",
  },
  {
    step: "Step 3",
    title: "Your portfolio is generated",
    description: "Get a polished website instantly and customize it before publishing.",
  },
];

const featureItems = [
  {
    title: "Automatic Project Import",
    text: "Pulls your repositories and showcases them with structure and context.",
  },
  {
    title: "AI Bio Generator",
    text: "Creates a professional developer bio based on your actual work.",
  },
  {
    title: "Multiple Themes",
    text: "Choose from modern developer-focused designs and switch in one click.",
  },
  {
    title: "Custom Domain",
    text: "Deploy instantly to your own domain with SSL and analytics.",
  },
];

const previewCards = [
  {
    title: "Minimal Developer Portfolio",
    body: "Clean layout focused on projects, skills, and engineering depth.",
  },
  {
    title: "Dark Mode Portfolio",
    body: "High-contrast style with smooth highlights for modern product teams.",
  },
  {
    title: "Creative Designer Portfolio",
    body: "Story-led visual format for builders who ship both code and design.",
  },
];

const benefitItems = [
  {
    title: "Save Time",
    text: "No coding required. Build a polished portfolio in under a minute.",
  },
  {
    title: "Professional Design",
    text: "Modern UI patterns tuned for recruiters, founders, and hiring managers.",
  },
  {
    title: "SEO Ready",
    text: "Auto-generated metadata and performance-friendly pages for discoverability.",
  },
];

export default function Home() {
  return (
    <div className="page-wrap">
      <div className="glow glow-top" aria-hidden="true" />
      <div className="glow glow-bottom" aria-hidden="true" />

      <header className="container top-nav">
        <a className="brand" href="#">PortForge AI</a>
        <nav>
          <a href="#how">How It Works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <button type="button" className="button ghost">Get Started</button>
      </header>

      <main className="container main-stack">
        <section className="hero panel">
          <p className="eyebrow">AI Portfolio Builder</p>
          <h1>Build Your Developer Portfolio in 30 Seconds</h1>
          <p className="hero-subtext">
            Paste your GitHub profile and our AI generates a beautiful, professional
            portfolio website instantly.
          </p>

          <div className="hero-actions">
            <button type="button" className="button solid">Generate My Portfolio</button>
            <a href="#preview" className="button outline">View Example</a>
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

        <section id="how" className="section-block">
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

        <section id="features" className="section-block panel-soft">
          <div className="section-head">
            <p className="eyebrow">Features</p>
            <h2>Everything needed to launch fast</h2>
          </div>
          <div className="card-grid two">
            {featureItems.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="preview" className="section-block">
          <div className="section-head">
            <p className="eyebrow">Portfolio Preview</p>
            <h2>Example portfolios from the generator</h2>
          </div>
          <div className="card-grid three">
            {previewCards.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <button type="button" className="button outline small">Live Preview</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block panel-soft">
          <div className="section-head">
            <p className="eyebrow">Benefits</p>
            <h2>Built for speed, quality, and visibility</h2>
          </div>
          <div className="card-grid three">
            {benefitItems.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="section-block">
          <div className="section-head">
            <p className="eyebrow">Pricing</p>
            <h2>Start free and upgrade when ready</h2>
          </div>
          <div className="card-grid two pricing-grid">
            <article className="card pricing">
              <h3>Free Plan</h3>
              <p className="price">$0</p>
              <ul>
                <li>1 portfolio</li>
                <li>Basic theme</li>
              </ul>
              <button type="button" className="button outline small">Start Free</button>
            </article>
            <article className="card pricing featured">
              <p className="badge">Pro Plan</p>
              <h3>Pro Plan</h3>
              <p className="price">$19/mo</p>
              <ul>
                <li>Unlimited portfolios</li>
                <li>Premium themes</li>
                <li>Custom domain</li>
              </ul>
              <button type="button" className="button solid small">Go Pro</button>
            </article>
          </div>
        </section>

        <section className="section-block panel-soft testimonial">
          <p className="eyebrow">Testimonials</p>
          <blockquote>
            "I created my portfolio in under a minute. This saved me hours of work."
          </blockquote>
          <cite>Frontend Developer</cite>
        </section>

        <section className="section-block final-cta" id="contact">
          <h2>Your Portfolio Is One Link Away</h2>
          <button type="button" className="button solid">Generate My Portfolio</button>
        </section>
      </main>

      <footer className="container footer">
        <a href="#">Product</a>
        <a href="#pricing">Pricing</a>
        <a href="#">Documentation</a>
        <a href="#">Twitter / GitHub</a>
        <a href="#contact">Contact</a>
      </footer>
    </div>
  );
}
