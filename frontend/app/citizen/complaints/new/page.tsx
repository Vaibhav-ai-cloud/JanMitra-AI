"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Upload, X, AlertCircle } from "lucide-react";
import PageHeader from "../../../../components/citizen/shared/PageHeader";
import Input from "../../../../components/auth/Input";
import LoadingButton from "../../../../components/auth/LoadingButton";
import { ErrorAlert } from "../../../../components/auth/Alert";
import { cn } from "../../../../utils/auth";
import type { ComplaintCategory, ComplaintPriority } from "../../../../types/complaint";

// ── Validation ────────────────────────────────────────────────────────────────

const complaintSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(150),
  description: z.string().min(30, "Please provide at least 30 characters of description").max(2000),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
  department: z.string().min(1, "Please enter the department name"),
  location: z.string().min(5, "Please enter the specific location"),
  district: z.string().min(1, "Please select a district"),
  state: z.string().min(1, "Please select a state"),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

// ── Options ───────────────────────────────────────────────────────────────────

const categories: { value: ComplaintCategory; label: string; emoji: string }[] = [
  { value: "infrastructure", label: "Infrastructure", emoji: "🏗️" },
  { value: "water", label: "Water Supply", emoji: "💧" },
  { value: "electricity", label: "Electricity", emoji: "⚡" },
  { value: "roads", label: "Roads", emoji: "🛣️" },
  { value: "sanitation", label: "Sanitation", emoji: "🧹" },
  { value: "health", label: "Health", emoji: "🏥" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "corruption", label: "Corruption", emoji: "⚠️" },
  { value: "agriculture", label: "Agriculture", emoji: "🌾" },
  { value: "other", label: "Other", emoji: "📋" },
];

const priorities: { value: ComplaintPriority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "border-slate-500/30 text-slate-400" },
  { value: "medium", label: "Medium", color: "border-blue-500/30 text-blue-400" },
  { value: "high", label: "High", color: "border-amber-500/30 text-amber-400" },
  { value: "urgent", label: "Urgent", color: "border-red-500/30 text-red-400" },
];

const selectCls = "w-full h-11 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition-all hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20";

export default function NewComplaintPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<ComplaintPriority | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema) as Parameters<typeof useForm<ComplaintFormData>>[0]["resolver"],
  });

  const onSubmit = async (_data: ComplaintFormData) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      // Navigate to complaints list on success: router.push('/citizen/complaints')
    } catch {
      setServerError("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/citizen/complaints"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} aria-hidden />
          Back
        </Link>
      </div>

      <PageHeader
        title="File a Complaint"
        subtitle="Submit your grievance and track its resolution in real time"
      />

      <ErrorAlert show={!!serverError} message={serverError ?? ""} title="Submission failed" />

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* Category selector */}
        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-slate-300">
            Category <span className="text-red-400">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
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
                  "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  selectedCategory === cat.value
                    ? "border-blue-500/60 bg-blue-500/10 text-white"
                    : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:border-white/[0.15] hover:text-slate-300"
                )}
              >
                <span className="text-xl" aria-hidden>{cat.emoji}</span>
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
          {errors.category && (
            <p role="alert" className="mt-2 text-xs text-red-400">
              {errors.category.message}
            </p>
          )}
          {/* Hidden input for RHF */}
          <input type="hidden" {...register("category")} />
        </fieldset>

        {/* Priority */}
        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-slate-300">
            Priority <span className="text-red-400">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => {
                  setSelectedPriority(p.value);
                  setValue("priority", p.value);
                }}
                aria-pressed={selectedPriority === p.value}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  selectedPriority === p.value
                    ? `${p.color} bg-white/[0.08]`
                    : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:text-slate-300"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          {errors.priority && (
            <p role="alert" className="mt-2 text-xs text-red-400">
              {errors.priority.message}
            </p>
          )}
          <input type="hidden" {...register("priority")} />
        </fieldset>

        {/* Main form card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
          <Input
            id="complaint-title"
            label="Complaint Title *"
            placeholder="Brief description of the issue"
            error={errors.title?.message}
            {...register("title")}
          />

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="complaint-desc" className="text-sm font-medium text-slate-300">
              Detailed Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="complaint-desc"
              rows={5}
              placeholder="Provide as much detail as possible. Include dates, frequency, and impact on daily life..."
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "desc-error" : undefined}
              className={cn(
                "w-full resize-none rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white",
                "placeholder:text-slate-600 transition-all duration-200 outline-none leading-relaxed",
                "hover:border-white/20 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20",
                errors.description ? "border-red-500/50" : "border-white/[0.08]"
              )}
              {...register("description")}
            />
            {errors.description && (
              <p id="desc-error" role="alert" className="text-xs text-red-400">
                ⚠ {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="complaint-dept"
              label="Department *"
              placeholder="e.g. Municipal Corporation, PWD"
              error={errors.department?.message}
              {...register("department")}
            />
            <Input
              id="complaint-location"
              label="Specific Location *"
              placeholder="Street, landmark, area"
              error={errors.location?.message}
              {...register("location")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-district" className="text-sm font-medium text-slate-300">
                District <span className="text-red-400">*</span>
              </label>
              <input
                id="complaint-district"
                placeholder="Your district"
                className={cn(selectCls, errors.district && "border-red-500/50")}
                {...register("district")}
              />
              {errors.district && (
                <p role="alert" className="text-xs text-red-400">⚠ {errors.district.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-state" className="text-sm font-medium text-slate-300">
                State <span className="text-red-400">*</span>
              </label>
              <select
                id="complaint-state"
                defaultValue=""
                className={cn(selectCls, errors.state && "border-red-500/50")}
                {...register("state")}
              >
                <option value="">Select State</option>
                {[
                  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
                  "Gujarat", "Haryana", "Jharkhand", "Karnataka", "Kerala",
                  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
                  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
                ].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && (
                <p role="alert" className="text-xs text-red-400">⚠ {errors.state.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-6 text-center">
          <Upload size={24} className="mx-auto mb-3 text-slate-600" aria-hidden />
          <p className="text-sm font-medium text-slate-400">
            Drag & drop images or documents
          </p>
          <p className="mt-1 text-xs text-slate-600">
            PNG, JPG, PDF up to 10 MB each · Max 5 files
          </p>
          <button
            type="button"
            className="mt-3 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-400 hover:border-white/25 hover:text-white transition-all"
          >
            Browse Files
          </button>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-blue-400" aria-hidden />
          <p className="text-xs text-slate-400 leading-relaxed">
            Your complaint will be assigned a unique ticket number and forwarded to the concerned department. You&apos;ll receive updates via email and notifications.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LoadingButton
            isLoading={isSubmitting}
            loadingText="Submitting..."
            size="md"
            className="w-auto px-8"
          >
            Submit Complaint
          </LoadingButton>
          <Link
            href="/citizen/complaints"
            className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
