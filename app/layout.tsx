import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Market Dashboard",
  description: "Real-time crypto market dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}