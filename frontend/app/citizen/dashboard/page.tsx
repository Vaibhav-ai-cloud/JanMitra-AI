"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  BookOpen,
  Bot,
  ClipboardList,
  AlertCircle,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";
import WelcomeBanner from "../../../components/citizen/dashboard/WelcomeBanner";
import StatCard from "../../../components/citizen/dashboard/StatCard";
import ComplaintCard from "../../../components/citizen/complaints/ComplaintCard";
import SchemeCard from "../../../components/citizen/schemes/SchemeCard";
import {
  mockStats,
  mockComplaints,
  mockSchemes,
  mockApplications,
  mockUpcomingDeadlines,
} from "../../../lib/mockData";
import type { Scheme } from "../../../types/scheme";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const applicationStatusColor: Record<string, string> = {
  draft: "text-slate-400",
  submitted: "text-blue-400",
  under_review: "text-amber-400",
  approved: "text-emerald-400",
  rejected: "text-red-400",
  disbursed: "text-cyan-400",
};

const applicationStatusLabel: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  disbursed: "Disbursed",
};

export default function DashboardPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes.slice(0, 3));

  const toggleBookmark = (id: string) => {
    setSchemes((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s
      )
    );
  };

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Welcome */}
      <WelcomeBanner userName="Rahul Kumar" district="Lucknow" state="Uttar Pradesh" />

      {/* Stats */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Your Activity Summary</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {[
            {
              label: "Total Complaints",
              value: mockStats.totalComplaints,
              icon: <FileText size={20} />,
              color: "blue" as const,
              trend: { value: 12, label: "vs last month" },
            },
            {
              label: "Resolved",
              value: mockStats.resolvedComplaints,
              icon: <CheckCircle2 size={20} />,
              color: "emerald" as const,
              trend: { value: 8, label: "resolved this month" },
            },
            {
              label: "Pending",
              value: mockStats.pendingComplaints,
              icon: <Clock size={20} />,
              color: "amber" as const,
            },
            {
              label: "Active Applications",
              value: mockStats.activeApplications,
              icon: <ClipboardList size={20} />,
              color: "violet" as const,
            },
            {
              label: "Saved Schemes",
              value: mockStats.bookmarkedSchemes,
              icon: <BookOpen size={20} />,
              color: "cyan" as const,
            },
            {
              label: "AI Chats",
              value: mockStats.aiChatsCount,
              icon: <Bot size={20} />,
              color: "rose" as const,
            },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={itemVariants} className="xl:col-span-1 sm:col-span-1">
              <StatCard {...stat} delay={i * 0.06} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main content — 2 columns on large screens */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Complaints + Applications */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Complaints */}
          <section aria-labelledby="complaints-heading">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="complaints-heading" className="text-lg font-semibold text-white">
                Recent Complaints
              </h2>
              <Link
                href="/citizen/complaints"
                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockComplaints.slice(0, 3).map((c, i) => (
                <ComplaintCard key={c.id} complaint={c} delay={i * 0.08} />
              ))}
            </div>
          </section>

          {/* Application History */}
          <section aria-labelledby="applications-heading">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="applications-heading" className="text-lg font-semibold text-white">
                Recent Applications
              </h2>
              <Link
                href="/citizen/applications"
                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Scheme</th>
                    <th scope="col" className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 sm:table-cell">Ref No.</th>
                    <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                    <th scope="col" className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {mockApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-white">{app.schemeName}</p>
                      </td>
                      <td className="hidden px-5 py-3.5 sm:table-cell">
                        <span className="font-mono text-xs text-slate-500">{app.referenceNumber}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`font-medium ${applicationStatusColor[app.status]}`}>
                          {applicationStatusLabel[app.status]}
                        </span>
                      </td>
                      <td className="hidden px-5 py-3.5 md:table-cell">
                        <span className="text-slate-500">
                          {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: Sidebar widgets */}
        <div className="space-y-6">
          {/* AI Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-blue-500/10 p-5"
          >
            <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
                  <Sparkles size={18} className="text-violet-400" aria-hidden />
                </div>
                <div>
                  <p className="text-xs text-violet-400 font-medium">AI Recommendation</p>
                  <p className="text-sm font-semibold text-white">For You</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Based on your profile, you may be eligible for <strong className="text-white">3 new schemes</strong> this month including PM Vishwakarma Yojana.
              </p>
              <Link
                href="/citizen/schemes"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                Explore schemes <ArrowRight size={12} aria-hidden />
              </Link>
            </div>
          </motion.div>

          {/* Upcoming Deadlines */}
          {mockUpcomingDeadlines.length > 0 && (
            <motion.section
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              aria-labelledby="deadlines-heading"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
            >
              <h2 id="deadlines-heading" className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Calendar size={16} className="text-amber-400" aria-hidden />
                Upcoming Deadlines
              </h2>
              <ul className="space-y-3" role="list">
                {mockUpcomingDeadlines.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{d.title}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(d.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        d.daysLeft <= 7
                          ? "bg-red-500/15 text-red-400"
                          : d.daysLeft <= 30
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-emerald-500/15 text-emerald-400"
                      }`}
                      aria-label={`${d.daysLeft} days remaining`}
                    >
                      {d.daysLeft}d left
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Alert notice */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-400" aria-hidden />
            <div>
              <p className="text-sm font-medium text-amber-300">Profile Incomplete</p>
              <p className="mt-0.5 text-xs text-slate-500">Complete your profile to get personalized scheme recommendations.</p>
              <Link
                href="/citizen/profile/edit"
                className="mt-2 inline-block text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                Complete Profile →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Government Schemes */}
      <section aria-labelledby="schemes-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="schemes-heading" className="text-lg font-semibold text-white">
            Recommended Schemes
          </h2>
          <Link
            href="/citizen/schemes"
            className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.map((s, i) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              delay={i * 0.08}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
