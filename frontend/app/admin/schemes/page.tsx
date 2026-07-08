"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Search, Plus, ArrowRight, ChevronDown } from "lucide-react";
import { MpBadge } from "../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../components/mp/shared/MpChart";
import { mockAdminSchemes } from "../../../lib/adminMockData";
import type { SchemeStatus } from "../../../types/admin";

const statusVariant: Record<SchemeStatus, "emerald" | "slate" | "amber" | "blue"> = {
  active: "emerald",
  draft: "slate",
  closed: "amber",
  pending: "blue",
};

export default function AdminSchemesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SchemeStatus | "all">("all");

  const filtered = mockAdminSchemes.filter((s) => {
    const matchSearch = !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.ministry.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

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
            <BookOpen size={20} className="text-violet-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Schemes</h1>
            <p className="mt-0.5 text-sm text-slate-400">Manage government schemes and beneficiary coverage</p>
          </div>
        </div>
        <Link
          href="/admin/schemes/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500/15 border border-blue-500/20 px-4 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-500/25 transition-colors"
        >
          <Plus size={16} aria-hidden />
          New Scheme
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Total", value: mockAdminSchemes.length, color: "text-white" },
          { label: "Active", value: mockAdminSchemes.filter((s) => s.status === "active").length, color: "text-emerald-400" },
          { label: "Draft", value: mockAdminSchemes.filter((s) => s.status === "draft").length, color: "text-slate-400" },
          { label: "Total Applications", value: mockAdminSchemes.reduce((sum, s) => sum + s.totalApplications, 0).toLocaleString(), color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
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
            placeholder="Search schemes by name, category, ministry…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search schemes"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SchemeStatus | "all")}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-8 text-sm text-slate-300 outline-none cursor-pointer"
          >
            {(["all", "active", "draft", "closed", "pending"] as const).map((v) => (
              <option key={v} value={v} className="bg-slate-900 capitalize">
                {v === "all" ? "All Status" : v.charAt(0).toUpperCase() + v.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>
      </motion.div>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filtered.map((s, i) => {
          const coveragePct = Math.round((s.actualBeneficiaries / Math.max(s.targetBeneficiaries, 1)) * 100);
          const approvalPct = Math.round((s.approvedApplications / Math.max(s.totalApplications, 1)) * 100);
          const budgetPct = Math.round((s.disbursed / Math.max(s.budget, 1)) * 100);
          return (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.14] transition-all"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                {/* Left: scheme info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <MpBadge label={s.shortTitle} variant="blue" />
                    <MpBadge label={s.status} variant={statusVariant[s.status]} dot />
                    <MpBadge label={s.category} variant="slate" />
                  </div>
                  <h2 className="text-base font-semibold text-white mt-1">{s.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{s.ministry}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{s.description}</p>
                </div>

                {/* Right: stats */}
                <div className="lg:w-80 shrink-0 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Beneficiary Coverage</span>
                      <span className="text-white font-semibold">{coveragePct}%</span>
                    </div>
                    <ProgressBar value={coveragePct} color="#8b5cf6" showLabel={false} />
                    <p className="text-[10px] text-slate-600 mt-0.5">{s.actualBeneficiaries.toLocaleString()} of {s.targetBeneficiaries.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Approval Rate</span>
                      <span className="text-white font-semibold">{approvalPct}%</span>
                    </div>
                    <ProgressBar value={approvalPct} color="#22d3ee" showLabel={false} />
                  </div>
                  {s.budget > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Budget Utilization</span>
                        <span className="text-white font-semibold">{budgetPct}%</span>
                      </div>
                      <ProgressBar value={budgetPct} color="#10b981" showLabel={false} />
                    </div>
                  )}
                  <Link
                    href={`/admin/schemes/${s.id}`}
                    className="mt-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    View Details <ArrowRight size={12} aria-hidden />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-16 text-center">
          <BookOpen size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
          <p className="text-sm text-slate-500">No schemes match your filters.</p>
        </div>
      )}
    </div>
  );
}
