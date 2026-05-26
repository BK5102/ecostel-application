"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Paperclip, X } from "lucide-react";
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

const CERTIFICATIONS = ["ISO 9001", "ISO 14001", "IATF 16949", "AS9100", "NADCAP", "RoHS", "CE Marking"];

type Step = "company" | "capabilities" | "documents";

export default function VendorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("company");

  // Company info
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [leadTime, setLeadTime] = useState("");

  // Capabilities
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [materials, setMaterials] = useState("");
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);

  // Documents
  const [docFiles, setDocFiles] = useState<File[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleProcess(p: string) {
    setSelectedProcesses((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function toggleCert(c: string) {
    setSelectedCerts((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function handleDocFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setDocFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === "company") { setStep("capabilities"); return; }
    if (step === "capabilities") {
      if (!selectedProcesses.length) { setError("Select at least one manufacturing process."); return; }
      setError("");
      setStep("documents");
      return;
    }

    // Final submission
    setError("");
    setLoading(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    // Get vendor org_id from users table
    const { data: profile } = await supabase
      .from("users")
      .select("org_id")
      .eq("id", user.id)
      .single();

    if (!profile?.org_id) {
      setError("Account not linked to an organization. Please sign up again or contact support.");
      setLoading(false);
      return;
    }

    // Upsert vendor profile
    const { data: vendorProfile, error: profileError } = await supabase
      .from("vendor_profiles")
      .upsert({
        org_id: profile.org_id,
        locations: location ? [location] : [],
        capacity: capacity || null,
        lead_time_avg_days: leadTime ? parseInt(leadTime) : null,
      })
      .select("id")
      .single();

    if (profileError || !vendorProfile) {
      setError(profileError?.message ?? "Failed to save profile.");
      setLoading(false);
      return;
    }

    // Insert capabilities
    if (selectedProcesses.length) {
      const materialList = materials.split(",").map((m) => m.trim()).filter(Boolean);
      await supabase.from("vendor_capabilities").insert(
        selectedProcesses.map((process) => ({
          vendor_id: vendorProfile.id,
          process,
          materials: materialList,
        }))
      );
    }

    // Insert certifications
    if (selectedCerts.length) {
      await supabase.from("vendor_certifications").insert(
        selectedCerts.map((type) => ({ vendor_id: vendorProfile.id, type }))
      );
    }

    // Upload documents
    for (const file of docFiles) {
      const ext = file.name.split(".").pop();
      const path = `vendors/${profile.org_id}/${crypto.randomUUID()}.${ext}`;
      await supabase.storage.from("vendor-docs").upload(path, file, { upsert: false });
    }

    // Update org kyc_status to 'pending'
    await supabase
      .from("organizations")
      .update({ kyc_status: "pending" })
      .eq("id", profile.org_id);

    router.push("/vendor/pending");
  }

  const stepIndex = { company: 0, capabilities: 1, documents: 2 };
  const stepLabels = ["Company info", "Capabilities", "Documents"];

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <Link href="/for-vendors" className="buyer-back">
            <ArrowLeft size={15} aria-hidden /> For Vendors
          </Link>
          <h1>Supplier Application</h1>
          <p className="buyer-page-sub">Join the EcoStel verified supplier network.</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="reg-steps">
        {stepLabels.map((label, i) => (
          <div
            key={label}
            className={`reg-step ${
              i < stepIndex[step] ? "done" : i === stepIndex[step] ? "active" : ""
            }`}
          >
            <span className="reg-step-num">{i < stepIndex[step] ? "✓" : i + 1}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {error ? <div className="rfq-form-alert">{error}</div> : null}

      <form className="rfq-form" onSubmit={handleSubmit}>
        {/* ── Step 1: Company info ───────────────────────────── */}
        {step === "company" && (
          <fieldset className="rfq-fieldset">
            <legend>Company information</legend>

            <div className="field">
              <label htmlFor="company-name">Company name <span aria-hidden>*</span></label>
              <input
                id="company-name"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Precision Parts Pvt. Ltd."
              />
            </div>

            <div className="field">
              <label htmlFor="location">Primary location <span aria-hidden>*</span></label>
              <input
                id="location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Chennai, Tamil Nadu"
              />
            </div>

            <div className="rfq-row-fields">
              <div className="field">
                <label htmlFor="capacity">Production capacity</label>
                <input
                  id="capacity"
                  type="text"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g. 500 parts/month"
                />
              </div>

              <div className="field">
                <label htmlFor="lead-time">Typical lead time (days)</label>
                <input
                  id="lead-time"
                  type="number"
                  min={1}
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  placeholder="e.g. 7"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* ── Step 2: Capabilities ───────────────────────────── */}
        {step === "capabilities" && (
          <>
            <fieldset className="rfq-fieldset">
              <legend>Manufacturing processes <span aria-hidden>*</span></legend>
              <div className="reg-checkbox-grid">
                {PROCESSES.map((p) => (
                  <label key={p} className={`reg-checkbox-card ${selectedProcesses.includes(p) ? "selected" : ""}`}>
                    <input
                      type="checkbox"
                      checked={selectedProcesses.includes(p)}
                      onChange={() => toggleProcess(p)}
                      className="visually-hidden"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="rfq-fieldset">
              <legend>Materials</legend>
              <div className="field">
                <label htmlFor="materials">Materials you work with</label>
                <input
                  id="materials"
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. Aluminium 6061, Stainless Steel 316, ABS, PLA"
                />
                <small style={{ color: "var(--muted)", fontSize: 12 }}>Comma-separated</small>
              </div>
            </fieldset>

            <fieldset className="rfq-fieldset">
              <legend>Certifications</legend>
              <div className="reg-checkbox-grid">
                {CERTIFICATIONS.map((c) => (
                  <label key={c} className={`reg-checkbox-card ${selectedCerts.includes(c) ? "selected" : ""}`}>
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(c)}
                      onChange={() => toggleCert(c)}
                      className="visually-hidden"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {/* ── Step 3: Documents ──────────────────────────────── */}
        {step === "documents" && (
          <fieldset className="rfq-fieldset">
            <legend>Business documents</legend>
            <p className="reg-doc-hint">
              Upload your company registration, GST certificate, quality certificates, or any other relevant documents.
              These are reviewed privately by the EcoStel team.
            </p>

            <div
              className="rfq-upload-zone"
              onClick={() => document.getElementById("doc-input")?.click()}
              onKeyDown={(e) => e.key === "Enter" && document.getElementById("doc-input")?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload business documents"
            >
              <Paperclip size={22} aria-hidden />
              <p>Click to upload documents</p>
              <small>PDF, JPG, PNG — max 20 MB per file</small>
            </div>

            <input
              id="doc-input"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="visually-hidden"
              onChange={handleDocFiles}
            />

            {docFiles.length > 0 && (
              <ul className="rfq-file-list">
                {docFiles.map((f, i) => (
                  <li key={i} className="rfq-file-item">
                    <Paperclip size={13} aria-hidden />
                    <span>{f.name}</span>
                    <button
                      type="button"
                      onClick={() => setDocFiles((prev) => prev.filter((_, j) => j !== i))}
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
        )}

        <div className="rfq-form-actions">
          {step !== "company" && (
            <button
              type="button"
              className="buyer-cancel"
              onClick={() => setStep(step === "documents" ? "capabilities" : "company")}
            >
              Back
            </button>
          )}
          <button className="cta" type="submit" disabled={loading}>
            {step === "documents"
              ? loading ? "Submitting…" : "Submit Application"
              : <>Next <ArrowRight size={15} aria-hidden /></>}
          </button>
        </div>
      </form>
    </>
  );
}
