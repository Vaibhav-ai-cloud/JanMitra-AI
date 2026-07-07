"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Users } from "lucide-react";
import { MpBadge } from "../../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../../components/mp/shared/MpChart";
import { mockAdminSchemes } from "../../../../lib/adminMockData";
import type { SchemeStatus } from "../../../../types/admin";

interface PageProps { params: { id: string } }

const statusVariant: Record<SchemeStatus, "emerald" | "slate" | "amber" | "blue"> = {
  active: "emerald", draft: "slate", closed: "amber", pending: "blue",
};

export default function SchemeDetailPage({ params }: PageProps) {
  const scheme = mockAdminSchemes.find((s) => s.id === params.id);
  if (!scheme) notFound();

  const coveragePct = Math.round((scheme.actualBeneficiaries / Math.max(scheme.targetBeneficiaries, 1)) * 100);
  const approvalPct = Math.round((scheme.approvedApplications / Math.max(scheme.totalApplications, 1)) * 100);
  const budgetPct = scheme.budget > 0 ? Math.round((scheme.disbursed / scheme.budget) * 100) : 0;

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/admin/schemes" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} aria-hidden /> Back to Schemes
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <MpBadge label={scheme.shortTitle} variant="blue" />
            <MpBadge label={scheme.status} variant={statusVariant[scheme.status]} dot />
            <MpBadge label={scheme.category} variant="slate" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{scheme.title}</h1>
          <p className="text-sm text-slate-400 mb-3">{scheme.ministry}</p>
          <p className="text-sm text-slate-300 leading-relaxed">{scheme.description}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar size={12} aria-hidden />Launch: {new Date(scheme.launchDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            {scheme.deadlineDate && <span className="flex items-center gap-1.5"><Calendar size={12} aria-hidden />Deadline: {new Date(scheme.deadlineDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/[0.08] transition-colors">Edit Scheme</button>
            <button className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors">Archive</button>
          </div>
        </div>
      </motion.div>

      {/* Application stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Total Applications", value: scheme.totalApplications.toLocaleString(), color: "text-white" },
          { label: "Approved", value: scheme.approvedApplications.toLocaleString(), color: "text-emerald-400" },
          { label: "Pending", value: scheme.pendingApplications.toLocaleString(), color: "text-amber-400" },
          { label: "Rejected", value: scheme.rejectedApplications.toLocaleString(), color: "text-rose-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
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
          <Users size={14} className="text-violet-400" aria-hidden /> Coverage & Performance
        </h2>
        {[
          { label: `Beneficiary Coverage (${scheme.actualBeneficiaries.toLocaleString()} / ${scheme.targetBeneficiaries.toLocaleString()})`, value: coveragePct, color: "#8b5cf6" },
          { label: `Approval Rate (${scheme.approvedApplications.toLocaleString()} approved)`, value: approvalPct, color: "#22d3ee" },
          ...(scheme.budget > 0 ? [{ label: `Budget Utilized (₹${(scheme.disbursed / 10000000).toFixed(0)}Cr of ₹${(scheme.budget / 10000000).toFixed(0)}Cr)`, value: budgetPct, color: "#10b981" }] : []),
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

      {/* Scheme Details */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
          <BookOpen size={14} className="text-blue-400" aria-hidden /> Scheme Details
        </h2>
        <dl className="grid gap-y-3 sm:grid-cols-2">
          {[
            { label: "Scheme ID", value: scheme.id },
            { label: "Ministry", value: scheme.ministry },
            { label: "Category", value: scheme.category },
            { label: "Created By", value: scheme.createdBy },
            { label: "Last Updated", value: new Date(scheme.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
            { label: "Budget", value: scheme.budget > 0 ? `₹${(scheme.budget / 10000000000).toFixed(1)}B` : "TBD" },
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
