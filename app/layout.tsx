import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const description =
  "A local-first workbench for authoring agent judges, building datasets, and running trustworthy agent evaluations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://e-valcore.com"),
  title: "Valcore — Build evaluations you can trust",
  description,
  applicationName: "Valcore",
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Valcore — Build evaluations you can trust",
    description,
    url: "https://e-valcore.com",
    siteName: "Valcore",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Valcore — Build evaluations you can trust.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valcore — Build evaluations you can trust",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
