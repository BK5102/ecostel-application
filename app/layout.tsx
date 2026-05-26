import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecostel.co"),
  title: {
    default: "Ecostel — Manufacturing Platform",
    template: "%s | Ecostel",
  },
  description:
    "Ecostel brings quoting, communication, and execution into one place for reliable manufacturing from prototype to production.",
  keywords: [
    "manufacturing marketplace",
    "CNC machining",
    "3D printing",
    "injection molding",
    "RFQ",
    "supplier quotes",
    "precision manufacturing India",
  ],
  authors: [{ name: "Ecostel Engineering" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ecostel.co",
    siteName: "Ecostel",
    title: "Ecostel — Manufacturing Platform",
    description:
      "Faster turnaround, complete visibility, and reliable outcomes from prototype to production.",
    images: [{ url: "/notion-assets/manufacturing-parts-only.png", width: 1415, height: 520, alt: "Ecostel manufacturing platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecostel — Manufacturing Platform",
    description: "Faster turnaround, complete visibility, and reliable outcomes from prototype to production.",
    images: ["/notion-assets/manufacturing-parts-only.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={rubik.variable}>
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main className="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
