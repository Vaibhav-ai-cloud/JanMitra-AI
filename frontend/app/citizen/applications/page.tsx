"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ClipboardList, ArrowRight, ExternalLink } from "lucide-react";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import EmptyState from "../../../components/citizen/shared/EmptyState";
import { mockApplications } from "../../../lib/mockData";
import { cn } from "../../../utils/auth";
import type { ApplicationStatus } from "../../../types/scheme";

const statusConfig: Record<ApplicationStatus, { label: string; classes: string }> = {
  draft: { label: "Draft", classes: "bg-slate-500/15 text-slate-400" },
  submitted: { label: "Submitted", classes: "bg-blue-500/15 text-blue-400" },
  under_review: { label: "Under Review", classes: "bg-amber-500/15 text-amber-400" },
  approved: { label: "Approved", classes: "bg-emerald-500/15 text-emerald-400" },
  rejected: { label: "Rejected", classes: "bg-red-500/15 text-red-400" },
  disbursed: { label: "Disbursed", classes: "bg-cyan-500/15 text-cyan-400" },
};

const categoryEmoji: Record<string, string> = {
  health: "🏥", education: "📚", housing: "🏠", agriculture: "🌾",
  employment: "💼", finance: "💰", women: "👩", other: "📋",
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <PageHeader
        title="Application History"
        subtitle="Track the status of all your scheme applications"
      />

      {mockApplications.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={28} />}
          title="No applications yet"
          description="Apply for government schemes to see your applications here."
          action={
            <Link
              href="/citizen/schemes"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 transition-colors"
            >
              Explore Schemes
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {mockApplications.map((app, i) => {
            const cfg = statusConfig[app.status];
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all hover:border-white/[0.14]"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-xl" aria-hidden>
                  {categoryEmoji[app.schemeCategory] ?? "📋"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{app.schemeName}</h3>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", cfg.classes)}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">{app.referenceNumber}</p>
                  {app.remarks && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-1">{app.remarks}</p>
                  )}
                </div>

                {/* Amount */}
                {app.expectedAmount && (
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-600">Expected</p>
                    <p className="text-sm font-semibold text-white">₹{app.expectedAmount.toLocaleString("en-IN")}</p>
                  </div>
                )}

                {/* Date */}
                <div className="text-right hidden md:block">
                  <p className="text-xs text-slate-600">Applied</p>
                  <p className="text-sm text-slate-400">
                    {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>

                <Link
                  href={`/citizen/schemes/${app.schemeId}`}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label={`View ${app.schemeName} scheme`}
                >
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
