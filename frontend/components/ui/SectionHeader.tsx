"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: "blue" | "cyan" | "violet" | "emerald" | "amber" | "rose";
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

const badgeColorMap = {
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-300",
};

export default function SectionHeader({
  badge,
  badgeColor = "blue",
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={twMerge(
        "mb-16 max-w-3xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span
          className={twMerge(
            "mb-5 inline-block rounded-full border px-5 py-1.5 text-xs font-bold uppercase tracking-widest",
            badgeColorMap[badgeColor]
          )}
        >
          {badge}
        </span>
      )}

      <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
