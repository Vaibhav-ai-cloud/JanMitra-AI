"use client";

import { useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Max width of dialog panel */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * Shared accessible Dialog / Modal.
 * - Traps focus within the dialog when open
 * - Closes on Escape key
 * - Backdrop click closes
 * - aria-modal, aria-labelledby, aria-describedby
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  className,
}: DialogProps) {
  const titleId = useId();
  const descId = useId();

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={twMerge(
              "relative w-full rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-2xl",
              sizeMap[size],
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-6 py-5">
              <div>
                <h2
                  id={titleId}
                  className="text-lg font-bold text-white"
                >
                  {title}
                </h2>
                {description && (
                  <p id={descId} className="mt-1 text-sm text-slate-400">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Dialog footer helper */
export function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-wrap items-center justify-end gap-3 border-t border-white/[0.08] px-6 py-4",
        className
      )}
    >
      {children}
    </div>
  );
}
