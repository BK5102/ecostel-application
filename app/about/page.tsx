import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
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
        {aboutContent.sections.map((section, index) => (
          <ContentPanel
            title={section.title}
            description={section.description}
            image={index === 0 ? "/notion-assets/page-11-image-02.jpg" : index === 1 ? "/notion-assets/page-11-image-01.jpg" : undefined}
            key={section.title}
          />
        ))}
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
        <ContentPanel
          title="Privacy"
          description="We treat your data with care and respect. It belongs to you, not us. We keep your information safe, use it only when needed, and never share it without your permission."
        />
      </PageLayout>
    </>
  );
}
