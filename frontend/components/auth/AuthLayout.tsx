"use client";

import { motion } from "framer-motion";
import AuthLogo from "./AuthLogo";
import { cn } from "../../utils/auth";

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Optional panel content (shown on large screens) */
  panel?: React.ReactNode;
  className?: string;
}

/** Floating orbs for background ambience */
function AuthBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Main blue orb */}
      <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      {/* Cyan orb */}
      <div className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[100px]" />
      {/* Purple accent */}
      <div className="absolute -bottom-32 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/6 blur-[90px]" />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/** Left panel with branding for large screens */
function BrandPanel({ content }: { content?: React.ReactNode }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="hidden lg:flex lg:flex-col lg:justify-between lg:py-12 lg:px-12"
      aria-label="JanMitra AI branding"
    >
      <AuthLogo size="lg" />

      <div className="space-y-6">
        {content ?? <DefaultPanelContent />}
      </div>

      <p className="text-xs text-slate-600">
        © {new Date().getFullYear()} JanMitra AI. Empowering Citizens.
      </p>
    </motion.aside>
  );
}

function DefaultPanelContent() {
  const features = [
    {
      icon: "🏛️",
      title: "200+ Government Schemes",
      desc: "Discover schemes you're eligible for",
    },
    {
      icon: "🤖",
      title: "AI-Powered Assistance",
      desc: "24/7 multilingual support in 12+ languages",
    },
    {
      icon: "📋",
      title: "Grievance Redressal",
      desc: "File and track complaints with MPs",
    },
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      desc: "Your data is encrypted and protected",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-white leading-tight">
          Smart Governance{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Powered by AI
          </span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          India&apos;s premier citizen governance platform. Access public services,
          discover schemes, and connect with your representatives.
        </p>
      </div>

      <ul className="space-y-4" role="list">
        {features.map((f) => (
          <li key={f.title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-base">
              {f.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{f.title}</p>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2">
        {["Digital India", "MeitY Certified", "ISO 27001", "DPDP Compliant"].map(
          (badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-500"
            >
              {badge}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
  panel,
  className,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#080e1c]">
      <AuthBackground />

      <div
        className={cn(
          "relative z-10 grid min-h-screen",
          "lg:grid-cols-[480px_1fr]",
          className
        )}
      >
        {/* Left: Brand panel */}
        <BrandPanel content={panel} />

        {/* Right: Auth form area */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex items-center justify-center px-4 py-12 sm:px-8"
        >
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
