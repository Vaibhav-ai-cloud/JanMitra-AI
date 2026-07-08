"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, ExternalLink, MessageSquare, Phone, Mail } from "lucide-react";
import Link from "next/link";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import { cn } from "../../../utils/auth";

// ── FAQ Data ──────────────────────────────────────────────────────────────────

const categories = ["All", "Complaints", "Schemes", "Applications", "Account", "Technical"];

const faqs = [
  {
    id: "f1",
    category: "Complaints",
    question: "How do I file a grievance complaint?",
    answer: "Go to Complaints → New Complaint. Select the relevant category, describe the issue with specific location details, attach photos if available, and submit. You'll receive a unique ticket number (e.g., JM-2024-001) to track the status.",
  },
  {
    id: "f2",
    category: "Complaints",
    question: "How long does it take to resolve a complaint?",
    answer: "Resolution time varies by department and priority. Urgent complaints are typically addressed within 48 hours. High priority within 7 days, medium within 15 days, and low priority within 30 days. You can track real-time status updates from the complaint detail page.",
  },
  {
    id: "f3",
    category: "Schemes",
    question: "How does JanMitra AI determine my eligibility for schemes?",
    answer: "Eligibility is determined using your profile data — income, age, category (SC/ST/OBC/General), state, and occupation. Keep your profile updated for accurate recommendations. Always verify eligibility on the official portal before applying.",
  },
  {
    id: "f4",
    category: "Schemes",
    question: "Can I apply for multiple schemes at once?",
    answer: "Yes! You can apply for as many schemes as you're eligible for simultaneously. Your applications are tracked separately under Application History, each with its own reference number.",
  },
  {
    id: "f5",
    category: "Applications",
    question: "How do I check my application status?",
    answer: "Go to Applications page to see all your scheme applications with current status (Submitted, Under Review, Approved, Rejected, Disbursed). For complaints, go to My Complaints and open the specific ticket.",
  },
  {
    id: "f6",
    category: "Account",
    question: "How do I update my personal information?",
    answer: "Go to Profile → Edit Profile. You can update your name, mobile number, address, occupation, and annual income. Government IDs (Aadhaar, PAN) cannot be changed directly — contact support for corrections.",
  },
  {
    id: "f7",
    category: "Account",
    question: "Is my data secure on JanMitra AI?",
    answer: "Yes. All your data is encrypted using AES-256 encryption. Government IDs are masked and never shared with third parties. We comply with India's Personal Data Protection framework. You can delete your account and all associated data anytime from Settings.",
  },
  {
    id: "f8",
    category: "Technical",
    question: "The AI assistant is not responding correctly. What should I do?",
    answer: "Try starting a new conversation using the + button in the chat sidebar. If the issue persists, try refreshing the page. The AI assistant works best with specific questions — for example, 'Am I eligible for PMAY?' rather than vague queries.",
  },
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-white">{faq.question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-500"
          aria-hidden
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-400 leading-7">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchSearch =
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-[900px]">
      <PageHeader
        title="Help Center"
        subtitle="Find answers to common questions about JanMitra AI"
      />

      {/* Hero search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-cyan-500/10 p-8 text-center"
      >
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />
        <HelpCircle size={28} className="mx-auto mb-3 text-blue-400" aria-hidden />
        <h2 className="text-lg font-bold text-white mb-4">How can we help you?</h2>
        <div className="relative mx-auto max-w-md">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/[0.1] bg-white/[0.08] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 backdrop-blur-sm"
            aria-label="Search help topics"
          />
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* FAQ */}
        <div className="space-y-5 lg:col-span-2">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                    : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:text-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6"
            aria-label="Frequently Asked Questions"
          >
            {filtered.length > 0 ? (
              filtered.map((faq) => <FaqItem key={faq.id} faq={faq} />)
            ) : (
              <p className="py-8 text-center text-sm text-slate-500">
                No results found. Try different search terms.
              </p>
            )}
          </motion.div>
        </div>

        {/* Contact sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Still need help?</h2>
            <div className="space-y-3">
              {[
                {
                  icon: <MessageSquare size={16} />,
                  label: "AI Assistant",
                  desc: "Chat with JanMitra AI",
                  href: "/citizen/ai",
                  color: "text-violet-400",
                },
                {
                  icon: <Mail size={16} />,
                  label: "Email Support",
                  desc: "support@janmitra.gov.in",
                  href: "mailto:support@janmitra.gov.in",
                  color: "text-blue-400",
                },
                {
                  icon: <Phone size={16} />,
                  label: "Helpline",
                  desc: "1800-XXX-XXXX (Toll Free)",
                  href: "tel:1800000000",
                  color: "text-emerald-400",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5 text-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
                >
                  <span className={cn("shrink-0", item.color)} aria-hidden>{item.icon}</span>
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <ExternalLink size={13} className="ml-auto text-slate-600" aria-hidden />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h2 className="mb-2 text-sm font-semibold text-white">Response Times</h2>
            <dl className="space-y-2">
              {[
                { dt: "AI Assistant", dd: "Instant" },
                { dt: "Email Support", dd: "24–48 hours" },
                { dt: "Phone Helpline", dd: "Mon–Sat, 9am–6pm" },
              ].map((item) => (
                <div key={item.dt} className="flex justify-between text-xs">
                  <dt className="text-slate-500">{item.dt}</dt>
                  <dd className="text-slate-300">{item.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
