import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

const docsItems = [
  {
    title: "How generation works",
    text: "Paste username or profile URL. We fetch public profile data and repositories, then build a structured portfolio view.",
  },
  {
    title: "Supported input",
    text: "GitHub usernames, full URLs, or @handles. Private repositories are not included without authentication.",
  },
  {
    title: "Recommended stack",
    text: "Next.js App Router, Tailwind or custom CSS, Framer Motion, shadcn/ui, and Lucide icons.",
  },
  {
    title: "Deployment",
    text: "Deploy to Vercel or Netlify, connect custom domain, and enable automatic previews per update.",
  },
];

export default function DocsPage() {
  return (
    <div className="page-wrap">
      <SiteNav />

      <main className="container main-stack">
        <section className="panel">
          <p className="eyebrow">Documentation</p>
          <h1>Build and ship your AI portfolio flow</h1>
          <p className="hero-subtext">
            Implementation notes for extending generator quality and production behavior.
          </p>
        </section>

        <section className="section-block">
          <div className="card-grid two">
            {docsItems.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
