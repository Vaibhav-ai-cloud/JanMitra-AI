"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/auth";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantMap = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/40",
  outline:
    "border border-white/[0.15] bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]",
  danger:
    "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 hover:from-red-500 hover:to-rose-500",
};

const sizeMap = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export default function LoadingButton({
  isLoading = false,
  loadingText = "Please wait...",
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  type = "submit",
  ...rest
}: LoadingButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.div
      whileHover={{ scale: isDisabled ? 1 : 1.01 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className="w-full"
    >
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={cn(
          "relative inline-flex w-full items-center justify-center gap-2 rounded-xl font-semibold",
          "transition-all duration-300 outline-none",
          "focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variantMap[variant],
          sizeMap[size],
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    </motion.div>
  );
}
