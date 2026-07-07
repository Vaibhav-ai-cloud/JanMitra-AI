"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const faqs = [
  {
    question: "What is JanMitra AI and who is it built for?",
    answer:
      "JanMitra AI is an intelligent governance platform built for Smart India Hackathon. It connects citizens, Members of Parliament and government administrators through AI-powered services, grievance management, scheme discovery and constituency analytics. Any Indian citizen can use it free of charge.",
  },
  {
    question: "Is my personal data safe on JanMitra AI?",
    answer:
      "Absolutely. JanMitra AI uses end-to-end encryption, Aadhaar-based authentication and complies fully with India's Personal Data Protection standards. Your data is never sold to third parties and is stored on government-grade secure infrastructure.",
  },
  {
    question: "Which languages does JanMitra AI support?",
    answer:
      "JanMitra AI currently supports 12 Indian languages including Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia and Assamese. We are continuously expanding coverage towards all 22 scheduled languages of India.",
  },
  {
    question: "How quickly can I get a response to my grievance?",
    answer:
      "Once submitted, your grievance is instantly routed to the concerned authority with AI-assisted priority scoring. Citizens typically receive an initial response within 24–48 hours and full resolution within 7–30 days depending on the issue complexity.",
  },
  {
    question: "Which government schemes can JanMitra AI help with?",
    answer:
      "JanMitra AI integrates over 200 central and state government schemes covering agriculture (PM-KISAN, KCC), housing (PMAY), health (Ayushman Bharat, PMJAY), education (NSP scholarships), employment (MGNREGS) and many more. The AI checks your eligibility instantly based on your registered profile.",
  },
  {
    question: "Can MPs and government officials also use JanMitra AI?",
    answer:
      "Yes. JanMitra AI has a dedicated MP Dashboard with real-time constituency analytics, grievance heatmaps, development project tracking and direct citizen communication tools. District Collectors and administrators can access admin dashboards with aggregated insights.",
  },
  {
    question: "Does JanMitra AI work offline or on slow networks?",
    answer:
      "JanMitra AI is built as a Progressive Web App (PWA) that caches essential scheme information for offline browsing. For full AI assistant functionality, an internet connection is recommended, but the platform is optimised for 2G/3G networks common in rural India.",
  },
  {
    question: "Is JanMitra AI free to use for citizens?",
    answer:
      "Yes. JanMitra AI is entirely free for all Indian citizens. The platform is built under the Digital India initiative to democratise access to government services — there are no subscription fees, hidden charges or premium tiers for citizens.",
  },
];

interface FAQItemProps {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-blue-500/30 bg-blue-500/5"
          : "border-white/8 bg-white/4 hover:border-white/15"
      } backdrop-blur-sm`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left sm:px-7"
        id={`faq-btn-${index}`}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-start gap-3">
          <HelpCircle
            size={18}
            className={`mt-0.5 flex-shrink-0 transition-colors ${
              isOpen ? "text-blue-400" : "text-slate-500"
            }`}
            aria-hidden="true"
          />
          <span
            className={`text-base font-semibold leading-relaxed transition-colors ${
              isOpen ? "text-white" : "text-slate-200"
            }`}
          >
            {faq.question}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="mt-0.5 flex-shrink-0"
          aria-hidden="true"
        >
          <ChevronDown
            size={20}
            className={`transition-colors ${
              isOpen ? "text-blue-400" : "text-slate-500"
            }`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/8 px-6 pb-6 pt-4 sm:px-7">
              <p className="ml-7 leading-8 text-slate-400">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="FAQ"
          badgeColor="blue"
          title={
            <span id="faq-heading">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Questions
              </span>
            </span>
          }
          description={
            <>
              Everything you need to know about JanMitra AI. Can&apos;t find
              your answer?{" "}
              <a
                href="mailto:support@janmitra.ai"
                className="text-blue-400 underline underline-offset-4 transition hover:text-blue-300"
              >
                support@janmitra.ai
              </a>
            </>
          }
        />

        <div
          className="mx-auto max-w-3xl space-y-3"
          role="list"
          aria-label="Frequently asked questions"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
