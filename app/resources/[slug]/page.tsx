import { notFound } from "next/navigation";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { findBySlug, linkedInArticles, resources } from "@/lib/site-content";

export function generateStaticParams() {
  return resources.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(resources, slug);
  return {
    title: item?.label ?? "Resource",
    description: item?.description,
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(resources, slug);
  if (!item) notFound();

  return (
    <>
      <PageHero eyebrow="Resource" title="Case Studies and Articles." description="Built for teams that can't afford delays." />
      <PageLayout items={resources.map((resource) => ({ label: resource.label, href: `/resources/${resource.slug}` }))}>
        {item.slug === "articles" ? (
          <section className="articles-panel">
            <div className="articles-header">
              <h2>{item.label}</h2>
              <p>{item.description}</p>
            </div>
            <div className="articles-grid">
              {linkedInArticles.map((article) => (
                <a
                  key={article.href}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-card"
                >
                  <span className="article-tag">{article.tag}</span>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-summary">{article.summary}</p>
                  <span className="article-cta">
                    Read on LinkedIn
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <ContentPanel title={item.label} description={item.description} />
        )}
      </PageLayout>
    </>
  );
}
