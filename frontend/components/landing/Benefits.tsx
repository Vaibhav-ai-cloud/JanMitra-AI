"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Users2,
  Layers,
  ArrowRight,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";

const benefits = [
  {
    icon: Clock,
    title: "Save Countless Hours",
    description:
      "Stop standing in long queues. Access any government service digitally — any time, anywhere in India, from any device.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/20",
  },
  {
    icon: Globe2,
    title: "12+ Regional Languages",
    description:
      "Interact in Hindi, Tamil, Bengali, Telugu, Marathi and more. JanMitra AI breaks language barriers for every citizen.",
    gradient: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Aadhaar-Grade Security",
    description:
      "End-to-end encrypted, Aadhaar-authenticated and compliant with India's Personal Data Protection standards.",
    gradient: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Constituency Insights",
    description:
      "MPs and admins gain live dashboards tracking development, citizen sentiment and grievances across their constituencies.",
    gradient: "from-cyan-500 to-teal-400",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Users2,
    title: "Direct MP Communication",
    description:
      "Bridge the gap between citizens and representatives with transparent, AI-tracked communication and accountability tools.",
    gradient: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/20",
  },
  {
    icon: Layers,
    title: "200+ Schemes Integrated",
    description:
      "Central and state schemes unified — no more searching across multiple portals to find the right benefit.",
    gradient: "from-rose-500 to-pink-400",
    glow: "shadow-rose-500/20",
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="relative py-24 sm:py-32"
      aria-labelledby="benefits-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="Why Choose JanMitra AI"
          badgeColor="violet"
          title={
            <span id="benefits-heading">
              Benefits Built for{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Every Indian
              </span>
            </span>
          }
          description="Whether you are a citizen in a rural village or an MP managing a constituency of millions — JanMitra AI is purpose-built to serve you."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: (index % 3) * 0.1,
                  duration: 0.55,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -6 }}
                className="group flex gap-5 rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/7"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-md ${benefit.glow} transition-transform duration-300 group-hover:scale-110`}
                    aria-hidden="true"
                  >
                    <Icon size={23} className="text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-7 text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-lg font-semibold text-white">
            Ready to experience smarter governance?
          </p>
          <Button href="/citizen">
            <span className="flex items-center gap-2">
              Start for Free Today
              <ArrowRight size={16} />
            </span>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
