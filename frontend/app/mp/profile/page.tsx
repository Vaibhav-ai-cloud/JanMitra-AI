"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  GraduationCap,
  Award,
  FileText,
  TrendingUp,
  Edit3,
} from "lucide-react";
import { mockMpProfile, mockConstituencyStats, mockMpStats } from "../../../lib/mpMockData";
import { ProgressBar } from "../../../components/mp/shared/MpChart";

export default function MpProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "constituency" | "parliament">("overview");
  const profile = mockMpProfile;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <User size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Profile</h1>
          <p className="mt-0.5 text-sm text-slate-400">Your MP profile and constituency information</p>
        </div>
      </motion.div>

      {/* Profile hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-400 text-3xl font-bold text-white border-2 border-violet-500/30 shadow-xl shadow-violet-500/20">
            {profile.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-violet-400 font-medium">Member of Parliament</p>
            <p className="mt-1 text-sm text-slate-400">{profile.constituency} · {profile.state} · {profile.party}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Calendar size={12} aria-hidden /> Term: {profile.termStart} to {profile.termEnd}</span>
              <span className="flex items-center gap-1.5"><GraduationCap size={12} aria-hidden /> {profile.education}</span>
              <span className="flex items-center gap-1.5"><Award size={12} aria-hidden /> {profile.age} years old</span>
            </div>
          </div>

          <button className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-medium text-white hover:bg-white/[0.1] transition-colors">
            <Edit3 size={15} aria-hidden /> Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1"
        role="tablist"
      >
        {(["overview", "constituency", "parliament"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all capitalize ${
              activeTab === tab
                ? "bg-violet-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="space-y-5">
            {/* Bio */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="mb-3 text-sm font-semibold text-white">Biography</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="mb-4 text-sm font-semibold text-white">Contact Information</h2>
              <ul className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: profile.email },
                  { icon: Phone, label: "Phone", value: profile.phone },
                  ...(profile.website ? [{ icon: Globe, label: "Website", value: profile.website }] : []),
                ].map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/15">
                      <Icon size={14} className="text-violet-400" aria-hidden />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-600 uppercase tracking-wide">{label}</p>
                      <p className="text-slate-300">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Committees */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="mb-3 text-sm font-semibold text-white">Parliamentary Committees</h2>
              <ul className="space-y-2">
                {profile.committees.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "constituency" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Total Population", value: `${(mockConstituencyStats.totalPopulation / 100000).toFixed(1)} Lakh` },
              { label: "Registered Voters", value: `${(mockConstituencyStats.registeredVoters / 100000).toFixed(1)} Lakh` },
              { label: "Villages", value: mockConstituencyStats.villages.toString() },
              { label: "Wards", value: mockConstituencyStats.wards.toString() },
              { label: "Area", value: `${mockConstituencyStats.area.toLocaleString()} km²` },
              { label: "Literacy Rate", value: `${mockConstituencyStats.literacyRate}%` },
              { label: "Male Population", value: `${(mockConstituencyStats.malePopulation / 100000).toFixed(1)} Lakh` },
              { label: "Female Population", value: `${(mockConstituencyStats.femalePopulation / 100000).toFixed(1)} Lakh` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex items-center justify-between">
                <span className="text-sm text-slate-400">{label}</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}

            {/* Caste/category breakdown */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:col-span-2">
              <h2 className="mb-4 text-sm font-semibold text-white">Social Category Breakdown</h2>
              <div className="space-y-3">
                <ProgressBar label="SC" value={mockConstituencyStats.scPopulation} max={mockConstituencyStats.totalPopulation} color="#f59e0b" />
                <ProgressBar label="ST" value={mockConstituencyStats.stPopulation} max={mockConstituencyStats.totalPopulation} color="#10b981" />
                <ProgressBar label="OBC" value={mockConstituencyStats.obcPopulation} max={mockConstituencyStats.totalPopulation} color="#8b5cf6" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "parliament" && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: FileText, label: "Questions Raised", value: profile.questionsRaised, color: "text-violet-400" },
                { icon: TrendingUp, label: "Bills Introduced", value: profile.billsIntroduced, color: "text-blue-400" },
                { icon: Award, label: "Attendance Rate", value: `${profile.attendanceRate}%`, color: "text-emerald-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-center">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/15 mb-3">
                    <Icon size={20} className={color} aria-hidden />
                  </div>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="mb-4 text-sm font-semibold text-white">Constituency Performance</h2>
              <div className="space-y-3">
                <ProgressBar label="Complaint Resolution Rate" value={mockMpStats.resolvedComplaints} max={mockMpStats.totalComplaints} color="#8b5cf6" />
                <ProgressBar label="Budget Utilization" value={mockMpStats.spentBudget} max={mockMpStats.totalBudget} color="#3b82f6" />
                <ProgressBar label="Project Completion Rate" value={mockMpStats.completedProjects} max={mockMpStats.totalProjects} color="#10b981" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
