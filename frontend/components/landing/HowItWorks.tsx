"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  Search,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Register as a Citizen",
    description:
      "Create your secure profile with Aadhaar verification in under 2 minutes. Your data is end-to-end encrypted and stays private at all times.",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/35",
    badge: "Quick & Easy",
  },
  {
    step: "02",
    icon: Search,
    title: "Discover Schemes & Services",
    description:
      "JanMitra AI analyses your profile and instantly surfaces every government scheme and benefit you are eligible for across all central and state ministries.",
    color: "from-violet-500 to-purple-500",
    glow: "shadow-violet-500/35",
    badge: "AI-Powered",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Ask JanMitra AI",
    description:
      "Chat in Hindi, English or any of 12 regional languages. Get instant eligibility checks, step-by-step application guidance and real-time updates.",
    color: "from-cyan-500 to-teal-500",
    glow: "shadow-cyan-500/35",
    badge: "Multilingual",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Track & Resolve",
    description:
      "File grievances with one tap, track their status in real time, and receive resolution notifications directly from your elected representative.",
    color: "from-emerald-500 to-green-500",
    glow: "shadow-emerald-500/35",
    badge: "Transparent",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32"
      aria-labelledby="how-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="How It Works"
          badgeColor="cyan"
          title={
            <span id="how-heading">
              Get Started in{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                4 Simple Steps
              </span>
            </span>
          }
          description="From registration to resolution — JanMitra AI makes government services effortlessly accessible for every Indian citizen."
        />

        {/* Step cards — simple vertical stack, no complex zigzag positioning */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="JanMitra AI steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]"
              >
                {/* Step number badge */}
                <div className="mb-5 flex items-center justify-between">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg ${step.glow}`}
                    aria-hidden="true"
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-white ring-2 ring-blue-500/50">
                    {step.step}
                  </span>
                </div>

                <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {step.badge}
                </div>

                <h3 className="mb-3 text-lg font-black text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-7 text-slate-400">
                  {step.description}
                </p>

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${step.color} transition-all duration-500 ease-out group-hover:w-full`}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
