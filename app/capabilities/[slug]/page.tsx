import { notFound } from "next/navigation";
import Image from "next/image";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { capabilities, findBySlug } from "@/lib/site-content";

export function generateStaticParams() {
  return capabilities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(capabilities, slug);
  return {
    title: item?.label ?? "Capability",
    description: item?.description,
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(capabilities, slug);
  if (!item) notFound();

  return (
    <>
      <PageHero eyebrow="Capabilities" title={item.label} description={item.description} />
      <PageLayout items={capabilities.map((capability) => ({ label: capability.label, href: `/capabilities/${capability.slug}` }))}>
        <ContentPanel title={item.label} description={item.description}>
          <div className="tag-list">
            {item.items.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          {"materials" in item && item.materials ? (
            <div className="materials-card">
              <h3>3D Printing Materials</h3>
              <p>Download our extensive list of available 3D printing materials.</p>
              <div className="tag-list">
                {item.materials.map((material) => (
                  <span className="tag" key={material}>
                    {material}
                  </span>
                ))}
              </div>
              <Image
                className="materials-image"
                src="/notion-assets/page-04-image-01.png"
                alt="3D printing materials download card from the platform document"
                width={1536}
                height={1024}
              />
            </div>
          ) : null}
        </ContentPanel>
      </PageLayout>
    </>
  );
}
