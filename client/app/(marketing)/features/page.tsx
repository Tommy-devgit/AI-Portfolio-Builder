import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const featureCards = [
  {
    title: "Automatic Project Import",
    text: "Connect GitHub and instantly pull repositories into portfolio-ready cards with links and summaries.",
  },
  {
    title: "AI Bio Generator",
    text: "Generate a professional bio from your work history, pinned repos, and coding focus.",
  },
  {
    title: "Theme Studio",
    text: "Switch between multiple developer-focused themes while keeping content intact.",
  },
  {
    title: "Custom Domain Export",
    text: "Publish to your own domain with one-click deployment and built-in SSL.",
  },
  {
    title: "SEO Optimization",
    text: "Automatic metadata and page structure tuned for recruiter and client search intent.",
  },
  {
    title: "Analytics Snapshot",
    text: "Track visits, conversion events, and outbound clicks to your projects.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="page-wrap">
      <div className="glow glow-top" aria-hidden="true" />
      <SiteNav />

      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Features</p>
          <h1>Everything you need to launch and grow your portfolio</h1>
          <p className="hero-subtext">
            PortForge AI combines GitHub intelligence, design systems, and deployment tooling in one flow.
          </p>
        </section>

        <section className="section-block">
          <div className="card-grid three">
            {featureCards.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <h2>Ready to generate yours?</h2>
          <Link className="button solid" href="/#generate">
            Generate My Portfolio
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
