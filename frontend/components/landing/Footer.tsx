"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import Container from "../ui/Container";

/* ── Inline brand SVGs (lucide-react v1+ removed brand icons) ── */
const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ── Data ─────────────────────────────────────────────── */

const platformLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Government Services", href: "#services" },
  { label: "AI Assistant", href: "#ai" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const portalLinks = [
  { label: "Citizen Portal", href: "/citizen" },
  { label: "MP Dashboard", href: "/mp" },
  { label: "Admin Panel", href: "/admin" },
  { label: "Scheme Finder", href: "#" },
  { label: "Grievance Portal", href: "#" },
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Support Center", href: "#" },
  { label: "API Reference", href: "#" },
];

const socialLinks = [
  { Icon: GithubIcon, label: "GitHub", href: "#" },
  { Icon: XIcon, label: "X (Twitter)", href: "#" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function NavLink({ href, children, external }: NavLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-1 text-sm text-slate-500 transition-colors duration-200 hover:text-blue-300"
    >
      {children}
      {external && (
        <ExternalLink
          size={11}
          className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden="true"
        />
      )}
    </a>
  );
}

/* ── Component ─────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer
      className="border-t border-white/8 bg-slate-950/90 backdrop-blur-xl"
      role="contentinfo"
      aria-label="Site footer"
    >
      <Container>
        {/* Main grid */}
        <div className="grid gap-12 py-20 lg:grid-cols-5 lg:gap-8">
          {/* ── Brand column (2 cols) ── */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5"
              aria-label="JanMitra AI — home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-500/30">
                <span className="text-sm font-black text-white" aria-hidden="true">
                  JM
                </span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Jan
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Mitra
                </span>{" "}
                AI
              </span>
            </a>

            <p className="mt-5 max-w-[280px] text-sm leading-7 text-slate-500">
              AI-powered governance platform connecting citizens, elected
              representatives and government through secure, intelligent
              digital public services.
            </p>

            {/* Contact */}
            <address className="mt-6 space-y-2.5 not-italic">
              <a
                href="mailto:support@janmitra.ai"
                className="flex items-center gap-2.5 text-sm text-slate-500 transition hover:text-blue-300"
              >
                <Mail size={14} className="text-blue-400" aria-hidden="true" />
                support@janmitra.ai
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <Phone size={14} className="text-blue-400" aria-hidden="true" />
                <span>1800-000-MITRA (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <MapPin size={14} className="text-blue-400" aria-hidden="true" />
                <span>New Delhi, India — 110 001</span>
              </div>
            </address>

            {/* Social */}
            <div className="mt-7 flex gap-2.5" aria-label="Social media links">
              {socialLinks.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={`JanMitra AI on ${s.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-slate-500 transition-all duration-200 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Platform links ── */}
          <nav aria-label="Platform navigation">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Portal links ── */}
          <nav aria-label="Portal navigation">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white">
              Portals
            </h3>
            <ul className="space-y-3">
              {portalLinks.map((item) => (
                <li key={item.label}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Resource links ── */}
          <nav aria-label="Resources navigation">
            <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-8 text-sm text-slate-600 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} JanMitra AI. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Built with ❤️ for{" "}
            <span className="font-semibold text-blue-400">
              Smart India Hackathon 2026
            </span>
          </p>

          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-slow"
              aria-hidden="true"
            />
            <span className="text-emerald-400">All systems operational</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}