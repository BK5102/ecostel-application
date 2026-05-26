import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "My RFQs" };

const STATUS_ORDER = ["submitted", "in_review", "quoted", "draft", "closed", "cancelled"];

export default async function BuyerRfqsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("org_id")
    .eq("id", user!.id)
    .single();

  const { data: rfqs } = await supabase
    .from("rfqs")
    .select("id, title, process, status, due_by, created_at")
    .eq("buyer_org_id", profile?.org_id ?? "")
    .order("created_at", { ascending: false });

  const grouped = STATUS_ORDER.reduce<Record<string, typeof rfqs>>((acc, status) => {
    const items = rfqs?.filter((r) => r.status === status) ?? [];
    if (items.length) acc[status] = items;
    return acc;
  }, {});

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <h1>My RFQs</h1>
          <p className="buyer-page-sub">{rfqs?.length ?? 0} total requests</p>
        </div>
        <Link className="cta" href="/buyer/rfq/new">
          New RFQ <ArrowRight aria-hidden size={15} />
        </Link>
      </div>

      {!rfqs?.length ? (
        <div className="buyer-empty">
          <p>No RFQs yet. Submit your first request to get quotes from our verified suppliers.</p>
          <Link className="cta" href="/buyer/rfq/new">
            Submit RFQ <ArrowRight aria-hidden size={15} />
          </Link>
        </div>
      ) : (
        <div className="rfq-grouped-list">
          {Object.entries(grouped).map(([status, items]) => (
            <div key={status} className="buyer-section">
              <div className="buyer-section-header">
                <h2>{STATUS_LABELS[status] ?? status}</h2>
                <span className="rfq-count-badge">{items!.length}</span>
              </div>
              <div className="rfq-list">
                {items!.map((rfq) => (
                  <Link key={rfq.id} href={`/buyer/rfqs/${rfq.id}`} className="rfq-row">
                    <div>
                      <strong>{rfq.title}</strong>
                      <small>
                        {rfq.process ? `${rfq.process} · ` : ""}
                        {new Date(rfq.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {rfq.due_by ? ` · Due ${new Date(rfq.due_by).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : ""}
                      </small>
                    </div>
                    <span className={`status-pill status-${rfq.status.replace("_", "-")}`}>
                      {STATUS_LABELS[rfq.status] ?? rfq.status}
                    </span>
                    <ArrowRight aria-hidden size={15} className="rfq-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In Review",
  quoted: "Quoted",
  closed: "Closed",
  cancelled: "Cancelled",
};
