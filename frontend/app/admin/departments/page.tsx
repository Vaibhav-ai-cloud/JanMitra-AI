"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Search, ArrowRight } from "lucide-react";
import { MpBadge } from "../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../components/mp/shared/MpChart";
import { mockDepartments } from "../../../lib/adminMockData";

export default function AdminDepartmentsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockDepartments.filter((d) =>
    !search ||
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase()) ||
    d.head.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20">
          <Building2 size={20} className="text-emerald-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Departments</h1>
          <p className="mt-0.5 text-sm text-slate-400">Government department performance overview</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
        <div className="relative max-w-md">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search departments…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search departments"
          />
        </div>
      </motion.div>

      {/* Department table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]" role="table">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Department", "Head", "Status", "Complaints", "Resolved", "Performance", "Avg. Days", "Action"].map((h) => (
                  <th key={h} scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((d, i) => (
                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/15 text-[10px] font-bold text-emerald-400">
                        {d.code}
                      </div>
                      <div>
                        <p className="font-medium text-white">{d.name}</p>
                        <p className="text-xs text-slate-500">{d.district}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">{d.head}</td>
                  <td className="px-5 py-4">
                    <MpBadge label={d.status} variant={d.status === "active" ? "emerald" : "slate"} dot />
                  </td>
                  <td className="px-5 py-4 text-slate-300">{d.totalComplaints.toLocaleString()}</td>
                  <td className="px-5 py-4 text-emerald-400 font-semibold">{d.resolvedComplaints.toLocaleString()}</td>
                  <td className="px-5 py-4 w-36">
                    <div className="space-y-1">
                      <ProgressBar
                        value={d.performanceScore}
                        color={d.performanceScore >= 85 ? "#10b981" : d.performanceScore >= 80 ? "#3b82f6" : "#f59e0b"}
                        showLabel={false}
                      />
                      <span className={`text-xs font-semibold ${d.performanceScore >= 85 ? "text-emerald-400" : d.performanceScore >= 80 ? "text-blue-400" : "text-amber-400"}`}>
                        {d.performanceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{d.avgResolutionDays}d</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/departments/${d.id}`}
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
      </motion.div>
    </div>
  );
}
