"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import SchemeCard from "../../../components/citizen/schemes/SchemeCard";
import EmptyState from "../../../components/citizen/shared/EmptyState";
import { mockSchemes } from "../../../lib/mockData";
import type { Scheme, SchemeCategory } from "../../../types/scheme";
import { cn } from "../../../utils/auth";

const categories: { value: SchemeCategory | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "🏛️" },
  { value: "health", label: "Health", emoji: "🏥" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "housing", label: "Housing", emoji: "🏠" },
  { value: "agriculture", label: "Agriculture", emoji: "🌾" },
  { value: "employment", label: "Employment", emoji: "💼" },
  { value: "finance", label: "Finance", emoji: "💰" },
  { value: "women", label: "Women", emoji: "👩" },
];

const selectCls = "h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-white outline-none transition-all hover:border-white/[0.14] focus:border-blue-500/50";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<SchemeCategory | "all">("all");
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.shortTitle.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "all" || s.category === activeCategory;
      const matchEligible = !eligibleOnly || s.isEligible;
      const matchBookmark = !bookmarkedOnly || s.isBookmarked;
      return matchSearch && matchCat && matchEligible && matchBookmark;
    });
  }, [schemes, search, activeCategory, eligibleOnly, bookmarkedOnly]);

  const toggleBookmark = (id: string) => {
    setSchemes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s))
    );
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <PageHeader
        title="Government Schemes"
        subtitle="Discover 200+ government schemes tailored to your profile"
      />

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin" role="tablist" aria-label="Scheme categories">
        {categories.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all",
              activeCategory === cat.value
                ? "border-blue-500/50 bg-blue-500/15 text-blue-300"
                : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:border-white/[0.14] hover:text-slate-300"
            )}
          >
            <span aria-hidden>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden />
          <input
            type="search"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(selectCls, "w-full h-9 pl-9")}
            aria-label="Search government schemes"
          />
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-slate-400 hover:text-slate-300 transition-colors">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded"
            checked={eligibleOnly}
            onChange={(e) => setEligibleOnly(e.target.checked)}
            aria-label="Show only eligible schemes"
          />
          Eligible only
        </label>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-slate-400 hover:text-slate-300 transition-colors">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded"
            checked={bookmarkedOnly}
            onChange={(e) => setBookmarkedOnly(e.target.checked)}
            aria-label="Show only bookmarked schemes"
          />
          Bookmarked
        </label>
      </div>

      {/* Results */}
      <p className="text-sm text-slate-500" aria-live="polite">
        Showing {filtered.length} scheme{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s, i) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              delay={i * 0.05}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen size={28} />}
          title="No schemes found"
          description="Try adjusting your filters or search terms."
        />
      )}
    </div>
  );
}
