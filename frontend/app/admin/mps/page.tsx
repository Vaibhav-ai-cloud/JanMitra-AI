"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserCheck, Search, ArrowRight, ChevronDown } from "lucide-react";
import { MpBadge } from "../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../components/mp/shared/MpChart";
import { mockAdminMps } from "../../../lib/adminMockData";
import type { UserStatus } from "../../../types/admin";

const statusVariant: Record<UserStatus, "emerald" | "slate" | "rose" | "amber"> = {
  active: "emerald", inactive: "slate", suspended: "rose", pending: "amber",
};

export default function AdminMpsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  const filtered = mockAdminMps.filter((m) => {
    const matchSearch = !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.constituency.toLowerCase().includes(search.toLowerCase()) ||
      m.party.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <UserCheck size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">MPs</h1>
          <p className="mt-0.5 text-sm text-slate-400">Manage Members of Parliament</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Total MPs", value: mockAdminMps.length, color: "text-white" },
          { label: "Active", value: mockAdminMps.filter((m) => m.status === "active").length, color: "text-emerald-400" },
          { label: "Avg Attendance", value: `${Math.round(mockAdminMps.reduce((s, m) => s + m.attendanceRate, 0) / mockAdminMps.length)}%`, color: "text-blue-400" },
          { label: "Total Projects", value: mockAdminMps.reduce((s, m) => s + m.totalProjects, 0), color: "text-violet-400" },
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
            placeholder="Search MPs by name, constituency, party…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search MPs"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-8 text-sm text-slate-300 outline-none focus:border-blue-500/50 cursor-pointer"
          >
            {(["all", "active", "inactive"] as const).map((v) => (
              <option key={v} value={v} className="bg-slate-900 capitalize">{v === "all" ? "All Status" : v.charAt(0).toUpperCase() + v.slice(1)}</option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>
      </motion.div>

      {/* MP Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {filtered.map((mp, i) => {
          const resolutionRate = Math.round((mp.resolvedComplaints / Math.max(mp.totalComplaints, 1)) * 100);
          const budgetPct = Math.round((mp.spentBudget / Math.max(mp.budget, 1)) * 100);
          return (
            <motion.article
              key={mp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.14] transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 text-lg font-bold text-violet-400">
                  {mp.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white truncate">{mp.name}</p>
                  <p className="text-xs text-slate-400">{mp.constituency} · {mp.party}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <MpBadge label={mp.status} variant={statusVariant[mp.status]} dot size="sm" />
                    <span className="text-xs text-slate-600">{mp.state}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Complaint Resolution</span>
                    <span className="font-semibold text-white">{resolutionRate}%</span>
                  </div>
                  <ProgressBar value={resolutionRate} color="#8b5cf6" showLabel={false} />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Budget Utilization</span>
                    <span className="font-semibold text-white">{budgetPct}%</span>
                  </div>
                  <ProgressBar value={budgetPct} color="#3b82f6" showLabel={false} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <p className="text-sm font-bold text-white">{mp.attendanceRate}%</p>
                  <p className="text-[10px] text-slate-600">Attend.</p>
                </div>
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <p className="text-sm font-bold text-violet-400">{mp.questionsRaised}</p>
                  <p className="text-[10px] text-slate-600">Questions</p>
                </div>
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <p className="text-sm font-bold text-blue-400">{mp.completedProjects}/{mp.totalProjects}</p>
                  <p className="text-[10px] text-slate-600">Projects</p>
                </div>
              </div>

              <Link
                href={`/admin/mps/${mp.id}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                View Profile <ArrowRight size={12} aria-hidden />
              </Link>
            </motion.article>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-16 text-center">
          <UserCheck size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
          <p className="text-sm text-slate-500">No MPs match your filters.</p>
        </div>
      )}
    </div>
  );
}
