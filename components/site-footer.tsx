import Link from "next/link";
import { EcostelLogo } from "@/components/ecostel-logo";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ecostel-engineering/posts/?feedView=all",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ecostel.co/",
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-hero">
          <h2>Transform Your Operations Today!</h2>
        </div>
        <div className="footer-grid">
          <section className="footer-brand">
            <EcostelLogo tone="light" />
            <h3>Reshaping the Future of Sustainable Manufacturing</h3>
            <p>Precision, Sustainability, and Innovation Combined</p>
          </section>
          <section>
            <h3>Quick Links</h3>
            <nav className="footer-links" aria-label="Footer quick links">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/capabilities/cnc-machining">CNC Machining</Link>
              <Link href="/capabilities/sheet-tube-fabrication">Sheet Metal and Tube Fabrication</Link>
              <Link href="/solutions/quality-management">Value Added Solutions</Link>
              <Link href="/solutions/instant-quote#upload-drawing">Contact</Link>
              <Link href="/for-vendors">Become a Supplier</Link>
              <Link href="/contact">Support</Link>
              <Link href="/resources/articles">Blog</Link>
            </nav>
          </section>
          <section>
            <h3>Social</h3>
            <nav className="footer-links" aria-label="Social links">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </nav>
          </section>
          <section>
            <h3>Contact</h3>
            <div className="footer-links">
              <a href="mailto:Info@ecostel.co">Info@ecostel.co</a>
              <a href="tel:+919345802241">Phone - 9345802241</a>
              <span>Anna Nagar West</span>
              <span>Chennai - India</span>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
