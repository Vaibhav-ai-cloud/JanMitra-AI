import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "JanMitra AI — Smart Governance Powered by AI",
    template: "%s | JanMitra AI",
  },
  description:
    "JanMitra AI is India's premier AI-powered citizen governance platform. Discover 200+ government schemes, file grievances, connect with your MP and access digital public services in 12+ Indian languages.",
  keywords: [
    "JanMitra AI",
    "Citizen Portal India",
    "Government Schemes",
    "Grievance Redressal",
    "AI Governance",
    "Smart India Hackathon",
    "Digital India",
    "PM Awas Yojana",
    "Ayushman Bharat",
    "MP Dashboard",
    "e-Governance",
  ],
  authors: [{ name: "JanMitra AI Team" }],
  creator: "JanMitra AI",
  metadataBase: new URL("https://janmitra.ai"),
  openGraph: {
    title: "JanMitra AI — Smart Governance Powered by AI",
    description:
      "India's premier AI-powered citizen governance platform — discover schemes, file grievances, and connect with your MP.",
    url: "https://janmitra.ai",
    siteName: "JanMitra AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JanMitra AI — Smart Governance Powered by AI",
    description:
      "India's premier AI-powered citizen governance platform — discover schemes, file grievances, and connect with your MP.",
    creator: "@janmitraai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080e1c" },
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-xl focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}