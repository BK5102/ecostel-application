import Link from "next/link";
import { Clock } from "lucide-react";

export const metadata = { title: "Application Under Review" };

export default function VendorPendingPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ textAlign: "center", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--brand-tint, #e6f7f1)",
            color: "var(--brand)",
          }}>
            <Clock size={28} />
          </span>
        </div>

        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Application Under Review</h1>
          <p style={{ color: "var(--muted)", lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>
            Thank you for applying to the EcoStel supplier network. Our team will review
            your documents and capabilities within <strong>2–3 business days</strong>.
          </p>
        </div>

        <div style={{
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: "16px 20px",
          textAlign: "left",
          fontSize: 14,
          lineHeight: 1.7,
        }}>
          <strong style={{ display: "block", marginBottom: 6 }}>What happens next</strong>
          <ol style={{ margin: 0, paddingLeft: 18, color: "var(--muted)" }}>
            <li>Our team reviews your documents and capabilities</li>
            <li>We may reach out for additional information</li>
            <li>You receive an approval email with next steps</li>
            <li>Your vendor dashboard becomes active</li>
          </ol>
        </div>

        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Questions?{" "}
          <Link href="/contact" style={{ color: "var(--brand)", textDecoration: "underline" }}>
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
