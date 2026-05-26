import Link from "next/link";
import { ArrowRight, ThumbsUp } from "lucide-react";
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

const solutionBenefits = [
  {
    title: "Built for Complex Projects",
    description: "Made for parts with many variations and smaller quantities where flexibility is important.",
  },
  {
    title: "Works with Your Files",
    description: "Use drawings, CAD files, and BOMs easily important details are picked up automatically.",
  },
  {
    title: "Talk Directly to Suppliers",
    description: "Communicate straight with manufacturing partners no middle steps, faster and clearer.",
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
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {index === 3 ? <QuoteComparison /> : null}
          </section>
        ))}
        <section className="content-panel solution-benefits-panel">
          <div className="solution-benefits-grid">
            {solutionBenefits.map((benefit) => (
              <article className="solution-benefit-card" key={benefit.title}>
                <span className="solution-benefit-icon">
                  <ThumbsUp aria-hidden size={18} />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="content-panel solution-final-cta">
          <h2>Free to start. Pay only when you buy parts.</h2>
          <Link className="cta" href="/solutions/instant-quote#upload-drawing">
            Get Instant Quote
            <ArrowRight aria-hidden size={16} />
          </Link>
        </section>
      </PageLayout>
    </>
  );
}
