"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  User,
  Paperclip,
  MessageSquare,
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "../../../../components/citizen/complaints/StatusBadge";
import StatusTimeline from "../../../../components/citizen/complaints/StatusTimeline";
import { mockComplaints } from "../../../../lib/mockData";

interface Props {
  params: { id: string };
}

export default function ComplaintDetailPage({ params }: Props) {
  const complaint = mockComplaints.find((c) => c.id === params.id);
  if (!complaint) notFound();

  const created = new Date(complaint.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-[1000px] space-y-6">
      {/* Back */}
      <Link
        href="/citizen/complaints"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} aria-hidden />
        Back to Complaints
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-slate-600">{complaint.ticketNumber}</span>
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
          </div>
          <h1 className="text-2xl font-bold text-white">{complaint.title}</h1>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            aria-labelledby="desc-heading"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <h2 id="desc-heading" className="mb-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Description
            </h2>
            <p className="text-sm leading-7 text-slate-300">{complaint.description}</p>
          </motion.section>

          {/* Comments */}
          {complaint.comments.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              aria-labelledby="comments-heading"
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <h2 id="comments-heading" className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                <MessageSquare size={15} aria-hidden />
                Comments ({complaint.comments.length})
              </h2>
              <ul className="space-y-4" role="list">
                {complaint.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="flex gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{comment.author}</span>
                        <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] capitalize text-slate-500">
                          {comment.role}
                        </span>
                        <span className="ml-auto text-xs text-slate-600">
                          {new Date(comment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{comment.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Meta info */}
          <motion.section
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4"
            aria-label="Complaint details"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Details
            </h2>
            {[
              { icon: <Building2 size={14} />, label: "Department", value: complaint.department },
              { icon: <MapPin size={14} />, label: "Location", value: `${complaint.location}, ${complaint.district}` },
              { icon: <Calendar size={14} />, label: "Filed On", value: created },
              ...(complaint.assignedTo
                ? [{ icon: <User size={14} />, label: "Assigned To", value: complaint.assignedTo }]
                : []),
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 text-slate-600">{item.icon}</span>
                <div>
                  <p className="text-xs text-slate-600">{item.label}</p>
                  <p className="text-sm text-slate-300">{item.value}</p>
                </div>
              </div>
            ))}

            {complaint.attachments.length > 0 && (
              <div className="flex items-start gap-3">
                <Paperclip size={14} className="mt-0.5 text-slate-600" aria-hidden />
                <div>
                  <p className="text-xs text-slate-600">Attachments</p>
                  <p className="text-sm text-slate-300">{complaint.attachments.length} file(s)</p>
                </div>
              </div>
            )}
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
            aria-labelledby="timeline-heading"
          >
            <h2 id="timeline-heading" className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status Timeline
            </h2>
            <StatusTimeline events={complaint.timeline} />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
