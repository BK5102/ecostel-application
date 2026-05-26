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

        {/* 5. Backed By */}
        <section className="backed-by-panel">
          <p className="backed-by-eyebrow">Backed By</p>
          <div className="backed-by-card">
            <div className="backed-by-badge">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <rect width="36" height="36" rx="8" fill="#0f8f4d" />
                <path d="M18 8l2.5 6.5H27l-5.5 4 2 6.5L18 21l-5.5 4 2-6.5L9 14.5h6.5L18 8z" fill="#fff" />
              </svg>
              <div>
                <div className="backed-by-institution">IITM Research Park</div>
                <div className="backed-by-sub">IIT Madras, Chennai</div>
              </div>
            </div>
            <p className="backed-by-description">
              EcoStel is proudly backed by <strong>IITM Research Park</strong> — India&rsquo;s first and largest
              university-based research park, located at IIT Madras. Being part of this ecosystem gives us access to
              world-class research, deep-tech talent, and a network of industry leaders who are building the future of
              technology and manufacturing. It&rsquo;s a validation of our mission to make manufacturing smarter,
              faster, and more reliable for the teams who need it most.
            </p>
            <div className="backed-by-trust-row">
              <span className="backed-by-trust-pill">&#10003;&nbsp; Incubated at IIT Madras</span>
              <span className="backed-by-trust-pill">&#10003;&nbsp; Deep-tech ecosystem</span>
              <span className="backed-by-trust-pill">&#10003;&nbsp; Research-backed innovation</span>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
