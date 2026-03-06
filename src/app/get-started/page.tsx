"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inputFields = [
  { id: "name", label: "Full name", type: "text", placeholder: "John Doe" },
  { id: "email", label: "Email", type: "email", placeholder: "you@label.com" },
  { id: "label", label: "Label name", type: "text", placeholder: "Your label" },
  { id: "website", label: "Website / Socials", type: "text", placeholder: "https://..." },
] as const;

const steps = [
  {
    number: "01",
    title: "Submit your request",
    description: "Fill in the contact form with your label details.",
  },
  {
    number: "02",
    title: "We review your profile",
    description: "Our team evaluates fit and readiness within 48 hours.",
  },
  {
    number: "03",
    title: "Guided onboarding",
    description: "Once accepted, we personally onboard your team into the platform.",
  },
];

export default function GetStartedPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-6 pt-6">
        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#0000d8]/[0.03] blur-[100px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0000d8]/[0.04] blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="pb-16 pt-28 sm:pt-36">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#0000d8]"
            >
              Get started
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px] lg:text-[88px]"
            >
              Join the{" "}
              <span className="text-[#0000d8]">waitlist.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-[17px] leading-[1.7] text-[#64748b] sm:text-[19px]"
            >
              MyLabelDesk is currently in closed access. Due to high demand and the personalized
              nature of our onboarding, we selectively onboard new clients to ensure every label
              gets the attention it deserves.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-px max-w-6xl origin-left bg-gradient-to-r from-[#0000d8]/30 via-[#e2e8f0] to-transparent"
        />
      </section>

      {/* How it works + Form */}
      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* How it works */}
          <div className="py-16 sm:py-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[24px] font-black text-[#0a0e27] sm:text-[32px]"
            >
              How it works
            </motion.h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative rounded-2xl border border-[#e2e8f0] p-7 transition-all duration-500 hover:border-[#0000d8]/20 hover:shadow-[0_24px_48px_-12px_rgba(0,0,216,0.08)]"
                >
                  <span className="text-[48px] font-black leading-none text-[#0a0e27]/[0.04] transition-colors duration-500 group-hover:text-[#0000d8]/[0.08]">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-[18px] font-black text-[#0a0e27]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closed access notice + Contact form */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Left: Closed access messaging */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0000d8]/[0.07] px-4 py-2 self-start">
                <span className="h-2 w-2 rounded-full bg-[#0000d8] animate-pulse" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0000d8]">
                  Closed access
                </span>
              </div>

              <h2 className="mt-6 text-[28px] font-black leading-[1.08] text-[#0a0e27] sm:text-[36px]">
                We&apos;re not open to{" "}
                <span className="text-[#0000d8]">everyone — yet.</span>
              </h2>

              <p className="mt-5 text-[16px] leading-[1.7] text-[#64748b] sm:text-[17px]">
                MyLabelDesk is a high-touch platform. We work closely with every label we onboard
                to configure workflows, migrate data, and train teams. That&apos;s why we currently
                onboard clients by invitation only.
              </p>

              <p className="mt-4 text-[16px] leading-[1.7] text-[#64748b] sm:text-[17px]">
                Submit your details and our team will reach out to schedule an introduction call.
                We typically respond within 48 hours.
              </p>

              <p className="mt-8 text-[15px] leading-[1.7] text-[#64748b]">
                Join others like{" "}
                <Link
                  href="https://paraisorecords.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0000d8] underline decoration-[#0000d8]/30 underline-offset-2 transition-colors hover:text-[#1d4ed8] hover:decoration-[#1d4ed8]"
                >
                  Paraiso Records
                </Link>
                ,{" "}
                <Link
                  href="https://whatdahouse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0000d8] underline decoration-[#0000d8]/30 underline-offset-2 transition-colors hover:text-[#1d4ed8] hover:decoration-[#1d4ed8]"
                >
                  What Da House
                </Link>
                , and so much more…
              </p>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-[#1e293b]/80 bg-[#0a0e27] p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] sm:p-10 lg:p-12"
            >
              <motion.div
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.15, 0.95, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -bottom-32 -left-32 z-0 h-80 w-80 rounded-full bg-[#0000d8]/20 blur-[100px]"
              />
              <motion.div
                animate={{
                  x: [0, -20, 30, 0],
                  y: [0, 30, -20, 0],
                  scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="pointer-events-none absolute right-10 top-1/4 z-0 h-48 w-48 rounded-full bg-[#1d4ed8]/15 blur-[80px]"
              />

              {!submitted ? (
                <div className="relative z-20">
                  <h3 className="text-[24px] font-black text-white sm:text-[28px]">
                    Request access
                  </h3>
                  <p className="mt-2 text-[15px] text-[#94a3b8]">
                    Tell us about your label and we&apos;ll get back to you.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {inputFields.map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.id !== "website"}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full rounded-xl border bg-[#020617] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569] ${
                            focusedField === field.id
                              ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.15)]"
                              : "border-[#1e293b]"
                          }`}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Tell us about your label, catalog size, team, and what you're looking for..."
                        rows={4}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full resize-none rounded-xl border bg-[#020617] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569] ${
                          focusedField === "message"
                            ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.15)]"
                            : "border-[#1e293b]"
                        }`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-20 mt-2 w-full rounded-full border-2 border-white bg-[#0f172a] py-4 text-[14px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1e293b]"
                    >
                      Request access
                    </motion.button>

                    <p className="text-center text-[12px] text-[#475569]">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="text-[#94a3b8] underline transition-colors hover:text-white">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-[#94a3b8] underline transition-colors hover:text-white">
                        Terms
                      </Link>
                      .
                    </p>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0000d8]"
                  >
                    <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="mt-6 text-[24px] font-black text-white sm:text-[28px]">
                    Request received
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#94a3b8]">
                    Thank you for your interest. Our team will review your submission and reach
                    out within 48 hours to schedule an introduction.
                  </p>
                  <Link
                    href="/"
                    className="mt-8 inline-flex items-center rounded-full border border-[#1e293b] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-[#475569]"
                  >
                    Back to home
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-28 overflow-hidden rounded-3xl bg-gradient-to-b from-[#020617] to-[#0000d8]/60 px-8 py-20 text-center shadow-[0_40px_90px_rgba(0,0,0,0.35)]"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[400px] -translate-x-1/2 rounded-full bg-[#0000d8]/20 blur-[80px]" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-[28px] font-black text-white sm:text-[40px]"
            >
              Questions before applying?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto mt-4 max-w-lg text-[16px] text-[#bfdbfe] sm:text-[18px]"
            >
              Explore our platform features, pricing, and AI capabilities to learn more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/solutions"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[14px] font-bold uppercase tracking-[0.2em] text-[#0000d8] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
              >
                Explore solutions
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-[14px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white/40 hover:scale-[1.04]"
              >
                View pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
