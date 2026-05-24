import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, ShieldCheck, Workflow } from "lucide-react";
import { DrawingUpload } from "@/components/drawing-upload";
import factoryAerial from "@/src/assets/factory-aerial.jpg";
import heroPart from "@/src/assets/hero-part.jpg";
import { capabilities, industries, solutions } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">Manufacturing as an on-demand system layer</div>
          <h1>Structured matter from structured data.</h1>
          <p className="lead">
            Reliable 3D printing infrastructure for prototyping, testing, and scaled production workflows.
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
            <h2>Reliable production workflows.</h2>
          </div>
        </div>
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
          src="/notion-assets/page-03-image-01.png"
          alt="Ecostel client logos from the platform document"
          width={1536}
          height={300}
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
        <div className="hero-media">
          <Image src={factoryAerial} alt="Modern manufacturing facility" />
        </div>
        <div className="section-heading" style={{ marginTop: 28 }}>
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
