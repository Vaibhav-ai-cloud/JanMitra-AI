"use client";

import { useState, useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "AI Assistant", href: "#ai" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const mobileMenuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/85 shadow-lg shadow-black/20 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <Container>
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <a
            href="#"
            className="group flex items-center gap-2.5 focus-visible:rounded-lg"
            aria-label="JanMitra AI — Go to homepage"
            onClick={() => handleNavClick("#")}
          >
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/35 transition-shadow duration-300 group-hover:shadow-blue-500/55">
              <span className="text-sm font-black text-white">JM</span>
              <div className="absolute inset-0 bg-white/0 transition-colors duration-200 group-hover:bg-white/10" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Jan
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mitra
              </span>{" "}
              AI
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary navigation links"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeSection === item.href
                    ? "bg-blue-500/15 text-blue-300"
                    : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
                }`}
                aria-current={activeSection === item.href ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/login" variant="ghost" size="sm">
              Log in
            </Button>
            <Button href="/register" size="sm">
              <span className="flex items-center gap-1.5">
                Get Started
                <ArrowRight size={15} />
              </span>
            </Button>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-500/60 lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls={mobileMenuId}
          >
            <AnimatePresence initial={false} mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              id={mobileMenuId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <motion.div
                initial={{ y: -8 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-4 backdrop-blur-2xl"
              >
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation links">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      className={`flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all ${
                        activeSection === item.href
                          ? "bg-blue-500/15 text-blue-300"
                          : "text-white hover:bg-white/[0.08] hover:text-blue-300"
                      }`}
                      aria-current={
                        activeSection === item.href ? "page" : undefined
                      }
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-3 border-t border-white/10 pt-4 flex flex-col gap-2.5">
                  <Button href="/login" variant="outline" className="w-full">
                    Log in
                  </Button>
                  <Button href="/register" className="w-full">
                    <span className="flex items-center justify-center gap-2">
                      Get Started Free
                      <ArrowRight size={16} />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}