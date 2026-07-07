"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

const schemeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  shortTitle: z.string().min(2, "Short title required").max(12, "Max 12 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  ministry: z.string().min(2, "Ministry is required"),
  status: z.enum(["active", "draft", "closed", "pending"]),
  targetBeneficiaries: z.number().min(1, "Must be at least 1"),
  budget: z.number().min(0, "Must be 0 or more"),
  launchDate: z.string().min(1, "Launch date required"),
  deadlineDate: z.string().optional(),
});

type SchemeFormData = z.infer<typeof schemeSchema>;

const categories = ["Agriculture", "Digital", "Education", "Finance", "Health", "Housing", "Infrastructure", "Social Welfare", "Women & Child", "Other"];

const inputCls = "h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all";
const selectCls = "h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-all cursor-pointer";
const errorCls = "mt-1 text-xs text-red-400";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";

export default function NewSchemePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemeFormData>({
    resolver: zodResolver(schemeSchema),
    defaultValues: { status: "draft" },
  });

  const onSubmit = (_data: SchemeFormData) => {
    // In production: call API to create scheme
    router.push("/admin/schemes");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link href="/admin/schemes" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={16} aria-hidden /> Back to Schemes
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
          <BookOpen size={20} className="text-violet-400" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Create Scheme</h1>
          <p className="mt-0.5 text-sm text-slate-400">Add a new government scheme to the platform</p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Basic Information */}
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-4">Basic Information</h2>

          <div>
            <label htmlFor="scheme-title" className={labelCls}>Scheme Title *</label>
            <input
              id="scheme-title"
              type="text"
              placeholder="e.g. Pradhan Mantri Awas Yojana"
              {...register("title")}
              className={inputCls}
            />
            {errors.title && <p className={errorCls}>{errors.title.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="scheme-short" className={labelCls}>Short Title *</label>
              <input
                id="scheme-short"
                type="text"
                placeholder="e.g. PMAY"
                {...register("shortTitle")}
                className={inputCls}
              />
              {errors.shortTitle && <p className={errorCls}>{errors.shortTitle.message}</p>}
            </div>
            <div>
              <label htmlFor="scheme-status" className={labelCls}>Status *</label>
              <select id="scheme-status" {...register("status")} className={selectCls}>
                <option value="draft" className="bg-slate-900">Draft</option>
                <option value="active" className="bg-slate-900">Active</option>
                <option value="pending" className="bg-slate-900">Pending</option>
                <option value="closed" className="bg-slate-900">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="scheme-desc" className={labelCls}>Description *</label>
            <textarea
              id="scheme-desc"
              placeholder="Describe the scheme objectives and benefits…"
              rows={3}
              {...register("description")}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            />
            {errors.description && <p className={errorCls}>{errors.description.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="scheme-category" className={labelCls}>Category *</label>
              <select id="scheme-category" {...register("category")} className={selectCls}>
                <option value="" className="bg-slate-900">Select category</option>
                {categories.map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
              </select>
              {errors.category && <p className={errorCls}>{errors.category.message}</p>}
            </div>
            <div>
              <label htmlFor="scheme-ministry" className={labelCls}>Ministry *</label>
              <input
                id="scheme-ministry"
                type="text"
                placeholder="e.g. Ministry of Rural Development"
                {...register("ministry")}
                className={inputCls}
              />
              {errors.ministry && <p className={errorCls}>{errors.ministry.message}</p>}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-4">Target & Budget</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="scheme-beneficiaries" className={labelCls}>Target Beneficiaries *</label>
              <input
                id="scheme-beneficiaries"
                type="number"
                placeholder="e.g. 10000000"
                {...register("targetBeneficiaries", { valueAsNumber: true })}
                className={inputCls}
              />
              {errors.targetBeneficiaries && <p className={errorCls}>{errors.targetBeneficiaries.message}</p>}
            </div>
            <div>
              <label htmlFor="scheme-budget" className={labelCls}>Budget (₹) *</label>
              <input
                id="scheme-budget"
                type="number"
                placeholder="e.g. 5000000000"
                {...register("budget", { valueAsNumber: true })}
                className={inputCls}
              />
              {errors.budget && <p className={errorCls}>{errors.budget.message}</p>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="scheme-launch" className={labelCls}>Launch Date *</label>
              <input id="scheme-launch" type="date" {...register("launchDate")} className={inputCls} />
              {errors.launchDate && <p className={errorCls}>{errors.launchDate.message}</p>}
            </div>
            <div>
              <label htmlFor="scheme-deadline" className={labelCls}>Deadline Date (Optional)</label>
              <input id="scheme-deadline" type="date" {...register("deadlineDate")} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/schemes"
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/[0.08] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Creating…" : "Create Scheme"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
