"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Search, ChevronDown, ArrowRight, Filter } from "lucide-react";
import { MpBadge } from "../../../components/mp/shared/MpBadge";
import { mockAdminUsers } from "../../../lib/adminMockData";
import type { UserStatus, UserType } from "../../../types/admin";
import { cn } from "../../../utils/auth";

const statusOptions: { value: UserStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
  { value: "pending", label: "Pending" },
];

const typeOptions: { value: UserType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "citizen", label: "Citizen" },
  { value: "mp", label: "MP" },
  { value: "officer", label: "Officer" },
  { value: "admin", label: "Admin" },
];

const statusVariant: Record<UserStatus, "emerald" | "slate" | "rose" | "amber"> = {
  active: "emerald",
  inactive: "slate",
  suspended: "rose",
  pending: "amber",
};

const typeVariant: Record<UserType, "blue" | "violet" | "cyan" | "amber"> = {
  citizen: "blue",
  mp: "violet",
  officer: "cyan",
  admin: "amber",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<UserType | "all">("all");

  const filtered = mockAdminUsers.filter((u) => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.district.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchType = typeFilter === "all" || u.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const stats = {
    total: mockAdminUsers.length,
    active: mockAdminUsers.filter((u) => u.status === "active").length,
    suspended: mockAdminUsers.filter((u) => u.status === "suspended").length,
    pending: mockAdminUsers.filter((u) => u.status === "pending").length,
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
          <Users size={20} className="text-blue-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Users</h1>
          <p className="mt-0.5 text-sm text-slate-400">Manage platform users across all roles</p>
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
          { label: "Total", value: stats.total, color: "text-white" },
          { label: "Active", value: stats.active, color: "text-emerald-400" },
          { label: "Suspended", value: stats.suspended, color: "text-rose-400" },
          { label: "Pending", value: stats.pending, color: "text-amber-400" },
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
            placeholder="Search by name, email, district…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search users"
          />
        </div>
        {[
          { value: statusFilter, onChange: (v: string) => setStatusFilter(v as UserStatus | "all"), options: statusOptions, label: "Filter by status" },
          { value: typeFilter, onChange: (v: string) => setTypeFilter(v as UserType | "all"), options: typeOptions, label: "Filter by type" },
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

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
      >
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
            <p className="text-sm text-slate-500">No users match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]" role="table">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["User", "Type", "District", "Complaints", "Status", "Verified", "Action"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 border border-blue-500/15 text-xs font-bold text-blue-400">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <MpBadge label={u.type} variant={typeVariant[u.type]} />
                    </td>
                    <td className="px-5 py-4 text-slate-400">{u.district}</td>
                    <td className="px-5 py-4 text-slate-300">
                      {u.totalComplaints > 0 ? `${u.resolvedComplaints}/${u.totalComplaints}` : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <MpBadge label={u.status} variant={statusVariant[u.status]} dot />
                    </td>
                    <td className="px-5 py-4">
                      {u.isVerified
                        ? <span className="text-emerald-400 text-xs font-semibold">✓ Verified</span>
                        : <span className="text-slate-600 text-xs">Unverified</span>}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View <ArrowRight size={12} aria-hidden />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {filtered.length > 0 && (
        <p className="text-xs text-slate-600 text-right">
          Showing {filtered.length} of {mockAdminUsers.length} users
        </p>
      )}
    </div>
  );
}
