"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Play,
  ChevronDown,
  Bot,
  CheckCircle2,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";

const heroStats = [
  { value: "24/7", label: "AI Support", sub: "Always available" },
  { value: "1M+", label: "Citizens", sub: "Across India" },
  { value: "543", label: "Constituencies", sub: "Fully covered" },
  { value: "200+", label: "Schemes", sub: "Integrated" },
];

/* Floating card data for hero visual */
const floatingCards = [
  {
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    label: "Grievance Resolved",
    value: "PM Awas Yojana",
    bg: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    pos: "-top-5 -right-4",
    delay: 0.8,
  },
  {
    icon: TrendingUp,
    iconColor: "text-blue-400",
    label: "Scheme Matched",
    value: "₹6,000 / year",
    bg: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/20",
    pos: "-bottom-5 -left-4",
    delay: 1.0,
  },
  {
    icon: Users,
    iconColor: "text-violet-400",
    label: "Citizens Helped",
    value: "1,24,750 today",
    bg: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    pos: "bottom-12 -right-4",
    delay: 1.2,
  },
];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-64px)] flex-col justify-center py-16 sm:py-20 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <Container>
        {/* ── Two-column hero grid: true 50/50 ── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span>🇮🇳&nbsp; AI-Powered Digital Governance for India</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl"
            >
              Smart{" "}
              <span className="relative inline-block">
                Governance
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                />
              </span>
              <br />
              <span className="gradient-text-animated">Powered by AI</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
              className="mt-7 max-w-lg text-base leading-8 text-slate-400 sm:text-lg"
            >
              JanMitra AI empowers{" "}
              <strong className="font-semibold text-white">citizens</strong>,{" "}
              <strong className="font-semibold text-white">MPs</strong> and{" "}
              <strong className="font-semibold text-white">administrators</strong>{" "}
              with intelligent public services, AI-guided scheme discovery,
              multilingual grievance management and real-time constituency
              analytics.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Button href="/citizen" size="lg">
                <span className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight size={18} />
                </span>
              </Button>

              <button
                className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:px-6 sm:text-base"
                aria-label="Watch JanMitra AI platform demo"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                  <Play
                    size={13}
                    className="ml-0.5 text-white"
                    fill="currentColor"
                  />
                </span>
                Watch Demo
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start"
            >
              {[
                "✅ Free for all citizens",
                "🔒 Aadhaar-grade security",
                "🌐 12+ languages",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual (50% column, large mockup) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden w-full lg:block"
          >
            {/* Outer padding so floating cards don't overflow the column */}
            <div className="relative px-6 py-6">
              {/* Glow ring behind card */}
              <div className="absolute inset-0 -z-10 rounded-[48px] bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-violet-600/20 blur-3xl" />

              {/* Dashboard mockup card — fills full column width */}
              <div className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
                {/* Window chrome */}
                <div className="mb-5 flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                  <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1.5 text-xs text-slate-500">
                    janmitra.ai/citizen/dashboard
                  </div>
                </div>

                {/* Header bar */}
                <div className="mb-5 flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
                      <Bot size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      JanMitra AI
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                    Online
                  </span>
                </div>

                {/* Stats grid */}
                <div className="mb-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "Schemes", value: "24", color: "text-blue-400" },
                    { label: "Grievances", value: "3", color: "text-amber-400" },
                    { label: "Resolved", value: "18", color: "text-emerald-400" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/[0.08] bg-white/5 p-4 text-center"
                    >
                      <p className={`text-2xl font-black ${s.color}`}>
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat preview */}
                <div className="space-y-3 rounded-xl border border-white/[0.08] bg-slate-950/60 p-4">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600/80 px-4 py-2.5 text-xs text-white">
                      PM Awas Yojana apply कैसे करें?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-2.5 text-xs text-slate-200">
                      आप PMAY-U के लिए eligible हैं! Documents: Aadhaar,
                      income cert. Apply now? ✅
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/5 px-3 py-2.5">
                    <span className="flex-1 text-xs text-slate-600">
                      Ask JanMitra AI anything...
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
                      <ArrowRight size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating metric cards — contained within px-6 py-6 padding */}
              {floatingCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: card.delay,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`animate-float absolute flex items-center gap-2.5 rounded-2xl border ${card.border} bg-gradient-to-br ${card.bg} px-3.5 py-2.5 shadow-xl backdrop-blur-xl ${card.pos}`}
                  >
                    <Icon size={16} className={card.iconColor} />
                    <div>
                      <p className="text-[10px] font-medium text-slate-400">
                        {card.label}
                      </p>
                      <p className="text-xs font-bold text-white">{card.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Stats row — full container width, 4 equal columns ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.08]"
            >
              <p className="text-3xl font-black text-blue-400 transition-colors group-hover:text-cyan-400 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={22} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}