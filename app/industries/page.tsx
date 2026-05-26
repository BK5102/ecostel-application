import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { industries } from "@/lib/site-content";

export const metadata = {
  title: "Industries",
  description: "Manufacturing support for aerospace, semiconductor, robotics, defence, medical, and consumer appliance teams.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We work with teams building the next generation of products."
        description="Manufacturing support for teams that need faster turnaround, complete visibility, and reliable outcomes."
      />
      <PageLayout items={industries.map((item) => ({ label: item.label, href: `/industries/${item.slug}` }))}>
        {industries.map((item) => (
          <ContentPanel title={item.label} description={item.description} key={item.slug} />
        ))}
      </PageLayout>
    </>
  );
}
