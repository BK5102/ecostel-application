import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowRight, ArrowUpRight, MoreVertical, ThumbsUp } from "lucide-react";
import { DrawingUpload } from "@/components/drawing-upload";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { QuoteComparison } from "@/components/quote-comparison";
import {
  AccurateQuotesAnimation,
  CompareOptionsAnimation,
  ProductionPlanningAnimation,
  QuoteSpeedAnimation,
} from "@/components/solution-animations";
import { findBySlug, solutions } from "@/lib/site-content";

const instantQuoteAnimations = [
  <QuoteSpeedAnimation key="speed" />,
  <AccurateQuotesAnimation key="accurate" />,
  <ProductionPlanningAnimation key="planning" />,
  <CompareOptionsAnimation key="compare" />,
];

const instantQuoteBenefits = [
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

const collaborationBenefits = [
  {
    title: "Safe & Secure",
    description: "Your data is protected at all times.",
  },
  {
    title: "Works with All CAD Files",
    description: "Upload any design file easily.",
  },
  {
    title: "Email Friendly",
    description: "Get updates and manage everything from your email.",
  },
];

const projectTrackingBenefits = [
  {
    title: "Made for complex parts",
    description: "Handles multi-part, small-batch projects with ease.",
  },
  {
    title: "Works with All Files",
    description: "Supports CAD, drawings, and part lists in one place.",
  },
  {
    title: "Fits your setup",
    description: "Works with your existing tools no changes needed.",
  },
];

const supplierPerformanceRows = [
  {
    initial: "A",
    partner: "Alpha Industries",
    delivery: "95.2%",
    deliveryLevel: 95,
    acceptance: "97.8%",
    acceptanceLevel: 98,
    quoteTime: "4 hrs",
    score: "94.6%",
    status: "strong",
    trend: "up",
  },
  {
    initial: "B",
    partner: "P.R Industries",
    delivery: "89.1%",
    deliveryLevel: 89,
    acceptance: "95.3%",
    acceptanceLevel: 95,
    quoteTime: "8 hrs",
    score: "85.7%",
    status: "strong",
    trend: "up",
  },
  {
    initial: "C",
    partner: "Auto Components",
    delivery: "78.3%",
    deliveryLevel: 78,
    acceptance: "92.1%",
    acceptanceLevel: 92,
    quoteTime: "14 hrs",
    score: "76.2%",
    status: "watch",
    trend: "down",
  },
  {
    initial: "D",
    partner: "Anitha Enterprises",
    delivery: "93.6%",
    deliveryLevel: 94,
    acceptance: "98.4%",
    acceptanceLevel: 98,
    quoteTime: "4 hrs",
    score: "91.3%",
    status: "strong",
    trend: "up",
  },
  {
    initial: "E",
    partner: "Robert CNC",
    delivery: "85.7%",
    deliveryLevel: 86,
    acceptance: "93.6%",
    acceptanceLevel: 94,
    quoteTime: "13 hrs",
    score: "78.1%",
    status: "watch",
    trend: "down",
  },
];

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(solutions, slug);
  return {
    title: item?.label ?? "Solution",
    description: item?.description,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findBySlug(solutions, slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={item.label}
        titleSlot={
          item.slug === "instant-quote" ? (
            <Link className="cta page-hero-cta" href="#upload-drawing">
              Get Instant Quote
              <ArrowRight aria-hidden size={16} />
            </Link>
          ) : undefined
        }
        description={item.description}
        className={item.slug === "instant-quote" ? "instant-quote-hero" : undefined}
      />
      <PageLayout items={solutions.map((solution) => ({ label: solution.label, href: `/solutions/${solution.slug}` }))}>
        {item.slug !== "collaboration" ? (
          <ContentPanel
            title={item.label}
            description={item.description}
            image={
              item.slug === "instant-quote" || item.slug === "project-tracking"
                ? undefined
                : item.image
            }
          >
            {item.slug === "instant-quote" ? <QuoteComparison /> : null}
          </ContentPanel>
        ) : null}
        {item.slug === "instant-quote" ? <DrawingUpload /> : null}
        {item.slug !== "instant-quote" ? (
          <section className="solution-mid-cta">
            <p>Ready to get started?</p>
            <Link className="cta" href="/solutions/instant-quote#upload-drawing">
              Get Instant Quote
              <ArrowRight aria-hidden size={16} />
            </Link>
          </section>
        ) : null}
        {item.sections.map((section, index) => (
          <div className="solution-section-stack" key={section.title}>
            {item.slug === "instant-quote" ? (
              /* 50/50 split layout with CSS animation panel */
              <section className="sol-split-section">
                <div className="sol-split-text">
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                {instantQuoteAnimations[index] ?? null}
              </section>
            ) : (
              <ContentPanel
                title={section.title}
                description={section.description}
                className={item.slug === "collaboration" ? "no-border" : undefined}
                image={
                  (item.slug === "collaboration" && section.title === "Work Together") ||
                  (item.slug === "project-tracking" && section.title === "Manage updates and spending")
                    ? item.image
                    : undefined
                }
              >
                {"items" in section && section.items ? (
                  <div className="section-bullet-list">
                    {section.items.map((entry) => (
                      <span className="section-bullet-item" key={entry}>
                        {entry}
                      </span>
                    ))}
                  </div>
                ) : null}
              </ContentPanel>
            )}
            {item.slug === "project-tracking" && section.title === "Monitor Supplier Performance" ? (
              <section className="content-panel supplier-performance-panel">
                <div className="supplier-performance-table" role="table" aria-label="Supplier performance">
                  <div className="supplier-performance-header" role="row">
                    <span>Ecostel Partners</span>
                    <span>On-Time Delivery</span>
                    <span>Acceptance Rate</span>
                    <span>Time to Quote</span>
                    <span>Overall Score</span>
                    <span>Trend</span>
                  </div>
                  {supplierPerformanceRows.map((row) => {
                    const TrendIcon = row.trend === "up" ? ArrowUpRight : ArrowDownRight;
                    return (
                      <div className="supplier-performance-row" role="row" key={row.partner}>
                        <div className="supplier-partner">
                          <span className={`supplier-initial supplier-${row.initial.toLowerCase()}`}>{row.initial}</span>
                          <strong>{row.partner}</strong>
                        </div>
                        <div className="supplier-metric">
                          <span>{row.delivery}</span>
                          <span className={`metric-bar ${row.status}`}>
                            <i style={{ width: `${row.deliveryLevel}%` }} />
                          </span>
                        </div>
                        <div className="supplier-metric">
                          <span>{row.acceptance}</span>
                          <span className="metric-bar strong">
                            <i style={{ width: `${row.acceptanceLevel}%` }} />
                          </span>
                        </div>
                        <strong className="quote-time">{row.quoteTime}</strong>
                        <span className={`score-badge ${row.status}`}>{row.score}</span>
                        <div className={`trend-cell ${row.status}`}>
                          <span className="sparkline" aria-hidden />
                          <TrendIcon aria-hidden size={20} />
                          <MoreVertical aria-hidden size={18} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        ))}
        {item.slug === "project-tracking" ? (
          <>
            <section className="content-panel delivery-carrier-panel">
              <h2>Use EXW with your carrier, or we handle delivery.</h2>
              <div className="carrier-logo-row" aria-label="Supported delivery carriers">
                <span className="carrier-logo carrier-blue-dart">
                  <span>BLUE</span>
                  <span>DART</span>
                </span>
                <span className="carrier-logo carrier-maersk">
                  <span aria-hidden className="maersk-mark">
                    *
                  </span>
                  <span>MAERSK</span>
                </span>
                <span className="carrier-logo carrier-fedex">
                  <span>Fed</span>
                  <span>Ex</span>
                  <sup>&reg;</sup>
                </span>
                <span className="carrier-logo carrier-dtdc">
                  <Image src="/notion-assets/dtdc-logo.svg" alt="DTDC" width={180} height={64} />
                </span>
              </div>
            </section>
            <section className="solution-benefits-panel">
              <div className="solution-benefits-grid">
                {projectTrackingBenefits.map((benefit) => (
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
            <section className="solution-final-cta">
              <h2>Free to start. Pay only when you buy parts.</h2>
              <Link className="cta" href="/solutions/instant-quote#upload-drawing">
                Get Instant Quote
                <ArrowRight aria-hidden size={16} />
              </Link>
            </section>
          </>
        ) : null}
        {item.slug === "collaboration" ? (
          <>
            <section className="solution-benefits-panel">
              <div className="solution-benefits-grid">
                {collaborationBenefits.map((benefit) => (
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
            <section className="solution-final-cta">
              <h2>Free to start. Pay only when you buy parts.</h2>
              <Link className="cta" href="/solutions/instant-quote#upload-drawing">
                Get Instant Quote
                <ArrowRight aria-hidden size={16} />
              </Link>
            </section>
          </>
        ) : null}
        {item.slug === "instant-quote" ? (
          <>
            <section className="solution-benefits-panel">
              <div className="solution-benefits-grid">
                {instantQuoteBenefits.map((benefit) => (
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
            <section className="solution-final-cta">
              <h2>Free to start. Pay only when you buy parts.</h2>
              <Link className="cta" href="#upload-drawing">
                Get Instant Quote
                <ArrowRight aria-hidden size={16} />
              </Link>
            </section>
          </>
        ) : null}
      </PageLayout>
    </>
  );
}
