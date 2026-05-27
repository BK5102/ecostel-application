export function EcostelLogo({ tone = "default" }: { tone?: "default" | "light" }) {
  return (
    <span className={`logo-lockup logo-${tone}`} aria-label="EcoStel">
      <img
        src="/ecostel-logo.png"
        alt="EcoStel logo"
        width={36}
        height={36}
        style={{ display: "block", flexShrink: 0 }}
      />
      <span className="logo-word">EcoStel</span>
    </span>
  );
}
