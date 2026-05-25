export function EcostelLogo({ tone = "default" }: { tone?: "default" | "light" }) {
  return (
    <span className={`logo-lockup logo-${tone}`} aria-label="Ecostel">
      <span className="logo-mark" aria-hidden>
        <svg viewBox="0 0 164 164" role="img">
          <circle cx="82" cy="82" r="78" />
          <path d="M51 29h62v31H94v13h19v31H94v13h19v31H51v-31h20v-13H51V73h20V60H51V29Z" />
        </svg>
      </span>
      <span className="logo-word">EcoStel</span>
    </span>
  );
}
