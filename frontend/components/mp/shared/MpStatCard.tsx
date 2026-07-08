"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../../utils/auth";

interface MpStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "violet" | "blue" | "emerald" | "amber" | "rose" | "cyan" | "purple";
  trend?: { value: number; label: string };
  suffix?: string;
  className?: string;
  delay?: number;
}

const colorMap = {
  violet: { icon: "bg-violet-500/15 border-violet-500/20 text-violet-400", glow: "shadow-violet-500/10" },
  purple: { icon: "bg-purple-500/15 border-purple-500/20 text-purple-400", glow: "shadow-purple-500/10" },
  blue: { icon: "bg-blue-500/15 border-blue-500/20 text-blue-400", glow: "shadow-blue-500/10" },
  emerald: { icon: "bg-emerald-500/15 border-emerald-500/20 text-emerald-400", glow: "shadow-emerald-500/10" },
  amber: { icon: "bg-amber-500/15 border-amber-500/20 text-amber-400", glow: "shadow-amber-500/10" },
  rose: { icon: "bg-rose-500/15 border-rose-500/20 text-rose-400", glow: "shadow-rose-500/10" },
  cyan: { icon: "bg-cyan-500/15 border-cyan-500/20 text-cyan-400", glow: "shadow-cyan-500/10" },
};

export default function MpStatCard({
  label,
  value,
  icon,
  color,
  trend,
  suffix,
  className,
  delay = 0,
}: MpStatCardProps) {
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
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border",
            colors.icon
          )}
          aria-hidden
        >
          {icon}
        </div>

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
        <p className="text-2xl font-bold text-white">
          {value}
          {suffix && <span className="ml-1 text-base font-medium text-slate-400">{suffix}</span>}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{label}</p>
        {trend && (
          <p className="mt-1 text-xs text-slate-600">{trend.label}</p>
        )}
      </div>
    </motion.div>
  );
}
