import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Name Generator",
  description: "A simple keyword-based name generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
