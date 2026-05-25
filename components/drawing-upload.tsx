"use client";

import { useId, useState } from "react";
import { CheckCircle2, FileUp } from "lucide-react";

export function DrawingUpload() {
  const inputId = useId();
  const [fileName, setFileName] = useState("");

  return (
    <section className="upload-panel" id="upload-drawing">
      <div>
        <div className="eyebrow">Get Instant Quote</div>
        <h2>Upload your drawing</h2>
        <p>
          Upload CAD, drawings, PDFs, or BOMs and capture the first RFQ details Ecostel needs to route your part to the
          right vetted suppliers.
        </p>
        <div className="upload-checks" aria-label="RFQ workflow includes">
          <span>
            <CheckCircle2 aria-hidden size={16} />
            Private file review
          </span>
          <span>
            <CheckCircle2 aria-hidden size={16} />
            Supplier matching
          </span>
          <span>
            <CheckCircle2 aria-hidden size={16} />
            Quote comparison
          </span>
        </div>
      </div>
      <form className="rfq-form">
        <label className="upload-target" htmlFor={inputId}>
          <FileUp aria-hidden size={28} />
          <span>{fileName || "Choose drawing file"}</span>
          <small>STEP, STP, STL, IGES, DWG, DXF, PDF, XLSX, or CSV up to 256 MB</small>
        </label>
        <input
          id={inputId}
          className="visually-hidden"
          type="file"
          accept=".step,.stp,.stl,.iges,.igs,.x_t,.x_b,.sldprt,.ipt,.3mf,.pdf,.dxf,.dwg,.xlsx,.csv,application/pdf"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
        />
        <div className="rfq-fields">
          <label>
            Process
            <select defaultValue="3d-printing">
              <option value="3d-printing">3D Printing</option>
              <option value="cnc">CNC Machining</option>
              <option value="sheet-tube">Sheet & Tube Fabrication</option>
              <option value="molding">Injection Molding</option>
              <option value="casting">Casting</option>
            </select>
          </label>
          <label>
            Material
            <input placeholder="Aluminum 6061, Nylon PA12..." />
          </label>
          <label>
            Quantity
            <input min="1" placeholder="25" type="number" />
          </label>
          <label>
            Priority
            <select defaultValue="standard">
              <option value="standard">Standard</option>
              <option value="fast-track">Fast-track</option>
              <option value="rush">Rush</option>
            </select>
          </label>
        </div>
        <button className="quote-submit" type="button">
          Prepare RFQ
        </button>
      </form>
    </section>
  );
}
