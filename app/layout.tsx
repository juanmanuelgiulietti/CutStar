import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

/* Wordmark + display font — Barlow Condensed, weight 500 per brief. */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

/* Body/UI font — neutral grotesque to keep the editorial, premium feel. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CUTSTAR — Months of content. Delivered within a day.",
  description:
    "The first AI music edit engine. Send us your songs and footage; get back a full batch of beat-synced, viral-optimized edits across multiple styles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
