"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Users,
  TrendingUp,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { mockSchemes } from "../../../../lib/mockData";
import { cn } from "../../../../utils/auth";

interface Props {
  params: { id: string };
}

export default function SchemeDetailPage({ params }: Props) {
  const [scheme, setScheme] = useState(mockSchemes.find((s) => s.id === params.id));

  if (!scheme) notFound();

  const toggleBookmark = () =>
    setScheme((prev) => prev && { ...prev, isBookmarked: !prev.isBookmarked });

  return (
    <div className="max-w-[1000px] space-y-6">
      <Link
        href="/citizen/schemes"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} aria-hidden />
        Back to Schemes
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-400">
              {scheme.ministry}
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                scheme.status === "open"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-slate-500/15 text-slate-400"
              )}
            >
              {scheme.status === "open" ? "Applications Open" : scheme.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">{scheme.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{scheme.shortTitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleBookmark}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all",
              scheme.isBookmarked
                ? "border-blue-500/40 bg-blue-500/15 text-blue-400"
                : "border-white/[0.1] bg-white/[0.04] text-slate-400 hover:text-white"
            )}
            aria-label={scheme.isBookmarked ? "Remove bookmark" : "Bookmark scheme"}
          >
            {scheme.isBookmarked ? (
              <BookmarkCheck size={16} aria-hidden />
            ) : (
              <Bookmark size={16} aria-hidden />
            )}
            {scheme.isBookmarked ? "Saved" : "Save"}
          </button>
          <Link
            href={`/citizen/schemes/${scheme.id}/apply`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            Apply Now <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            aria-labelledby="scheme-desc"
          >
            <h2 id="scheme-desc" className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">About This Scheme</h2>
            <p className="text-sm leading-7 text-slate-300">{scheme.description}</p>
          </motion.section>

          {/* Eligibility */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            aria-labelledby="eligibility-heading"
          >
            <h2 id="eligibility-heading" className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Eligibility Criteria</h2>
            <p className="mb-4 text-sm text-slate-400">{scheme.eligibility.description}</p>

            {/* Eligibility check */}
            <div className={cn(
              "flex items-center gap-3 rounded-xl border p-4",
              scheme.isEligible !== false
                ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                : "border-red-500/20 bg-red-500/[0.06]"
            )}>
              {scheme.isEligible !== false ? (
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" aria-hidden />
              ) : (
                <XCircle size={20} className="text-red-400 shrink-0" aria-hidden />
              )}
              <div>
                <p className={cn("text-sm font-semibold", scheme.isEligible !== false ? "text-emerald-300" : "text-red-300")}>
                  {scheme.isEligible !== false ? "You appear to be eligible" : "You may not be eligible"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Based on your profile data. Verify eligibility during application.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Benefits */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            aria-labelledby="benefits-heading"
          >
            <h2 id="benefits-heading" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Benefits</h2>
            <ul className="space-y-3" role="list">
              {scheme.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-400" aria-hidden />
                  <div>
                    {benefit.amount && (
                      <span className="text-lg font-bold text-white">
                        ₹{benefit.amount.toLocaleString("en-IN")}
                      </span>
                    )}
                    <p className="text-sm text-slate-400">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Required Documents */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            aria-labelledby="docs-heading"
          >
            <h2 id="docs-heading" className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FileText size={14} aria-hidden />
              Required Documents
            </h2>
            <ul className="space-y-2.5" role="list">
              {scheme.documents.map((doc) => (
                <li key={doc.name} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      doc.required ? "bg-blue-400" : "bg-slate-600"
                    )}
                    aria-hidden
                  />
                  <span className="text-slate-300">{doc.name}</span>
                  {doc.required ? (
                    <span className="ml-auto text-[10px] font-semibold text-blue-400 uppercase">Required</span>
                  ) : (
                    <span className="ml-auto text-[10px] text-slate-600 uppercase">Optional</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Scheme Info</h2>
            {[
              { icon: <Users size={14} />, label: "Applicants", value: scheme.applicantsCount ? `${(scheme.applicantsCount / 1_000_000).toFixed(1)}M+` : "N/A" },
              { icon: <TrendingUp size={14} />, label: "Success Rate", value: scheme.successRate ? `${scheme.successRate}%` : "N/A" },
              { icon: <FileText size={14} />, label: "Launched", value: new Date(scheme.launchDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) },
              ...(scheme.deadlineDate ? [{ icon: <FileText size={14} />, label: "Deadline", value: new Date(scheme.deadlineDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) }] : []),
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-slate-600">{item.icon}</span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-xs text-slate-600">{item.label}</span>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {scheme.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Apply CTA */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-5"
          >
            <p className="mb-3 text-sm font-medium text-white">Ready to Apply?</p>
            <p className="mb-4 text-xs text-slate-500 leading-relaxed">
              Keep your documents ready before starting the application.
            </p>
            <Link
              href={`/citizen/schemes/${scheme.id}/apply`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-500 transition-all"
            >
              Start Application <ArrowRight size={15} aria-hidden />
            </Link>
            {scheme.applicationUrl && (
              <a
                href={scheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] px-4 py-2 text-xs font-medium text-slate-500 hover:text-white transition-colors"
              >
                Official Portal <ExternalLink size={12} aria-hidden />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
