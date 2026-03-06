import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PortForge AI | Build Your Developer Portfolio in 30 Seconds",
  description:
    "Paste your GitHub profile and PortForge AI generates a professional portfolio website instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
