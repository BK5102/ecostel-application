import Image from "next/image";
import { PageHero, PageLayout } from "@/components/page-shell";
import { aboutContent, values } from "@/lib/site-content";

export const metadata = {
  title: "About us",
  description: aboutContent.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutContent.eyebrow} title={aboutContent.title} description={aboutContent.description} />
      <PageLayout
        items={[
          { label: "Ecostel", href: "/about" },
          { label: "How we work", href: "#values" },
          { label: "Privacy", href: "#privacy" },
        ]}
      >
        {/* Hero image */}
        <div className="about-hero-image-wrap">
          <Image
            src="/notion-assets/about-hero.jpg"
            alt="Advanced manufacturing — EcoStel"
            width={1200}
            height={600}
            className="about-hero-image"
            priority
          />
        </div>

        {/* Why Ecostel? — dark panel */}
        <section className="why-ecostel-panel">
          <h2>Why Ecostel?</h2>
          <p>
            We believe building great products shouldn&rsquo;t be limited by manufacturing complexity. Whether it&rsquo;s
            aerospace, medical, or next-gen technology, turning ideas into reality should be fast and reliable. But
            sourcing today is still broken. Teams spend days chasing quotes, managing vendors, and dealing with delays
            pulling focus away from actual engineering.
          </p>
          <p>
            We fix that. Our platform brings quoting, communication, and execution into one place. With vetted
            manufacturing partners and full ownership of delivery, we ensure faster turnaround, complete visibility, and
            reliable outcomes from prototype to production.
          </p>
          <Image
            src="/notion-assets/page-11-image-01.jpg"
            alt="EcoStel manufacturing team"
            width={1200}
            height={600}
            className="why-ecostel-image"
          />
        </section>

        {/* How we work — values grid */}
        <section className="content-panel" id="values">
          <h2>We&apos;re not built like a traditional company.</h2>
          <div className="grid two" style={{ marginTop: 18 }}>
            {values.map(([title, description]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="content-panel" id="privacy">
          <h2>Privacy</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
            We treat your data with care and respect. It belongs to you, not us. We keep your information safe, use it
            only when needed, and never share it without your permission.
          </p>
        </section>
      </PageLayout>
    </>
  );
}
