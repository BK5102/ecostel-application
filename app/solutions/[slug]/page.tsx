import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { DrawingUpload } from "@/components/drawing-upload";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { QuoteComparison } from "@/components/quote-comparison";
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
      {item.slug === "instant-quote" ? (
        <div className="page-hero-actions">
          <Link className="cta" href="#upload-drawing">
            Get Instant Quote
            <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
      ) : null}
      <PageLayout items={solutions.map((solution) => ({ label: solution.label, href: `/solutions/${solution.slug}` }))}>
        <ContentPanel title={item.label} description={item.description} image={item.slug === "instant-quote" ? undefined : item.image}>
          {item.slug === "instant-quote" ? <QuoteComparison /> : null}
        </ContentPanel>
        {item.slug === "instant-quote" ? <DrawingUpload /> : null}
        {item.sections.map((section) => (
          <ContentPanel title={section.title} description={section.description} key={section.title} />
        ))}
      </PageLayout>
    </>
  );
}
