import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardList, Factory, ShieldCheck } from "lucide-react";
import { ContentPanel, PageHero, PageLayout } from "@/components/page-shell";
import { capabilities, vendorApplicationSteps } from "@/lib/site-content";

const vendorWorkflowCards = [
  {
    title: "RFQ Queue",
    description: "Receive assigned requests with part specs, files, buyer notes, and response deadlines.",
    Icon: ClipboardList,
  },
  {
    title: "Quote Submission",
    description: "Submit unit price, lead time, MOQ, shipping cost, alternates, and clarifying notes.",
    Icon: Factory,
  },
  {
    title: "Quality Milestones",
    description: "Post production updates, QC reports, shipment details, and delivery evidence.",
    Icon: ShieldCheck,
  },
];

export const metadata = {
  title: "For Vendors",
  description: "Apply to join Ecostel as a vetted manufacturing supplier.",
};

export default function ForVendorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Vendors"
        title="Join the Ecostel supplier network."
        description="Register your shop, declare your capabilities, and receive RFQs matched to your process, capacity, certifications, and lead times."
      />
      <PageLayout
        items={[
          { label: "Apply to Join", href: "/for-vendors" },
          { label: "RFQ Workflow", href: "#rfqs" },
          { label: "Capabilities", href: "#capabilities" },
          { label: "Contact", href: "/contact" },
        ]}
      >
        <section className="content-panel vendor-apply-panel">
          <div>
            <h2>Supplier onboarding built for trust.</h2>
            <p>
              Vendors apply through a verified registration process so buyers in regulated and high-precision industries
              can source with confidence.
            </p>
          </div>
          <Link className="cta cta-light" href="/contact">
            Start Supplier Application
            <ArrowRight aria-hidden size={16} />
          </Link>
        </section>

        <section className="content-panel">
          <h2>Application Review</h2>
          <div className="process-list">
            {vendorApplicationSteps.map((step, index) => (
              <div className="process-step" key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-panel" id="rfqs">
          <h2>Vendor RFQ Workflow</h2>
          <div className="grid three feature-grid">
            {vendorWorkflowCards.map(({ title, description, Icon }) => (
              <article className="feature-card" key={title}>
                <Icon aria-hidden size={24} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <ContentPanel
          title="Scorecards and Visibility"
          description="Ecostel tracks on-time delivery, acceptance rate, time to quote, and overall supplier performance so high-scoring vendors receive more relevant opportunities."
        >
          <div className="tag-list">
            <span className="tag">On-time delivery</span>
            <span className="tag">Acceptance rate</span>
            <span className="tag">Time to quote</span>
            <span className="tag">Overall score</span>
          </div>
        </ContentPanel>

        <section className="content-panel" id="capabilities">
          <h2>Supported Manufacturing Processes</h2>
          <div className="tag-list">
            {capabilities.map((capability) => (
              <Link className="tag" href={`/capabilities/${capability.slug}`} key={capability.slug}>
                <BadgeCheck aria-hidden size={14} />
                {capability.label}
              </Link>
            ))}
          </div>
        </section>
      </PageLayout>
    </>
  );
}
