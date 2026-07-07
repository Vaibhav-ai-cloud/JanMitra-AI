"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  UserCheck,
  FileText,
  BookOpen,
  Building2,
  Bot,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
} from "lucide-react";
import MpStatCard from "../../../components/mp/shared/MpStatCard";
import { BarChart, DonutChart } from "../../../components/mp/shared/MpChart";
import { MpBadge } from "../../../components/mp/shared/MpBadge";
import {
  mockAdminStats,
  mockAdminUsers,
  mockAdminMps,
  mockSystemMetrics,
  mockDepartmentPerformance,
  mockAdminNotifications,
} from "../../../lib/adminMockData";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const statusColors: Record<string, string> = {
  active: "emerald",
  inactive: "slate",
  suspended: "rose",
  pending: "amber",
};

export default function AdminDashboardPage() {
  const stats = mockAdminStats;

  const deptDonutData = mockDepartmentPerformance.map((d) => ({
    label: d.name.split(" ")[0],
    value: d.totalComplaints,
    color: d.color,
  }));

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-0.5 text-sm text-slate-400">
            System-wide overview · JanMitra AI Platform
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Activity size={13} className="text-emerald-400" aria-hidden />
          <span className="text-emerald-400 font-medium">All systems operational</span>
          <span>· Uptime {stats.systemUptime}%</span>
        </div>
      </motion.div>

      {/* Primary KPI Cards */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Key Platform Metrics</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: <Users size={20} />, color: "blue" as const, trend: { value: 18, label: "vs last month" } },
            { label: "Total MPs", value: stats.totalMps.toLocaleString(), icon: <UserCheck size={20} />, color: "violet" as const, trend: { value: 2, label: "new this term" } },
            { label: "Active Schemes", value: stats.activeSchemes, icon: <BookOpen size={20} />, color: "emerald" as const, trend: { value: 8, label: "vs last quarter" } },
            { label: "AI Interactions", value: `${(stats.aiInteractions / 1000000).toFixed(1)}M`, icon: <Bot size={20} />, color: "cyan" as const, trend: { value: 34, label: "vs last month" } },
          ].map((card, i) => (
            <motion.div key={card.label} variants={itemVariants}>
              <MpStatCard {...card} delay={i * 0.06} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Secondary KPI */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Total Complaints", value: stats.totalComplaints.toLocaleString(), icon: <FileText size={20} />, color: "amber" as const },
          { label: "Resolved", value: stats.resolvedComplaints.toLocaleString(), icon: <CheckCircle2 size={20} />, color: "emerald" as const, trend: { value: 85, label: "resolution rate" } },
          { label: "Pending", value: stats.pendingComplaints.toLocaleString(), icon: <Clock size={20} />, color: "rose" as const },
          { label: "Departments", value: stats.totalDepartments, icon: <Building2 size={20} />, color: "purple" as const },
        ].map((card, i) => (
          <motion.div key={card.label} variants={itemVariants}>
            <MpStatCard {...card} delay={0.3 + i * 0.06} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Monthly growth chart */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          aria-labelledby="growth-chart-heading"
          className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="growth-chart-heading" className="text-base font-semibold text-white">User & Complaint Growth</h2>
            <p className="mt-0.5 text-xs text-slate-500">Monthly trends — Jan to Dec 2024</p>
          </div>
          <div className="flex items-center gap-4 mb-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden />Users (÷100)</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden />Complaints</span>
          </div>
          <BarChart
            data={mockSystemMetrics.map((m) => ({
              label: m.month,
              value: Math.round(m.users / 100),
              value2: m.complaints,
            }))}
            height={200}
            color="#3b82f6"
            color2="#22d3ee"
          />
        </motion.section>

        {/* Department distribution donut */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-labelledby="dept-donut-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="dept-donut-heading" className="text-base font-semibold text-white">Complaints by Dept.</h2>
            <p className="mt-0.5 text-xs text-slate-500">Distribution across departments</p>
          </div>
          <DonutChart
            data={deptDonutData}
            size={140}
            centerLabel="Total"
            centerValue={stats.totalComplaints.toLocaleString()}
          />
        </motion.section>
      </div>

      {/* Bottom section: Recent users + Recent MPs + AI Insights + Notifications */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Users */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          aria-labelledby="recent-users-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h2 id="recent-users-heading" className="text-sm font-semibold text-white">Recent Users</h2>
            <Link href="/admin/users" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1">
              View all <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {mockAdminUsers.slice(0, 5).map((u) => (
              <li key={u.id}>
                <Link
                  href={`/admin/users/${u.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/15 text-xs font-bold text-blue-400">
                    {u.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{u.name}</p>
                    <p className="text-xs text-slate-500 truncate">{u.type} · {u.district}</p>
                  </div>
                  <MpBadge
                    label={u.status}
                    variant={(statusColors[u.status] as "emerald" | "slate" | "rose" | "amber") ?? "slate"}
                    dot
                  />
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Department Performance */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          aria-labelledby="dept-perf-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h2 id="dept-perf-heading" className="text-sm font-semibold text-white">Department Performance</h2>
            <Link href="/admin/departments" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1">
              View all <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {mockDepartmentPerformance.slice(0, 5).map((d) => (
              <li key={d.departmentId} className="px-5 py-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-white">{d.name}</p>
                  <span
                    className={`text-xs font-semibold ${d.performanceScore >= 85 ? "text-emerald-400" : d.performanceScore >= 80 ? "text-blue-400" : "text-amber-400"}`}
                  >
                    {d.performanceScore}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${d.performanceScore}%`, backgroundColor: d.color }}
                    role="progressbar"
                    aria-valuenow={d.performanceScore}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${d.name} performance: ${d.performanceScore}%`}
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-600">{d.resolvedComplaints.toLocaleString()} resolved · {d.avgResolutionDays}d avg</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* AI Insights + System Alerts */}
        <div className="space-y-4">
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-slate-950 p-5"
          >
            <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
                  <Sparkles size={18} className="text-blue-400" aria-hidden />
                </div>
                <div>
                  <p className="text-xs text-blue-400 font-medium">AI System Insights</p>
                  <p className="text-sm font-semibold text-white">Live Analysis</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <TrendingUp size={12} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden />
                  <span>Complaint resolution rate up <strong className="text-white">12%</strong> this month</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-400" aria-hidden />
                  <span><strong className="text-white">Varanasi</strong> district shows 25% complaint surge — needs attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot size={12} className="mt-0.5 shrink-0 text-cyan-400" aria-hidden />
                  <span>AI chatbot resolved <strong className="text-white">68%</strong> of queries without human escalation</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* System Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
          >
            <div className="border-b border-white/[0.06] px-5 py-3">
              <h2 className="text-sm font-semibold text-white">System Alerts</h2>
            </div>
            <ul className="divide-y divide-white/[0.04]">
              {mockAdminNotifications.filter((n) => !n.isRead).slice(0, 3).map((n) => (
                <li key={n.id} className="px-5 py-3">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        n.severity === "critical" ? "bg-red-500" : n.severity === "warning" ? "bg-amber-400" : "bg-blue-400"
                      }`}
                      aria-hidden
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{n.title}</p>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">{n.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recent MPs */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <h2 className="text-sm font-semibold text-white">Top MPs</h2>
              <Link href="/admin/mps" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all</Link>
            </div>
            <ul className="divide-y divide-white/[0.04]">
              {mockAdminMps.slice(0, 3).map((mp) => (
                <li key={mp.id}>
                  <Link
                    href={`/admin/mps/${mp.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 border border-violet-500/20 text-xs font-bold text-violet-400">
                      {mp.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{mp.name}</p>
                      <p className="text-xs text-slate-500">{mp.constituency} · {mp.party}</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold shrink-0">{mp.attendanceRate}%</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
