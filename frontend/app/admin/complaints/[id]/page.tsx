"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  MapPin,
  Building2,
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  XCircle,
  Send,
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "../../../../components/citizen/complaints/StatusBadge";
import { mockComplaints } from "../../../../lib/mockData";
import { mockMpComplaints } from "../../../../lib/mpMockData";

const allComplaints = [...mockComplaints, ...mockMpComplaints];

const timelineIcon = (status: string) => {
  switch (status) {
    case "submitted": return <Send size={13} />;
    case "acknowledged": return <CheckCircle2 size={13} />;
    case "in_progress": return <Loader2 size={13} />;
    case "resolved": return <CheckCircle2 size={13} />;
    case "rejected": return <XCircle size={13} />;
    default: return <AlertCircle size={13} />;
  }
};

const timelineColor = (status: string, completed: boolean) => {
  if (!completed) return "border-white/10 bg-slate-900 text-slate-600";
  switch (status) {
    case "resolved": return "border-emerald-500/40 bg-emerald-500/15 text-emerald-400";
    case "rejected": return "border-red-500/40 bg-red-500/15 text-red-400";
    case "in_progress": return "border-amber-500/40 bg-amber-500/15 text-amber-400";
    default: return "border-blue-500/40 bg-blue-500/15 text-blue-400";
  }
};

interface PageProps { params: { id: string } }

export default function AdminComplaintDetailPage({ params }: PageProps) {
  const complaint = allComplaints.find((c) => c.id === params.id);
  if (!complaint) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link
          href="/admin/complaints"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} aria-hidden /> Back to Complaints
        </Link>
      </motion.div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative">
          {/* Ticket + badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-bold text-amber-400">{complaint.ticketNumber}</span>
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
          <h1 className="text-xl font-bold text-white sm:text-2xl">{complaint.title}</h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{complaint.description}</p>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Building2 size={12} aria-hidden />
              {complaint.department}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} aria-hidden />
              {complaint.location}, {complaint.district}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} aria-hidden />
              Filed {new Date(complaint.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            {complaint.assignedTo && (
              <span className="flex items-center gap-1.5">
                <User size={12} aria-hidden />
                Assigned to {complaint.assignedTo}
              </span>
            )}
            {complaint.mpName && (
              <span className="flex items-center gap-1.5">
                <User size={12} aria-hidden />
                MP: {complaint.mpName}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
        >
          <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold text-white">
            <Clock size={14} className="text-amber-400" aria-hidden />
            Status Timeline
          </h2>

          {complaint.timeline && complaint.timeline.length > 0 ? (
            <ol className="space-y-4" aria-label="Complaint timeline">
              {complaint.timeline.map((step, idx) => (
                <li key={step.id} className="flex gap-3">
                  {/* icon */}
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${timelineColor(step.status, step.isCompleted)}`}>
                    {timelineIcon(step.status)}
                  </div>
                  {/* connector */}
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <p className={`text-xs font-semibold capitalize ${step.isCompleted ? "text-white" : "text-slate-600"}`}>
                      {step.status.replace("_", " ")}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-snug">{step.message}</p>
                    {step.actor && (
                      <p className="text-[11px] text-slate-600">by {step.actor}</p>
                    )}
                    {step.timestamp && (
                      <p className="text-[10px] text-slate-700">
                        {new Date(step.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        {" "}·{" "}
                        {new Date(step.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                    {idx < (complaint.timeline?.length ?? 0) - 1 && (
                      <div className="ml-[-8px] mt-2 ml-[4px] h-4 w-px bg-white/[0.06]" aria-hidden />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-slate-600">No timeline data available.</p>
          )}
        </motion.div>

        {/* Comments & details */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Category details */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
              <FileText size={14} className="text-blue-400" aria-hidden />
              Complaint Details
            </h2>
            <dl className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "Category", value: complaint.category },
                { label: "Priority", value: complaint.priority },
                { label: "Status", value: complaint.status.replace("_", " ") },
                { label: "State", value: complaint.state },
                { label: "District", value: complaint.district },
                { label: "Department", value: complaint.department },
                {
                  label: "Last Updated",
                  value: new Date(complaint.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  }),
                },
                ...(complaint.resolvedAt ? [{
                  label: "Resolved On",
                  value: new Date(complaint.resolvedAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  }),
                }] : []),
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-slate-600 mb-0.5">{item.label}</dt>
                  <dd className="font-medium text-slate-300 capitalize">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Comments */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <MessageSquare size={14} className="text-violet-400" aria-hidden />
              Comments
              {complaint.comments && complaint.comments.length > 0 && (
                <span className="ml-auto text-[11px] font-medium text-slate-500">
                  {complaint.comments.length}
                </span>
              )}
            </h2>

            {complaint.comments && complaint.comments.length > 0 ? (
              <ul className="space-y-3">
                {complaint.comments.map((comment) => (
                  <li key={comment.id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5">
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400">
                          {comment.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-white">{comment.author}</span>
                        <span className="text-[10px] text-slate-600 capitalize">({comment.role})</span>
                      </div>
                      <span className="text-[10px] text-slate-600">
                        {new Date(comment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{comment.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-6 text-center">
                <MessageSquare size={24} className="mx-auto mb-2 text-slate-700" aria-hidden />
                <p className="text-xs text-slate-600">No comments yet.</p>
              </div>
            )}
          </div>

          {/* Admin action panel */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Admin Actions</h2>
            <div className="flex flex-wrap gap-2">
              {["Mark Resolved", "Escalate", "Reassign", "Add Note"].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
