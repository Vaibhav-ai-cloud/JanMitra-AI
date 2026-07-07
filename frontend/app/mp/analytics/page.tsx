"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Briefcase,
  Users,
} from "lucide-react";
import MpStatCard from "../../../components/mp/shared/MpStatCard";
import { BarChart, DonutChart, ProgressBar } from "../../../components/mp/shared/MpChart";
import {
  mockMpStats,
  mockMonthlyMetrics,
  mockComplaintCategories,
  mockProjectCategories,
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

export default function MpAnalyticsPage() {
  const stats = mockMpStats;

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <BarChart3 size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Analytics</h1>
          <p className="mt-0.5 text-sm text-slate-400">Constituency performance insights — Jan to Dec 2024</p>
        </div>
      </motion.div>

      {/* KPI cards */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              label: "Total Complaints",
              value: stats.totalComplaints.toLocaleString(),
              icon: <FileText size={20} />,
              color: "violet" as const,
              trend: { value: 8, label: "vs prev. year" },
            },
            {
              label: "Resolved",
              value: stats.resolvedComplaints.toLocaleString(),
              icon: <CheckCircle2 size={20} />,
              color: "emerald" as const,
              trend: { value: 14, label: "resolution rate" },
            },
            {
              label: "Avg. Resolution Days",
              value: stats.avgResolutionDays,
              icon: <Clock size={20} />,
              color: "amber" as const,
              trend: { value: -3, label: "vs prev. year" },
            },
            {
              label: "Escalated",
              value: stats.escalatedComplaints,
              icon: <AlertCircle size={20} />,
              color: "rose" as const,
              trend: { value: -5, label: "vs prev. year" },
            },
          ].map((card, i) => (
            <motion.div key={card.label} variants={itemVariants}>
              <MpStatCard
                label={card.label}
                value={card.value}
                icon={card.icon}
                color={card.color}
                trend={card.trend}
                delay={i * 0.06}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main charts grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly complaints vs resolved */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          aria-labelledby="monthly-chart-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="monthly-chart-heading" className="text-base font-semibold text-white">
              Monthly Complaints vs Resolved
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Full year 2024 — month by month comparison</p>
          </div>
          <div className="flex items-center gap-4 mb-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-violet-500" aria-hidden /> Complaints</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-cyan-400" aria-hidden /> Resolved</span>
          </div>
          <BarChart
            data={mockMonthlyMetrics.map((m) => ({ label: m.month, value: m.complaints, value2: m.resolved }))}
            height={200}
            color="#8b5cf6"
            color2="#22d3ee"
          />
        </motion.section>

        {/* Complaint categories donut */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-labelledby="category-chart-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="category-chart-heading" className="text-base font-semibold text-white">
              Complaints by Category
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Distribution across departments — 2024</p>
          </div>
          <DonutChart
            data={mockComplaintCategories}
            size={150}
            centerLabel="Total"
            centerValue={mockMpStats.totalComplaints.toLocaleString()}
          />
        </motion.section>

        {/* Project categories donut */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          aria-labelledby="project-cat-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="project-cat-heading" className="text-base font-semibold text-white">
              Projects by Category
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">{mockMpStats.totalProjects} total projects in constituency</p>
          </div>
          <DonutChart
            data={mockProjectCategories}
            size={150}
            centerLabel="Projects"
            centerValue={mockMpStats.totalProjects.toString()}
          />
        </motion.section>

        {/* Citizen engagement bar chart */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          aria-labelledby="citizen-chart-heading"
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <div className="mb-5">
            <h2 id="citizen-chart-heading" className="text-base font-semibold text-white">
              Citizen Registrations
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">New registrations on JanMitra AI — 2024</p>
          </div>
          <BarChart
            data={mockMonthlyMetrics.map((m) => ({ label: m.month, value: m.citizens }))}
            height={200}
            color="#22d3ee"
          />
        </motion.section>
      </div>

      {/* Scheme coverage analytics */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        aria-labelledby="scheme-analytics-heading"
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <div className="mb-6">
          <h2 id="scheme-analytics-heading" className="text-base font-semibold text-white">
            Scheme Coverage Analysis
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">Beneficiary coverage across key government schemes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]" role="table">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Scheme", "Category", "Target", "Achieved", "Coverage", "Disbursed"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {mockMpSchemeMetrics.map((s) => (
                <tr key={s.schemeId} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{s.schemeName}</p>
                  </td>
                  <td className="px-4 py-4 text-slate-400">{s.category}</td>
                  <td className="px-4 py-4 text-slate-300">{s.targetBeneficiaries.toLocaleString()}</td>
                  <td className="px-4 py-4 text-emerald-400 font-semibold">{s.actualBeneficiaries.toLocaleString()}</td>
                  <td className="px-4 py-4 w-40">
                    <div className="space-y-1">
                      <ProgressBar
                        value={s.coveragePercent}
                        color={s.coveragePercent >= 80 ? "#10b981" : s.coveragePercent >= 65 ? "#8b5cf6" : "#f59e0b"}
                        showLabel={false}
                      />
                      <span className={`text-xs font-semibold ${s.coveragePercent >= 80 ? "text-emerald-400" : s.coveragePercent >= 65 ? "text-violet-400" : "text-amber-400"}`}>
                        {s.coveragePercent}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {s.disbursedAmount > 0
                      ? `₹${(s.disbursedAmount / 10000000).toFixed(1)}Cr`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Project metrics grid */}
      <section aria-labelledby="project-metrics-heading">
        <h2 id="project-metrics-heading" className="mb-4 text-base font-semibold text-white">Project Performance</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "Total Projects", value: stats.totalProjects, icon: <Briefcase size={20} />, color: "violet" as const },
            { label: "Ongoing", value: stats.ongoingProjects, icon: <Clock size={20} />, color: "blue" as const },
            { label: "Completed", value: stats.completedProjects, icon: <CheckCircle2 size={20} />, color: "emerald" as const },
            { label: "Beneficiaries", value: `${(stats.schemeBeneficiaries / 1000).toFixed(1)}K`, icon: <Users size={20} />, color: "cyan" as const },
          ].map((card, i) => (
            <motion.div key={card.label} variants={itemVariants}>
              <MpStatCard {...card} delay={i * 0.06} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
