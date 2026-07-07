"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit3,
  CheckCircle2,
  Building2,
  Calendar,
} from "lucide-react";
import PageHeader from "../../../components/citizen/shared/PageHeader";

const MOCK_PROFILE = {
  fullName: "Rahul Kumar",
  email: "rahul.kumar@example.com",
  phone: "9876543210",
  aadhaarNumber: "XXXX XXXX 5678",
  panNumber: "ABCDE1234F",
  dateOfBirth: "1990-03-15",
  gender: "Male",
  category: "General",
  occupation: "Private Employee",
  annualIncome: 480000,
  constituency: "Lucknow Central",
  district: "Lucknow",
  state: "Uttar Pradesh",
  pincode: "226001",
  address: {
    line1: "15-A, Gomti Nagar",
    line2: "Sector 8, Near Vishwas Khand",
    city: "Lucknow",
    district: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226010",
    country: "India",
  },
};

const sectionCls =
  "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5";

function InfoRow({
  icon,
  label,
  value,
  sensitive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sensitive?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-slate-500" aria-hidden>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-600">{label}</p>
        <p
          className={`mt-0.5 text-sm ${sensitive ? "font-mono text-slate-400" : "text-white"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const p = MOCK_PROFILE;

  return (
    <div className="space-y-6 max-w-[900px]">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and government IDs"
        actions={
          <Link
            href="/citizen/profile/edit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            <Edit3 size={15} aria-hidden />
            Edit Profile
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — avatar + summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-3xl font-black text-white shadow-xl shadow-blue-500/20">
              {p.fullName.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500">
              <CheckCircle2 size={14} className="text-white" aria-hidden />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold text-white">{p.fullName}</h2>
            <p className="text-sm text-slate-500">Citizen Account</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Verified ✓
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                {p.category}
              </span>
            </div>
          </div>

          <dl className="w-full space-y-2.5 border-t border-white/[0.06] pt-5">
            {[
              { term: "Constituency", def: p.constituency },
              { term: "District", def: p.district },
              { term: "State", def: p.state },
              { term: "Category", def: p.category },
              { term: "Income", def: `₹${p.annualIncome.toLocaleString("en-IN")}/yr` },
            ].map((item) => (
              <div key={item.term} className="flex justify-between text-sm">
                <dt className="text-slate-600">{item.term}</dt>
                <dd className="font-medium text-white">{item.def}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Right — sections */}
        <div className="space-y-5 lg:col-span-2">
          {/* Personal Details */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={sectionCls}
            aria-labelledby="personal-heading"
          >
            <h2 id="personal-heading" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Personal Details
            </h2>
            <InfoRow icon={<User size={16} />} label="Full Name" value={p.fullName} />
            <InfoRow icon={<Mail size={16} />} label="Email Address" value={p.email} />
            <InfoRow icon={<Phone size={16} />} label="Mobile Number" value={p.phone} />
            <InfoRow icon={<Calendar size={16} />} label="Date of Birth" value={new Date(p.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
            <InfoRow icon={<User size={16} />} label="Gender" value={p.gender} />
            <InfoRow icon={<Building2 size={16} />} label="Occupation" value={p.occupation} />
          </motion.section>

          {/* Government IDs */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={sectionCls}
            aria-labelledby="govids-heading"
          >
            <div className="flex items-center justify-between">
              <h2 id="govids-heading" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Government IDs
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Shield size={12} aria-hidden />
                Secured
              </div>
            </div>
            <InfoRow icon={<Shield size={16} />} label="Aadhaar Number" value={p.aadhaarNumber} sensitive />
            <InfoRow icon={<Shield size={16} />} label="PAN Number" value={p.panNumber} sensitive />
          </motion.section>

          {/* Address */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={sectionCls}
            aria-labelledby="address-heading"
          >
            <h2 id="address-heading" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Residential Address
            </h2>
            <InfoRow
              icon={<MapPin size={16} />}
              label="Address"
              value={`${p.address.line1}, ${p.address.line2 ?? ""}`}
            />
            <InfoRow icon={<MapPin size={16} />} label="City / District" value={`${p.address.city}, ${p.address.district}`} />
            <InfoRow icon={<MapPin size={16} />} label="State / PIN" value={`${p.address.state} — ${p.address.pincode}`} />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
