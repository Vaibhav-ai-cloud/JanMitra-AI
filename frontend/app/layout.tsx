import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "JanMitra AI",
  description: "AI Powered Constituency Intelligence Platform",
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