"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "../../../components/citizen/complaints/StatusBadge";
import { mockMpComplaints } from "../../../lib/mpMockData";
import type { ComplaintStatus, ComplaintPriority } from "../../../types/complaint";

const statusOptions: { value: ComplaintStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "submitted", label: "Submitted" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

const priorityOptions: { value: ComplaintPriority | "all"; label: string }[] = [
  { value: "all", label: "All Priority" },
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function MpComplaintsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<ComplaintPriority | "all">("all");

  const filtered = mockMpComplaints.filter((c) => {
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchPriority = priorityFilter === "all" || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const stats = {
    total: mockMpComplaints.length,
    resolved: mockMpComplaints.filter((c) => c.status === "resolved").length,
    pending: mockMpComplaints.filter((c) => c.status === "submitted" || c.status === "acknowledged").length,
    inProgress: mockMpComplaints.filter((c) => c.status === "in_progress").length,
  };

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
            <FileText size={20} className="text-violet-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Complaints</h1>
            <p className="mt-0.5 text-sm text-slate-400">Manage constituency complaints and grievances</p>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Total", value: stats.total, color: "text-white" },
          { label: "Resolved", value: stats.resolved, color: "text-emerald-400" },
          { label: "In Progress", value: stats.inProgress, color: "text-amber-400" },
          { label: "Pending", value: stats.pending, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search complaints, ticket numbers, locations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
            aria-label="Search complaints"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <Filter size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | "all")}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] pl-8 pr-8 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
            aria-label="Filter by status"
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>

        {/* Priority filter */}
        <div className="relative">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as ComplaintPriority | "all")}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-8 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
            aria-label="Filter by priority"
          >
            {priorityOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>
      </motion.div>

      {/* Complaints table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
      >
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FileText size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
            <p className="text-sm text-slate-500">No complaints match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]" role="table">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Ticket", "Title & Location", "Category", "Priority", "Status", "Date", "Action"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.04 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-violet-400">{c.ticketNumber}</span>
                    </td>
                    <td className="px-5 py-4 max-w-[220px]">
                      <p className="font-medium text-white truncate">{c.title}</p>
                      <p className="text-xs text-slate-500 truncate">{c.location}</p>
                    </td>
                    <td className="px-5 py-4 capitalize text-slate-400">{c.category}</td>
                    <td className="px-5 py-4"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/mp/complaints/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
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
          Showing {filtered.length} of {mockMpComplaints.length} complaints
        </p>
      )}
    </div>
  );
}
