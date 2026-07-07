"use client";

import { motion } from "framer-motion";
import { cn } from "../../../utils/auth";

// ── Bar Chart ──────────────────────────────────────────────────────────────────

interface BarChartProps {
  data: { label: string; value: number; value2?: number }[];
  height?: number;
  color?: string;
  color2?: string;
  unit?: string;
  className?: string;
}

export function BarChart({
  data,
  height = 160,
  color = "#8b5cf6",
  color2 = "#22d3ee",
  unit = "",
  className,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.value, d.value2 ?? 0)), 1);

  return (
    <div className={cn("w-full select-none", className)} aria-label="Bar chart">
      <div
        className="flex items-end gap-1.5 sm:gap-2"
        style={{ height }}
        role="img"
        aria-label="Bar chart visualization"
      >
        {data.map((item, i) => (
          <div
            key={item.label}
            className="flex flex-1 flex-col items-center gap-1"
            style={{ height: "100%" }}
          >
            <div className="flex w-full flex-1 items-end gap-0.5">
              {/* Primary bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                className="flex-1 rounded-t-md cursor-pointer transition-opacity hover:opacity-80"
                style={{ background: color, minHeight: 2 }}
                title={`${item.label}: ${item.value}${unit}`}
                role="presentation"
              />
              {/* Secondary bar (optional) */}
              {item.value2 !== undefined && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value2 / maxValue) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.04 + 0.1, ease: "easeOut" }}
                  className="flex-1 rounded-t-md cursor-pointer transition-opacity hover:opacity-80"
                  style={{ background: color2, minHeight: 2 }}
                  title={`${item.label}: ${item.value2}${unit}`}
                  role="presentation"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex-1 text-center">
            <span className="text-[9px] sm:text-[10px] text-slate-600 truncate block">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut Chart ────────────────────────────────────────────────────────────────

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  className?: string;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 140,
  className,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 14;
  const viewBox = 120;
  const cx = viewBox / 2;
  const cy = viewBox / 2;

  let offset = 0;
  const segments = data.map((d) => {
    const pct = d.value / total;
    const dashArray = pct * circumference;
    const dashOffset = circumference - offset * circumference;
    offset += pct;
    return { ...d, dashArray, dashOffset, pct };
  });

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          width={size}
          height={size}
          role="img"
          aria-label="Donut chart"
          className="-rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={strokeWidth}
          />
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.dashArray} ${circumference}`}
              strokeDashoffset={`${seg.dashOffset}`}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            />
          ))}
        </svg>
        {/* Center text */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {centerValue && (
              <p className="text-xl font-bold text-white leading-none">{centerValue}</p>
            )}
            {centerLabel && (
              <p className="mt-0.5 text-[10px] text-slate-500">{centerLabel}</p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <ul className="space-y-1.5 min-w-0">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: d.color }} aria-hidden />
            <span className="truncate text-slate-400">{d.label}</span>
            <span className="ml-auto shrink-0 font-semibold text-white">{d.value.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number; // 0–100
  max?: number;
  label?: string;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = "#8b5cf6",
  showLabel = true,
  className,
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="text-slate-400 truncate">{label}</span>}
          {showLabel && <span className="ml-auto font-semibold text-white">{pct.toFixed(0)}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

// ── Sparkline (mini line chart) ────────────────────────────────────────────────

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export function Sparkline({
  data,
  color = "#8b5cf6",
  height = 40,
  className,
}: SparklineProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = height;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");

  const area = `${0},${h} ${points} ${(data.length - 1) * step},${h}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={area}
        fill={`url(#sg-${color.replace("#", "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
