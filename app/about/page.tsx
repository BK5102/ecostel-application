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
        {/* 1. Satellite image — comes before the text */}
        <div className="about-full-image">
          <Image
            src="/notion-assets/page-11-image-01.jpg"
            alt="Advanced spacecraft manufacturing facility — EcoStel production workflows"
            width={1200}
            height={700}
            priority
          />
        </div>

        {/* 2. Why Ecostel? text */}
        <section className="content-panel">
          <h2>Why Ecostel?</h2>
          <p className="about-body">
            We believe building great products shouldn&rsquo;t be limited by manufacturing complexity. Whether it&rsquo;s
            aerospace, medical, or next-gen technology, turning ideas into reality should be fast and reliable. But
            sourcing today is still broken. Teams spend days chasing quotes, managing vendors, and dealing with delays
            pulling focus away from actual engineering.
          </p>
          <p className="about-body">
            We fix that. Our platform brings quoting, communication, and execution into one place. With vetted
            manufacturing partners and full ownership of delivery, we ensure faster turnaround, complete visibility, and
            reliable outcomes from prototype to production.
          </p>
        </section>

        {/* 3. Satellite image — comes after the text */}
        <div className="about-full-image">
          <Image
            src="/notion-assets/page-11-image-02.jpg"
            alt="Space manufacturing — EcoStel serves aerospace and next-gen technology"
            width={1200}
            height={700}
          />
        </div>

        {/* 4. How we work — values grid with Privacy as last card */}
        <section className="content-panel" id="values">
          <h2>We&apos;re not built like a traditional company.</h2>
          <div className="grid two" style={{ marginTop: 18 }} id="privacy">
            {values.map(([title, description]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
      </PageLayout>
    </>
  );
}
