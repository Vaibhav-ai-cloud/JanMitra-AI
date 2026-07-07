"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight, TrendingUp, TrendingDown, Users, AlertCircle } from "lucide-react";
import { ProgressBar } from "../../../components/mp/shared/MpChart";
import { mockMpSchemeMetrics } from "../../../lib/mpMockData";
import { cn } from "../../../utils/auth";

export default function MpSchemesPage() {
  const total = mockMpSchemeMetrics.reduce((sum, s) => sum + s.targetBeneficiaries, 0);
  const covered = mockMpSchemeMetrics.reduce((sum, s) => sum + s.actualBeneficiaries, 0);
  const avgCoverage = Math.round((covered / total) * 100);
  const totalDisbursed = mockMpSchemeMetrics.reduce((sum, s) => sum + s.disbursedAmount, 0);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <BookOpen size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Scheme Monitoring</h1>
          <p className="mt-0.5 text-sm text-slate-400">Government scheme coverage and beneficiary analytics</p>
        </div>
      </motion.div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Active Schemes", value: mockMpSchemeMetrics.length, color: "text-white", sub: "in constituency" },
          { label: "Total Target", value: total.toLocaleString(), color: "text-blue-400", sub: "beneficiaries" },
          { label: "Actual Covered", value: covered.toLocaleString(), color: "text-emerald-400", sub: "beneficiaries" },
          { label: "Avg Coverage", value: `${avgCoverage}%`, color: avgCoverage >= 80 ? "text-emerald-400" : "text-amber-400", sub: "across all schemes" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-sm font-medium text-white">{s.label}</p>
            <p className="text-xs text-slate-500">{s.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Total disbursed banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4"
      >
        <TrendingUp size={20} className="shrink-0 text-emerald-400" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-white">
            Total Disbursed: ₹{(totalDisbursed / 10000000).toFixed(1)} Crore
          </p>
          <p className="text-xs text-slate-400">Across all schemes in {new Date().getFullYear()}</p>
        </div>
      </motion.div>

      {/* Schemes list */}
      <div className="space-y-4">
        {mockMpSchemeMetrics.map((scheme, i) => {
          const gap = scheme.targetBeneficiaries - scheme.actualBeneficiaries;
          const isLow = scheme.coveragePercent < 70;

          return (
            <motion.article
              key={scheme.schemeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className={cn(
                "rounded-2xl border bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all",
                isLow ? "border-amber-500/20" : "border-white/[0.08]"
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-wide">{scheme.category}</span>
                    {isLow && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                        <AlertCircle size={10} aria-hidden /> Low Coverage
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-semibold text-white">{scheme.schemeName}</h2>
                </div>

                <div className="flex gap-4 shrink-0 text-center">
                  <div>
                    <p className="text-sm font-bold text-white">{scheme.pendingApplications.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">Pending</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-red-400">{scheme.rejectedApplications.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500">Rejected</p>
                  </div>
                  {scheme.disbursedAmount > 0 && (
                    <div>
                      <p className="text-sm font-bold text-emerald-400">₹{(scheme.disbursedAmount / 10000000).toFixed(1)}Cr</p>
                      <p className="text-[10px] text-slate-500">Disbursed</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Users size={11} aria-hidden /> Target: {scheme.targetBeneficiaries.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <TrendingUp size={11} aria-hidden /> Achieved: {scheme.actualBeneficiaries.toLocaleString()}
                    </span>
                  </div>
                  <span className={`font-bold text-sm ${
                    scheme.coveragePercent >= 80 ? "text-emerald-400"
                    : scheme.coveragePercent >= 65 ? "text-violet-400"
                    : "text-amber-400"
                  }`}>{scheme.coveragePercent}%</span>
                </div>
                <ProgressBar
                  value={scheme.coveragePercent}
                  color={scheme.coveragePercent >= 80 ? "#10b981" : scheme.coveragePercent >= 65 ? "#8b5cf6" : "#f59e0b"}
                  showLabel={false}
                />
                {isLow && (
                  <p className="text-xs text-amber-400">
                    {gap.toLocaleString()} citizens yet to be covered — intervention recommended
                  </p>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
