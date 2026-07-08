"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bookmark, BookmarkCheck, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "../../../utils/auth";
import type { Scheme } from "../../../types/scheme";

interface SchemeCardProps {
  scheme: Scheme;
  onToggleBookmark?: (id: string) => void;
  delay?: number;
  className?: string;
}

const categoryColors: Record<string, string> = {
  health: "from-rose-500 to-pink-500",
  education: "from-violet-500 to-purple-500",
  housing: "from-amber-500 to-orange-500",
  agriculture: "from-green-500 to-emerald-500",
  employment: "from-blue-500 to-cyan-500",
  finance: "from-teal-500 to-cyan-500",
  women: "from-pink-500 to-rose-400",
  senior_citizen: "from-slate-500 to-slate-400",
  disability: "from-indigo-500 to-blue-500",
  youth: "from-cyan-500 to-blue-400",
  infrastructure: "from-gray-500 to-slate-400",
  other: "from-blue-500 to-indigo-500",
};

const categoryEmoji: Record<string, string> = {
  health: "🏥",
  education: "📚",
  housing: "🏠",
  agriculture: "🌾",
  employment: "💼",
  finance: "💰",
  women: "👩",
  senior_citizen: "👴",
  disability: "♿",
  youth: "🧑",
  infrastructure: "🏗️",
  other: "📋",
};

export default function SchemeCard({
  scheme,
  onToggleBookmark,
  delay = 0,
  className,
}: SchemeCardProps) {
  const gradient = categoryColors[scheme.category] ?? "from-blue-500 to-cyan-500";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]",
        "transition-all duration-300 hover:border-white/[0.14]",
        className
      )}
    >
      {/* Top colored bar */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", gradient)} />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base",
                gradient,
                "bg-opacity-20"
              )}
              style={{ background: "rgba(255,255,255,0.06)" }}
              aria-hidden
            >
              {categoryEmoji[scheme.category] ?? "📋"}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {scheme.shortTitle}
              </span>
              <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
                {scheme.title}
              </h3>
            </div>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark?.(scheme.id)}
            className={cn(
              "shrink-0 flex h-8 w-8 items-center justify-center rounded-lg transition-all",
              scheme.isBookmarked
                ? "text-blue-400 bg-blue-500/15 hover:bg-blue-500/25"
                : "text-slate-600 hover:text-blue-400 hover:bg-blue-500/10"
            )}
            aria-label={scheme.isBookmarked ? "Remove bookmark" : "Bookmark scheme"}
          >
            {scheme.isBookmarked ? (
              <BookmarkCheck size={16} />
            ) : (
              <Bookmark size={16} />
            )}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {scheme.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {scheme.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 mt-auto">
          <div className="flex items-center gap-3">
            {scheme.isEligible !== undefined && (
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  scheme.isEligible ? "text-emerald-400" : "text-slate-600"
                )}
              >
                <CheckCircle2 size={12} aria-hidden />
                {scheme.isEligible ? "Eligible" : "Not Eligible"}
              </span>
            )}
            {scheme.applicantsCount && (
              <span className="flex items-center gap-1 text-xs text-slate-600">
                <Users size={11} aria-hidden />
                {(scheme.applicantsCount / 1000000).toFixed(1)}M+
              </span>
            )}
          </div>

          <Link
            href={`/citizen/schemes/${scheme.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
            aria-label={`View ${scheme.title} details`}
          >
            View
            <ArrowRight size={12} aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
