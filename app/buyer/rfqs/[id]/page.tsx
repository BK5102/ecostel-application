import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, FileText, Package, Paperclip } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("rfqs").select("title").eq("id", id).single();
  return { title: data?.title ?? "RFQ" };
}

export default async function RfqDetailPage({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { id } = await params;
  const { submitted } = await searchParams;
  const supabase = await createClient();

  const { data: rfq } = await supabase
    .from("rfqs")
    .select("id, title, process, status, due_by, notes, created_at")
    .eq("id", id)
    .single();

  if (!rfq) notFound();

  const [{ data: parts }, { data: assignments }, { data: quotes }] = await Promise.all([
    supabase.from("rfq_parts").select("*").eq("rfq_id", id),
    supabase
      .from("rfq_assignments")
      .select("vendor_id, status, assigned_at")
      .eq("rfq_id", id),
    supabase
      .from("quotes")
      .select("id, status, submitted_at, vendor_id")
      .eq("rfq_id", id),
  ]);

  const timeline = buildTimeline(rfq.status, rfq.created_at, assignments ?? [], quotes ?? []);

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <Link href="/buyer/rfqs" className="buyer-back">
            <ArrowLeft size={15} aria-hidden /> My RFQs
          </Link>
          <h1>{rfq.title}</h1>
          <p className="buyer-page-sub">
            {rfq.process ? `${rfq.process} · ` : ""}
            Submitted {new Date(rfq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <span className={`status-pill status-${rfq.status.replace("_", "-")}`}>
          {STATUS_LABELS[rfq.status] ?? rfq.status}
        </span>
      </div>

      {submitted === "1" ? (
        <div className="rfq-submitted-banner">
          <CheckCircle2 size={18} aria-hidden />
          RFQ submitted — our team will review and route it to matched suppliers within 24 hours.
        </div>
      ) : null}

      <div className="rfq-detail-grid">
        {/* ── Left column ──────────────────────────────────── */}
        <div className="rfq-detail-main">

          {/* Parts */}
          <section className="rfq-detail-card">
            <h2><Package size={16} aria-hidden /> Parts</h2>
            {parts?.length ? (
              <div className="rfq-parts-list">
                {parts.map((part) => (
                  <div key={part.id} className="rfq-part-row">
                    <div className="rfq-part-info">
                      <strong>{part.name}</strong>
                      <div className="rfq-part-tags">
                        {part.qty ? <span className="tag">Qty: {part.qty}</span> : null}
                        {part.material ? <span className="tag">{part.material}</span> : null}
                        {part.finish ? <span className="tag">{part.finish}</span> : null}
                        {part.tolerances ? <span className="tag">{part.tolerances}</span> : null}
                      </div>
                    </div>
                    {part.cad_url ? (
                      <a
                        href={part.cad_url}
                        className="rfq-file-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download CAD file for ${part.name}`}
                      >
                        <Paperclip size={14} aria-hidden /> Drawing / CAD
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="rfq-detail-empty">No parts added.</p>
            )}
          </section>

          {/* Notes */}
          {rfq.notes ? (
            <section className="rfq-detail-card">
              <h2><FileText size={16} aria-hidden /> Notes</h2>
              <p className="rfq-notes-body">{rfq.notes}</p>
            </section>
          ) : null}

          {/* Quotes */}
          <section className="rfq-detail-card">
            <h2>Quotes</h2>
            {quotes?.length ? (
              <div className="rfq-quotes-list">
                {quotes.map((q) => (
                  <div key={q.id} className="rfq-quote-row">
                    <div>
                      <strong>Quote received</strong>
                      <small>
                        {q.submitted_at
                          ? new Date(q.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : "Pending"}
                      </small>
                    </div>
                    <span className={`status-pill status-${q.status}`}>{q.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rfq-detail-waiting">
                <Clock size={20} aria-hidden />
                <p>Waiting for quotes — suppliers will respond within your requested timeline.</p>
              </div>
            )}
          </section>
        </div>

        {/* ── Right column — timeline ───────────────────────── */}
        <aside className="rfq-detail-sidebar">
          <div className="rfq-detail-card">
            <h2>Status timeline</h2>
            <ol className="rfq-timeline">
              {timeline.map((step, i) => (
                <li key={step.label} className={`rfq-timeline-step ${step.state}`}>
                  <span className="rfq-timeline-dot" aria-hidden />
                  <div>
                    <strong>{step.label}</strong>
                    {step.date ? <small>{step.date}</small> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rfq-detail-card rfq-detail-meta">
            <h2>Details</h2>
            <dl className="rfq-meta-list">
              <dt>Process</dt>
              <dd>{rfq.process ?? "—"}</dd>
              <dt>Required by</dt>
              <dd>{rfq.due_by ? new Date(rfq.due_by).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"}</dd>
              <dt>Vendors assigned</dt>
              <dd>{assignments?.length ?? 0}</dd>
              <dt>Quotes received</dt>
              <dd>{quotes?.filter((q) => q.status !== "draft").length ?? 0}</dd>
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

// ── Helpers ──────────────────────────────────────────────────
const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In Review",
  quoted: "Quoted",
  closed: "Closed",
  cancelled: "Cancelled",
};

type TimelineStep = { label: string; date?: string; state: "done" | "active" | "pending" };

function buildTimeline(
  currentStatus: string,
  createdAt: string,
  assignments: { assigned_at: string }[],
  quotes: { submitted_at: string | null }[],
): TimelineStep[] {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const ORDER = ["draft", "submitted", "in_review", "quoted", "closed"];
  const idx = ORDER.indexOf(currentStatus);

  return [
    {
      label: "RFQ submitted",
      date: fmt(createdAt),
      state: idx >= 1 ? "done" : "active",
    },
    {
      label: "Under review",
      date: assignments[0]?.assigned_at ? fmt(assignments[0].assigned_at) : undefined,
      state: idx > 1 ? "done" : idx === 1 ? "active" : "pending",
    },
    {
      label: "Suppliers assigned",
      date: assignments[0]?.assigned_at ? fmt(assignments[0].assigned_at) : undefined,
      state: idx > 2 ? "done" : idx === 2 ? "active" : "pending",
    },
    {
      label: "Quote received",
      date: quotes.find((q) => q.submitted_at)?.submitted_at
        ? fmt(quotes.find((q) => q.submitted_at)!.submitted_at!)
        : undefined,
      state: idx > 3 ? "done" : idx === 3 ? "active" : "pending",
    },
    {
      label: "Closed",
      state: currentStatus === "closed" ? "done" : "pending",
    },
  ];
}
