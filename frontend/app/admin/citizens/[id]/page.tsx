"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { MpBadge } from "../../../../components/mp/shared/MpBadge";
import { mockAdminUsers } from "../../../../lib/adminMockData";

interface PageProps { params: { id: string } }

export default function CitizenDetailPage({ params }: PageProps) {
  const citizen = mockAdminUsers.find((u) => u.id === params.id && u.type === "citizen");
  if (!citizen) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/admin/citizens" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} aria-hidden /> Back to Citizens
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-400 text-3xl font-bold text-white border-2 border-cyan-500/30 shadow-xl shadow-cyan-500/20">
            {citizen.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{citizen.name}</h1>
              <MpBadge label={citizen.status} variant={citizen.status === "active" ? "emerald" : citizen.status === "suspended" ? "rose" : citizen.status === "pending" ? "amber" : "slate"} dot />
              {citizen.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <CheckCircle2 size={10} aria-hidden /> Verified
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400">Citizen · {citizen.district}, {citizen.state}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Mail size={12} aria-hidden />{citizen.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={12} aria-hidden />{citizen.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} aria-hidden />{citizen.district}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Total Complaints", value: citizen.totalComplaints, color: "text-white" },
          { label: "Resolved", value: citizen.resolvedComplaints, color: "text-emerald-400" },
          { label: "Applications", value: citizen.totalApplications, color: "text-cyan-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Account details */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white">Account Details</h2>
        <dl className="grid gap-y-3 sm:grid-cols-2">
          {[
            { label: "User ID", value: citizen.id },
            { label: "District", value: citizen.district },
            { label: "State", value: citizen.state },
            { label: "Verification", value: citizen.isVerified ? "Verified" : "Not Verified" },
            { label: "Joined", value: new Date(citizen.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
            { label: "Last Active", value: new Date(citizen.lastActive).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
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
