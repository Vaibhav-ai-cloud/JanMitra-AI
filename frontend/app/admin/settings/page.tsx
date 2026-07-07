"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Database,
  Key,
  Sliders,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  value: boolean;
}

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function SettingsSection({ id, title, icon, color, children }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-labelledby={id}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
    >
      <h2
        id={id}
        className="mb-5 flex items-center gap-2 text-sm font-semibold text-white"
      >
        <span style={{ color }} aria-hidden>{icon}</span>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

function ToggleRow({
  setting,
  onToggle,
}: {
  setting: ToggleSetting;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.04] last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{setting.label}</p>
        <p className="text-xs text-slate-500">{setting.description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={setting.value}
        onClick={onToggle}
        className="shrink-0 text-2xl transition-colors"
        aria-label={`Toggle ${setting.label}`}
      >
        {setting.value ? (
          <ToggleRight className="text-blue-400" aria-hidden />
        ) : (
          <ToggleLeft className="text-slate-600" aria-hidden />
        )}
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  // Notification toggles
  const [notifications, setNotifications] = useState<ToggleSetting[]>([
    { id: "n1", label: "Email Notifications", description: "Receive important alerts via email", value: true },
    { id: "n2", label: "Complaint Alerts", description: "Notify on new or escalated complaints", value: true },
    { id: "n3", label: "User Activity Alerts", description: "Alerts on suspicious user activity", value: false },
    { id: "n4", label: "Scheme Deadline Alerts", description: "Remind before scheme deadlines", value: true },
    { id: "n5", label: "System Health Alerts", description: "Critical system and API failure alerts", value: true },
  ]);

  // Security toggles
  const [security, setSecurity] = useState<ToggleSetting[]>([
    { id: "s1", label: "Two-Factor Authentication", description: "Require 2FA for admin login", value: true },
    { id: "s2", label: "Session Timeout", description: "Auto-logout after 30 mins of inactivity", value: true },
    { id: "s3", label: "IP Whitelist", description: "Restrict admin access to approved IPs", value: false },
    { id: "s4", label: "Audit Logging", description: "Log all admin actions for compliance", value: true },
  ]);

  // Platform toggles
  const [platform, setPlatform] = useState<ToggleSetting[]>([
    { id: "p1", label: "Maintenance Mode", description: "Put the platform into read-only maintenance mode", value: false },
    { id: "p2", label: "AI Chatbot", description: "Enable the AI citizen assistant", value: true },
    { id: "p3", label: "Complaint Auto-Assignment", description: "Auto-assign complaints by department", value: true },
    { id: "p4", label: "Scheme Recommendations", description: "Enable AI-based scheme eligibility matching", value: true },
    { id: "p5", label: "Public Registration", description: "Allow new citizens to register", value: true },
  ]);

  const [saved, setSaved] = useState(false);

  const toggle = (
    list: ToggleSetting[],
    setter: React.Dispatch<React.SetStateAction<ToggleSetting[]>>,
    id: string
  ) => {
    setter(list.map((s) => s.id === id ? { ...s, value: !s.value } : s));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/15 border border-slate-500/20">
          <Settings size={20} className="text-slate-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Settings</h1>
          <p className="mt-0.5 text-sm text-slate-400">Manage admin preferences and platform configuration</p>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <SettingsSection id="notification-settings" title="Notifications" icon={<Bell size={14} />} color="#60a5fa">
        <div>
          {notifications.map((n) => (
            <ToggleRow key={n.id} setting={n} onToggle={() => toggle(notifications, setNotifications, n.id)} />
          ))}
        </div>
      </SettingsSection>

      {/* Security Settings */}
      <SettingsSection id="security-settings" title="Security" icon={<Shield size={14} />} color="#a78bfa">
        <div>
          {security.map((s) => (
            <ToggleRow key={s.id} setting={s} onToggle={() => toggle(security, setSecurity, s.id)} />
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3.5 flex gap-2.5">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-400" aria-hidden />
          <p className="text-xs text-amber-300 leading-relaxed">
            Disabling Two-Factor Authentication reduces account security. Only change this if instructed by your IT administrator.
          </p>
        </div>
      </SettingsSection>

      {/* Platform Settings */}
      <SettingsSection id="platform-settings" title="Platform Configuration" icon={<Sliders size={14} />} color="#34d399">
        <div>
          {platform.map((p) => (
            <ToggleRow key={p.id} setting={p} onToggle={() => toggle(platform, setPlatform, p.id)} />
          ))}
        </div>
        {platform.find((p) => p.id === "p1")?.value && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3.5 flex gap-2.5">
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
            <p className="text-xs text-red-300 leading-relaxed">
              Maintenance mode is <strong>enabled</strong>. Citizens will see a maintenance notice and cannot submit complaints or apply for schemes.
            </p>
          </div>
        )}
      </SettingsSection>

      {/* System info */}
      <SettingsSection id="system-info" title="System Information" icon={<Database size={14} />} color="#22d3ee">
        <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
          {[
            { label: "Platform Version", value: "2.4.1" },
            { label: "Next.js Version", value: "14.2.15" },
            { label: "Database", value: "PostgreSQL 15" },
            { label: "AI Engine", value: "Gemini 2.0 Flash" },
            { label: "API Gateway", value: "FastAPI 0.115" },
            { label: "Last Backup", value: "Today, 03:00 AM" },
            { label: "System Uptime", value: "99.7%" },
            { label: "Total Storage", value: "284 GB / 500 GB" },
            { label: "Environment", value: "Production" },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-slate-600 mb-0.5">{item.label}</dt>
              <dd className="font-medium text-slate-300">{item.value}</dd>
            </div>
          ))}
        </dl>
      </SettingsSection>

      {/* API Keys */}
      <SettingsSection id="api-settings" title="API Keys" icon={<Key size={14} />} color="#f59e0b">
        <div className="space-y-3">
          {[
            { label: "AI Engine API Key", maskedValue: "ge-••••••••••••••••••••••••••••••7f3a", lastRotated: "Dec 15, 2024" },
            { label: "Maps API Key", maskedValue: "AIza••••••••••••••••••••••••••••Sq9K", lastRotated: "Nov 20, 2024" },
            { label: "SMS Gateway Key", maskedValue: "sms_••••••••••••••••••••••••••••••4d1c", lastRotated: "Jan 5, 2025" },
          ].map((key) => (
            <div key={key.label} className="flex flex-col gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-white">{key.label}</p>
                <p className="mt-0.5 font-mono text-[11px] text-slate-500">{key.maskedValue}</p>
                <p className="text-[10px] text-slate-600">Last rotated: {key.lastRotated}</p>
              </div>
              <button
                type="button"
                className="mt-2 sm:mt-0 shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-amber-400 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all"
              >
                Rotate Key
              </button>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* Regional Settings */}
      <SettingsSection id="regional-settings" title="Regional & Language" icon={<Globe size={14} />} color="#38bdf8">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { id: "timezone", label: "Timezone", defaultValue: "Asia/Kolkata (IST +05:30)", options: ["Asia/Kolkata (IST +05:30)", "UTC", "America/New_York"] },
            { id: "date-format", label: "Date Format", defaultValue: "DD/MM/YYYY", options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
            { id: "language", label: "Default Language", defaultValue: "English (en)", options: ["English (en)", "Hindi (hi)", "Bengali (bn)"] },
            { id: "currency", label: "Currency", defaultValue: "INR (₹)", options: ["INR (₹)", "USD ($)"] },
          ].map((setting) => (
            <div key={setting.id}>
              <label htmlFor={setting.id} className="mb-1.5 block text-xs font-medium text-slate-500">
                {setting.label}
              </label>
              <select
                id={setting.id}
                defaultValue={setting.defaultValue}
                className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
              >
                {setting.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all"
        >
          {saved ? (
            <>
              <CheckCircle2 size={15} aria-hidden />
              Saved!
            </>
          ) : (
            <>
              <Settings size={15} aria-hidden />
              Save All Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
