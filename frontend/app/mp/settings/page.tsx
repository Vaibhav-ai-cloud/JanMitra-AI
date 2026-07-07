"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Globe, Palette, Save, CheckCircle2 } from "lucide-react";
import { cn } from "../../../utils/auth";

type SettingsTab = "notifications" | "privacy" | "display" | "regional";

const tabs: { value: SettingsTab; label: string; icon: React.ElementType }[] = [
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "privacy", label: "Privacy & Security", icon: Shield },
  { value: "display", label: "Display", icon: Palette },
  { value: "regional", label: "Regional", icon: Globe },
];

const switchCls = "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60";
const inputCls = "h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all";
const sectionCls = "rounded-2xl border border-white/[0.08] bg-white/[0.02] divide-y divide-white/[0.06]";
const rowCls = "flex items-center justify-between gap-4 px-5 py-4";

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(switchCls, checked ? "bg-violet-500" : "bg-slate-700")}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
        aria-hidden
      />
    </button>
  );
}

export default function MpSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("notifications");
  const [saved, setSaved] = useState(false);

  // Notification settings
  const [notifs, setNotifs] = useState({
    emailComplaints: true,
    emailProjects: true,
    emailSchemes: false,
    pushComplaints: true,
    pushProjects: false,
    pushSchemes: false,
    dailyDigest: true,
    weeklyReport: true,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    publicProfile: true,
    dataSharing: false,
  });

  // Display settings
  const [display, setDisplay] = useState({
    compactMode: false,
    animationsEnabled: true,
    highContrast: false,
  });

  // Regional
  const [regional, setRegional] = useState({
    language: "en",
    dateFormat: "DD/MM/YYYY",
    timezone: "Asia/Kolkata",
    currency: "INR",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
            <Settings size={20} className="text-violet-400" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Settings</h1>
            <p className="mt-0.5 text-sm text-slate-400">Manage your portal preferences</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
        >
          {saved ? <CheckCircle2 size={16} aria-hidden /> : <Save size={16} aria-hidden />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex gap-1 flex-wrap rounded-xl border border-white/[0.06] bg-white/[0.02] p-1"
        role="tablist"
      >
        {tabs.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            role="tab"
            aria-selected={activeTab === value}
            onClick={() => setActiveTab(value)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeTab === value
                ? "bg-violet-500 text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Icon size={15} aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {activeTab === "notifications" && (
          <>
            <div className={sectionCls}>
              <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600">Email Notifications</div>
              {[
                { key: "emailComplaints", label: "New & updated complaints", desc: "When complaints are filed or their status changes" },
                { key: "emailProjects", label: "Project updates", desc: "Milestone completions and project status changes" },
                { key: "emailSchemes", label: "Scheme coverage alerts", desc: "When scheme coverage drops below 70%" },
              ].map(({ key, label, desc }) => (
                <div key={key} className={rowCls}>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle
                    id={`email-${key}`}
                    checked={notifs[key as keyof typeof notifs] as boolean}
                    onChange={(v) => setNotifs((n) => ({ ...n, [key]: v }))}
                  />
                </div>
              ))}
            </div>

            <div className={sectionCls}>
              <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600">Push Notifications</div>
              {[
                { key: "pushComplaints", label: "Urgent complaints", desc: "Immediate alerts for urgent priority complaints" },
                { key: "pushProjects", label: "Project deadlines", desc: "Reminder 7 days before milestone due dates" },
                { key: "pushSchemes", label: "Scheme alerts", desc: "Low coverage warnings and deadline reminders" },
              ].map(({ key, label, desc }) => (
                <div key={key} className={rowCls}>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle
                    id={`push-${key}`}
                    checked={notifs[key as keyof typeof notifs] as boolean}
                    onChange={(v) => setNotifs((n) => ({ ...n, [key]: v }))}
                  />
                </div>
              ))}
            </div>

            <div className={sectionCls}>
              <div className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600">Digests & Reports</div>
              {[
                { key: "dailyDigest", label: "Daily activity digest", desc: "Summary of constituency activities every morning" },
                { key: "weeklyReport", label: "Weekly performance report", desc: "Comprehensive weekly analytics report" },
              ].map(({ key, label, desc }) => (
                <div key={key} className={rowCls}>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle
                    id={`digest-${key}`}
                    checked={notifs[key as keyof typeof notifs] as boolean}
                    onChange={(v) => setNotifs((n) => ({ ...n, [key]: v }))}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4">
            <div className={sectionCls}>
              {[
                { key: "twoFactor", label: "Two-Factor Authentication", desc: "Require OTP on every login" },
                { key: "publicProfile", label: "Public Profile", desc: "Allow citizens to view your public profile page" },
                { key: "dataSharing", label: "Analytics Data Sharing", desc: "Share anonymized constituency data for national insights" },
              ].map(({ key, label, desc }) => (
                <div key={key} className={rowCls}>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <Toggle
                    id={`priv-${key}`}
                    checked={privacy[key as keyof typeof privacy] as boolean}
                    onChange={(v) => setPrivacy((p) => ({ ...p, [key]: v }))}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <label htmlFor="session-timeout" className="block text-sm font-medium text-white mb-3">
                Session Timeout (minutes)
              </label>
              <select
                id="session-timeout"
                value={privacy.sessionTimeout}
                onChange={(e) => setPrivacy((p) => ({ ...p, sessionTimeout: e.target.value }))}
                className="h-10 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer"
              >
                {["15", "30", "60", "120"].map((v) => (
                  <option key={v} value={v} className="bg-slate-900">{v} minutes</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-5">
              <h2 className="mb-2 text-sm font-semibold text-red-400">Danger Zone</h2>
              <p className="mb-3 text-xs text-slate-500">Irreversible actions — proceed with caution.</p>
              <button className="rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                Delete Account Data
              </button>
            </div>
          </div>
        )}

        {activeTab === "display" && (
          <div className={sectionCls}>
            {[
              { key: "compactMode", label: "Compact Mode", desc: "Reduce padding and spacing for more content density" },
              { key: "animationsEnabled", label: "Animations", desc: "Enable Framer Motion animations and transitions" },
              { key: "highContrast", label: "High Contrast", desc: "Increase text contrast for better readability" },
            ].map(({ key, label, desc }) => (
              <div key={key} className={rowCls}>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <Toggle
                  id={`disp-${key}`}
                  checked={display[key as keyof typeof display] as boolean}
                  onChange={(v) => setDisplay((d) => ({ ...d, [key]: v }))}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "regional" && (
          <div className="space-y-4">
            {[
              {
                id: "lang",
                label: "Language",
                value: regional.language,
                options: [{ value: "en", label: "English" }, { value: "hi", label: "हिन्दी (Hindi)" }, { value: "ur", label: "اردو (Urdu)" }],
                onChange: (v: string) => setRegional((r) => ({ ...r, language: v })),
              },
              {
                id: "date",
                label: "Date Format",
                value: regional.dateFormat,
                options: [{ value: "DD/MM/YYYY", label: "DD/MM/YYYY" }, { value: "MM/DD/YYYY", label: "MM/DD/YYYY" }, { value: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)" }],
                onChange: (v: string) => setRegional((r) => ({ ...r, dateFormat: v })),
              },
              {
                id: "tz",
                label: "Timezone",
                value: regional.timezone,
                options: [{ value: "Asia/Kolkata", label: "IST (UTC+5:30)" }],
                onChange: (v: string) => setRegional((r) => ({ ...r, timezone: v })),
              },
            ].map((sel) => (
              <div key={sel.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                <label htmlFor={sel.id} className="block text-sm font-medium text-white mb-2">{sel.label}</label>
                <select
                  id={sel.id}
                  value={sel.value}
                  onChange={(e) => sel.onChange(e.target.value)}
                  className="h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-slate-300 outline-none focus:border-violet-500/50 cursor-pointer"
                >
                  {sel.options.map((o) => (
                    <option key={o.value} value={o.value} className="bg-slate-900">{o.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
