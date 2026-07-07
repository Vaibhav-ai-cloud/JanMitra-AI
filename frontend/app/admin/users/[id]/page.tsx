"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Activity, CheckCircle2 } from "lucide-react";
import { MpBadge } from "../../../../components/mp/shared/MpBadge";
import { mockAdminUsers } from "../../../../lib/adminMockData";
import type { UserStatus, UserType } from "../../../../types/admin";

interface PageProps { params: { id: string } }

const statusVariant: Record<UserStatus, "emerald" | "slate" | "rose" | "amber"> = {
  active: "emerald", inactive: "slate", suspended: "rose", pending: "amber",
};
const typeVariant: Record<UserType, "blue" | "violet" | "cyan" | "amber"> = {
  citizen: "blue", mp: "violet", officer: "cyan", admin: "amber",
};

export default function UserDetailPage({ params }: PageProps) {
  const user = mockAdminUsers.find((u) => u.id === params.id);
  if (!user) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors rounded-lg">
          <ArrowLeft size={16} aria-hidden /> Back to Users
        </Link>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-bold text-white border-2 border-blue-500/30 shadow-xl shadow-blue-500/20">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <MpBadge label={user.type} variant={typeVariant[user.type]} />
              <MpBadge label={user.status} variant={statusVariant[user.status]} dot />
              {user.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <CheckCircle2 size={10} aria-hidden /> Verified
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400">{user.role}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Mail size={12} aria-hidden /> {user.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={12} aria-hidden /> {user.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} aria-hidden /> {user.district}, {user.state}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/[0.08] transition-colors">
              Edit User
            </button>
            <button className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors">
              Suspend
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Total Complaints", value: user.totalComplaints, color: "text-white" },
          { label: "Resolved", value: user.resolvedComplaints, color: "text-emerald-400" },
          { label: "Applications", value: user.totalApplications, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white">Account Information</h2>
        <dl className="grid gap-y-3 sm:grid-cols-2">
          {[
            { label: "User ID", value: user.id },
            { label: "Account Type", value: user.type.charAt(0).toUpperCase() + user.type.slice(1) },
            { label: "District", value: user.district },
            { label: "State", value: user.state },
            { label: "Joined", value: new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
            { label: "Last Active", value: new Date(user.lastActive).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">{label}</dt>
              <dd className="text-sm text-slate-300">{value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* Admin Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
          <Shield size={14} className="text-blue-400" aria-hidden /> Admin Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors">
            Verify Account
          </button>
          <button className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 hover:bg-amber-500/20 transition-colors">
            Reset Password
          </button>
          <button className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors">
            Send Email
          </button>
          <button className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors">
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
