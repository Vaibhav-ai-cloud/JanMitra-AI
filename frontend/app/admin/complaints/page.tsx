"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Search, ArrowRight, ChevronDown, Filter } from "lucide-react";
import { StatusBadge, PriorityBadge } from "../../../components/citizen/complaints/StatusBadge";
import { mockComplaints } from "../../../lib/mockData";
import { mockMpComplaints } from "../../../lib/mpMockData";
import type { ComplaintStatus, ComplaintPriority } from "../../../types/complaint";

// Combine all complaints for admin view
const allComplaints = [...mockComplaints, ...mockMpComplaints];

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

export default function AdminComplaintsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<ComplaintPriority | "all">("all");

  const filtered = allComplaints.filter((c) => {
    const matchSearch = !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchPriority = priorityFilter === "all" || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const stats = {
    total: allComplaints.length,
    resolved: allComplaints.filter((c) => c.status === "resolved").length,
    inProgress: allComplaints.filter((c) => c.status === "in_progress").length,
    pending: allComplaints.filter((c) => c.status === "submitted" || c.status === "acknowledged").length,
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
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/20">
          <FileText size={20} className="text-amber-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Complaints</h1>
          <p className="mt-0.5 text-sm text-slate-400">System-wide complaint management</p>
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
            placeholder="Search complaints, tickets, departments, districts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search complaints"
          />
        </div>
        {[
          { value: statusFilter, onChange: (v: string) => setStatusFilter(v as ComplaintStatus | "all"), options: statusOptions, label: "Filter by status" },
          { value: priorityFilter, onChange: (v: string) => setPriorityFilter(v as ComplaintPriority | "all"), options: priorityOptions, label: "Filter by priority" },
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
            <FileText size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
            <p className="text-sm text-slate-500">No complaints match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]" role="table">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Ticket", "Title & Location", "Department", "Priority", "Status", "Date", "Action"].map((h) => (
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
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-amber-400">{c.ticketNumber}</span>
                    </td>
                    <td className="px-5 py-4 max-w-[200px]">
                      <p className="font-medium text-white truncate">{c.title}</p>
                      <p className="text-xs text-slate-500 truncate">{c.district}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{c.department}</td>
                    <td className="px-5 py-4"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/complaints/${c.id}`}
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
          Showing {filtered.length} of {allComplaints.length} complaints
        </p>
      )}
    </div>
  );
}
