import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const examples = [
  {
    title: "Minimal Developer Portfolio",
    detail: "Clean structure for backend and infrastructure engineers.",
    username: "torvalds",
  },
  {
    title: "Dark Mode Portfolio",
    detail: "Bold, recruiter-friendly layout focused on recent work.",
    username: "gaearon",
  },
  {
    title: "Creative Designer Portfolio",
    detail: "Story-forward style for product builders shipping design and code.",
    username: "addyosmani",
  },
];

export default function ExamplesPage() {
  return (
    <div className="page-wrap">
      <div className="glow glow-bottom" aria-hidden="true" />
      <SiteNav />

      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Examples</p>
          <h1>Preview generated portfolios</h1>
          <p className="hero-subtext">
            These routes are generated dynamically from live public GitHub data.
          </p>
        </section>

        <section className="section-block">
          <div className="card-grid three">
            {examples.map((example) => (
              <article key={example.title} className="card">
                <h3>{example.title}</h3>
                <p>{example.detail}</p>
                <Link className="button outline small" href={`/portfolio/${example.username}`}>
                  Live Preview
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
