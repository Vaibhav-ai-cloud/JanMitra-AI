"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, ChevronDown, Phone, Mail, MapPin, FileText } from "lucide-react";
import { mockMpCitizens } from "../../../lib/mpMockData";
import type { MpCitizen } from "../../../types/mp";
import { cn } from "../../../utils/auth";

type CategoryFilter = MpCitizen["category"] | "all";

const categoryOptions: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
];

const categoryColors: Record<MpCitizen["category"], string> = {
  general: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  obc: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  sc: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  st: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

export default function MpCitizensPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filtered = mockMpCitizens.filter((c) => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.village.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const stats = {
    total: mockMpCitizens.length,
    general: mockMpCitizens.filter((c) => c.category === "general").length,
    obc: mockMpCitizens.filter((c) => c.category === "obc").length,
    sc: mockMpCitizens.filter((c) => c.category === "sc").length,
    st: mockMpCitizens.filter((c) => c.category === "st").length,
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
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <Users size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Citizens</h1>
          <p className="mt-0.5 text-sm text-slate-400">Registered citizens in your constituency</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid grid-cols-3 gap-3 sm:grid-cols-5"
      >
        {[
          { label: "Total", value: stats.total, color: "text-white" },
          { label: "General", value: stats.general, color: "text-blue-400" },
          { label: "OBC", value: stats.obc, color: "text-violet-400" },
          { label: "SC", value: stats.sc, color: "text-amber-400" },
          { label: "ST", value: stats.st, color: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{s.label}</p>
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
            placeholder="Search by name, phone, village…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
            aria-label="Search citizens"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-8 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
            aria-label="Filter by category"
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>
      </motion.div>

      {/* Citizens grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-16 text-center">
          <Users size={36} className="mx-auto mb-3 text-slate-700" aria-hidden />
          <p className="text-sm text-slate-500">No citizens match your filters.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((citizen, i) => (
            <motion.article
              key={citizen.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.14] transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 text-sm font-bold text-violet-400">
                  {citizen.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white truncate">{citizen.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase", categoryColors[citizen.category])}>
                      {citizen.category}
                    </span>
                    <span className="text-xs text-slate-500">{citizen.gender} · {citizen.age} yrs</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                <p className="flex items-center gap-1.5"><Phone size={11} aria-hidden /> {citizen.phone}</p>
                {citizen.email && <p className="flex items-center gap-1.5"><Mail size={11} aria-hidden /> {citizen.email}</p>}
                <p className="flex items-center gap-1.5"><MapPin size={11} aria-hidden /> {citizen.village}{citizen.ward ? `, ${citizen.ward}` : ""}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <p className="text-sm font-bold text-white">{citizen.totalComplaints}</p>
                  <p className="text-[10px] text-slate-600">Complaints</p>
                </div>
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <p className="text-sm font-bold text-amber-400">{citizen.pendingComplaints}</p>
                  <p className="text-[10px] text-slate-600">Pending</p>
                </div>
                <div className="rounded-lg bg-white/[0.04] p-2">
                  <p className="text-sm font-bold text-emerald-400">{citizen.schemesBenefited}</p>
                  <p className="text-[10px] text-slate-600">Schemes</p>
                </div>
              </div>

              <p className="mt-3 text-[10px] text-slate-600 text-right">
                Last active: {new Date(citizen.lastActive).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
            </motion.article>
          ))}
        </motion.div>
      )}

      {filtered.length > 0 && (
        <p className="text-xs text-slate-600 text-right">
          Showing {filtered.length} of {mockMpCitizens.length} citizens
        </p>
      )}
    </div>
  );
}
