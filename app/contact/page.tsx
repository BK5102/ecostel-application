import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, PageLayout } from "@/components/page-shell";

export const metadata = {
  title: "Contact",
  description: "Contact Ecostel for buyer RFQs, supplier onboarding, and support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Ecostel."
        description="For buyer RFQs, supplier onboarding, or urgent project support, reach the team directly."
      />
      <PageLayout
        items={[
          { label: "Email", href: "mailto:Info@ecostel.co" },
          { label: "Phone", href: "tel:+919345802241" },
          { label: "Become a Supplier", href: "/for-vendors" },
        ]}
      >
        <section className="content-panel contact-grid">
          <div className="contact-card">
            <Mail aria-hidden size={24} />
            <h2>Email</h2>
            <a href="mailto:Info@ecostel.co">Info@ecostel.co</a>
          </div>
          <div className="contact-card">
            <Phone aria-hidden size={24} />
            <h2>Phone</h2>
            <a href="tel:+919345802241">+91 93458 02241</a>
          </div>
          <div className="contact-card">
            <MapPin aria-hidden size={24} />
            <h2>Location</h2>
            <p>Anna Nagar West, Chennai, India</p>
          </div>
        </section>

        <section className="content-panel">
          <h2>What to Send</h2>
          <div className="grid two feature-grid">
            <div className="feature-card">
              <h3>Buyer RFQs</h3>
              <p>Part drawings, process, material, quantity, finish, tolerance needs, and target delivery date.</p>
            </div>
            <div className="feature-card">
              <h3>Supplier Applications</h3>
              <p>Company details, GST information, processes, capacity, certifications, and sample work context.</p>
            </div>
          </div>
          <Link className="secondary-action contact-action" href="/solutions/instant-quote#upload-drawing">
            Prepare an RFQ
          </Link>
        </section>
      </PageLayout>
    </>
  );
}
