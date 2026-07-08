"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileBarChart,
  Download,
  FileText,
  FileSpreadsheet,
  Plus,
  Calendar,
} from "lucide-react";
import { mockMpReports } from "../../../lib/mpMockData";
import type { ReportType } from "../../../types/mp";
import { cn } from "../../../utils/auth";

const reportTypeConfig: Record<ReportType, { label: string; color: string }> = {
  complaint_summary: { label: "Complaint Summary", color: "text-violet-400 bg-violet-500/15 border-violet-500/20" },
  project_progress: { label: "Project Progress", color: "text-blue-400 bg-blue-500/15 border-blue-500/20" },
  scheme_coverage: { label: "Scheme Coverage", color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/20" },
  budget_utilization: { label: "Budget Utilization", color: "text-amber-400 bg-amber-500/15 border-amber-500/20" },
  citizen_engagement: { label: "Citizen Engagement", color: "text-cyan-400 bg-cyan-500/15 border-cyan-500/20" },
};

const formatIcon = {
  PDF: <FileText size={14} className="text-red-400" aria-hidden />,
  Excel: <FileSpreadsheet size={14} className="text-emerald-400" aria-hidden />,
  CSV: <FileText size={14} className="text-blue-400" aria-hidden />,
};

export default function MpReportsPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
            <FileBarChart size={20} className="text-violet-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Reports</h1>
            <p className="mt-0.5 text-sm text-slate-400">Download and generate constituency reports</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60">
          <Plus size={16} aria-hidden /> Generate Report
        </button>
      </motion.div>

      {/* Quick generate cards */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        aria-labelledby="quick-gen-heading"
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 id="quick-gen-heading" className="mb-4 text-sm font-semibold text-white">Quick Generate</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(reportTypeConfig).map(([type, cfg]) => (
            <button
              key={type}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all hover:opacity-80",
                cfg.color
              )}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Reports table */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        aria-labelledby="reports-table-heading"
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
      >
        <div className="border-b border-white/[0.06] px-5 py-4">
          <h2 id="reports-table-heading" className="text-sm font-semibold text-white">Generated Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]" role="table">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Report Name", "Type", "Period", "Generated", "Format", "Size", "Action"].map((h) => (
                  <th key={h} scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {mockMpReports.map((r, i) => {
                const typeCfg = reportTypeConfig[r.type];
                return (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{r.title}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold", typeCfg.color)}>
                        {typeCfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400">{r.period}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} aria-hidden />
                        {new Date(r.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        {formatIcon[r.format]} {r.format}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{r.size}</td>
                    <td className="px-5 py-4">
                      <button className="inline-flex items-center gap-1.5 rounded-lg bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-400 hover:bg-violet-500/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50">
                        <Download size={12} aria-hidden /> Download
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}
