"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homemaker",
    location: "Lucknow, Uttar Pradesh",
    initials: "PS",
    gradient: "from-pink-500 to-rose-400",
    stars: 5,
    quote:
      "JanMitra AI helped me apply for PM Awas Yojana in just 20 minutes. Earlier I spent 3 months visiting government offices without any success. The Hindi chatbot explained every document I needed clearly.",
  },
  {
    name: "Rajesh Kumar Verma",
    role: "Farmer",
    location: "Patna, Bihar",
    initials: "RK",
    gradient: "from-green-500 to-emerald-400",
    stars: 5,
    quote:
      "Getting PM-KISAN registration was always a headache. JanMitra AI guided me step by step in my language and checked my eligibility instantly. My ₹2,000 arrived in 10 days after registration.",
  },
  {
    name: "Dr. Meenakshi Nair",
    role: "Member of Parliament",
    location: "Thiruvananthapuram, Kerala",
    initials: "MN",
    gradient: "from-blue-500 to-cyan-400",
    stars: 5,
    quote:
      "The constituency analytics dashboard is invaluable. I can see grievance hotspots, track resolution rates and communicate directly with citizens — all in one powerful platform. A game changer.",
  },
  {
    name: "Arjun Patel",
    role: "College Student",
    location: "Ahmedabad, Gujarat",
    initials: "AP",
    gradient: "from-violet-500 to-purple-400",
    stars: 5,
    quote:
      "Found three scholarships I had no idea existed through JanMitra AI. The AI checked my eligibility and helped me fill the applications too. Got ₹45,000 in scholarships this academic year alone.",
  },
  {
    name: "Sunita Devi",
    role: "ASHA Worker",
    location: "Jaipur, Rajasthan",
    initials: "SD",
    gradient: "from-amber-500 to-orange-400",
    stars: 5,
    quote:
      "I use JanMitra AI to help villagers access health schemes. The multilingual support makes it incredibly easy to explain Ayushman Bharat to families who have never used smartphones before.",
  },
  {
    name: "Vikram Sinha",
    role: "District Collector",
    location: "Bhopal, Madhya Pradesh",
    initials: "VS",
    gradient: "from-teal-500 to-cyan-400",
    stars: 5,
    quote:
      "The admin dashboard provides real-time insight into citizen satisfaction and scheme uptake across my district. It has transformed how we prioritise development projects and track resolutions.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="Testimonials"
          badgeColor="cyan"
          title={
            <span id="testimonials-heading">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Real Citizens
              </span>
            </span>
          }
          description="Hear directly from the people whose lives JanMitra AI has transformed — from farmers in Bihar to MPs in Kerala."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: (index % 3) * 0.1,
                duration: 0.55,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -7 }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/7"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="mb-5 text-blue-500/25 transition-colors duration-300 group-hover:text-blue-400/40"
                aria-hidden="true"
              />

              {/* Stars */}
              <div
                className="mb-4 flex gap-1"
                role="img"
                aria-label={`${t.stars} out of 5 stars`}
              >
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-7 text-sm leading-8 text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient} text-sm font-black text-white shadow-md`}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">
                    {t.role} &bull; {t.location}
                  </p>
                </div>
              </figcaption>

              {/* Accent line */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${t.gradient} transition-all duration-500 ease-out group-hover:w-full`}
                aria-hidden="true"
              />
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
