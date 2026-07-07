"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  ArrowRight,
  TrendingUp,
  Calendar,
  Landmark,
  BarChart3,
  BookOpen,
} from "lucide-react";
import MpStatCard from "../../../components/mp/shared/MpStatCard";
import { BarChart, ProgressBar } from "../../../components/mp/shared/MpChart";
import { ProjectStatusBadge } from "../../../components/mp/shared/MpBadge";
import { StatusBadge, PriorityBadge } from "../../../components/citizen/complaints/StatusBadge";
import {
  mockMpStats,
  mockMpComplaints,
  mockProjects,
  mockMonthlyMetrics,
  mockMpProfile,
  mockConstituencyStats,
  mockMpSchemeMetrics,
} from "../../../lib/mpMockData";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export default function MpDashboardPage() {
  const stats = mockMpStats;
  const resolutionRate = Math.round((stats.resolvedComplaints / stats.totalComplaints) * 100);
  const budgetUsedPct = Math.round((stats.spentBudget / stats.totalBudget) * 100);
  const recentMonths = mockMonthlyMetrics.slice(-6);

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
                <Landmark size={20} className="text-violet-400" aria-hidden />
              </div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">MP Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome, {mockMpProfile.name.split(" ")[0]} ji
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {mockMpProfile.constituency} Constituency · {mockMpProfile.state} · {mockMpProfile.party}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mp/complaints"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            >
              <FileText size={15} aria-hidden /> View Complaints
            </Link>
            <Link
              href="/mp/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <BarChart3 size={15} aria-hidden /> Analytics
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Constituency Statistics</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {[
            { label: "Total Complaints", value: stats.totalComplaints.toLocaleString(), icon: <FileText size={20} />, color: "violet" as const, trend: { value: 8, label: "vs last month" } },
            { label: "Resolved", value: stats.resolvedComplaints.toLocaleString(), icon: <CheckCircle2 size={20} />, color: "emerald" as const, trend: { value: 12, label: "resolution rate" } },
            { label: "Pending", value: stats.pendingComplaints.toLocaleString(), icon: <Clock size={20} />, color: "amber" as const },
            { label: "Active Projects", value: stats.ongoingProjects, icon: <Briefcase size={20} />, color: "blue" as const },
            { label: "Citizens Served", value: fmt(stats.totalCitizens).replace("₹",""), icon: <Users size={20} />, color: "cyan" as const, trend: { value: 15, label: "new this month" } },
            { label: "Budget Used", value: fmt(stats.spentBudget), icon: <TrendingUp size={20} />, color: "purple" as const },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={itemVariants} className="xl:col-span-1 sm:col-span-1">
              <MpStatCard {...stat} delay={i * 0.06} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main 2-column grid */}
      <div className="grid gap-8 xl:grid-cols-3">
        {/* Left: Charts + tables */}
        <div className="xl:col-span-2 space-y-8">
          {/* Complaints trend chart */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            aria-labelledby="complaints-chart-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 id="complaints-chart-heading" className="text-base font-semibold text-white">
                  Complaints Trend
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">Last 6 months — Filed vs Resolved</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-violet-500" aria-hidden /> Filed
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden /> Resolved
                </span>
              </div>
            </div>
            <BarChart
              data={recentMonths.map((m) => ({ label: m.month, value: m.complaints, value2: m.resolved }))}
              height={180}
              color="#8b5cf6"
              color2="#22d3ee"
            />
          </motion.section>

          {/* Recent complaints table */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            aria-labelledby="recent-complaints-heading"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="recent-complaints-heading" className="text-base font-semibold text-white">
                Recent Complaints
              </h2>
              <Link
                href="/mp/complaints"
                className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                View all <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Ticket</th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Issue</th>
                    <th scope="col" className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 sm:table-cell">Priority</th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {mockMpComplaints.slice(0, 4).map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-3.5">
                        <Link href={`/mp/complaints/${c.id}`} className="font-mono text-xs text-violet-400 hover:text-violet-300">
                          {c.ticketNumber}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 max-w-[200px]">
                        <p className="font-medium text-white truncate">{c.title}</p>
                        <p className="text-xs text-slate-500 truncate">{c.department}</p>
                      </td>
                      <td className="hidden px-5 py-3.5 sm:table-cell">
                        <PriorityBadge priority={c.priority} />
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Active projects */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            aria-labelledby="active-projects-heading"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="active-projects-heading" className="text-base font-semibold text-white">
                Active Projects
              </h2>
              <Link href="/mp/projects" className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
                View all <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
            <div className="space-y-3">
              {mockProjects.filter((p) => p.status === "ongoing" || p.status === "tender").map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/mp/projects/${p.id}`}
                        className="font-medium text-white hover:text-violet-300 transition-colors truncate block"
                      >
                        {p.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-slate-500">{p.location} · {fmt(p.budget)}</p>
                    </div>
                    <ProjectStatusBadge status={p.status} />
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={p.progress} color="#8b5cf6" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Resolution rate */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold text-white">Resolution Rate</h2>
            <div className="flex items-center justify-center">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="#8b5cf6" strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - resolutionRate / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">{resolutionRate}%</p>
                  <p className="text-[10px] text-slate-500">resolved</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold text-emerald-400">{stats.resolvedComplaints}</p>
                <p className="text-[10px] text-slate-600">Resolved</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-400">{stats.pendingComplaints}</p>
                <p className="text-[10px] text-slate-600">Pending</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-400">{stats.escalatedComplaints}</p>
                <p className="text-[10px] text-slate-600">Escalated</p>
              </div>
            </div>
          </motion.div>

          {/* Budget utilization */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Budget Utilization</h2>
              <span className="text-xs font-bold text-violet-400">{budgetUsedPct}%</span>
            </div>
            <ProgressBar value={stats.spentBudget} max={stats.totalBudget} color="#8b5cf6" />
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>Spent: {fmt(stats.spentBudget)}</span>
              <span>Total: {fmt(stats.totalBudget)}</span>
            </div>
          </motion.div>

          {/* Top scheme coverage */}
          <motion.section
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            aria-labelledby="scheme-coverage-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="scheme-coverage-heading" className="text-sm font-semibold text-white flex items-center gap-2">
                <BookOpen size={14} className="text-violet-400" aria-hidden />
                Scheme Coverage
              </h2>
              <Link href="/mp/schemes" className="text-xs text-violet-400 hover:text-violet-300">
                All <ArrowRight size={12} className="inline" />
              </Link>
            </div>
            <ul className="space-y-3">
              {mockMpSchemeMetrics.slice(0, 4).map((s) => (
                <li key={s.schemeId}>
                  <ProgressBar
                    label={s.schemeName.length > 22 ? s.schemeName.slice(0, 22) + "…" : s.schemeName}
                    value={s.coveragePercent}
                    color={s.coveragePercent >= 80 ? "#10b981" : s.coveragePercent >= 65 ? "#8b5cf6" : "#f59e0b"}
                  />
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Parliament info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-5"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/15">
                <Calendar size={15} className="text-violet-400" aria-hidden />
              </div>
              <div>
                <p className="text-xs text-violet-400 font-medium">Parliament Session</p>
                <p className="text-sm font-semibold text-white">Budget Session 2025</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between"><span>Questions Raised</span><span className="font-semibold text-white">{mockMpProfile.questionsRaised}</span></div>
              <div className="flex justify-between"><span>Bills Introduced</span><span className="font-semibold text-white">{mockMpProfile.billsIntroduced}</span></div>
              <div className="flex justify-between"><span>Attendance</span><span className="font-semibold text-emerald-400">{mockMpProfile.attendanceRate}%</span></div>
            </div>
          </motion.div>

          {/* Constituency quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 className="mb-3 text-sm font-semibold text-white">Constituency At-a-Glance</h2>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Population", value: (mockConstituencyStats.totalPopulation / 100000).toFixed(1) + " L" },
                { label: "Registered Voters", value: (mockConstituencyStats.registeredVoters / 100000).toFixed(1) + " L" },
                { label: "Villages", value: mockConstituencyStats.villages.toString() },
                { label: "Literacy Rate", value: mockConstituencyStats.literacyRate + "%" },
                { label: "Area", value: mockConstituencyStats.area.toLocaleString() + " km²" },
              ].map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
