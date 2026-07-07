"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Input from "../../../../../components/auth/Input";
import LoadingButton from "../../../../../components/auth/LoadingButton";
import { mockSchemes } from "../../../../../lib/mockData";
import { cn } from "../../../../../utils/auth";

interface Props {
  params: { id: string };
}

const applySchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  aadhaar: z.string().regex(/^\d{12}$/, "Enter valid 12-digit Aadhaar number"),
  dob: z.string().min(1, "Date of birth required"),
  income: z.string().min(1, "Annual income required"),
  address: z.string().min(10, "Enter complete address"),
  declaration: z.boolean().refine((v) => v === true, {
    message: "You must accept the declaration to proceed",
  }),
});

type ApplyFormData = z.infer<typeof applySchema>;

export default function SchemeApplyPage({ params }: Props) {
  const scheme = mockSchemes.find((s) => s.id === params.id);
  if (!scheme) notFound();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema) as Parameters<typeof useForm<ApplyFormData>>[0]["resolver"],
  });

  const onSubmit = async (_data: ApplyFormData) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="flex max-w-md mx-auto flex-col items-center gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-10 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Application Submitted!</h2>
          <p className="mt-2 text-sm text-slate-400">
            Your application for <strong>{scheme.title}</strong> has been submitted successfully. You&apos;ll receive updates via notifications.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/citizen/applications"
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            View Applications
          </Link>
          <Link
            href="/citizen/schemes"
            className="rounded-xl border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Browse More
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-[700px] space-y-6">
      <Link
        href={`/citizen/schemes/${scheme.id}`}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} aria-hidden />
        Back to Scheme
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Apply — {scheme.shortTitle}</h1>
        <p className="mt-1 text-sm text-slate-500">{scheme.title}</p>
      </div>

      {/* Documents checklist */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Required Documents</h2>
        <ul className="grid gap-2 sm:grid-cols-2" role="list">
          {scheme.documents.map((doc) => (
            <li key={doc.name} className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 size={14} className={doc.required ? "text-blue-400" : "text-slate-600"} aria-hidden />
              {doc.name}
              {!doc.required && <span className="text-xs text-slate-600">(optional)</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5"
      >
        <h2 className="text-sm font-semibold text-white">Personal Information</h2>

        <Input
          id="apply-name"
          label="Full Name (as per Aadhaar) *"
          placeholder="Rahul Kumar"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          id="apply-aadhaar"
          label="Aadhaar Number *"
          placeholder="XXXX XXXX XXXX"
          maxLength={12}
          inputMode="numeric"
          hint="12-digit Aadhaar number without spaces"
          error={errors.aadhaar?.message}
          {...register("aadhaar")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="apply-dob"
            label="Date of Birth *"
            type="date"
            error={errors.dob?.message}
            {...register("dob")}
          />
          <Input
            id="apply-income"
            label="Annual Income (₹) *"
            type="number"
            placeholder="300000"
            error={errors.income?.message}
            {...register("income")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="apply-address" className="text-sm font-medium text-slate-300">
            Residential Address <span className="text-red-400">*</span>
          </label>
          <textarea
            id="apply-address"
            rows={3}
            placeholder="House No., Street, Village/Town, District, State, PIN"
            aria-invalid={!!errors.address}
            className={cn(
              "w-full resize-none rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white",
              "placeholder:text-slate-600 transition-all outline-none",
              "hover:border-white/20 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20",
              errors.address ? "border-red-500/50" : "border-white/[0.08]"
            )}
            {...register("address")}
          />
          {errors.address && (
            <p role="alert" className="text-xs text-red-400">⚠ {errors.address.message}</p>
          )}
        </div>

        {/* Declaration */}
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded"
            {...register("declaration")}
          />
          <span className="text-xs text-slate-400 leading-relaxed">
            I hereby declare that all the information provided is true and accurate to the best of my knowledge. I understand that providing false information may result in rejection of this application.
          </span>
        </label>
        {errors.declaration && (
          <p role="alert" className="text-xs text-red-400">⚠ {errors.declaration.message}</p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <LoadingButton
            isLoading={isSubmitting}
            loadingText="Submitting..."
            size="md"
            className="w-auto px-8"
          >
            Submit Application
          </LoadingButton>
          <Link
            href={`/citizen/schemes/${scheme.id}`}
            className="rounded-xl border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
