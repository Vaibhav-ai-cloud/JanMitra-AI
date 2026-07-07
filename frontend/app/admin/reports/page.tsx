"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileBarChart,
  Download,
  Search,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  Calendar,
} from "lucide-react";
import { mockAdminReports } from "../../../lib/adminMockData";
import type { ReportPeriod, ReportFormat } from "../../../types/admin";

const periodOptions: { value: ReportPeriod | "all"; label: string }[] = [
  { value: "all", label: "All Periods" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

const formatOptions: { value: ReportFormat | "all"; label: string }[] = [
  { value: "all", label: "All Formats" },
  { value: "PDF", label: "PDF" },
  { value: "Excel", label: "Excel" },
  { value: "CSV", label: "CSV" },
];

const formatIcon = (format: ReportFormat) => {
  switch (format) {
    case "PDF": return <FileText size={14} className="text-red-400" aria-hidden />;
    case "Excel": return <FileSpreadsheet size={14} className="text-emerald-400" aria-hidden />;
    case "CSV": return <FileText size={14} className="text-amber-400" aria-hidden />;
  }
};

const formatBg = (format: ReportFormat) => {
  switch (format) {
    case "PDF": return "border-red-500/20 bg-red-500/10 text-red-400";
    case "Excel": return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    case "CSV": return "border-amber-500/20 bg-amber-500/10 text-amber-400";
  }
};

const categoryColors: Record<string, string> = {
  System: "text-blue-400",
  Users: "text-violet-400",
  Complaints: "text-amber-400",
  Schemes: "text-emerald-400",
  Departments: "text-cyan-400",
  Finance: "text-rose-400",
};

// Mock quick-generate report types
const reportTemplates = [
  { id: "rt1", title: "User Growth Report", description: "Monthly user registrations and activity", icon: "👥", color: "blue" },
  { id: "rt2", title: "Complaint Analysis", description: "Resolution rates and department performance", icon: "📋", color: "amber" },
  { id: "rt3", title: "Scheme Coverage", description: "Beneficiary reach and disbursement stats", icon: "📖", color: "emerald" },
  { id: "rt4", title: "AI Performance", description: "Chatbot interactions and resolution rate", icon: "🤖", color: "cyan" },
  { id: "rt5", title: "Financial Summary", description: "Budget utilization across schemes", icon: "💰", color: "rose" },
  { id: "rt6", title: "Department Audit", description: "Complaint resolution time and scores", icon: "🏛️", color: "violet" },
];

export default function AdminReportsPage() {
  const [search, setSearch] = useState("");
  const [periodFilter, setPeriodFilter] = useState<ReportPeriod | "all">("all");
  const [formatFilter, setFormatFilter] = useState<ReportFormat | "all">("all");
  const [generating, setGenerating] = useState<string | null>(null);

  const filtered = mockAdminReports.filter((r) => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
    const matchPeriod = periodFilter === "all" || r.period === periodFilter;
    const matchFormat = formatFilter === "all" || r.format === formatFilter;
    return matchSearch && matchPeriod && matchFormat;
  });

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => setGenerating(null), 1800);
  };

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 border border-rose-500/20">
          <FileBarChart size={20} className="text-rose-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Reports</h1>
          <p className="mt-0.5 text-sm text-slate-400">Generate and download system-wide reports</p>
        </div>
      </motion.div>

      {/* Quick Generate Panel */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        aria-labelledby="quick-gen-heading"
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <h2 id="quick-gen-heading" className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
          <RefreshCw size={14} className="text-rose-400" aria-hidden />
          Quick Generate
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((tpl) => (
            <motion.div
              key={tpl.id}
              whileHover={{ scale: 1.01 }}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="text-2xl">{tpl.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{tpl.title}</p>
                <p className="text-[11px] text-slate-500 truncate">{tpl.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleGenerate(tpl.id)}
                disabled={generating === tpl.id}
                className="shrink-0 flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-60"
                aria-label={`Generate ${tpl.title}`}
              >
                {generating === tpl.id ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border border-slate-500 border-t-white" aria-hidden />
                    Generating…
                  </>
                ) : (
                  <>
                    <Download size={12} aria-hidden />
                    Generate
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Archive Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search reports by title or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search reports"
          />
        </div>
        {[
          { value: periodFilter, onChange: (v: string) => setPeriodFilter(v as ReportPeriod | "all"), options: periodOptions, label: "Filter by period" },
          { value: formatFilter, onChange: (v: string) => setFormatFilter(v as ReportFormat | "all"), options: formatOptions, label: "Filter by format" },
        ].map((sel, idx) => (
          <div key={idx} className="relative">
            <Filter size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
            <select
              value={sel.value}
              onChange={(e) => sel.onChange(e.target.value)}
              className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] pl-8 pr-8 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
              aria-label={sel.label}
            >
              {sel.options.map((o) => (
                <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          </div>
        ))}
      </motion.div>

      {/* Report Archive Table */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        aria-labelledby="archive-heading"
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
      >
        <div className="border-b border-white/[0.06] px-6 py-4">
          <h2 id="archive-heading" className="text-sm font-semibold text-white flex items-center gap-2">
            <Calendar size={14} className="text-slate-400" aria-hidden />
            Report Archive
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FileBarChart size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
            <p className="text-sm text-slate-500">No reports match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]" role="table">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Report", "Category", "Period", "Format", "Size", "Generated", "Action"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((report, i) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-4 max-w-[220px]">
                      <p className="font-medium text-white truncate">{report.title}</p>
                      <p className="text-xs text-slate-500">{report.periodLabel}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold ${categoryColors[report.category] ?? "text-slate-400"}`}>
                        {report.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 capitalize">{report.period}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${formatBg(report.format)}`}>
                        {formatIcon(report.format)}
                        {report.format}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">{report.size}</td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {new Date(report.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label={`Download ${report.title}`}
                      >
                        <Download size={12} aria-hidden />
                        Download
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {filtered.length > 0 && (
        <p className="text-xs text-slate-600 text-right">
          Showing {filtered.length} of {mockAdminReports.length} reports
        </p>
      )}
    </div>
  );
}
