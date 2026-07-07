import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service governing your use of JanMitra AI — India's AI-powered citizen governance platform.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
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
            <span className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300">
              Legal
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-slate-400">
              Last updated:{" "}
              <time dateTime="2026-01-01">January 1, 2026</time>
            </p>
          </div>

          <div className="prose-custom space-y-10 text-slate-300">
            <section aria-labelledby="acceptance">
              <h2 id="acceptance" className="mb-4 text-2xl font-bold text-white">
                1. Acceptance of Terms
              </h2>
              <p className="leading-8">
                By accessing or using JanMitra AI (&ldquo;the Platform&rdquo;), you agree to be
                bound by these Terms of Service and all applicable laws and regulations
                of India. If you do not agree, you must not use the Platform.
              </p>
            </section>

            <section aria-labelledby="use-of-platform">
              <h2 id="use-of-platform" className="mb-4 text-2xl font-bold text-white">
                2. Use of the Platform
              </h2>
              <p className="leading-8">
                JanMitra AI provides a digital platform connecting citizens with
                government services, elected representatives, and AI-assisted guidance
                on public schemes. You agree to use the Platform only for lawful purposes
                and in accordance with Indian law, including the Information Technology
                Act, 2000 and the Digital Personal Data Protection Act, 2023.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-400">
                <li>You must be at least 18 years of age to create an account.</li>
                <li>You may not impersonate any government official, elected representative, or other user.</li>
                <li>You may not use the Platform to file false grievances or submit fraudulent scheme applications.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              </ul>
            </section>

            <section aria-labelledby="data-privacy">
              <h2 id="data-privacy" className="mb-4 text-2xl font-bold text-white">
                3. Data & Privacy
              </h2>
              <p className="leading-8">
                Your personal data is processed in accordance with our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
                . We are compliant with the Digital Personal Data Protection (DPDP)
                Act, 2023. Aadhaar-based authentication is handled through UIDAI&apos;s
                official APIs and we never store Aadhaar numbers.
              </p>
            </section>

            <section aria-labelledby="ai-disclaimer">
              <h2 id="ai-disclaimer" className="mb-4 text-2xl font-bold text-white">
                4. AI-Powered Features Disclaimer
              </h2>
              <p className="leading-8">
                JanMitra AI uses artificial intelligence to provide scheme recommendations,
                eligibility checks, and grievance guidance. These are informational only
                and do not constitute legal, financial, or government advice. Always
                verify scheme eligibility with the respective ministry or state department.
              </p>
            </section>

            <section aria-labelledby="intellectual-property">
              <h2 id="intellectual-property" className="mb-4 text-2xl font-bold text-white">
                5. Intellectual Property
              </h2>
              <p className="leading-8">
                All content, design, and software on this Platform are the intellectual
                property of JanMitra AI and its licensors. Government scheme data
                sourced from public APIs (MyScheme, data.gov.in) remains the property
                of the Government of India.
              </p>
            </section>

            <section aria-labelledby="termination">
              <h2 id="termination" className="mb-4 text-2xl font-bold text-white">
                6. Termination
              </h2>
              <p className="leading-8">
                We reserve the right to suspend or terminate accounts that violate these
                Terms, misuse the Platform, or engage in fraudulent activity. You may
                delete your account at any time from your profile settings.
              </p>
            </section>

            <section aria-labelledby="governing-law">
              <h2 id="governing-law" className="mb-4 text-2xl font-bold text-white">
                7. Governing Law
              </h2>
              <p className="leading-8">
                These Terms are governed by the laws of India. Any disputes shall be
                subject to the exclusive jurisdiction of the courts of New Delhi.
              </p>
            </section>

            <section aria-labelledby="contact">
              <h2 id="contact" className="mb-4 text-2xl font-bold text-white">
                8. Contact Us
              </h2>
              <p className="leading-8">
                For legal enquiries, please contact:{" "}
                <a
                  href="mailto:legal@janmitra.ai"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  legal@janmitra.ai
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 flex gap-4 border-t border-white/[0.06] pt-8">
            <Link
              href="/privacy"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              Privacy Policy →
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
