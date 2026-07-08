"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[JanMitra Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <AlertTriangle size={28} className="text-red-400" aria-hidden />
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-3xl font-black text-white">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-sm text-base leading-7 text-slate-400">
          An unexpected error occurred. You can try refreshing the page or go
          back to the home page.
          {error.digest && (
            <span className="mt-2 block text-xs text-slate-600">
              Error ID: {error.digest}
            </span>
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          >
            <RefreshCw size={15} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          >
            <Home size={15} />
            Go home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
