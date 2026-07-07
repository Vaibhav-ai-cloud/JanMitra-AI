"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, TrendingUp } from "lucide-react";
import { MpBadge } from "../../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../../components/mp/shared/MpChart";
import { mockAdminMps } from "../../../../lib/adminMockData";
import type { UserStatus } from "../../../../types/admin";

interface PageProps { params: { id: string } }

const statusVariant: Record<UserStatus, "emerald" | "slate" | "rose" | "amber"> = {
  active: "emerald", inactive: "slate", suspended: "rose", pending: "amber",
};

export default function MpDetailPage({ params }: PageProps) {
  const mp = mockAdminMps.find((m) => m.id === params.id);
  if (!mp) notFound();

  const resolutionRate = Math.round((mp.resolvedComplaints / Math.max(mp.totalComplaints, 1)) * 100);
  const projectCompletionRate = Math.round((mp.completedProjects / Math.max(mp.totalProjects, 1)) * 100);
  const budgetUtilization = Math.round((mp.spentBudget / Math.max(mp.budget, 1)) * 100);

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/admin/mps" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} aria-hidden /> Back to MPs
        </Link>
      </motion.div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-400 text-3xl font-bold text-white border-2 border-violet-500/30 shadow-xl shadow-violet-500/20">
            {mp.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{mp.name}</h1>
              <MpBadge label={mp.party} variant="violet" />
              <MpBadge label={mp.status} variant={statusVariant[mp.status]} dot />
            </div>
            <p className="text-slate-400 text-sm">MP · {mp.constituency}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Mail size={12} aria-hidden /> {mp.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={12} aria-hidden /> {mp.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} aria-hidden /> {mp.state}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/[0.08] transition-colors">Edit</button>
            <button className="rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-2 text-sm font-medium text-violet-400 hover:bg-violet-500/20 transition-colors">Message</button>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Attendance", value: `${mp.attendanceRate}%`, color: mp.attendanceRate >= 80 ? "text-emerald-400" : "text-amber-400" },
          { label: "Questions Raised", value: mp.questionsRaised, color: "text-blue-400" },
          { label: "Total Projects", value: mp.totalProjects, color: "text-violet-400" },
          { label: "Completed", value: mp.completedProjects, color: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Progress bars */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4"
      >
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <TrendingUp size={14} className="text-violet-400" aria-hidden /> Performance Overview
        </h2>
        {[
          { label: "Complaint Resolution Rate", value: resolutionRate, color: "#8b5cf6" },
          { label: "Project Completion Rate", value: projectCompletionRate, color: "#3b82f6" },
          { label: "Budget Utilization", value: budgetUtilization, color: "#22d3ee" },
          { label: "Attendance Rate", value: mp.attendanceRate, color: "#10b981" },
        ].map((p) => (
          <div key={p.label}>
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>{p.label}</span>
              <span className="font-semibold text-white">{p.value}%</span>
            </div>
            <ProgressBar value={p.value} color={p.color} showLabel={false} />
          </div>
        ))}
      </motion.div>

      {/* Budget Details */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
          <Briefcase size={14} className="text-blue-400" aria-hidden /> Budget Information
        </h2>
        <dl className="grid gap-y-3 sm:grid-cols-2">
          {[
            { label: "Total Allocated", value: `₹${(mp.budget / 10000000).toFixed(0)} Cr` },
            { label: "Amount Spent", value: `₹${(mp.spentBudget / 10000000).toFixed(1)} Cr` },
            { label: "Term Start", value: new Date(mp.termStart).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
            { label: "Term End", value: new Date(mp.termEnd).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
            { label: "Total Complaints", value: mp.totalComplaints.toLocaleString() },
            { label: "Resolved Complaints", value: mp.resolvedComplaints.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">{label}</dt>
              <dd className="text-sm text-slate-300">{value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  );
}
