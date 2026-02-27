"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "49",
    period: "/ month",
    description: "For independent labels getting started.",
    features: [
      "Up to 5 team members",
      "Core A&R workflow",
      "Release planning",
      "Asset collection",
      "Metadata management",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "149",
    period: "/ month",
    description: "For labels scaling their operations.",
    features: [
      "Up to 25 team members",
      "Everything in Starter",
      "Contract automation",
      "Advanced permissions",
      "Distribution prep",
      "AI assistant",
      "Automated reminders",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For major labels and label groups.",
    features: [
      "Unlimited team members",
      "Everything in Growth",
      "Custom integrations",
      "Dedicated success lead",
      "Security & compliance",
      "SLA coverage",
      "Custom onboarding",
      "API access",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade or downgrade anytime from your workspace settings. Changes take effect at your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan comes with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards and can arrange invoicing for Enterprise customers.",
  },
  {
    q: "Can I add more team members?",
    a: "Additional seats can be purchased on Starter and Growth plans. Enterprise plans include unlimited members.",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      <section className="bg-white pb-16 pt-6 shadow-[0_40px_120px_rgba(10,14,39,0.45)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="pt-28 text-center sm:pt-36"
          >
            <motion.p
              variants={fadeUp}
              className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#0000d8]"
            >
              Pricing
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px]"
            >
              Simple, transparent{" "}
              <span className="text-[#0000d8]">pricing.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[#475569] sm:text-[20px]"
            >
              Start small, scale as you grow. Every plan includes a 14-day free trial.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-4">
              <span className={`text-[14px] font-semibold ${!annual ? "text-[#0a0e27]" : "text-[#94a3b8]"}`}>
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setAnnual(!annual)}
                className="relative h-8 w-14 rounded-full bg-[#e2e8f0] transition-colors"
              >
                <motion.div
                  animate={{ x: annual ? 24 : 2 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute top-1 h-6 w-6 rounded-full bg-[#0000d8]"
                />
              </button>
              <span className={`text-[14px] font-semibold ${annual ? "text-[#0a0e27]" : "text-[#94a3b8]"}`}>
                Annual <span className="text-[#0000d8]">(-20%)</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Pricing cards */}
          <div className="grid gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                id={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                className={`relative overflow-hidden rounded-[28px] p-8 transition-all sm:p-10 ${
                  plan.highlighted
                    ? "border-2 border-[#0000d8] bg-gradient-to-b from-[#020617] to-[#0a0e27] text-white shadow-[0_30px_80px_rgba(0,0,216,0.25)]"
                    : "border border-[#e2e8f0] bg-white"
                }`}
              >
                {plan.highlighted && (
                  <div className="pointer-events-none absolute -top-20 right-0 h-48 w-48 rounded-full bg-[#0000d8]/30 blur-3xl" />
                )}
                <p className={`text-[13px] font-semibold uppercase tracking-[0.2em] ${plan.highlighted ? "text-[#93c5fd]" : "text-[#0000d8]"}`}>
                  {plan.name}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-[48px] font-black leading-none ${plan.highlighted ? "text-white" : "text-[#0a0e27]"}`}>
                    {plan.price === "Custom" ? "" : "$"}
                    {plan.price === "Custom"
                      ? "Custom"
                      : annual
                        ? Math.round(parseInt(plan.price) * 0.8)
                        : plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-[16px] ${plan.highlighted ? "text-[#bfdbfe]" : "text-[#94a3b8]"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`mt-3 text-[15px] ${plan.highlighted ? "text-[#bfdbfe]" : "text-[#64748b]"}`}>
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-3 text-[14px] ${plan.highlighted ? "text-[#e2e8f0]" : "text-[#475569]"}`}>
                      <svg className={`h-4 w-4 shrink-0 ${plan.highlighted ? "text-[#93c5fd]" : "text-[#0000d8]"}`} viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`mt-10 block w-full rounded-full py-4 text-center text-[14px] font-bold uppercase tracking-[0.18em] transition-all ${
                    plan.highlighted
                      ? "bg-white text-[#0000d8] hover:bg-[#f1f5f9]"
                      : "bg-[#0000d8] text-white hover:bg-[#1d4ed8]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="text-center text-[28px] font-black text-[#0a0e27] sm:text-[36px]">
              Frequently asked questions
            </h2>
            <div className="mt-12 space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-[#e2e8f0] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left text-[16px] font-semibold text-[#0a0e27]"
                  >
                    {faq.q}
                    <motion.svg
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-5 w-5 shrink-0 text-[#0000d8]"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-[#64748b]">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
