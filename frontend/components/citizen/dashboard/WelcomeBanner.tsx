"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface WelcomeBannerProps {
  userName: string;
  district?: string;
  state?: string;
}

export default function WelcomeBanner({
  userName,
  district = "Lucknow",
  state = "Uttar Pradesh",
}: WelcomeBannerProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-cyan-500/10 p-6 backdrop-blur-sm"
    >
      {/* Orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl"
      />

      {/* Top bar */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-400/30">
            <Sparkles size={18} className="text-blue-400" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-medium text-blue-300">{greeting}</p>
            <h2 className="text-lg font-bold text-white leading-tight">
              {userName}
            </h2>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-slate-500">Your location</p>
          <p className="text-sm font-medium text-slate-300">
            {district}, {state}
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="relative flex flex-wrap gap-2.5">
        {[
          { label: "File a Complaint", href: "/citizen/complaints/new", emoji: "📋" },
          { label: "Discover Schemes", href: "/citizen/schemes", emoji: "🏛️" },
          { label: "Ask AI Assistant", href: "/citizen/ai", emoji: "🤖" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.08] px-3.5 py-2 text-sm font-medium text-white transition-all hover:border-white/[0.25] hover:bg-white/[0.14]"
          >
            <span aria-hidden>{action.emoji}</span>
            {action.label}
            <ArrowRight size={13} className="text-slate-400" aria-hidden />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
