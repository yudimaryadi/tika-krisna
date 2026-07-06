import type { Metadata } from "next";
import { Cormorant_Garamond, Alex_Brush, Poppins } from "next/font/google";
import "./globals.css";
import weddingData from "@/data/wedding.json";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const poppins = Poppins({
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
    images: [weddingData.openingPhoto],
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
        className={`${cormorant.variable} ${alexBrush.variable} ${poppins.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
