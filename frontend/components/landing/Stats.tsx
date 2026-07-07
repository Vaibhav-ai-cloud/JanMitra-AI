"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Map, Bot, Star, FileCheck, Globe2 } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

interface StatItem {
  icon: typeof Users;
  endValue: number;
  display: string;
  suffix: string;
  prefix: string;
  title: string;
  description: string;
  color: string;
  glow: string;
}

const stats: StatItem[] = [
  {
    icon: Users,
    endValue: 1000000,
    display: "1M",
    suffix: "+",
    prefix: "",
    title: "Citizens Served",
    description: "Registered users across all Indian states",
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/25",
  },
  {
    icon: Map,
    endValue: 543,
    display: "543",
    suffix: "",
    prefix: "",
    title: "Constituencies",
    description: "All Lok Sabha constituencies fully covered",
    color: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/25",
  },
  {
    icon: Bot,
    endValue: 99,
    display: "24/7",
    suffix: "",
    prefix: "",
    title: "AI Availability",
    description: "Always-on intelligent citizen assistance",
    color: "from-cyan-500 to-teal-400",
    glow: "shadow-cyan-500/25",
  },
  {
    icon: Star,
    endValue: 99,
    display: "99.8",
    suffix: "%",
    prefix: "",
    title: "Satisfaction Rate",
    description: "Positive citizen experience score",
    color: "from-amber-500 to-orange-400",
    glow: "shadow-amber-500/25",
  },
  {
    icon: FileCheck,
    endValue: 200,
    display: "200",
    suffix: "+",
    prefix: "",
    title: "Schemes Integrated",
    description: "Central and state government schemes",
    color: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/25",
  },
  {
    icon: Globe2,
    endValue: 12,
    display: "12",
    suffix: "+",
    prefix: "",
    title: "Languages",
    description: "Indian regional languages supported",
    color: "from-rose-500 to-pink-400",
    glow: "shadow-rose-500/25",
  },
];

/** Animated counter hook */
function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);

  return count;
}

function StatCard({ item, isInView }: { item: StatItem; isInView: boolean }) {
  const Icon = item.icon;
  const isSpecial = item.title === "AI Availability";
  const count = useCountUp(item.endValue, 1.8, isInView && !isSpecial);

  const displayValue = isSpecial
    ? item.display
    : item.endValue >= 1000000
    ? `${Math.floor(count / 1000000)}M`
    : `${count}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group rounded-2xl border border-white/8 bg-white/4 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/7"
    >
      <div
        className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md ${item.glow} transition-transform duration-300 group-hover:scale-110`}
        aria-hidden="true"
      >
        <Icon className="text-white" size={28} />
      </div>

      <p
        className="text-4xl font-black text-blue-400 transition-colors group-hover:text-cyan-400 sm:text-5xl"
        aria-label={`${displayValue}${item.suffix}`}
      >
        {item.prefix}
        {displayValue}
        {item.suffix}
      </p>

      <p className="mt-2.5 text-lg font-bold text-white">{item.title}</p>
      <p className="mt-2 text-sm text-slate-500">{item.description}</p>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      className="relative py-24 sm:py-32"
      aria-labelledby="stats-heading"
    >
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="Our Impact"
          badgeColor="blue"
          title={
            <span id="stats-heading">
              Trusted Across{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                India
              </span>
            </span>
          }
          description="Building transparent, AI-powered governance — one citizen at a time across every state and union territory."
        />

        <div
          ref={ref}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((item) => (
            <StatCard key={item.title} item={item} isInView={isInView} />
          ))}
        </div>
      </Container>
    </section>
  );
}