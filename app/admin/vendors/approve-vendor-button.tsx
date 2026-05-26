"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ApproveVendorButton({ orgId }: { orgId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function update(status: "approved" | "rejected") {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("organizations").update({ kyc_status: status }).eq("id", orgId);
    setLoading(false);
    router.refresh();
  }

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <button
        className="cta"
        style={{ fontSize: 13, padding: "6px 16px" }}
        onClick={() => update("approved")}
        disabled={loading}
      >
        Approve
      </button>
      <button
        className="buyer-cancel"
        style={{ fontSize: 13 }}
        onClick={() => update("rejected")}
        disabled={loading}
      >
        Reject
      </button>
    </div>
  );
}
