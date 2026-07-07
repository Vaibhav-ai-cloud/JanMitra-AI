"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Smile,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import PageHeader from "../../../components/citizen/shared/PageHeader";
import LoadingButton from "../../../components/auth/LoadingButton";
import { cn } from "../../../utils/auth";

// ── Schema ────────────────────────────────────────────────────────────────────

const feedbackSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  rating: z.number().min(1, "Please provide a rating").max(5),
  message: z.string().min(20, "Please provide at least 20 characters of feedback").max(1000),
  recommend: z.enum(["yes", "no", "maybe"]),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

// ── Options ───────────────────────────────────────────────────────────────────

const categories = [
  { value: "general", label: "General Experience", emoji: "💬" },
  { value: "complaint", label: "Complaint Module", emoji: "📋" },
  { value: "schemes", label: "Scheme Discovery", emoji: "🏛️" },
  { value: "ai", label: "AI Assistant", emoji: "🤖" },
  { value: "design", label: "Design & Usability", emoji: "🎨" },
  { value: "performance", label: "Performance", emoji: "⚡" },
];

const recommendOptions = [
  { value: "yes", label: "Yes, definitely!", icon: <ThumbsUp size={16} /> },
  { value: "maybe", label: "Maybe", icon: <Smile size={16} /> },
  { value: "no", label: "Not really", icon: <ThumbsDown size={16} /> },
] as const;

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [recommend, setRecommend] = useState<"yes" | "no" | "maybe" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema) as Parameters<typeof useForm<FeedbackData>>[0]["resolver"],
    defaultValues: { rating: 0, recommend: "yes" },
  });

  const onSubmit = async (_data: FeedbackData) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="flex max-w-sm flex-col items-center gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-10 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <CheckCircle2 size={32} className="text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Thank You!</h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Your feedback helps us improve JanMitra AI for all citizens. We truly appreciate it!
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/citizen/dashboard"
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Back to Dashboard
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[700px]">
      <PageHeader
        title="Share Feedback"
        subtitle="Help us improve JanMitra AI for all citizens"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">What are you giving feedback about?</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setValue("category", cat.value);
                }}
                aria-pressed={selectedCategory === cat.value}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all text-left",
                  selectedCategory === cat.value
                    ? "border-blue-500/50 bg-blue-500/10 text-white"
                    : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:border-white/[0.14] hover:text-slate-300"
                )}
              >
                <span aria-hidden>{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
          {errors.category && (
            <p role="alert" className="text-xs text-red-400">⚠ {errors.category.message}</p>
          )}
          <input type="hidden" {...register("category")} />
        </motion.div>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Overall Rating</h2>
          <div className="flex items-center gap-2" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => {
                  setRating(star);
                  setValue("rating", star);
                }}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                aria-pressed={rating >= star}
              >
                <Star
                  size={32}
                  className={cn(
                    "transition-colors",
                    (hoveredStar || rating) >= star
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-700"
                  )}
                />
              </motion.button>
            ))}
            {rating > 0 && (
              <span className="ml-3 text-sm text-slate-400">
                {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
              </span>
            )}
          </div>
          {errors.rating && (
            <p role="alert" className="text-xs text-red-400">⚠ {errors.rating.message}</p>
          )}
          <input type="hidden" {...register("rating", { valueAsNumber: true })} />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Your Feedback</h2>
          <div className="flex flex-col gap-1.5">
            <textarea
              rows={5}
              placeholder="Tell us what you liked, what can be improved, or any specific features you'd like to see..."
              aria-label="Feedback message"
              aria-invalid={!!errors.message}
              className={cn(
                "w-full resize-none rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white",
                "placeholder:text-slate-600 transition-all outline-none leading-relaxed",
                "hover:border-white/20 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20",
                errors.message ? "border-red-500/50" : "border-white/[0.08]"
              )}
              {...register("message")}
            />
            {errors.message && (
              <p role="alert" className="text-xs text-red-400">⚠ {errors.message.message}</p>
            )}
          </div>
        </motion.div>

        {/* Would you recommend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.14 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-4"
        >
          <h2 className="text-sm font-semibold text-white">Would you recommend JanMitra AI?</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Recommendation">
            {recommendOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setRecommend(opt.value);
                  setValue("recommend", opt.value);
                }}
                aria-pressed={recommend === opt.value}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                  recommend === opt.value
                    ? "border-blue-500/50 bg-blue-500/10 text-white"
                    : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:text-slate-300"
                )}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          <input type="hidden" {...register("recommend")} />
        </motion.div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <LoadingButton
            isLoading={isSubmitting}
            loadingText="Submitting..."
            size="md"
            className="w-auto px-8"
          >
            <MessageSquare size={15} className="mr-1.5" aria-hidden />
            Submit Feedback
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
