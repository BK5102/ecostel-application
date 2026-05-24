import Image from "next/image";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { capabilities } from "@/lib/site-content";

export const metadata = {
  title: "Capabilities",
  description: "Manufacturing as an on-demand system layer.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Manufacturing as an on-demand system layer."
        description="Reliable manufacturing infrastructure for prototyping, testing, and scaled production workflows."
      />
      <PageLayout items={capabilities.map((item) => ({ label: item.label, href: `/capabilities/${item.slug}` }))}>
        {capabilities.map((item) => (
          <ContentPanel title={item.label} description={item.description} image={item.image} key={item.slug}>
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
        ))}
      </PageLayout>
    </>
  );
}
