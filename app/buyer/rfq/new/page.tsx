"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowLeft, Paperclip, X } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const PROCESSES = [
  "CNC Machining",
  "3D Printing",
  "Sheet Metal Fabrication",
  "Tube & Pipe Fabrication",
  "Injection Molding",
  "Casting",
  "Surface Treatment",
];

export default function NewRfqPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [process, setProcess] = useState("");
  const [dueBy, setDueBy] = useState("");
  const [notes, setNotes] = useState("");
  const [partName, setPartName] = useState("");
  const [material, setMaterial] = useState("");
  const [qty, setQty] = useState("1");
  const [finish, setFinish] = useState("");
  const [tolerances, setTolerances] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked]);
    e.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) { setError("RFQ title is required."); return; }
    if (!partName.trim()) { setError("Part name is required."); return; }
    if (Number(qty) < 1) { setError("Quantity must be at least 1."); return; }

    setLoading(true);
    const supabase = createClient();

    // Get current user + org
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    const { data: profile } = await supabase
      .from("users")
      .select("org_id")
      .eq("id", user.id)
      .single();

    if (!profile?.org_id) {
      setError("Your account is not linked to an organization. Contact support.");
      setLoading(false);
      return;
    }

    // Insert RFQ
    const { data: rfq, error: rfqError } = await supabase
      .from("rfqs")
      .insert({
        buyer_org_id: profile.org_id,
        created_by: user.id,
        title: title.trim(),
        process: process || null,
        due_by: dueBy || null,
        notes: notes.trim() || null,
        status: "draft",
      })
      .select("id")
      .single();

    if (rfqError || !rfq) {
      setError(rfqError?.message ?? "Failed to create RFQ.");
      setLoading(false);
      return;
    }

    // Upload CAD/drawing files and collect signed URLs
    const cadUrls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `rfqs/${rfq.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("rfq-files")
        .upload(path, file, { upsert: false });

      if (uploadError) {
        setError(`File upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: signed } = await supabase.storage
        .from("rfq-files")
        .createSignedUrl(path, 60 * 60 * 24 * 7); // 7-day URL

      if (signed?.signedUrl) cadUrls.push(signed.signedUrl);
    }

    // Insert part
    const { error: partError } = await supabase.from("rfq_parts").insert({
      rfq_id: rfq.id,
      name: partName.trim(),
      material: material.trim() || null,
      qty: Number(qty),
      finish: finish.trim() || null,
      tolerances: tolerances.trim() || null,
      cad_url: cadUrls[0] ?? null,
    });

    if (partError) {
      setError(partError.message);
      setLoading(false);
      return;
    }

    // Submit the RFQ
    await supabase.from("rfqs").update({ status: "submitted" }).eq("id", rfq.id);

    router.push(`/buyer/rfqs/${rfq.id}?submitted=1`);
  }

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <Link href="/buyer" className="buyer-back">
            <ArrowLeft size={15} aria-hidden /> Dashboard
          </Link>
          <h1>New RFQ</h1>
          <p className="buyer-page-sub">Describe what you need and upload your drawings or CAD files.</p>
        </div>
      </div>

      {error ? <div className="rfq-form-alert">{error}</div> : null}

      <form className="rfq-form" onSubmit={handleSubmit}>
        {/* ── RFQ details ────────────────────────────────────── */}
        <fieldset className="rfq-fieldset">
          <legend>Request details</legend>

          <div className="field">
            <label htmlFor="rfq-title">RFQ title <span aria-hidden>*</span></label>
            <input
              id="rfq-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Aluminium bracket — 500 units"
            />
          </div>

          <div className="rfq-row-fields">
            <div className="field">
              <label htmlFor="rfq-process">Manufacturing process</label>
              <select id="rfq-process" value={process} onChange={(e) => setProcess(e.target.value)}>
                <option value="">Select process…</option>
                {PROCESSES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="rfq-due">Required by</label>
              <input
                id="rfq-due"
                type="date"
                value={dueBy}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDueBy(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="rfq-notes">Additional notes</label>
            <textarea
              id="rfq-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tolerances, surface requirements, standards, packaging, anything else the supplier needs to know…"
            />
          </div>
        </fieldset>

        {/* ── Part details ───────────────────────────────────── */}
        <fieldset className="rfq-fieldset">
          <legend>Part details</legend>

          <div className="rfq-row-fields">
            <div className="field">
              <label htmlFor="part-name">Part name <span aria-hidden>*</span></label>
              <input
                id="part-name"
                type="text"
                required
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                placeholder="e.g. Side bracket"
              />
            </div>

            <div className="field">
              <label htmlFor="part-qty">Quantity <span aria-hidden>*</span></label>
              <input
                id="part-qty"
                type="number"
                required
                min={1}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
          </div>

          <div className="rfq-row-fields">
            <div className="field">
              <label htmlFor="part-material">Material</label>
              <input
                id="part-material"
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Aluminium 6061-T6"
              />
            </div>

            <div className="field">
              <label htmlFor="part-finish">Surface finish</label>
              <input
                id="part-finish"
                type="text"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                placeholder="e.g. Anodised, Ra 1.6"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="part-tolerances">Tolerances</label>
            <input
              id="part-tolerances"
              type="text"
              value={tolerances}
              onChange={(e) => setTolerances(e.target.value)}
              placeholder="e.g. ±0.05 mm general, ±0.02 mm on critical bores"
            />
          </div>
        </fieldset>

        {/* ── File upload ────────────────────────────────────── */}
        <fieldset className="rfq-fieldset">
          <legend>Drawings &amp; CAD files</legend>

          <div
            className="rfq-upload-zone"
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload drawing or CAD file"
          >
            <Paperclip size={22} aria-hidden />
            <p>Click to upload or drag &amp; drop</p>
            <small>STEP, STL, DXF, DWG, PDF, IGES — max 256 MB per file</small>
          </div>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".step,.stp,.stl,.dxf,.dwg,.pdf,.igs,.iges,.3mf,.obj"
            className="visually-hidden"
            onChange={handleFiles}
          />

          {files.length > 0 && (
            <ul className="rfq-file-list">
              {files.map((f, i) => (
                <li key={i} className="rfq-file-item">
                  <Paperclip size={13} aria-hidden />
                  <span>{f.name}</span>
                  <span className="rfq-file-size">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${f.name}`}
                    className="rfq-file-remove"
                  >
                    <X size={13} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <div className="rfq-form-actions">
          <Link href="/buyer" className="buyer-cancel">Cancel</Link>
          <button className="cta" type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit RFQ"}
          </button>
        </div>
      </form>
    </>
  );
}
