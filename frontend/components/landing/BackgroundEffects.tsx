"use client";

import { motion } from "framer-motion";

/* Floating orb configuration */
const orbs = [
  {
    className:
      "absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[130px]",
    animate: { x: [0, 60, -30, 0], y: [0, 40, -30, 0] },
    duration: 18,
  },
  {
    className:
      "absolute -right-32 top-32 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[150px]",
    animate: { x: [0, -50, 30, 0], y: [0, -30, 50, 0] },
    duration: 22,
  },
  {
    className:
      "absolute bottom-[-200px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[160px]",
    animate: { x: [0, 40, -40, 0], y: [0, -40, 20, 0] },
    duration: 26,
  },
  {
    className:
      "absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]",
    animate: { x: [0, -30, 60, 0], y: [0, 60, -30, 0] },
    duration: 20,
  },
];

export default function BackgroundEffects() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Animated blur orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          animate={orb.animate}
          transition={{
            repeat: Infinity,
            duration: orb.duration,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(59, 130, 246, 1) 0px,
            rgba(59, 130, 246, 1) 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      {/* Top gradient vignette */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Radial vignette to darken edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 50%, rgba(8,14,28,0.6) 100%)",
        }}
      />
    </div>
  );
}