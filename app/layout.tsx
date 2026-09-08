import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const description =
  "Agentic experimentation done the right way: build compatible Datasets and Agent Evaluators, then validate, compare, trace, and sync every Experiment Run.";

export const metadata: Metadata = {
  metadataBase: new URL("https://e-valcore.com"),
  title: "Valcore: Agentic Experimentation Done the Right Way",
  description,
  applicationName: "Valcore",
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Valcore: Agentic Experimentation Done the Right Way",
    description,
    url: "https://e-valcore.com",
    siteName: "Valcore",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Valcore: Agentic Experimentation Done the Right Way.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valcore: Agentic Experimentation Done the Right Way",
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
