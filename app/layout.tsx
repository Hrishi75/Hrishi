import type { Metadata } from "next";
import { Cormorant_Garamond, Zen_Kaku_Gothic_New, Fira_Code } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/effects/GrainOverlay";
import CursorTrail from "@/components/effects/CursorTrail";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "降胔 — Samurai Portfolio",
  description: "Full-Stack Developer & Designer. Discipline in craft. Precision in execution.",
  openGraph: {
    title: "降胔 — Samurai Portfolio",
    description: "Full-Stack Developer & Designer",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${zenKaku.variable} ${firaCode.variable}`}>
      <body>
        <GrainOverlay />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}