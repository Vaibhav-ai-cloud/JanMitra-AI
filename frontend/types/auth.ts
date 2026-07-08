// ── Auth Types ──────────────────────────────────────────────────────────────

export type UserRole = "citizen" | "mp" | "admin";

export interface LoginFormData {
  identifier: string; // email or phone
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: "citizen" | "mp";
  acceptTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface OtpFormData {
  otp: string;
}

export type AuthStep =
  | "login"
  | "register"
  | "forgot-password"
  | "reset-password"
  | "otp"
  | "email-verify"
  | "success";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
  color: string;
}

export type SocialProvider = "google" | "github";
