"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "../../../../components/citizen/complaints/StatusBadge";
import StatusTimeline from "../../../../components/citizen/complaints/StatusTimeline";
import { mockMpComplaints } from "../../../../lib/mpMockData";
import { useState } from "react";

interface PageProps {
  params: { id: string };
}

export default function MpComplaintDetailPage({ params }: PageProps) {
  const complaint = mockMpComplaints.find((c) => c.id === params.id);
  const [comment, setComment] = useState("");
  const [escalated, setEscalated] = useState(false);

  if (!complaint) notFound();

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link
          href="/mp/complaints"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded-lg"
        >
          <ArrowLeft size={16} aria-hidden /> Back to Complaints
        </Link>
      </motion.div>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-sm font-semibold text-violet-400">{complaint.ticketNumber}</span>
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">{complaint.title}</h1>
          </div>

          {/* MP Actions */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {complaint.status !== "resolved" && (
              <button
                onClick={() => setEscalated(true)}
                disabled={escalated}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/30 px-4 py-2 text-sm font-semibold text-amber-400 hover:bg-amber-500/25 transition-colors disabled:opacity-50"
              >
                {escalated ? <CheckCircle2 size={15} /> : null}
                {escalated ? "Escalated" : "Escalate to DM"}
              </button>
            )}
            <Link
              href="/mp/complaints"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400 transition-colors"
            >
              Back to List
            </Link>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-slate-600" aria-hidden />
            {complaint.location}, {complaint.district}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 size={13} className="text-slate-600" aria-hidden />
            {complaint.department}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-slate-600" aria-hidden />
            {new Date(complaint.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          {complaint.assignedTo && (
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-slate-600" aria-hidden />
              {complaint.assignedTo}
            </span>
          )}
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
            aria-labelledby="desc-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 id="desc-heading" className="mb-3 text-sm font-semibold text-white">Description</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{complaint.description}</p>
          </motion.section>

          {/* Comments */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            aria-labelledby="comments-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 id="comments-heading" className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <MessageSquare size={15} className="text-violet-400" aria-hidden />
              Comments ({complaint.comments.length})
            </h2>

            {complaint.comments.length > 0 ? (
              <ul className="space-y-4 mb-5">
                {complaint.comments.map((cm) => (
                  <li key={cm.id} className="flex gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                      cm.role === "mp" ? "bg-violet-500/15 text-violet-400 border border-violet-500/20"
                      : cm.role === "officer" ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      : "bg-slate-500/15 text-slate-400 border border-slate-500/20"
                    }`}>
                      {cm.author.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{cm.author}</span>
                        <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${
                          cm.role === "mp" ? "bg-violet-500/15 text-violet-400"
                          : cm.role === "officer" ? "bg-blue-500/15 text-blue-400"
                          : "bg-slate-500/15 text-slate-500"
                        }`}>{cm.role.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-slate-400">{cm.message}</p>
                      <p className="mt-1 text-xs text-slate-600">
                        {new Date(cm.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-sm text-slate-600">No comments yet.</p>
            )}

            {/* Add comment */}
            <form onSubmit={handleComment} className="space-y-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add an official comment or update for this complaint…"
                rows={3}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                aria-label="Add comment"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              >
                <Send size={14} aria-hidden /> Post Comment
              </button>
            </form>
          </motion.section>
        </div>

        {/* Timeline */}
        <div>
          <motion.section
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            aria-labelledby="timeline-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
          >
            <h2 id="timeline-heading" className="mb-4 text-sm font-semibold text-white">Status Timeline</h2>
            <StatusTimeline events={complaint.timeline} />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
