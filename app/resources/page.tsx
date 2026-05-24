import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { resources } from "@/lib/site-content";

export const metadata = {
  title: "Resources",
  description: "Case studies, articles, and future webinars from Ecostel.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resource" title="Case Studies and Articles." description="Built for teams that can't afford delays." />
      <PageLayout items={resources.map((item) => ({ label: item.label, href: `/resources/${item.slug}` }))}>
        {resources.map((item) => (
          <ContentPanel title={item.label} description={item.description} image={item.image} key={item.slug} />
        ))}
      </PageLayout>
    </>
  );
}
