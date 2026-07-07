"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Plus,
  ChevronDown,
  ArrowRight,
  MapPin,
  Users,
} from "lucide-react";
import { ProjectStatusBadge } from "../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../components/mp/shared/MpChart";
import { mockProjects } from "../../../lib/mpMockData";
import type { ProjectStatus, ProjectCategory } from "../../../types/mp";
import { cn } from "../../../utils/auth";

const statusOptions: { value: ProjectStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "planned", label: "Planned" },
  { value: "tender", label: "Tender" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "delayed", label: "Delayed" },
  { value: "cancelled", label: "Cancelled" },
];

const categoryOptions: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "roads", label: "Roads" },
  { value: "water", label: "Water" },
  { value: "electricity", label: "Electricity" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "sanitation", label: "Sanitation" },
];

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function MpProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | "all">("all");

  const filtered = mockProjects.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const totals = {
    total: mockProjects.length,
    ongoing: mockProjects.filter((p) => p.status === "ongoing").length,
    completed: mockProjects.filter((p) => p.status === "completed").length,
    delayed: mockProjects.filter((p) => p.status === "delayed").length,
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
            <Briefcase size={20} className="text-violet-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Projects</h1>
            <p className="mt-0.5 text-sm text-slate-400">Infrastructure and development projects in your constituency</p>
          </div>
        </div>
        <Link
          href="/mp/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
        >
          <Plus size={16} aria-hidden /> New Project
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Total", value: totals.total, color: "text-white" },
          { label: "Ongoing", value: totals.ongoing, color: "text-blue-400" },
          { label: "Completed", value: totals.completed, color: "text-emerald-400" },
          { label: "Delayed", value: totals.delayed, color: "text-amber-400" },
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
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
            aria-label="Search projects"
          />
        </div>
        {[
          { value: statusFilter, onChange: setStatusFilter, options: statusOptions, label: "Filter by status" },
          { value: categoryFilter, onChange: setCategoryFilter, options: categoryOptions, label: "Filter by category" },
        ].map((sel, idx) => (
          <div key={idx} className="relative">
            <select
              value={sel.value}
              onChange={(e) => sel.onChange(e.target.value as ProjectStatus & ProjectCategory & "all")}
              className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-8 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
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

      {/* Projects grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-16 text-center">
          <Briefcase size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
          <p className="text-sm text-slate-500">No projects match your filters.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.14] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <ProjectStatusBadge status={project.status} />
                  <h2 className="mt-2 text-sm font-semibold text-white leading-snug line-clamp-2">
                    {project.title}
                  </h2>
                </div>
                <span className="shrink-0 text-xs font-bold text-violet-400">{fmt(project.budget)}</span>
              </div>

              <div className="mb-4 space-y-1.5 text-xs text-slate-500">
                <p className="flex items-center gap-1.5">
                  <MapPin size={11} aria-hidden /> {project.location}
                </p>
                <p className="flex items-center gap-1.5">
                  <Users size={11} aria-hidden /> {project.beneficiaries.toLocaleString()} beneficiaries
                </p>
              </div>

              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span className="font-semibold text-white">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} color={
                  project.status === "completed" ? "#10b981"
                  : project.status === "delayed" ? "#f59e0b"
                  : "#8b5cf6"
                } showLabel={false} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 capitalize">{project.category} · {project.fundSource}</span>
                <Link
                  href={`/mp/projects/${project.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Details <ArrowRight size={12} aria-hidden />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {filtered.length > 0 && (
        <p className="text-xs text-slate-600 text-right">
          Showing {filtered.length} of {mockProjects.length} projects
        </p>
      )}
    </div>
  );
}
