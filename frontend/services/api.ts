/**
 * services/api.ts
 *
 * Axios instance for all JanMitra AI backend requests.
 *
 * Features:
 *  - Base URL: http://127.0.0.1:8000
 *  - Request interceptor: attaches Authorization: Bearer <token> automatically
 *  - Response interceptor: on 401 → clears session → redirects to /login
 *  - No mock or demo code — production-only
 */

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const SESSION_KEY = "janmitra_session";

// ── Axios instance ────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000, // 15-second timeout
});

// ── Request interceptor — attach Bearer token ─────────────────────────────────

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (raw) {
          const session = JSON.parse(raw) as { accessToken?: string };
          if (session?.accessToken) {
            config.headers["Authorization"] = `Bearer ${session.accessToken}`;
          }
        }
      } catch {
        // Invalid JSON in storage — ignore silently
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — handle 401 Unauthorized ───────────────────────────

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Token expired or invalid — clear session and redirect to login
      localStorage.removeItem(SESSION_KEY);
      const currentPath = window.location.pathname;
      const isAuthPage = ["/login", "/register", "/forgot-password", "/reset-password"].some(
        (p) => currentPath.startsWith(p)
      );
      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ── Helper to extract a user-facing error message ─────────────────────────────

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0];
      if (typeof first?.msg === "string") return first.msg;
    }
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export default api;
