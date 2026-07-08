"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "../../utils/auth";

interface AuthLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: "h-8 w-8 text-xs", wordmark: "text-lg" },
  md: { icon: "h-10 w-10 text-sm", wordmark: "text-xl" },
  lg: { icon: "h-12 w-12 text-base", wordmark: "text-2xl" },
};

export default function AuthLogo({
  className,
  showWordmark = true,
  size = "md",
}: AuthLogoProps) {
  const s = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:rounded-lg",
        className
      )}
      aria-label="JanMitra AI — Back to home"
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl",
          "bg-gradient-to-br from-blue-500 to-cyan-400",
          "shadow-lg shadow-blue-500/35 transition-shadow duration-300 group-hover:shadow-blue-500/55",
          s.icon
        )}
      >
        <span className={cn("font-black text-white", s.icon.split(" ")[2])}>
          JM
        </span>
        <div className="absolute inset-0 bg-white/0 transition-colors duration-200 group-hover:bg-white/10" />
      </motion.div>

      {showWordmark && (
        <span className={cn("font-extrabold tracking-tight text-white", s.wordmark)}>
          Jan
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Mitra
          </span>{" "}
          AI
        </span>
      )}
    </Link>
  );
}
