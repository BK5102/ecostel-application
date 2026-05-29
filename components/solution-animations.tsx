"use client";

/* ─── Animation 1: Quote with Speed and Clarity ─────────────────── */
export function QuoteSpeedAnimation() {
  return (
    <div className="sol-anim-panel">
      <div className="sol-anim-inner">
        {/* Document card */}
        <div className="sol-doc">
          <div className="sol-doc-topbar" />
          <div className="sol-doc-line" />
          <div className="sol-doc-line short" />
          <div className="sol-doc-line" />
          <div className="sol-doc-line short" style={{ width: "45%" }} />
        </div>
        {/* Feedback bubbles */}
        <div className="sol-bubble sol-bubble-1">
          <span className="sol-bubble-dot" />
          DFM check passed
        </div>
        <div className="sol-bubble sol-bubble-2">
          <span className="sol-bubble-dot" />
          Ready to quote
        </div>
        {/* Checkmark */}
        <div className="sol-check-ring">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Animation 2: Get Accurate Quotes Easily ───────────────────── */
export function AccurateQuotesAnimation() {
  return (
    <div className="sol-anim-panel">
      <div className="sol-anim-inner quotes-inner">
        {/* Upload indicator */}
        <div className="sol-upload-row">
          <div className="sol-file-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="sol-upload-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </div>
          <span className="sol-upload-label">part_drawing.step</span>
        </div>
        {/* Quote cards */}
        <div className="sol-quote-cards">
          <div className="sol-quote-card sol-quote-card-1">
            <span className="sol-quote-name">Supplier A</span>
            <span className="sol-quote-price">₹12,400</span>
          </div>
          <div className="sol-quote-card sol-quote-card-2">
            <span className="sol-quote-name">Supplier B</span>
            <span className="sol-quote-price">₹11,200</span>
          </div>
          <div className="sol-quote-card sol-quote-card-3 best">
            <span className="sol-quote-name">Best Match</span>
            <span className="sol-quote-price">₹10,800</span>
            <span className="sol-quote-badge">AI Pick</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Animation 3: Long-Term Production Planning ────────────────── */
export function ProductionPlanningAnimation() {
  const rows = [
    { label: "Q1 Batch", width: 75, delay: 0 },
    { label: "Q2 Batch", width: 55, delay: 0.25 },
    { label: "Q3 Batch", width: 85, delay: 0.5 },
    { label: "Q4 Batch", width: 60, delay: 0.75 },
  ];
  return (
    <div className="sol-anim-panel">
      <div className="sol-anim-inner gantt-inner">
        <div className="sol-gantt">
          {rows.map((row) => (
            <div className="sol-gantt-row" key={row.label}>
              <span className="sol-gantt-label">{row.label}</span>
              <div className="sol-gantt-track">
                <div
                  className="sol-gantt-bar"
                  style={{ "--bar-w": `${row.width}%`, animationDelay: `${row.delay}s` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="sol-gantt-footer">
          <span className="sol-gantt-stat">On-track</span>
          <span className="sol-gantt-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ─── Animation 4: Compare Options Easily ───────────────────────── */
export function CompareOptionsAnimation() {
  const suppliers = [
    { name: "Alpha Industries", score: "94.6%", level: 95, best: true, delay: 0 },
    { name: "P.R Industries", score: "85.7%", level: 86, best: false, delay: 0.2 },
    { name: "Anitha Enterprises", score: "91.3%", level: 91, best: false, delay: 0.4 },
  ];
  return (
    <div className="sol-anim-panel">
      <div className="sol-anim-inner compare-inner">
        {suppliers.map((s) => (
          <div
            className={`sol-compare-row${s.best ? " best" : ""}`}
            key={s.name}
            style={{ animationDelay: `${s.delay}s` }}
          >
            <div className="sol-compare-info">
              <span className="sol-compare-name">{s.name}</span>
              <div className="sol-compare-track">
                <div
                  className="sol-compare-bar"
                  style={{ "--bar-w": `${s.level}%`, animationDelay: `${s.delay + 0.3}s` } as React.CSSProperties}
                />
              </div>
            </div>
            <span className="sol-compare-score">{s.score}</span>
            {s.best && <span className="sol-compare-best">Best</span>}
          </div>
        ))}
        <div className="sol-compare-footer">
          <span>Select Supplier</span>
        </div>
      </div>
    </div>
  );
}
