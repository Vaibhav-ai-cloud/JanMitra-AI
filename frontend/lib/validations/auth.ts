import { z } from "zod";

// ── Shared Field Rules ───────────────────────────────────────────────────────

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

// ── Login ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
  // Role is used on the login page to pick the correct backend endpoint.
  // citizen → POST /auth/login
  // mp      → POST /auth/mp/login
  // admin   → POST /auth/admin/login
  loginRole: z.enum(["citizen", "mp", "admin"]).default("citizen"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// ── Register ─────────────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(80, "Full name cannot exceed 80 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    // Only citizen and mp can register — admin is blocked at the backend too
    role: z.enum(["citizen", "mp"]),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, {
        message: "You must accept the Terms & Privacy Policy to continue",
      }),

    // ── MP-only fields (optional strings — validated conditionally below) ────
    constituency: z.string().optional(),
    district:     z.string().optional(),
    state:        z.string().optional(),
    party:        z.string().optional(),
    mpId:         z.string().optional(),
  })
  // Password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  // MP field validation — required only when role === "mp"
  .superRefine((data, ctx) => {
    if (data.role !== "mp") return;

    const required: { field: keyof typeof data; label: string }[] = [
      { field: "constituency", label: "Constituency" },
      { field: "district",     label: "District" },
      { field: "state",        label: "State" },
      { field: "party",        label: "Political Party" },
    ];

    for (const { field, label } of required) {
      const val = data[field];
      if (!val || (typeof val === "string" && val.trim() === "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${label} is required for MP registration`,
          path: [field],
        });
      }
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// ── Forgot Password ──────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// ── Reset Password ───────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// ── OTP ──────────────────────────────────────────────────────────────────────

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain digits only"),
});

export type OtpSchema = z.infer<typeof otpSchema>;
