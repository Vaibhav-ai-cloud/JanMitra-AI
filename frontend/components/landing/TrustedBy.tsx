"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";

const partners = [
  { name: "Ministry of Electronics & IT", abbr: "MeitY", color: "from-blue-500 to-blue-400" },
  { name: "National Informatics Centre", abbr: "NIC", color: "from-cyan-500 to-cyan-400" },
  { name: "Digital India Corporation", abbr: "DIC", color: "from-indigo-500 to-indigo-400" },
  { name: "Smart India Hackathon", abbr: "SIH", color: "from-orange-500 to-amber-400" },
  { name: "Atal Innovation Mission", abbr: "AIM", color: "from-violet-500 to-purple-400" },
  { name: "NASSCOM Foundation", abbr: "NASSCOM", color: "from-teal-500 to-emerald-400" },
  { name: "Invest India", abbr: "Invest India", color: "from-rose-500 to-pink-400" },
  { name: "iSPIRT Foundation", abbr: "iSPIRT", color: "from-sky-500 to-blue-400" },
  { name: "MyGov India", abbr: "MyGov", color: "from-green-500 to-emerald-400" },
  { name: "Common Service Centres", abbr: "CSC", color: "from-amber-500 to-yellow-400" },
];

interface LogoCardProps {
  name: string;
  abbr: string;
  color: string;
}

function LogoCard({ name, abbr, color }: LogoCardProps) {
  return (
    <div
      className="flex flex-shrink-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
      title={name}
      role="img"
      aria-label={name}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-[9px] font-black text-white shadow-sm`}
        aria-hidden="true"
      >
        {abbr.slice(0, 3)}
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-slate-300">
        {abbr}
      </span>
    </div>
  );
}

/* Duplicate for seamless loop */
const allCards = [...partners, ...partners];

export default function TrustedBy() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      aria-labelledby="partners-heading"
    >
      {/* Top divider */}
      <div className="divider-glow" aria-hidden="true" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            Backed &amp; Recognised By
          </p>
          <h2
            id="partners-heading"
            className="text-2xl font-black text-white sm:text-3xl"
          >
            Trusted by India&apos;s Leading Government Bodies
          </h2>
        </motion.div>
      </Container>

      {/* Marquee track — full bleed with edge fades */}
      <div className="relative">
        {/* Edge fade-out masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#080e1c] to-transparent sm:w-48"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#080e1c] to-transparent sm:w-48"
          aria-hidden="true"
        />

        <div
          className="flex gap-4 overflow-hidden"
          aria-label="Partner logos scrolling"
          role="region"
        >
          <motion.div
            className="flex flex-shrink-0 gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 32,
              ease: "linear",
            }}
            aria-hidden="true"
          >
            {allCards.map((p, i) => (
              <LogoCard key={`${p.abbr}-${i}`} name={p.name} abbr={p.abbr} color={p.color} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
