"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/auth";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  /** Delay the entrance animation slightly when stacked */
  delay?: number;
}

export default function AuthCard({
  children,
  className,
  delay = 0,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(
        // Glass base
        "relative w-full overflow-hidden rounded-2xl",
        "border border-white/[0.08] bg-slate-900/70 backdrop-blur-2xl",
        "shadow-2xl shadow-black/50",
        className
      )}
    >
      {/* Subtle top highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
      />

      {/* Radial blue glow bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-600/8 blur-3xl"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
