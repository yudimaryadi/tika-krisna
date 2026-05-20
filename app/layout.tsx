import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";
import weddingData from "@/data/wedding.json";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: weddingData.meta.title,
  description: weddingData.meta.description,
  openGraph: {
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [weddingData.couple.bride.photo],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${cormorant.variable} ${greatVibes.variable} ${jost.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
