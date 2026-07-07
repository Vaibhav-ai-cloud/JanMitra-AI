"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Globe,
  Bell,
  Lock,
  Shield,
  Eye,
  ChevronRight,
  Moon,
  Smartphone,
  Key,
  Trash2,
} from "lucide-react";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import { cn } from "../../../utils/auth";

// ── Toggle ────────────────────────────────────────────────────────────────────

function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3"
      aria-label={label}
    >
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={label}
        />
        <div
          className={cn(
            "h-6 w-11 rounded-full border transition-all duration-200",
            checked
              ? "border-blue-500/60 bg-blue-500"
              : "border-white/[0.12] bg-white/[0.06]"
          )}
        />
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow"
        />
      </div>
    </label>
  );
}

// ── Setting Row ───────────────────────────────────────────────────────────────

function SettingRow({
  icon,
  label,
  description,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-slate-500" aria-hidden>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-xs text-slate-600 mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function Section({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-1 divide-y divide-white/[0.04]"
    >
      <div className="flex items-center gap-2 py-4">
        <span className="text-blue-400" aria-hidden>{icon}</span>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </motion.section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [notifComplaint, setNotifComplaint] = useState(true);
  const [notifScheme, setNotifScheme] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [activityLog, setActivityLog] = useState(true);

  return (
    <div className="space-y-6 max-w-[700px]">
      <PageHeader title="Settings" subtitle="Manage your account preferences" />

      {/* Appearance */}
      <Section icon={<Palette size={16} />} title="Appearance" delay={0.05}>
        <SettingRow
          icon={<Moon size={16} />}
          label="Dark Mode"
          description="Use dark theme across the dashboard"
          right={
            <Toggle
              id="dark-mode"
              checked={darkMode}
              onChange={setDarkMode}
              label="Toggle dark mode"
            />
          }
        />
      </Section>

      {/* Language */}
      <Section icon={<Globe size={16} />} title="Language & Region" delay={0.1}>
        <SettingRow
          icon={<Globe size={16} />}
          label="Display Language"
          description="Choose your preferred language"
          right={
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-8 rounded-lg border border-white/[0.08] bg-white/[0.06] px-3 text-xs text-white outline-none hover:border-white/[0.14] focus:border-blue-500/50"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="bn">বাংলা</option>
            </select>
          }
        />
      </Section>

      {/* Notification Preferences */}
      <Section icon={<Bell size={16} />} title="Notification Preferences" delay={0.15}>
        {[
          { id: "notif-email", label: "Email Notifications", desc: "Receive updates via email", val: notifEmail, set: setNotifEmail },
          { id: "notif-sms", label: "SMS Alerts", desc: "Receive SMS for urgent updates", val: notifSms, set: setNotifSms },
          { id: "notif-complaint", label: "Complaint Updates", desc: "Notify on complaint status changes", val: notifComplaint, set: setNotifComplaint },
          { id: "notif-scheme", label: "New Schemes", desc: "Notify when eligible schemes are added", val: notifScheme, set: setNotifScheme },
        ].map((item) => (
          <SettingRow
            key={item.id}
            icon={<Bell size={15} />}
            label={item.label}
            description={item.desc}
            right={
              <Toggle id={item.id} checked={item.val} onChange={item.set} label={item.label} />
            }
          />
        ))}
      </Section>

      {/* Security */}
      <Section icon={<Lock size={16} />} title="Security" delay={0.2}>
        <SettingRow
          icon={<Key size={16} />}
          label="Two-Factor Authentication"
          description="Add an extra layer of security"
          right={
            <Toggle id="twofa" checked={twoFA} onChange={setTwoFA} label="Toggle 2FA" />
          }
        />
        <SettingRow
          icon={<Smartphone size={16} />}
          label="Login Alerts"
          description="Get notified of new sign-ins"
          right={
            <Toggle id="login-alerts" checked={loginAlerts} onChange={setLoginAlerts} label="Toggle login alerts" />
          }
        />
        <SettingRow
          icon={<Key size={16} />}
          label="Change Password"
          description="Update your account password"
          right={
            <button className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Update <ChevronRight size={13} aria-hidden />
            </button>
          }
        />
      </Section>

      {/* Privacy */}
      <Section icon={<Shield size={16} />} title="Privacy" delay={0.25}>
        <SettingRow
          icon={<Eye size={16} />}
          label="Data Sharing"
          description="Allow anonymised data to improve services"
          right={
            <Toggle id="data-sharing" checked={dataSharing} onChange={setDataSharing} label="Toggle data sharing" />
          }
        />
        <SettingRow
          icon={<Eye size={16} />}
          label="Activity Log"
          description="Keep a log of your account activity"
          right={
            <Toggle id="activity-log" checked={activityLog} onChange={setActivityLog} label="Toggle activity log" />
          }
        />
      </Section>

      {/* Danger zone */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-6 py-5"
        aria-labelledby="danger-heading"
      >
        <h2 id="danger-heading" className="mb-4 text-sm font-semibold text-red-400">Danger Zone</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white">Delete Account</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently delete your account and all data</p>
          </div>
          <button
            className="flex items-center gap-2 rounded-xl border border-red-500/30 px-3.5 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Delete account"
          >
            <Trash2 size={14} aria-hidden />
            Delete
          </button>
        </div>
      </motion.section>
    </div>
  );
}
