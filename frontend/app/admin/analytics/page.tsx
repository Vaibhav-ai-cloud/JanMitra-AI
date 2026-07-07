"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Bot,
  BookOpen,
  Building2,
  ChevronDown,
} from "lucide-react";
import { BarChart, DonutChart, ProgressBar } from "../../../components/mp/shared/MpChart";
import MpStatCard from "../../../components/mp/shared/MpStatCard";
import {
  mockAdminStats,
  mockSystemMetrics,
  mockDepartmentPerformance,
} from "../../../lib/adminMockData";

const periods = ["Monthly", "Quarterly", "Annual"] as const;
type Period = typeof periods[number];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("Monthly");
  const stats = mockAdminStats;

  const complaintDonut = mockDepartmentPerformance.map((d) => ({
    label: d.name.split(" ")[0],
    value: d.totalComplaints,
    color: d.color,
  }));

  const resolutionData = mockSystemMetrics.map((m) => ({
    label: m.month,
    value: m.resolved,
    value2: m.complaints - m.resolved,
  }));

  const aiData = mockSystemMetrics.map((m) => ({
    label: m.month,
    value: Math.round(m.aiInteractions / 1000),
  }));

  const resolutionRate = Math.round((stats.resolvedComplaints / Math.max(stats.totalComplaints, 1)) * 100);

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
            <BarChart3 size={20} className="text-violet-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Analytics</h1>
            <p className="mt-0.5 text-sm text-slate-400">Platform-wide metrics and insights</p>
          </div>
        </div>

        {/* Period selector */}
        <div className="relative self-start sm:self-auto">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] pl-4 pr-8 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
            aria-label="Select analytics period"
          >
            {periods.map((p) => (
              <option key={p} value={p} className="bg-slate-900">{p}</option>
            ))}
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>
      </motion.div>

      {/* KPI Cards */}
      <section aria-labelledby="analytics-kpi-heading">
        <h2 id="analytics-kpi-heading" className="sr-only">Key Performance Indicators</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: <Users size={20} />, color: "blue" as const, trend: { value: 18, label: "vs last month" } },
            { label: "Total Complaints", value: stats.totalComplaints.toLocaleString(), icon: <FileText size={20} />, color: "amber" as const, trend: { value: 7, label: "vs last month" } },
            { label: "AI Interactions", value: `${(stats.aiInteractions / 1000000).toFixed(1)}M`, icon: <Bot size={20} />, color: "cyan" as const, trend: { value: 34, label: "vs last month" } },
            { label: "Active Schemes", value: stats.activeSchemes, icon: <BookOpen size={20} />, color: "emerald" as const, trend: { value: 8, label: "vs last quarter" } },
          ].map((card, i) => (
            <motion.div key={card.label} variants={itemVariants}>
              <MpStatCard {...card} delay={i * 0.06} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Complaint Resolution Chart */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          aria-labelledby="resolution-chart-heading"
          className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="resolution-chart-heading" className="text-base font-semibold text-white">
              Complaint Resolution Trend
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Monthly resolved vs pending — 2024</p>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />Resolved
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden />Pending
            </span>
          </div>
          <BarChart
            data={resolutionData}
            height={200}
            color="#10b981"
            color2="#f59e0b"
          />
        </motion.section>

        {/* Department Donut */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          aria-labelledby="dept-analytics-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="dept-analytics-heading" className="text-base font-semibold text-white">
              Complaints by Department
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Distribution across all departments</p>
          </div>
          <DonutChart
            data={complaintDonut}
            size={130}
            centerLabel="Total"
            centerValue={stats.totalComplaints.toLocaleString()}
          />
        </motion.section>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Interactions Chart */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-labelledby="ai-chart-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="ai-chart-heading" className="text-base font-semibold text-white">
              AI Chatbot Interactions
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Monthly interactions (in thousands) — 2024</p>
          </div>
          <BarChart data={aiData} height={180} color="#22d3ee" />
        </motion.section>

        {/* Department Performance */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          aria-labelledby="dept-performance-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="dept-performance-heading" className="text-base font-semibold text-white flex items-center gap-2">
              <Building2 size={16} className="text-emerald-400" aria-hidden />
              Department Performance
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Performance scores across departments</p>
          </div>
          <ul className="space-y-3">
            {mockDepartmentPerformance.map((dept) => (
              <li key={dept.departmentId}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-slate-400">{dept.name}</span>
                  <span
                    className={`font-semibold ${dept.performanceScore >= 85 ? "text-emerald-400" : dept.performanceScore >= 80 ? "text-blue-400" : "text-amber-400"}`}
                  >
                    {dept.performanceScore}%
                  </span>
                </div>
                <ProgressBar
                  value={dept.performanceScore}
                  color={dept.color}
                  showLabel={false}
                />
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Summary Metrics */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        aria-labelledby="summary-metrics-heading"
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <h2 id="summary-metrics-heading" className="mb-5 text-base font-semibold text-white flex items-center gap-2">
          <TrendingUp size={16} className="text-blue-400" aria-hidden />
          Platform Health Summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Complaint Resolution Rate",
              value: resolutionRate,
              suffix: "%",
              color: "#10b981",
              subtext: `${stats.resolvedComplaints.toLocaleString()} of ${stats.totalComplaints.toLocaleString()} resolved`,
            },
            {
              label: "Active User Rate",
              value: Math.round((stats.activeUsers / Math.max(stats.totalUsers, 1)) * 100),
              suffix: "%",
              color: "#3b82f6",
              subtext: `${stats.activeUsers.toLocaleString()} active users`,
            },
            {
              label: "Scheme Coverage",
              value: Math.round((stats.activeSchemes / Math.max(stats.totalSchemes, 1)) * 100),
              suffix: "%",
              color: "#a78bfa",
              subtext: `${stats.activeSchemes} of ${stats.totalSchemes} schemes active`,
            },
            {
              label: "System Uptime",
              value: stats.systemUptime,
              suffix: "%",
              color: "#22d3ee",
              subtext: "All services operational",
            },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500 mb-2">{metric.label}</p>
              <p className="text-2xl font-bold mb-2" style={{ color: metric.color }}>
                {metric.value}{metric.suffix}
              </p>
              <ProgressBar value={metric.value} color={metric.color} showLabel={false} />
              <p className="mt-1.5 text-[10px] text-slate-600">{metric.subtext}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
