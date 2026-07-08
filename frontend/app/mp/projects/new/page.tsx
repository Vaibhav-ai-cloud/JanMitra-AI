"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Briefcase, Plus } from "lucide-react";

const newProjectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  category: z.enum(["roads", "water", "electricity", "health", "education", "sanitation", "housing", "agriculture", "digitization", "other"]),
  fundSource: z.enum(["MPLADS", "State Budget", "Central Grant", "PPP", "Smart Cities", "Other"]),
  budget: z.string().min(1, "Budget is required"),
  location: z.string().min(3, "Location is required"),
  district: z.string().min(2, "District is required"),
  startDate: z.string().min(1, "Start date is required"),
  expectedEndDate: z.string().min(1, "Expected end date is required"),
  beneficiaries: z.string().min(1, "Estimated beneficiaries required"),
  contractor: z.string().optional(),
});

type NewProjectForm = z.infer<typeof newProjectSchema>;

const inputCls =
  "h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all";
const labelCls = "block text-xs font-semibold text-slate-400 mb-1.5";
const errorCls = "mt-1 text-xs text-red-400";
const selectCls =
  "h-10 w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-slate-300 outline-none focus:border-violet-500/50 transition-colors cursor-pointer";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProjectForm>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: { category: "roads", fundSource: "MPLADS" },
  });

  const onSubmit = async (_data: NewProjectForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/mp/projects");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link
          href="/mp/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded-lg"
        >
          <ArrowLeft size={16} aria-hidden /> Back to Projects
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20">
            <Plus size={20} className="text-violet-400" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">New Project</h1>
        </div>
        <p className="text-sm text-slate-400 ml-13">Create a new constituency development project</p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* Basic info */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Project Details</h2>

          <div>
            <label htmlFor="proj-title" className={labelCls}>Project Title <span className="text-red-400">*</span></label>
            <input id="proj-title" placeholder="e.g. NH-28 Four-Lane Road Widening" className={inputCls} {...register("title")} />
            {errors.title && <p className={errorCls} role="alert">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="proj-desc" className={labelCls}>Description <span className="text-red-400">*</span></label>
            <textarea
              id="proj-desc"
              rows={4}
              placeholder="Describe the project scope, objectives, and expected outcomes…"
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
              {...register("description")}
            />
            {errors.description && <p className={errorCls} role="alert">{errors.description.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="proj-category" className={labelCls}>Category <span className="text-red-400">*</span></label>
              <select id="proj-category" className={selectCls} {...register("category")}>
                {["roads", "water", "electricity", "health", "education", "sanitation", "housing", "agriculture", "digitization", "other"].map((c) => (
                  <option key={c} value={c} className="bg-slate-900 capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="proj-fund" className={labelCls}>Fund Source <span className="text-red-400">*</span></label>
              <select id="proj-fund" className={selectCls} {...register("fundSource")}>
                {["MPLADS", "State Budget", "Central Grant", "PPP", "Smart Cities", "Other"].map((f) => (
                  <option key={f} value={f} className="bg-slate-900">{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Location & financials */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Location & Financials</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="proj-location" className={labelCls}>Location <span className="text-red-400">*</span></label>
              <input id="proj-location" placeholder="e.g. Aliganj to Gomti Nagar" className={inputCls} {...register("location")} />
              {errors.location && <p className={errorCls} role="alert">{errors.location.message}</p>}
            </div>
            <div>
              <label htmlFor="proj-district" className={labelCls}>District <span className="text-red-400">*</span></label>
              <input id="proj-district" placeholder="e.g. Lucknow" className={inputCls} {...register("district")} />
              {errors.district && <p className={errorCls} role="alert">{errors.district.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="proj-budget" className={labelCls}>Total Budget (₹) <span className="text-red-400">*</span></label>
              <input id="proj-budget" type="number" min="0" placeholder="e.g. 45000000" className={inputCls} {...register("budget")} />
              {errors.budget && <p className={errorCls} role="alert">{errors.budget.message}</p>}
            </div>
            <div>
              <label htmlFor="proj-beneficiaries" className={labelCls}>Beneficiaries <span className="text-red-400">*</span></label>
              <input id="proj-beneficiaries" type="number" min="0" placeholder="e.g. 250000" className={inputCls} {...register("beneficiaries")} />
              {errors.beneficiaries && <p className={errorCls} role="alert">{errors.beneficiaries.message}</p>}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Timeline & Contractor</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="proj-start" className={labelCls}>Start Date <span className="text-red-400">*</span></label>
              <input id="proj-start" type="date" className={inputCls + " [color-scheme:dark]"} {...register("startDate")} />
              {errors.startDate && <p className={errorCls} role="alert">{errors.startDate.message}</p>}
            </div>
            <div>
              <label htmlFor="proj-end" className={labelCls}>Expected End Date <span className="text-red-400">*</span></label>
              <input id="proj-end" type="date" className={inputCls + " [color-scheme:dark]"} {...register("expectedEndDate")} />
              {errors.expectedEndDate && <p className={errorCls} role="alert">{errors.expectedEndDate.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="proj-contractor" className={labelCls}>Contractor (optional)</label>
            <input id="proj-contractor" placeholder="e.g. M/s Road Builders Pvt Ltd" className={inputCls} {...register("contractor")} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            aria-busy={isSubmitting}
          >
            <Briefcase size={16} aria-hidden />
            {isSubmitting ? "Creating…" : "Create Project"}
          </button>
          <Link
            href="/mp/projects"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
