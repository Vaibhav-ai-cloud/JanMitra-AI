"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  BrainCircuit,
  MessageSquareText,
  ArrowRight,
  CheckCircle2,
  Mic,
  Globe2,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import Container from "../ui/Container";

const capabilities = [
  { icon: MessageSquareText, label: "Natural Language Chat" },
  { icon: Globe2, label: "12+ Indian Languages" },
  { icon: Sparkles, label: "AI Scheme Recommendations" },
  { icon: CheckCircle2, label: "Grievance Tracking" },
  { icon: Mic, label: "Voice Input Support" },
  { icon: BrainCircuit, label: "Constituency Insights" },
  { icon: Shield, label: "Aadhaar-Grade Security" },
  { icon: Zap, label: "Instant Eligibility Check" },
];

const chatMessages = [
  {
    type: "user" as const,
    text: "How do I apply for PM Awas Yojana?",
  },
  {
    type: "bot" as const,
    text: "Based on your profile, you are eligible for PMAY-U! You need:\n✓ Aadhaar card\n✓ Income certificate (< ₹6L/year)\n✓ Property documents\n\nShall I guide you through the online application now?",
  },
  {
    type: "user" as const,
    text: "मुझे PM किसान के बारे में बताएं",
  },
  {
    type: "bot" as const,
    text: "PM-KISAN योजना के तहत पात्र किसानों को ₹6,000 प्रति वर्ष मिलते हैं — तीन किस्तों में। क्या आप पंजीकरण शुरू करना चाहते हैं? 🌾",
  },
];

export default function AIShowcase() {
  const [inputValue, setInputValue] = useState("");

  return (
    <section
      id="ai"
      className="relative py-24 sm:py-32"
      aria-labelledby="ai-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
              <Sparkles size={13} />
              Next-Generation AI Assistant
            </span>

            <h2
              id="ai-heading"
              className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              Meet Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Governance
              </span>{" "}
              Assistant
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
              JanMitra AI understands citizen queries in natural language,
              explains government schemes, tracks grievances end-to-end,
              provides constituency insights and delivers multilingual
              assistance — instantly, 24×7.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.label}
                    className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-3 transition-all duration-200 hover:border-blue-400/20 hover:bg-white/7"
                  >
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20"
                      aria-hidden="true"
                    >
                      <Icon size={15} className="text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-200">
                      {cap.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/citizen">
                <span className="flex items-center gap-2">
                  Try AI Assistant
                  <ArrowRight size={16} />
                </span>
              </Button>
              <Button variant="outline">View Demo</Button>
            </div>
          </motion.div>

          {/* ── Right: Chat UI ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-violet-600/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
              {/* Window header */}
              <div className="flex items-center gap-3 border-b border-white/8 bg-slate-950/60 px-5 py-4">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-500/30">
                    <Bot size={20} className="text-white" />
                  </div>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">JanMitra AI</h3>
                  <p className="text-xs text-emerald-400">
                    Online &bull; AI Ready
                  </p>
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
              </div>

              {/* Messages */}
              <div
                className="space-y-4 px-5 py-5"
                role="log"
                aria-label="AI chat preview"
                aria-live="polite"
              >
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.18 + 0.3, duration: 0.4 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                        msg.type === "user"
                          ? "rounded-tr-sm bg-blue-600/85 text-white"
                          : "rounded-tl-sm bg-white/8 text-slate-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/8 px-4 py-3">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-slate-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          delay: dot * 0.2,
                          repeat: Infinity,
                          duration: 1.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input bar */}
              <div className="border-t border-white/8 p-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3">
                  <Mic
                    size={16}
                    className="flex-shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm text-slate-600">
                    Ask anything about government schemes...
                  </span>
                  <button
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 transition hover:bg-blue-500"
                    aria-label="Send message to JanMitra AI"
                  >
                    <ArrowRight size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}