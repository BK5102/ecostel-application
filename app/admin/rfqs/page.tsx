import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AssignVendorButton, { type Vendor } from "./assign-vendor-button";

export const metadata = { title: "RFQ Triage" };

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In Review",
  quoted: "Quoted",
  closed: "Closed",
  cancelled: "Cancelled",
};

export default async function AdminRfqsPage() {
  const supabase = await createClient();

  const [{ data: rfqs }, { data: vendors }] = await Promise.all([
    supabase
      .from("rfqs")
      .select("id, title, process, status, due_by, created_at, buyer_org_id, organizations(name)")
      .in("status", ["submitted", "in_review"])
      .order("created_at", { ascending: true }),
    supabase
      .from("vendor_profiles")
      .select("id, org_id, organizations(name)")
      .eq("organizations.kyc_status", "approved"),
  ]);

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <h1>RFQ Triage</h1>
          <p className="buyer-page-sub">
            {rfqs?.length ?? 0} open {rfqs?.length === 1 ? "request" : "requests"} awaiting review
          </p>
        </div>
      </div>

      {!rfqs?.length ? (
        <div className="buyer-empty">
          <p>No RFQs currently awaiting triage. All caught up!</p>
        </div>
      ) : (
        <div className="rfq-list admin-rfq-list">
          {rfqs.map((rfq) => {
            const buyer = rfq.organizations as unknown as { name: string } | null;
            return (
              <div key={rfq.id} className="admin-rfq-row">
                <div className="admin-rfq-info">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <strong>{rfq.title}</strong>
                    <span className={`status-pill status-${rfq.status.replace("_", "-")}`}>
                      {STATUS_LABELS[rfq.status] ?? rfq.status}
                    </span>
                  </div>
                  <small>
                    {buyer?.name ? `${buyer.name} · ` : ""}
                    {rfq.process ? `${rfq.process} · ` : ""}
                    Submitted {new Date(rfq.created_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                    {rfq.due_by
                      ? ` · Due ${new Date(rfq.due_by).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
                      : ""}
                  </small>
                </div>

                <div className="admin-rfq-actions">
                  <AssignVendorButton rfqId={rfq.id} vendors={vendors as Vendor[] ?? []} />
                  <Link href={`/buyer/rfqs/${rfq.id}`} className="buyer-cancel" style={{ fontSize: 13 }}>
                    View <ArrowRight size={13} aria-hidden />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
