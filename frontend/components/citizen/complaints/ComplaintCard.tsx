"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, Building2, ArrowRight } from "lucide-react";
import { cn } from "../../../utils/auth";
import { StatusBadge, PriorityBadge } from "./StatusBadge";
import type { Complaint } from "../../../types/complaint";

interface ComplaintCardProps {
  complaint: Complaint;
  className?: string;
  delay?: number;
}

const categoryEmoji: Record<string, string> = {
  infrastructure: "🏗️",
  water: "💧",
  electricity: "⚡",
  roads: "🛣️",
  sanitation: "🧹",
  health: "🏥",
  education: "📚",
  corruption: "⚠️",
  police: "👮",
  revenue: "💰",
  agriculture: "🌾",
  other: "📋",
};

export default function ComplaintCard({
  complaint,
  className,
  delay = 0,
}: ComplaintCardProps) {
  const formatted = new Date(complaint.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5",
        "transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]",
        className
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl shrink-0" aria-hidden>
            {categoryEmoji[complaint.category] ?? "📋"}
          </span>
          <div className="min-w-0">
            <p className="text-xs text-slate-600 font-mono">{complaint.ticketNumber}</p>
            <h3 className="font-semibold text-white text-sm leading-tight truncate">
              {complaint.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
        {complaint.description}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} aria-hidden />
          {complaint.district}
        </span>
        <span className="flex items-center gap-1.5">
          <Building2 size={12} aria-hidden />
          {complaint.department}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={12} aria-hidden />
          {formatted}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
        {complaint.assignedTo ? (
          <p className="text-xs text-slate-600">
            Assigned: <span className="text-slate-400">{complaint.assignedTo}</span>
          </p>
        ) : (
          <span />
        )}
        <Link
          href={`/citizen/complaints/${complaint.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          aria-label={`View details for ${complaint.title}`}
        >
          View Details
          <ArrowRight size={12} aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}
