"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { MpBadge } from "../../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../../components/mp/shared/MpChart";
import { mockDepartments } from "../../../../lib/adminMockData";

interface PageProps { params: { id: string } }

export default function DepartmentDetailPage({ params }: PageProps) {
  const dept = mockDepartments.find((d) => d.id === params.id);
  if (!dept) notFound();

  const resolutionRate = Math.round((dept.resolvedComplaints / Math.max(dept.totalComplaints, 1)) * 100);

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} aria-hidden /> Back to Departments
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-400 text-lg font-bold text-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/20">
            {dept.code}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{dept.name}</h1>
              <MpBadge label={dept.status} variant={dept.status === "active" ? "emerald" : "slate"} dot />
            </div>
            <p className="text-sm text-slate-400">Head: {dept.head}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Mail size={12} aria-hidden />{dept.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={12} aria-hidden />{dept.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} aria-hidden />{dept.district}, {dept.state}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Total Complaints", value: dept.totalComplaints.toLocaleString(), color: "text-white" },
          { label: "Resolved", value: dept.resolvedComplaints.toLocaleString(), color: "text-emerald-400" },
          { label: "Pending", value: dept.pendingComplaints.toLocaleString(), color: "text-amber-400" },
          { label: "Avg. Days", value: `${dept.avgResolutionDays}d`, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Performance */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4"
      >
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Building2 size={14} className="text-emerald-400" aria-hidden /> Performance Metrics
        </h2>
        {[
          { label: "Overall Performance Score", value: dept.performanceScore, color: dept.performanceScore >= 85 ? "#10b981" : "#f59e0b" },
          { label: "Complaint Resolution Rate", value: resolutionRate, color: "#3b82f6" },
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

      {/* Assigned Complaints */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white">Complaint Summary</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Resolved", value: dept.resolvedComplaints, pct: resolutionRate, color: "text-emerald-400", bar: "#10b981" },
            { label: "Pending", value: dept.pendingComplaints, pct: Math.round((dept.pendingComplaints / Math.max(dept.totalComplaints, 1)) * 100), color: "text-amber-400", bar: "#f59e0b" },
            { label: "Avg Days", value: `${dept.avgResolutionDays}d`, pct: Math.min(dept.avgResolutionDays * 5, 100), color: "text-blue-400", bar: "#3b82f6" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
              <p className="text-[10px] text-slate-600 mb-2">{item.label}</p>
              <ProgressBar value={item.pct} color={item.bar} showLabel={false} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
