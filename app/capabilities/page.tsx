import Image from "next/image";
import { Download, ShieldCheck } from "lucide-react";
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
        description="Built on advanced manufacturing infrastructure with reliable delivery and reduced operational friction."
      />
      <div className="capabilities-intro">
        <p className="section-copy">Structured matter from structured data.</p>
      </div>
      <Image
        className="capability-process-image"
        src="/notion-assets/manufacturing-parts-only.png"
        alt="3D printing manufacturing process parts"
        width={1415}
        height={520}
      />
      <PageLayout items={capabilities.map((item) => ({ label: item.label, href: `/capabilities/${item.slug}` }))}>
        <section className="content-panel quality-systems-panel">
          <div className="eyebrow">Quality Systems</div>
          <h2>Production Verified. Documentation Included.</h2>
          <div className="quality-list">
            <ul>
              <li>Certificate of Conformance</li>
              <li>First Article Inspection</li>
              <li>CMM)</li>
            </ul>
            <ul>
              <li>Material Test Reports</li>
              <li>Material Certifications</li>
              <li>RoHS Compliance</li>
            </ul>
          </div>
        </section>

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

        {capabilities.map((item) => (
          <ContentPanel title={item.label} description={item.description} key={item.slug}>
            <div className="tag-list">
              {item.items.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </ContentPanel>
        ))}
      </PageLayout>
    </>
  );
}
