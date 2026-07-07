"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, AlertCircle, Briefcase, BookOpen, Filter } from "lucide-react";
import { mockMapMarkers } from "../../../lib/mpMockData";
import type { MarkerType } from "../../../types/mp";
import { cn } from "../../../utils/auth";

const markerConfig: Record<MarkerType, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  complaint: { label: "Complaint", color: "text-rose-400", bg: "bg-rose-500", icon: <AlertCircle size={12} /> },
  project: { label: "Project", color: "text-blue-400", bg: "bg-blue-500", icon: <Briefcase size={12} /> },
  scheme: { label: "Scheme", color: "text-emerald-400", bg: "bg-emerald-500", icon: <BookOpen size={12} /> },
};

// Simulate a simple map using positioned dots on a constituency SVG grid
function ConstituencyMap({
  markers,
  selected,
  onSelect,
}: {
  markers: typeof mockMapMarkers;
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  // Normalize lat/lng to SVG viewBox
  const lats = markers.map((m) => m.lat);
  const lngs = markers.map((m) => m.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const padLat = (maxLat - minLat) * 0.2 || 0.05;
  const padLng = (maxLng - minLng) * 0.2 || 0.05;

  const toX = (lng: number) =>
    ((lng - (minLng - padLng)) / (maxLng + padLng - minLng + padLng)) * 760;
  const toY = (lat: number) =>
    ((maxLat + padLat - lat) / (maxLat + padLat - minLat + padLat)) * 400;

  const markerColors: Record<MarkerType, string> = {
    complaint: "#f43f5e",
    project: "#3b82f6",
    scheme: "#10b981",
  };

  return (
    <svg
      viewBox="0 0 760 400"
      className="w-full h-full"
      role="img"
      aria-label="Constituency map with markers"
    >
      {/* Background */}
      <rect width="760" height="400" fill="rgba(255,255,255,0.01)" rx="16" />

      {/* Grid lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 110}
          y1={0}
          x2={i * 110}
          y2={400}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * 100}
          x2={760}
          y2={i * 100}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
      ))}

      {/* District label */}
      <text x="380" y="380" textAnchor="middle" fill="rgba(100,116,139,0.6)" fontSize="12" fontFamily="sans-serif">
        Lucknow District, Uttar Pradesh
      </text>

      {/* Markers */}
      {markers.map((marker) => {
        const x = toX(marker.lng);
        const y = toY(marker.lat);
        const color = markerColors[marker.type];
        const isSelected = selected === marker.id;

        return (
          <g
            key={marker.id}
            onClick={() => onSelect(isSelected ? null : marker.id)}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label={`${marker.type}: ${marker.title}`}
            aria-pressed={isSelected}
          >
            {/* Pulse ring */}
            {isSelected && (
              <circle cx={x} cy={y} r={18} fill={color} fillOpacity={0.15} />
            )}
            {/* Outer glow */}
            <circle cx={x} cy={y} r={10} fill={color} fillOpacity={0.2} />
            {/* Main dot */}
            <motion.circle
              cx={x}
              cy={y}
              r={7}
              fill={color}
              initial={{ scale: 0 }}
              animate={{ scale: isSelected ? 1.3 : 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
            />
            {/* Label */}
            <text
              x={x}
              y={y - 14}
              textAnchor="middle"
              fill="rgba(255,255,255,0.8)"
              fontSize="9"
              fontFamily="sans-serif"
            >
              {marker.title.split(" ").slice(0, 3).join(" ")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function MpMapPage() {
  const [typeFilter, setTypeFilter] = useState<MarkerType | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = mockMapMarkers.filter(
    (m) => typeFilter === "all" || m.type === typeFilter
  );

  const selectedMarker = mockMapMarkers.find((m) => m.id === selectedId);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <Map size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Map View</h1>
          <p className="mt-0.5 text-sm text-slate-400">Constituency issues, projects and scheme coverage</p>
        </div>
      </motion.div>

      {/* Filter toggles */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Map layer filter"
      >
        <span className="flex items-center gap-1.5 text-xs text-slate-500 mr-1"><Filter size={12} aria-hidden /> Show:</span>
        {([
          { value: "all", label: "All" },
          { value: "complaint", label: "Complaints" },
          { value: "project", label: "Projects" },
          { value: "scheme", label: "Schemes" },
        ] as const).map((opt) => (
          <button
            key={opt.value}
            onClick={() => setTypeFilter(opt.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
              typeFilter === opt.value
                ? "bg-violet-500 text-white"
                : "border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:text-white"
            )}
            aria-pressed={typeFilter === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </motion.div>

      {/* Map + legend */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Map canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1428] p-4"
          style={{ minHeight: 400 }}
        >
          <ConstituencyMap
            markers={filtered}
            selected={selectedId}
            onSelect={setSelectedId}
          />
        </motion.div>

        {/* Sidebar: legend + selected detail */}
        <div className="space-y-4">
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Legend</h2>
            <ul className="space-y-2">
              {(Object.entries(markerConfig) as [MarkerType, (typeof markerConfig)[MarkerType]][]).map(([type, cfg]) => (
                <li key={type} className="flex items-center gap-2.5 text-sm">
                  <span className={cn("h-3 w-3 rounded-full", cfg.bg)} aria-hidden />
                  <span className="text-slate-300">{cfg.label}</span>
                  <span className="ml-auto text-xs text-slate-600">
                    {mockMapMarkers.filter((m) => m.type === type).length}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Markers list */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="border-b border-white/[0.06] px-4 py-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                All Markers ({filtered.length})
              </h2>
            </div>
            <ul className="divide-y divide-white/[0.04] max-h-72 overflow-y-auto">
              {filtered.map((marker) => {
                const cfg = markerConfig[marker.type];
                return (
                  <li key={marker.id}>
                    <button
                      onClick={() => setSelectedId(marker.id === selectedId ? null : marker.id)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04]",
                        selectedId === marker.id && "bg-violet-500/[0.08]"
                      )}
                    >
                      <span className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", cfg.bg)} aria-hidden />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white truncate">{marker.title}</p>
                        <p className={`text-[10px] ${cfg.color}`}>{cfg.label} · {marker.status}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Selected marker detail */}
          <AnimatePresence>
            {selectedMarker && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-4"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">Selected</p>
                <p className="text-sm font-semibold text-white mb-1">{selectedMarker.title}</p>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>Type: <span className="text-white capitalize">{selectedMarker.type}</span></p>
                  <p>Status: <span className="text-white capitalize">{selectedMarker.status}</span></p>
                  <p>District: <span className="text-white">{selectedMarker.district}</span></p>
                  <p>Coordinates: <span className="font-mono text-slate-500">{selectedMarker.lat.toFixed(3)}, {selectedMarker.lng.toFixed(3)}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
