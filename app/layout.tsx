import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hrishikesh Borkar — macOS Portfolio",
  description: "DevSecOps · Full-Stack Developer · DevOps — an interactive macOS desktop portfolio.",
  openGraph: {
    title: "Hrishikesh Borkar — macOS Portfolio",
    description: "DevSecOps · Full-Stack Developer · DevOps — an interactive macOS desktop portfolio.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
