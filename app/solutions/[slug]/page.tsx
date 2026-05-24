import { notFound } from "next/navigation";
import { DrawingUpload } from "@/components/drawing-upload";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { findBySlug, solutions } from "@/lib/site-content";

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(solutions, slug);
  return {
    title: item?.label ?? "Solution",
    description: item?.description,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(solutions, slug);
  if (!item) notFound();

  return (
    <>
      <PageHero eyebrow="Solutions" title={item.label} description={item.description} />
      <PageLayout items={solutions.map((solution) => ({ label: solution.label, href: `/solutions/${solution.slug}` }))}>
        <ContentPanel title={item.label} description={item.description} image={item.image} />
        {item.slug === "instant-quote" ? <DrawingUpload /> : null}
        {item.sections.map((section) => (
          <ContentPanel title={section.title} description={section.description} key={section.title} />
        ))}
      </PageLayout>
    </>
  );
}
