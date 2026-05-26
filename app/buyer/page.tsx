import Link from "next/link";
import { ArrowRight, ClipboardList, FileCheck2, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Buyer Dashboard" };

export default async function BuyerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("name, org_id")
    .eq("id", user!.id)
    .single();

  // Fetch summary counts
  const [{ count: rfqCount }, { count: activeCount }, { count: orderCount }] = await Promise.all([
    supabase.from("rfqs").select("*", { count: "exact", head: true }).eq("buyer_org_id", profile?.org_id ?? ""),
    supabase
      .from("rfqs")
      .select("*", { count: "exact", head: true })
      .eq("buyer_org_id", profile?.org_id ?? "")
      .in("status", ["submitted", "in_review", "quoted"]),
    supabase.from("orders").select("*", { count: "exact", head: true }),
  ]);

  // Fetch recent RFQs
  const { data: recentRfqs } = await supabase
    .from("rfqs")
    .select("id, title, status, created_at")
    .eq("buyer_org_id", profile?.org_id ?? "")
    .order("created_at", { ascending: false })
    .limit(5);

  const greeting = profile?.name ? `Welcome back, ${profile.name.split(" ")[0]}.` : "Welcome back.";

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <h1>{greeting}</h1>
          <p className="buyer-page-sub">Here&apos;s what&apos;s happening with your requests.</p>
        </div>
        <Link className="cta" href="/buyer/rfq/new">
          New RFQ
          <ArrowRight aria-hidden size={15} />
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon"><ClipboardList size={18} aria-hidden /></div>
          <div className="stat-label">Total RFQs</div>
          <div className="stat-value">{rfqCount ?? 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FileCheck2 size={18} aria-hidden /></div>
          <div className="stat-label">Active</div>
          <div className="stat-value">{activeCount ?? 0}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Package size={18} aria-hidden /></div>
          <div className="stat-label">Orders</div>
          <div className="stat-value">{orderCount ?? 0}</div>
        </div>
      </div>

      <div className="buyer-section">
        <div className="buyer-section-header">
          <h2>Recent RFQs</h2>
          <Link href="/buyer/rfqs" className="buyer-link">View all</Link>
        </div>

        {recentRfqs && recentRfqs.length > 0 ? (
          <div className="rfq-list">
            {recentRfqs.map((rfq) => (
              <Link key={rfq.id} href={`/buyer/rfqs/${rfq.id}`} className="rfq-row">
                <div>
                  <strong>{rfq.title}</strong>
                  <small>{new Date(rfq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</small>
                </div>
                <span className={`status-pill status-${rfq.status.replace("_", "-")}`}>
                  {rfq.status.replace("_", " ")}
                </span>
                <ArrowRight aria-hidden size={15} className="rfq-arrow" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="buyer-empty">
            <p>No RFQs yet. Submit your first request to get quotes from our verified suppliers.</p>
            <Link className="cta" href="/buyer/rfq/new">
              Submit RFQ
              <ArrowRight aria-hidden size={15} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
