"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../../utils/auth";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "emerald" | "amber" | "rose" | "violet" | "cyan";
  trend?: { value: number; label: string };
  className?: string;
  delay?: number;
}

const colorMap = {
  blue: {
    icon: "bg-blue-500/15 border-blue-500/20 text-blue-400",
    glow: "shadow-blue-500/10",
    badge: "bg-blue-500/15 text-blue-400",
  },
  emerald: {
    icon: "bg-emerald-500/15 border-emerald-500/20 text-emerald-400",
    glow: "shadow-emerald-500/10",
    badge: "bg-emerald-500/15 text-emerald-400",
  },
  amber: {
    icon: "bg-amber-500/15 border-amber-500/20 text-amber-400",
    glow: "shadow-amber-500/10",
    badge: "bg-amber-500/15 text-amber-400",
  },
  rose: {
    icon: "bg-rose-500/15 border-rose-500/20 text-rose-400",
    glow: "shadow-rose-500/10",
    badge: "bg-rose-500/15 text-rose-400",
  },
  violet: {
    icon: "bg-violet-500/15 border-violet-500/20 text-violet-400",
    glow: "shadow-violet-500/10",
    badge: "bg-violet-500/15 text-violet-400",
  },
  cyan: {
    icon: "bg-cyan-500/15 border-cyan-500/20 text-cyan-400",
    glow: "shadow-cyan-500/10",
    badge: "bg-cyan-500/15 text-cyan-400",
  },
};

export default function StatCard({
  label,
  value,
  icon,
  color,
  trend,
  className,
  delay = 0,
}: StatCardProps) {
  const colors = colorMap[color];
  const isPositive = trend && trend.value >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5",
        "transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06]",
        "shadow-lg",
        colors.glow,
        className
      )}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: `var(--tw-shadow-color, rgba(59,130,246,0.15))` }}
      />

      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border",
            colors.icon
          )}
          aria-hidden
        >
          {icon}
        </div>

        {/* Trend */}
        {trend && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              isPositive
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            )}
          >
            {isPositive ? (
              <TrendingUp size={11} aria-hidden />
            ) : (
              <TrendingDown size={11} aria-hidden />
            )}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="mt-0.5 text-sm text-slate-500">{label}</p>
        {trend && (
          <p className="mt-1 text-xs text-slate-600">{trend.label}</p>
        )}
      </div>
    </motion.div>
  );
}
