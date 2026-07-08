"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MapPinned,
  BarChart3,
  ShieldCheck,
  Bell,
  Languages,
  FileSearch,
  Smartphone,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const features = [
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Intelligent multilingual chatbot helping citizens navigate 200+ government schemes, file grievances and get instant answers in 12+ Indian languages.",
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/25",
  },
  {
    icon: MapPinned,
    title: "Smart Constituency Map",
    description:
      "Interactive geospatial maps with live project tracking, complaint heatmaps, infrastructure status and ward-level development data.",
    color: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/25",
  },
  {
    icon: BarChart3,
    title: "Live Analytics Dashboard",
    description:
      "Powerful dashboards with real-time constituency insights, sentiment analysis, grievance resolution rates and performance reports for MPs.",
    color: "from-cyan-500 to-teal-400",
    glow: "shadow-cyan-500/25",
  },
  {
    icon: ShieldCheck,
    title: "Aadhaar-Grade Security",
    description:
      "Aadhaar-authenticated, end-to-end encrypted with enterprise-grade infrastructure compliant with India's Personal Data Protection standards.",
    color: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/25",
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description:
      "Proactive push notifications for grievance updates, new scheme announcements, application deadlines and constituency news.",
    color: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/25",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description:
      "Full platform support in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia and Assamese.",
    color: "from-rose-500 to-pink-400",
    glow: "shadow-rose-500/25",
  },
  {
    icon: FileSearch,
    title: "Smart Scheme Discovery",
    description:
      "AI-powered eligibility scanner across 200+ central and state schemes. One profile scan reveals every benefit you deserve.",
    color: "from-sky-500 to-blue-400",
    glow: "shadow-sky-500/25",
  },
  {
    icon: Smartphone,
    title: "Mobile-First PWA",
    description:
      "Progressive Web App works on any device with offline caching, fast load times and a native app-like experience without installation.",
    color: "from-indigo-500 to-violet-400",
    glow: "shadow-indigo-500/25",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 sm:py-32"
      aria-labelledby="features-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="Key Features"
          badgeColor="blue"
          title={
            <>
              Why{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                JanMitra AI?
              </span>
            </>
          }
          description="Built with Artificial Intelligence to simplify governance, improve transparency and strengthen communication between citizens and their elected representatives."
        />

        <div
          id="features-heading"
          className="sr-only"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: (index % 4) * 0.08,
                  duration: 0.55,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/7 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className={`mb-6 flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-md ${feature.glow}`}
                  aria-hidden="true"
                >
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="mb-3 text-lg font-bold text-white">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>

                {/* Hover bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${feature.color} transition-all duration-500 ease-out group-hover:w-full`}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}