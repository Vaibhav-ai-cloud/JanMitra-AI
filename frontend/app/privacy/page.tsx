import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how JanMitra AI collects, uses, and protects your personal data in compliance with India's DPDP Act 2023.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#080e1c]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            aria-label="JanMitra AI — Back to home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-500/30">
              <span className="text-xs font-black text-white" aria-hidden>
                JM
              </span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              Jan
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mitra
              </span>{" "}
              AI
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Sign in
          </Link>
        </Container>
      </header>

      {/* Content */}
      <main id="main-content" className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div className="mb-12">
            <span className="mb-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
              Legal
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-slate-400">
              Last updated:{" "}
              <time dateTime="2026-01-01">January 1, 2026</time>
            </p>
          </div>

          <div className="space-y-10 text-slate-300">
            <section aria-labelledby="overview">
              <h2 id="overview" className="mb-4 text-2xl font-bold text-white">
                1. Overview
              </h2>
              <p className="leading-8">
                JanMitra AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the Platform&rdquo;) is committed to
                protecting your personal data. This Privacy Policy explains how we collect,
                use, store, and protect your information in compliance with the
                Digital Personal Data Protection (DPDP) Act, 2023 and other applicable
                Indian data protection laws.
              </p>
            </section>

            <section aria-labelledby="data-collected">
              <h2 id="data-collected" className="mb-4 text-2xl font-bold text-white">
                2. Data We Collect
              </h2>
              <p className="leading-8">We collect the following categories of data:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
                <li>
                  <strong className="text-slate-200">Identity data:</strong> Full name,
                  email address, mobile number, and account role.
                </li>
                <li>
                  <strong className="text-slate-200">Verification data:</strong> OTP
                  verification records (we never store Aadhaar numbers; Aadhaar
                  authentication is handled directly via UIDAI APIs).
                </li>
                <li>
                  <strong className="text-slate-200">Usage data:</strong> Pages visited,
                  features used, search queries, grievances filed, and scheme
                  applications submitted.
                </li>
                <li>
                  <strong className="text-slate-200">Device data:</strong> IP address,
                  browser type, operating system, and device identifiers.
                </li>
                <li>
                  <strong className="text-slate-200">Constituency data:</strong> For MP
                  accounts, constituency-level aggregated analytics.
                </li>
              </ul>
            </section>

            <section aria-labelledby="how-we-use">
              <h2 id="how-we-use" className="mb-4 text-2xl font-bold text-white">
                3. How We Use Your Data
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-slate-400">
                <li>To provide and personalise the Platform&apos;s services.</li>
                <li>To check your eligibility for government schemes.</li>
                <li>To route grievances to your elected representative.</li>
                <li>To send important account and security notifications.</li>
                <li>To improve AI model accuracy with anonymised, aggregated data.</li>
                <li>To comply with legal obligations under Indian law.</li>
              </ul>
            </section>

            <section aria-labelledby="data-sharing">
              <h2 id="data-sharing" className="mb-4 text-2xl font-bold text-white">
                4. Data Sharing
              </h2>
              <p className="leading-8">
                We do <strong className="text-white">not</strong> sell your personal data.
                We may share data with:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
                <li>Government APIs (MyScheme, data.gov.in, UIDAI) as required for service delivery.</li>
                <li>Elected representatives — only grievances you explicitly direct to them.</li>
                <li>Cloud infrastructure providers under strict data processing agreements.</li>
                <li>Law enforcement authorities if required by Indian law.</li>
              </ul>
            </section>

            <section aria-labelledby="data-security">
              <h2 id="data-security" className="mb-4 text-2xl font-bold text-white">
                5. Data Security
              </h2>
              <p className="leading-8">
                All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We
                maintain ISO 27001-aligned security practices and conduct regular
                penetration testing. Passwords are hashed using bcrypt with per-user salts
                and are never stored in plaintext.
              </p>
            </section>

            <section aria-labelledby="your-rights">
              <h2 id="your-rights" className="mb-4 text-2xl font-bold text-white">
                6. Your Rights (DPDP Act 2023)
              </h2>
              <p className="leading-8">Under the DPDP Act, you have the right to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
                <li>Access the personal data we hold about you.</li>
                <li>Correct inaccurate or incomplete personal data.</li>
                <li>Erase your personal data (right to be forgotten).</li>
                <li>Nominate a representative to exercise these rights on your behalf.</li>
                <li>Grievance redressal through our Data Protection Officer.</li>
              </ul>
              <p className="mt-4 leading-8">
                To exercise these rights, contact:{" "}
                <a
                  href="mailto:privacy@janmitra.ai"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  privacy@janmitra.ai
                </a>
              </p>
            </section>

            <section aria-labelledby="cookies">
              <h2 id="cookies" className="mb-4 text-2xl font-bold text-white">
                7. Cookies
              </h2>
              <p className="leading-8">
                We use essential cookies for session management and authentication.
                We do not use third-party advertising or tracking cookies. You can
                control cookie settings through your browser preferences.
              </p>
            </section>

            <section aria-labelledby="changes">
              <h2 id="changes" className="mb-4 text-2xl font-bold text-white">
                8. Changes to This Policy
              </h2>
              <p className="leading-8">
                We may update this Privacy Policy periodically. We will notify registered
                users of material changes by email at least 30 days before they take effect.
                Continued use of the Platform after that date constitutes acceptance.
              </p>
            </section>

            <section aria-labelledby="contact-privacy">
              <h2 id="contact-privacy" className="mb-4 text-2xl font-bold text-white">
                9. Contact & DPO
              </h2>
              <address className="not-italic leading-8">
                <p className="text-slate-400">
                  Data Protection Officer, JanMitra AI
                </p>
                <p className="text-slate-400">New Delhi — 110 001, India</p>
                <p>
                  <a
                    href="mailto:privacy@janmitra.ai"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    privacy@janmitra.ai
                  </a>
                </p>
              </address>
            </section>
          </div>

          <div className="mt-12 flex gap-4 border-t border-white/[0.06] pt-8">
            <Link
              href="/terms"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              Terms of Service →
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}
