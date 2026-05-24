import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Ecostel - Manufacturing Platform",
    template: "%s | Ecostel",
  },
  description:
    "Ecostel brings quoting, communication, and execution into one place for reliable manufacturing from prototype to production.",
  metadataBase: new URL("https://ecostel.example"),
  openGraph: {
    title: "Ecostel - Manufacturing Platform",
    description:
      "Faster turnaround, complete visibility, and reliable outcomes from prototype to production.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
