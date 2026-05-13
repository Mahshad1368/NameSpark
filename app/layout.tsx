import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NameSpark",
  description: "Generate creative names for projects, startups, apps, products, and brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-ink antialiased dark:text-white">{children}</body>
    </html>
  );
}
