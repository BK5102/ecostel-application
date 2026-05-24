import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { solutions } from "@/lib/site-content";

export const metadata = {
  title: "Solutions",
  description: "Quote, collaborate, track projects, and manage quality in one place.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Quote with Speed and Clarity."
        description="Our team checks your design and shares useful feedback, so you can decide quickly and move forward without delays."
      />
      <PageLayout items={solutions.map((item) => ({ label: item.label, href: `/solutions/${item.slug}` }))}>
        {solutions.map((item) => (
          <ContentPanel title={item.label} description={item.description} image={item.image} key={item.slug} />
        ))}
      </PageLayout>
    </>
  );
}
