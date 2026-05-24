import { notFound } from "next/navigation";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { findBySlug, resources } from "@/lib/site-content";

const articles = [
  "Why Tolerances Break Good Designs And What Experienced Engineers Do Differently",
  "The Smarter Factory Isnt Just Coming.",
  "The Critical Role of Busbars in Transformers & Substations",
  "Manufacturing screws and nuts",
];

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
      <PageHero eyebrow="Resource" title={item.label} description={item.description} />
      <PageLayout items={resources.map((resource) => ({ label: resource.label, href: `/resources/${resource.slug}` }))}>
        <ContentPanel title={item.label} description={item.description} image={item.image}>
          {item.slug === "articles" ? (
            <div className="tag-list">
              {articles.map((article) => (
                <span className="tag" key={article}>
                  {article}
                </span>
              ))}
            </div>
          ) : null}
        </ContentPanel>
      </PageLayout>
    </>
  );
}
