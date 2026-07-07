"use client";

import { motion } from "framer-motion";
import {
  FileText,
  HeartPulse,
  GraduationCap,
  Home,
  Tractor,
  Briefcase,
  Zap,
  Globe,
  ArrowRight,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const services = [
  {
    icon: FileText,
    title: "Grievance Filing",
    description:
      "Submit and track grievances directly to your elected representative with real-time AI-powered status updates and resolution timelines.",
    badge: "Most Used",
    badgeColor: "bg-blue-500/20 text-blue-300",
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/25",
  },
  {
    icon: HeartPulse,
    title: "Health Schemes",
    description:
      "Discover and apply for Ayushman Bharat, PMJAY and state health programmes tailored to your eligibility profile.",
    badge: "",
    badgeColor: "",
    color: "from-rose-500 to-pink-400",
    glow: "shadow-rose-500/25",
  },
  {
    icon: GraduationCap,
    title: "Education Benefits",
    description:
      "Access scholarships, fellowships and skill development programmes with AI-guided application assistance.",
    badge: "",
    badgeColor: "",
    color: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/25",
  },
  {
    icon: Home,
    title: "Housing Schemes",
    description:
      "Navigate PM Awas Yojana, PMAY-U applications with step-by-step document checklists and eligibility checks.",
    badge: "",
    badgeColor: "",
    color: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/25",
  },
  {
    icon: Tractor,
    title: "Agriculture Support",
    description:
      "PM-KISAN, crop insurance, MSP and Kisan Credit Card — all scheme information consolidated in one place.",
    badge: "",
    badgeColor: "",
    color: "from-green-500 to-emerald-400",
    glow: "shadow-green-500/25",
  },
  {
    icon: Briefcase,
    title: "Employment Portal",
    description:
      "Job cards, MGNREGS work applications, PMKVY skilling and employment opportunities in your constituency.",
    badge: "",
    badgeColor: "",
    color: "from-sky-500 to-blue-400",
    glow: "shadow-sky-500/25",
  },
  {
    icon: Zap,
    title: "Utility Services",
    description:
      "Electricity, water and sanitation complaints resolved faster with AI-assisted routing to the correct authority.",
    badge: "Popular",
    badgeColor: "bg-amber-500/20 text-amber-300",
    color: "from-yellow-400 to-amber-500",
    glow: "shadow-yellow-400/25",
  },
  {
    icon: Globe,
    title: "Digital Literacy",
    description:
      "DigiLocker, e-Shram card, Jan Dhan Yojana registrations explained in 12+ regional languages by JanMitra AI.",
    badge: "",
    badgeColor: "",
    color: "from-teal-500 to-cyan-400",
    glow: "shadow-teal-500/25",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};

export default function GovernmentServices() {
  return (
    <section
      id="services"
      className="relative py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <Container>
        <SectionHeader
          badge="Government Services"
          badgeColor="cyan"
          title={
            <span id="services-heading">
              All Your Government Needs,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                One Platform
              </span>
            </span>
          }
          description="JanMitra AI aggregates 200+ government schemes and services, using AI to instantly guide every citizen to the right benefit — in their language."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -7 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/7"
              >
                {/* Badge */}
                {service.badge && (
                  <span
                    className={`absolute right-3.5 top-3.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-md ${service.glow}`}
                  aria-hidden="true"
                >
                  <Icon size={23} className="text-white" />
                </div>

                <h3 className="mb-2.5 text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-7 text-slate-400">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more <ArrowRight size={12} />
                </div>

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${service.color} transition-all duration-500 ease-out group-hover:w-full`}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
