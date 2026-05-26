"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export type Vendor = {
  id: string;
  org_id: string;
  organizations: { name: string } | { name: string }[] | null;
};

export default function AssignVendorButton({
  rfqId,
  vendors,
}: {
  rfqId: string;
  vendors: Vendor[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function assign(vendorId: string) {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("rfq_assignments").upsert({
      rfq_id: rfqId,
      vendor_id: vendorId,
      status: "pending",
      assigned_at: new Date().toISOString(),
    });
    await supabase.from("rfqs").update({ status: "in_review" }).eq("id", rfqId);
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        className="cta"
        style={{ fontSize: 13, padding: "6px 14px" }}
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
      >
        Assign vendor
      </button>

      {open && (
        <div className="assign-dropdown">
          {vendors.length === 0 ? (
            <p style={{ padding: "10px 14px", fontSize: 13, color: "var(--muted)" }}>
              No approved vendors yet.
            </p>
          ) : (
            vendors.map((v) => (
              <button
                key={v.id}
                className="assign-dropdown-item"
                onClick={() => assign(v.id)}
                disabled={loading}
              >
                {(Array.isArray(v.organizations) ? v.organizations[0]?.name : v.organizations?.name) ?? v.org_id}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
