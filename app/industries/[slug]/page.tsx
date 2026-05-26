import { notFound } from "next/navigation";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { findBySlug, industries } from "@/lib/site-content";

export function generateStaticParams() {
  return industries.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(industries, slug);
  return {
    title: item?.label ?? "Industry",
    description: item?.description,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(industries, slug);
  if (!item) notFound();

  return (
    <>
      <PageHero eyebrow="Industries" title={item.label} description={item.description} />
      <PageLayout items={industries.map((industry) => ({ label: industry.label, href: `/industries/${industry.slug}` }))}>
        <ContentPanel
          title={item.label}
          description="We support industries that shape the future like aerospace, space, medical, and advanced engineering."
        />
      </PageLayout>
    </>
  );
}
