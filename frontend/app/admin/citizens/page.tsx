"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserCog, Search, ArrowRight, ChevronDown } from "lucide-react";
import { MpBadge } from "../../../components/mp/shared/MpBadge";
import { mockAdminUsers } from "../../../lib/adminMockData";

export default function AdminCitizensPage() {
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  const citizens = mockAdminUsers.filter((u) => u.type === "citizen");
  const districts = Array.from(new Set(citizens.map((c) => c.district)));

  const filtered = citizens.filter((c) => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchDistrict = districtFilter === "all" || c.district === districtFilter;
    return matchSearch && matchDistrict;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/20">
          <UserCog size={20} className="text-cyan-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Citizens</h1>
          <p className="mt-0.5 text-sm text-slate-400">Directory of registered citizens</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search citizens by name, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            aria-label="Search citizens"
          />
        </div>
        <div className="relative">
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-8 text-sm text-slate-300 outline-none cursor-pointer"
          >
            <option value="all" className="bg-slate-900">All Districts</option>
            {districts.map((d) => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]" role="table">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Citizen", "District", "Complaints", "Applications", "Status", "Action"].map((h) => (
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
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/15 text-xs font-bold text-cyan-400">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{c.district}</td>
                  <td className="px-5 py-4 text-slate-300">{c.resolvedComplaints}/{c.totalComplaints}</td>
                  <td className="px-5 py-4 text-slate-300">{c.totalApplications}</td>
                  <td className="px-5 py-4">
                    <MpBadge
                      label={c.status}
                      variant={c.status === "active" ? "emerald" : c.status === "suspended" ? "rose" : c.status === "pending" ? "amber" : "slate"}
                      dot
                    />
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/citizens/${c.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
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

      <p className="text-xs text-slate-600 text-right">Showing {filtered.length} of {citizens.length} citizens</p>
    </div>
  );
}
