import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getGithubErrorMessage } from "@/lib/services/github.service";
import { getGithubPortfolioData } from "@/lib/services/portfolio.service";

export const dynamic = "force-dynamic";

type PortfolioPageProps = {
  params: Promise<{ username: string }>;
};

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { username } = await params;

  let data;
  let errorMessage = "";
  try {
    data = await getGithubPortfolioData(username);
  } catch (error) {
    console.error("Portfolio generation failed:", error);
    errorMessage = getGithubErrorMessage(error);
    return (
      <div className="page-wrap">
        <SiteNav ctaHref="/" ctaLabel="Back Home" />
        <main className="container main-stack">
          <section className="panel">
            <p className="eyebrow">Portfolio Error</p>
            <h1>Could not generate portfolio for this GitHub account</h1>
            <p className="hero-subtext">{errorMessage}</p>
            <div className="hero-actions">
              <Link className="button solid" href="/">Try Another Profile</Link>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const topRepos = data.repos.slice(0, 6);

  return (
    <div className="page-wrap">
      <div className="glow glow-top" aria-hidden="true" />
      <SiteNav ctaHref="/" ctaLabel="Generate Another" />

      <main className="container main-stack">
        <section className="panel portfolio-hero">
          <div>
            <p className="eyebrow">Generated Portfolio</p>
            <h1>{data.user.name || data.user.login}</h1>
            <p className="hero-subtext">{data.generatedBio}</p>
            <div className="stat-row">
              <div className="stat">
                <strong>{data.user.public_repos}</strong>
                <p>Public Repositories</p>
              </div>
              <div className="stat">
                <strong>{data.totalStars}</strong>
                <p>Total Stars</p>
              </div>
              <div className="stat">
                <strong>{data.user.followers}</strong>
                <p>Followers</p>
              </div>
            </div>
            <div className="hero-actions">
              <a className="button solid" href={data.user.html_url} target="_blank" rel="noreferrer">
                View GitHub Profile
              </a>
            </div>
          </div>
          <div className="avatar-wrap">
            <Image
              src={data.user.avatar_url}
              alt={`${data.user.login} avatar`}
              width={220}
              height={220}
              className="avatar"
            />
          </div>
        </section>

        <section className="section-block panel-soft">
          <div className="section-head">
            <p className="eyebrow">Top Languages</p>
            <h2>Primary stack signals</h2>
          </div>
          <div className="chip-grid">
            {data.topLanguages.length > 0 ? (
              data.topLanguages.map((item) => (
                <span key={item.language} className="feature-chip">
                  {item.language} ({item.count})
                </span>
              ))
            ) : (
              <span className="feature-chip">No language metadata available</span>
            )}
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <p className="eyebrow">Projects</p>
            <h2>Highlighted repositories</h2>
          </div>
          <div className="card-grid three">
            {topRepos.map((repo) => (
              <article className="card" key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description provided."}</p>
                <p className="repo-meta">
                  {repo.language || "Unknown"} | Star {repo.stargazers_count} | Forks {repo.forks_count}
                </p>
                <a className="button outline small" href={repo.html_url} target="_blank" rel="noreferrer">
                  View Repository
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

