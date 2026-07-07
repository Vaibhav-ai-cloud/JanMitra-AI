"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  Circle,
  Building2,
  IndianRupee,
} from "lucide-react";
import { ProjectStatusBadge } from "../../../../components/mp/shared/MpBadge";
import { ProgressBar } from "../../../../components/mp/shared/MpChart";
import { mockProjects } from "../../../../lib/mpMockData";

interface PageProps {
  params: { id: string };
}

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString()}`;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = mockProjects.find((p) => p.id === params.id);
  if (!project) notFound();

  const spentPct = Math.round((project.spent / project.budget) * 100);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link
          href="/mp/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded-lg"
        >
          <ArrowLeft size={16} aria-hidden /> Back to Projects
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <ProjectStatusBadge status={project.status} />
              <span className="text-xs font-semibold text-violet-400 capitalize">{project.category}</span>
              <span className="text-xs text-slate-600">·</span>
              <span className="text-xs text-slate-500">{project.fundSource}</span>
            </div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">{project.title}</h1>
          </div>
          <Link
            href="/mp/projects"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/[0.08] transition-colors"
          >
            Back to List
          </Link>
        </div>

        {/* Meta grid */}
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><MapPin size={13} aria-hidden /> {project.location}, {project.district}</span>
          <span className="flex items-center gap-1.5"><Users size={13} aria-hidden /> {project.beneficiaries.toLocaleString()} beneficiaries</span>
          <span className="flex items-center gap-1.5"><Calendar size={13} aria-hidden /> {project.startDate} → {project.expectedEndDate}</span>
          {project.contractor && <span className="flex items-center gap-1.5"><Building2 size={13} aria-hidden /> {project.contractor}</span>}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            aria-labelledby="proj-desc-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 id="proj-desc-heading" className="mb-3 text-sm font-semibold text-white">Description</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
          </motion.section>

          {/* Milestones */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            aria-labelledby="milestones-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 id="milestones-heading" className="mb-4 text-sm font-semibold text-white">
              Milestones ({project.milestones.filter((m) => m.isCompleted).length}/{project.milestones.length} completed)
            </h2>
            <ol className="space-y-0 relative" aria-label="Project milestones">
              {project.milestones.map((m, i) => {
                const isLast = i === project.milestones.length - 1;
                return (
                  <li key={m.id} className="relative flex gap-4 pb-6">
                    {!isLast && (
                      <div
                        aria-hidden
                        className={`absolute left-[17px] top-9 bottom-0 w-[2px] ${m.isCompleted ? "bg-violet-500/40" : "bg-white/[0.06]"}`}
                      />
                    )}
                    <div
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                        m.isCompleted ? "border-violet-500/60 bg-violet-500/15" : "border-white/[0.1] bg-white/[0.03]"
                      }`}
                      aria-hidden
                    >
                      {m.isCompleted ? (
                        <CheckCircle2 size={16} className="text-violet-400" />
                      ) : (
                        <Circle size={14} className="text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-1.5">
                      <p className={`text-sm font-medium ${m.isCompleted ? "text-white" : "text-slate-400"}`}>
                        {m.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Due: {m.dueDate}
                        {m.completedAt && ` · Completed: ${m.completedAt}`}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold text-white">Overall Progress</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative h-28 w-28">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke={project.status === "delayed" ? "#f59e0b" : project.status === "completed" ? "#10b981" : "#8b5cf6"}
                    strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - project.progress / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-white">{project.progress}%</p>
                  <p className="text-[10px] text-slate-500">complete</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Budget */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
              <IndianRupee size={14} className="text-violet-400" aria-hidden /> Budget Utilization
            </h2>
            <ProgressBar value={project.spent} max={project.budget} color="#8b5cf6" />
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400"><span>Total Budget</span><span className="font-semibold text-white">{fmt(project.budget)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Spent</span><span className="font-semibold text-violet-400">{fmt(project.spent)}</span></div>
              <div className="flex justify-between text-slate-400"><span>Remaining</span><span className="font-semibold text-emerald-400">{fmt(project.budget - project.spent)}</span></div>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 className="mb-3 text-sm font-semibold text-white">Quick Info</h2>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Fund Source", value: project.fundSource },
                { label: "Category", value: project.category.charAt(0).toUpperCase() + project.category.slice(1) },
                { label: "Start Date", value: project.startDate },
                { label: "Expected End", value: project.expectedEndDate },
                ...(project.completedAt ? [{ label: "Completed On", value: project.completedAt }] : []),
              ].map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-white text-right">{value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
