import { notFound } from "next/navigation";
import Image from "next/image";
import { Download, ShieldCheck } from "lucide-react";
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

  const has3DPrinting = "materials" in item && item.materials;

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
        </ContentPanel>

        {has3DPrinting ? (
          <>
            <section className="materials-download-panel">
              <h2>Download our extensive list of available 3D Printing materials</h2>
              <a className="materials-download-button" href="/3D_Printing_Materials.pdf" download>
                <Download aria-hidden size={20} />
                Download PDF
              </a>
              <p>Need something beyond the catalog? We&rsquo;ll source it for you.</p>
            </section>

            <section className="content-panel buyer-protection-panel">
              <div className="buyer-protection-copy">
                <div className="buyer-protection-kicker">
                  <ShieldCheck aria-hidden size={24} />
                  <span>Buyer Protection</span>
                </div>
                <h2>
                  From prototype to production, every part moves through verified manufacturing workflows built for speed,
                  quality, and reliability.
                </h2>
                <p>
                  Ecostel combines certified systems with production-ready manufacturing partners to deliver predictable
                  outcomes at scale.
                </p>
                <span className="buyer-protection-pill">Ecostel Buyer Protection</span>
              </div>
              <Image
                className="buyer-protection-image"
                src="/notion-assets/buyer-protection-parts.png"
                alt="Production-ready 3D printed parts"
                width={620}
                height={500}
              />
            </section>
          </>
        ) : null}
      </PageLayout>
    </>
  );
}
