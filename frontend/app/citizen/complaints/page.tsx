"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Filter, Search, FileText } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import ComplaintCard from "../../../components/citizen/complaints/ComplaintCard";
import EmptyState from "../../../components/citizen/shared/EmptyState";
import { mockComplaints } from "../../../lib/mockData";
import type { ComplaintStatus, ComplaintPriority, ComplaintCategory } from "../../../types/complaint";
import { cn } from "../../../utils/auth";

const statusOptions: { value: ComplaintStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "submitted", label: "Submitted" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

const categoryOptions: { value: ComplaintCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "water", label: "Water Supply" },
  { value: "electricity", label: "Electricity" },
  { value: "roads", label: "Roads" },
  { value: "sanitation", label: "Sanitation" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const selectCls = "h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-white outline-none transition-all hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20";

export default function ComplaintsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | "all">("all");

  const filtered = useMemo(() => {
    return mockComplaints.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.ticketNumber.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchCategory = categoryFilter === "all" || c.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6 max-w-[1200px]">
      <PageHeader
        title="My Complaints"
        subtitle={`${mockComplaints.length} total complaints`}
        actions={
          <Link
            href="/citizen/complaints/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            <Plus size={16} aria-hidden />
            New Complaint
          </Link>
        }
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search by title or ticket number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(selectCls, "w-full pl-9")}
            aria-label="Search complaints"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | "all")}
          className={selectCls}
          aria-label="Filter by status"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as ComplaintCategory | "all")}
          className={selectCls}
          aria-label="Filter by category"
        >
          {categoryOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Results count */}
      <p className="text-sm text-slate-500" aria-live="polite">
        Showing {filtered.length} of {mockComplaints.length} complaints
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((c, i) => (
            <ComplaintCard key={c.id} complaint={c} delay={i * 0.06} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileText size={28} />}
          title="No complaints found"
          description="Try adjusting your search filters or file a new complaint."
          action={
            <Link
              href="/citizen/complaints/new"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 transition-colors"
            >
              <Plus size={15} />
              File New Complaint
            </Link>
          }
        />
      )}
    </div>
  );
}
