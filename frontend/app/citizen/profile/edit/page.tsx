"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Input from "../../../../components/auth/Input";
import LoadingButton from "../../../../components/auth/LoadingButton";
import { cn } from "../../../../utils/auth";

const editProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string().min(1, "Occupation is required"),
  annualIncome: z.string().min(1, "Annual income is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
});

type EditProfileData = z.infer<typeof editProfileSchema>;

const inputCls = "w-full h-11 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white outline-none transition-all hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20";

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Gujarat", "Haryana", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function EditProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema) as Parameters<typeof useForm<EditProfileData>>[0]["resolver"],
    defaultValues: {
      fullName: "Rahul Kumar",
      phone: "9876543210",
      dateOfBirth: "1990-03-15",
      gender: "male",
      occupation: "Private Employee",
      annualIncome: "480000",
      addressLine1: "15-A, Gomti Nagar",
      addressLine2: "Sector 8, Near Vishwas Khand",
      city: "Lucknow",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010",
    },
  });

  const onSubmit = async (_data: EditProfileData) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1500));
    setIsSubmitting(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const sectionCls = "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 space-y-5";
  const labelCls = "text-sm font-medium text-slate-300";
  const errorCls = "text-xs text-red-400 mt-1";

  return (
    <div className="space-y-6 max-w-[800px]">
      <Link
        href="/citizen/profile"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} aria-hidden />
        Back to Profile
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="mt-1 text-sm text-slate-500">Update your personal information</p>
        </div>
        {isSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-sm font-medium text-emerald-400"
          >
            <CheckCircle2 size={15} aria-hidden />
            Profile saved!
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Personal details */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={sectionCls}
          aria-labelledby="edit-personal"
        >
          <h2 id="edit-personal" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Personal Details
          </h2>

          <Input
            id="edit-fullname"
            label="Full Name *"
            placeholder="Rahul Kumar"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="edit-phone"
              label="Mobile Number *"
              type="tel"
              placeholder="9876543210"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              id="edit-dob"
              label="Date of Birth *"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register("dateOfBirth")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-gender" className={labelCls}>Gender *</label>
              <select
                id="edit-gender"
                className={cn(inputCls, errors.gender && "border-red-500/50")}
                {...register("gender")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className={errorCls}>⚠ {errors.gender.message}</p>}
            </div>

            <Input
              id="edit-occupation"
              label="Occupation *"
              placeholder="Private Employee"
              error={errors.occupation?.message}
              {...register("occupation")}
            />
          </div>

          <Input
            id="edit-income"
            label="Annual Income (₹) *"
            type="number"
            placeholder="480000"
            error={errors.annualIncome?.message}
            {...register("annualIncome")}
          />
        </motion.section>

        {/* Address */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className={sectionCls}
          aria-labelledby="edit-address"
        >
          <h2 id="edit-address" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Residential Address
          </h2>

          <Input
            id="edit-addr1"
            label="Address Line 1 *"
            placeholder="House No., Street"
            error={errors.addressLine1?.message}
            {...register("addressLine1")}
          />

          <Input
            id="edit-addr2"
            label="Address Line 2"
            placeholder="Area, Landmark (optional)"
            error={errors.addressLine2?.message}
            {...register("addressLine2")}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="edit-city"
              label="City *"
              placeholder="Lucknow"
              error={errors.city?.message}
              {...register("city")}
            />
            <Input
              id="edit-district"
              label="District *"
              placeholder="Lucknow"
              error={errors.district?.message}
              {...register("district")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-state" className={labelCls}>State *</label>
              <select
                id="edit-state"
                className={cn(inputCls, errors.state && "border-red-500/50")}
                {...register("state")}
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && <p className={errorCls}>⚠ {errors.state.message}</p>}
            </div>

            <Input
              id="edit-pincode"
              label="PIN Code *"
              placeholder="226010"
              maxLength={6}
              inputMode="numeric"
              error={errors.pincode?.message}
              {...register("pincode")}
            />
          </div>
        </motion.section>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LoadingButton
            isLoading={isSubmitting}
            loadingText="Saving..."
            size="md"
            className="w-auto px-8"
            disabled={!isDirty && !isSubmitting}
          >
            Save Changes
          </LoadingButton>
          <Link
            href="/citizen/profile"
            className="rounded-xl border border-white/[0.1] px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
