"use client";

import { useId, useState } from "react";
import { FileUp } from "lucide-react";

export function DrawingUpload() {
  const inputId = useId();
  const [fileName, setFileName] = useState("");

  return (
    <section className="upload-panel" id="upload-drawing">
      <div>
        <div className="eyebrow">Get Instant Quote</div>
        <h2>Upload your drawing</h2>
        <p>
          Upload CAD, drawings, or PDFs and get fast, reliable quotes powered by experts and AI, with easy comparison to
          choose the best price.
        </p>
      </div>
      <label className="upload-target" htmlFor={inputId}>
        <FileUp aria-hidden size={28} />
        <span>{fileName || "Choose drawing file"}</span>
        <small>STEP, STL, PDF, or drawing package</small>
      </label>
      <input
        id={inputId}
        className="visually-hidden"
        type="file"
        accept=".step,.stp,.stl,.pdf,.dxf,.dwg,application/pdf"
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
      />
    </section>
  );
}
