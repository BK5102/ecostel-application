import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, FileCheck2, Route, ShieldCheck, Workflow } from "lucide-react";
import { DrawingUpload } from "@/components/drawing-upload";
import heroPart from "@/src/assets/hero-part.jpg";
import { capabilities, industries, marketplaceFlows, solutions } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">Manufacturing as an on-demand system layer</div>
          <h1>Reshaping the Future of Sustainable Manufacturing</h1>
          <p className="lead">
            Precision, Sustainability, and Innovation Combined
          </p>
          <div className="hero-actions">
            <Link className="cta" href="/solutions/instant-quote#upload-drawing">
              Get Instant Quote
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <Image src={heroPart} alt="Precision manufactured part" priority />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Capabilities</div>
            <h2>Capabilities</h2>
            <p className="section-copy">
              Built on advanced manufacturing infrastructure with reliable delivery and reduced operational friction.
            </p>
            <p className="section-copy">Structured matter from structured data.</p>
          </div>
        </div>
        <Image
          className="capability-process-image"
          src="/notion-assets/manufacturing-parts-only.png"
          alt="3D printing manufacturing process parts"
          width={1415}
          height={520}
        />
        <div className="grid three">
          {capabilities.slice(0, 6).map((item) => (
            <Link className="card" href={`/capabilities/${item.slug}`} key={item.slug}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.items.slice(0, 3).map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section clients-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Meet our clients</div>
            <h2>Built for companies engineering the future.</h2>
          </div>
        </div>
        <Image
          className="clients-image"
          src="/notion-assets/client-logos-only.png"
          alt="Ecostel client logos from the platform document"
          width={1200}
          height={160}
        />
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Solutions</div>
            <h2>Quoting, communication, and execution in one place.</h2>
          </div>
        </div>
        <div className="grid three">
          {solutions.slice(0, 3).map((item, index) => {
            const icons = [Factory, Workflow, ShieldCheck];
            const Icon = icons[index] ?? Factory;
            return (
              <Link className="card" href={`/solutions/${item.slug}`} key={item.slug}>
                <Icon aria-hidden color="var(--brand)" size={28} />
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Marketplace workflow</div>
            <h2>From RFQ intake to supplier decision.</h2>
            <p className="section-copy">
              The platform is designed around buyers, vendors, and Ecostel admins working from the same source of truth.
            </p>
          </div>
        </div>
        <div className="workflow-grid">
          {marketplaceFlows.map((flow, index) => {
            const icons = [FileCheck2, Factory, Route];
            const Icon = icons[index] ?? FileCheck2;
            return (
              <article className="workflow-card" key={flow.label}>
                <div className="workflow-icon">
                  <Icon aria-hidden size={22} />
                </div>
                <span>{flow.label}</span>
                <h3>{flow.title}</h3>
                <p>{flow.description}</p>
                <div className="tag-list">
                  {flow.details.map((detail) => (
                    <span className="tag" key={detail}>
                      {detail}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Industries</div>
            <h2>Built for teams that can&apos;t afford delays.</h2>
          </div>
        </div>
        <div className="tag-list">
          {industries.map((industry) => (
            <Link className="tag" href={`/industries/${industry.slug}`} key={industry.slug}>
              {industry.label}
            </Link>
          ))}
        </div>
      </section>

      <DrawingUpload />
    </>
  );
}
