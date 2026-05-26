import Link from "next/link";

const quoteOptions = [
  {
    supplier: "Ecostel",
    price: "$96.00",
    leadTime: "7-9 days",
    minimumOrder: "10 pcs",
    shipping: "$15.00",
    qualityCerts: "ISO 9001",
    recommended: true,
  },
  {
    supplier: "Precision Works Inc.",
    price: "$112.00",
    leadTime: "10-12 days",
    minimumOrder: "10 pcs",
    shipping: "$18.00",
    qualityCerts: "ISO 9001",
  },
  {
    supplier: "Alpha Components LLC",
    price: "$138.00",
    leadTime: "14-16 days",
    minimumOrder: "25 pcs",
    shipping: "$22.00",
    qualityCerts: "ISO 9001",
  },
];

export function QuoteComparison() {
  return (
    <section className="quote-comparison-panel">
      <div className="quote-comparison-grid">
        {quoteOptions.map((option) => (
          <article className={option.recommended ? "quote-option recommended" : "quote-option"} key={option.supplier}>
            {option.recommended ? <span className="recommended-badge">Recommended</span> : null}
            <h3>{option.supplier}</h3>
            <dl>
              <div>
                <dt>Unit Price</dt>
                <dd>{option.price}</dd>
              </div>
              <div>
                <dt>Lead Time</dt>
                <dd>{option.leadTime}</dd>
              </div>
              <div>
                <dt>Minimum Order</dt>
                <dd>{option.minimumOrder}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{option.shipping}</dd>
              </div>
              <div>
                <dt>Quality Certs</dt>
                <dd>{option.qualityCerts}</dd>
              </div>
            </dl>
            <Link className="select-supplier-button" href="/solutions/instant-quote#upload-drawing">
              Select Supplier
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
