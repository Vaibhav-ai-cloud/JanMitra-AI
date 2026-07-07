"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Calendar,
  Clock,
  CheckCircle2,
  Edit3,
} from "lucide-react";
import { mockAdminProfile } from "../../../lib/adminMockData";

const permissionLabels: Record<string, string> = {
  "users.read": "View Users",
  "users.write": "Edit Users",
  "users.delete": "Delete Users",
  "complaints.read": "View Complaints",
  "complaints.write": "Edit Complaints",
  "schemes.read": "View Schemes",
  "schemes.write": "Edit Schemes",
  "reports.read": "View Reports",
  "reports.generate": "Generate Reports",
  "mps.read": "View MPs",
  "mps.write": "Edit MPs",
  "departments.read": "View Departments",
  "departments.write": "Edit Departments",
  "settings.read": "View Settings",
  "settings.write": "Edit Settings",
  "analytics.read": "View Analytics",
};

const permissionColor = (perm: string): string => {
  if (perm.endsWith(".delete")) return "border-red-500/25 bg-red-500/10 text-red-400";
  if (perm.endsWith(".write")) return "border-amber-500/25 bg-amber-500/10 text-amber-400";
  return "border-blue-500/25 bg-blue-500/10 text-blue-400";
};

export default function AdminProfilePage() {
  const profile = mockAdminProfile;
  const [editMode, setEditMode] = useState(false);
  const [formName, setFormName] = useState(profile.name);
  const [formPhone, setFormPhone] = useState(profile.phone);
  const [formDept, setFormDept] = useState(profile.department);

  const roleBadge: Record<string, string> = {
    super_admin: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    admin: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    moderator: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    viewer: "border-slate-500/30 bg-slate-500/10 text-slate-400",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
          <User size={20} className="text-blue-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Profile</h1>
          <p className="mt-0.5 text-sm text-slate-400">Your account details and permissions</p>
        </div>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-slate-950 p-6 sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-extrabold text-white shadow-xl shadow-blue-500/20 border-2 border-blue-500/30">
            {profile.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${roleBadge[profile.role] ?? roleBadge.admin}`}>
                <Shield size={11} aria-hidden />
                {profile.role.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm text-slate-400">{profile.department}</p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Mail size={12} aria-hidden />{profile.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={12} aria-hidden />{profile.phone}</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} aria-hidden />
                Joined {new Date(profile.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} aria-hidden />
                Last login {new Date(profile.lastLogin).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditMode((v) => !v)}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
            aria-pressed={editMode}
          >
            <Edit3 size={14} aria-hidden />
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </motion.div>

      {/* Edit / Info form */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <h2 className="mb-5 text-sm font-semibold text-white flex items-center gap-2">
          <User size={14} className="text-blue-400" aria-hidden />
          Account Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Full Name", value: formName, setter: setFormName, field: "name" },
            { label: "Phone Number", value: formPhone, setter: setFormPhone, field: "phone" },
            { label: "Department", value: formDept, setter: setFormDept, field: "dept" },
          ].map((field) => (
            <div key={field.field}>
              <label htmlFor={`admin-profile-${field.field}`} className="mb-1.5 block text-xs font-medium text-slate-500">
                {field.label}
              </label>
              {editMode ? (
                <input
                  id={`admin-profile-${field.field}`}
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
              ) : (
                <p id={`admin-profile-${field.field}`} className="text-sm text-slate-300 py-2">{field.value}</p>
              )}
            </div>
          ))}

          {/* Email (read-only) */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-500">Email (read-only)</p>
            <p className="text-sm text-slate-400 py-2">{profile.email}</p>
          </div>

          {/* Role (read-only) */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-500">Role (read-only)</p>
            <p className="text-sm text-slate-400 py-2 capitalize">{profile.role.replace("_", " ")}</p>
          </div>
        </div>

        {editMode && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all"
            >
              <CheckCircle2 size={15} aria-hidden />
              Save Changes
            </button>
          </div>
        )}
      </motion.div>

      {/* Permissions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
          <Shield size={14} className="text-violet-400" aria-hidden />
          Access Permissions
          <span className="ml-auto text-[11px] font-medium text-slate-500">{profile.permissions.length} permissions</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.permissions.map((perm) => (
            <span
              key={perm}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${permissionColor(perm)}`}
            >
              <CheckCircle2 size={11} aria-hidden />
              {permissionLabels[perm] ?? perm}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Account meta */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
      >
        <h2 className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
          <Building2 size={14} className="text-slate-400" aria-hidden />
          System Info
        </h2>
        <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
          {[
            { label: "Account ID", value: profile.id },
            { label: "Department", value: profile.department },
            { label: "Role Level", value: profile.role.replace("_", " ") },
            { label: "Joined", value: new Date(profile.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
            { label: "Last Login", value: new Date(profile.lastLogin).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
            { label: "Permissions", value: `${profile.permissions.length} granted` },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-slate-600 mb-0.5">{item.label}</dt>
              <dd className="font-medium text-slate-300 capitalize">{item.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  );
}
