import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuoteComparison } from "@/components/quote-comparison";
import { PageHero, PageLayout } from "@/components/page-shell";
import { solutions } from "@/lib/site-content";

export const metadata = {
  title: "Solutions",
  description: "Quote, collaborate, track projects, and manage quality in one place.",
};

const instantQuoteSections = [
  {
    title: "Quote with Speed and Clarity",
    description:
      "Our team checks your design and shares useful feedback, so you can decide quickly and move forward without delays.",
  },
  {
    title: "Get Accurate Quotes Easily",
    description:
      "Upload your parts and get fast, reliable quotes powered by experts and AI, with easy comparison to choose the best price.",
  },
  {
    title: "Long-Term Production Planning",
    description: "We plan repeat orders ahead keeping production smooth and predictable.",
  },
  {
    title: "Compare Options Easily",
    description:
      "Find different prices and delivery times in one place, so you can choose the best option from trusted partners without the hassle.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solutions"
        description="Quote, collaborate, track projects, and manage quality in one place."
      />
      <div className="page-hero-actions">
        <Link className="cta" href="/solutions/instant-quote#upload-drawing">
          Get Instant Quote
          <ArrowRight aria-hidden size={16} />
        </Link>
      </div>
      <PageLayout items={solutions.map((item) => ({ label: item.label, href: `/solutions/${item.slug}` }))}>
        {instantQuoteSections.map((section, index) => (
          <section className="solution-section-panel" key={section.title}>
            <span className="solution-section-number">0{index + 1}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {index === 3 ? <QuoteComparison /> : null}
          </section>
        ))}
      </PageLayout>
    </>
  );
}
