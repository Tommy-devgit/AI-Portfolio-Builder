import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export default function PricingPage() {
  return (
    <div className="page-wrap">
      <div className="glow glow-top" aria-hidden="true" />
      <SiteNav />

      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Pricing</p>
          <h1>Start free. Upgrade when you are ready to publish everywhere.</h1>
          <p className="hero-subtext">
            Transparent pricing for solo developers and teams.
          </p>
        </section>

        <section className="section-block">
          <div className="card-grid two pricing-grid">
            <article className="card pricing">
              <h3>Free Plan</h3>
              <p className="price">$0</p>
              <ul>
                <li>1 portfolio</li>
                <li>Basic theme</li>
                <li>PortForge subdomain</li>
              </ul>
              <Link className="button outline small" href="/#generate">Start Free</Link>
            </article>
            <article className="card pricing featured">
              <p className="badge">Pro Plan</p>
              <h3>Pro</h3>
              <p className="price">$19/mo</p>
              <ul>
                <li>Unlimited portfolios</li>
                <li>Premium themes</li>
                <li>Custom domain</li>
                <li>Advanced analytics</li>
              </ul>
              <Link className="button solid small" href="/#generate">Choose Pro</Link>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
