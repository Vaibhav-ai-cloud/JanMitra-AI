"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/auth";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function AuthHeader({
  title,
  subtitle,
  className,
}: AuthHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      className={cn("space-y-1.5", className)}
    >
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-slate-400 leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
