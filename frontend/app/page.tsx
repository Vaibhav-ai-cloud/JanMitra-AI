import type { Metadata } from "next";
import Navbar from "../components/navbar/Navbar";
import BackgroundEffects from "../components/landing/BackgroundEffects";
import Hero from "../components/landing/Hero";
import TrustedBy from "../components/landing/TrustedBy";
import Features from "../components/landing/Features";
import GovernmentServices from "../components/landing/GovernmentServices";
import AIShowcase from "../components/landing/AIShowcase";
import Stats from "../components/landing/Stats";
import HowItWorks from "../components/landing/HowItWorks";
import Benefits from "../components/landing/Benefits";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CallToAction from "../components/landing/CallToAction";
import Footer from "../components/landing/Footer";

export const metadata: Metadata = {
  title: "JanMitra AI — Smart Governance Powered by AI",
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
    "e-Governance India",
  ],
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
};

export default function HomePage() {
  return (
    <>
      {/* Full-page animated background — fixed behind everything */}
      <BackgroundEffects />

      {/* Page content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* 1. Sticky Navbar */}
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {/* 2. Hero */}
          <Hero />

          {/* 3. Trusted By / Government Partners */}
          <TrustedBy />

          {/* 4. Key Features */}
          <Features />

          {/* 5. Government Services */}
          <GovernmentServices />

          {/* 6. AI Assistant Showcase */}
          <AIShowcase />

          {/* 7. Statistics */}
          <Stats />

          {/* 8. How JanMitra Works */}
          <HowItWorks />

          {/* 9. Benefits */}
          <Benefits />

          {/* 10. Testimonials */}
          <Testimonials />

          {/* 11. FAQ Accordion */}
          <FAQ />

          {/* 12. Call To Action */}
          <CallToAction />
        </main>

        {/* 13. Footer */}
        <Footer />
      </div>
    </>
  );
}