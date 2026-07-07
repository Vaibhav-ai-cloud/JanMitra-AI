"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Shield, Globe2, Building2 } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";

const trustBadges = [
  { icon: Users, label: "1M+ Citizens" },
  { icon: Shield, label: "Aadhaar-Secured" },
  { icon: Globe2, label: "12+ Languages" },
  { icon: Building2, label: "Government-Backed" },
];

export default function CallToAction() {
  return (
    <section
      className="relative py-24 sm:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-blue-600/25 via-blue-500/8 to-cyan-500/15 px-6 py-20 text-center backdrop-blur-xl sm:px-12 md:px-24"
        >
          {/* Decorative background blobs */}
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/30 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/25 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 bg-blue-400/10 blur-[80px]"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/15 px-5 py-2 text-sm font-semibold text-blue-200"
            >
              <Sparkles size={15} className="text-blue-400" aria-hidden="true" />
              Join 1 Million+ Citizens Already on JanMitra AI
            </motion.div>

            {/* Headline */}
            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Your Government,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                At Your Fingertips
              </span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.33, duration: 0.6 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              Sign up free today. Discover the schemes you deserve, file
              grievances with confidence, and connect with your representative
              — all powered by JanMitra AI.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.46, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button href="/citizen" size="lg">
                <span className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight size={18} />
                </span>
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm"
                  >
                    <Icon size={14} className="text-blue-400" aria-hidden="true" />
                    {badge.label}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
