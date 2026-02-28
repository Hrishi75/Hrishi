import type { Metadata } from "next";
import { Cormorant_Garamond, Zen_Kaku_Gothic_New, Fira_Code } from "next/font/google";
import "./globals.css";
import BackgroundImage from "@/components/effects/BackgroundImage";
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
  title: "降胔 — Hrishikesh Borkar",
  description: "Full-Stack Developer, Data & Devops",
  openGraph: {
    title: "降胔 — Hrishikesh Borkar",
    description: "Full-Stack Developer, Data Development & Devops",
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
        <BackgroundImage />
        <GrainOverlay />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}