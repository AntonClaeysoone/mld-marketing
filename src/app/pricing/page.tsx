"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    id: "pro",
    name: "Pro",
    price: 59,
    originalPrice: 89,
    period: "/ month",
    priceLabel: null,
    description: "Small labels with a core team releasing a few tracks per quarter.",
    features: [
      "2 users",
      "3 tracks/month",
      "100 GB storage",
      "Contracts & label copy",
    ],
    cta: "Book a demo",
    highlighted: false,
  },
  {
    id: "business",
    name: "Business",
    price: 129,
    originalPrice: 199,
    period: "/ month",
    priceLabel: null,
    description: "Active labels releasing monthly with dedicated teams managing multiple projects.",
    features: [
      "4 users",
      "5 tracks/month",
      "500 GB storage",
      "Analytics & finance",
    ],
    cta: "Book a demo",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    originalPrice: 699,
    period: "/ month",
    priceLabel: null,
    description: "Established labels operating at scale with structured teams and weekly releases.",
    features: [
      "8 users",
      "Unlimited tracks",
      "2TB storage",
      "Full analytics",
      "Whitelabel included",
    ],
    cta: "Book a demo",
    highlighted: false,
  },
  {
    id: "custom",
    name: "Custom",
    price: 799,
    originalPrice: 1499,
    period: "/ month",
    priceLabel: "from €799",
    description: "Large operations with complex structures, multiple labels, or custom integration needs.",
    features: [
      "Unlimited users",
      "Unlimited tracks",
      "Unlimited storage",
      "Everything included",
      "Custom integrations",
    ],
    cta: "Book a demo",
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

function AnimatedPrice({ value, annual }: { value: number; annual: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);
  const target = annual ? Math.round(value * 0.8) : value;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / 20;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setDisplayed(target);
        clearInterval(interval);
      } else {
        setDisplayed(Math.round(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span ref={ref}>{isInView ? displayed : 0}</span>;
}

function PricingCard({
  plan,
  index,
  annual,
}: {
  plan: (typeof plans)[number];
  index: number;
  annual: boolean;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        transform: hovering
          ? `perspective(800px) rotateY(${plan.highlighted ? 0 : index === 0 ? 2 : -2}deg) translateY(-6px)`
          : "perspective(800px) rotateY(0deg) translateY(0px)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      id={plan.id}
      className={`relative flex flex-col overflow-hidden rounded-[24px] p-8 sm:p-10 ${
        plan.highlighted
          ? "border-2 border-[#0000d8] bg-gradient-to-b from-[#020617] to-[#0a0e27] pt-14 text-white shadow-[0_30px_80px_rgba(0,0,216,0.25)] sm:pt-16"
          : "border border-[#e2e8f0] bg-white"
      }`}
    >
      {plan.highlighted && (
        <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-[#0000d8]/30 blur-3xl" />
      )}
      {plan.highlighted && (
        <p className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-[#0000d8] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white sm:top-4">
          Most Popular
        </p>
      )}
      <div className="flex flex-1 flex-col">
      <p
        className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${
          plan.highlighted ? "text-[#93c5fd]" : "text-[#0000d8]"
        }`}
      >
        {plan.name}
      </p>
      <div className="mt-4">
        {plan.originalPrice != null && (
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className={`text-[14px] font-semibold line-through ${
                plan.highlighted ? "text-[#93c5fd]/80" : "text-[#94a3b8]"
              }`}
            >
              €{plan.originalPrice}
            </span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                plan.highlighted ? "bg-[#0000d8]/40 text-[#93c5fd]" : "bg-[#0000d8]/10 text-[#0000d8]"
              }`}
            >
              Early Adopter
            </span>
          </div>
        )}
        <div className="flex flex-wrap items-baseline gap-1">
          <span
            className={`text-[48px] font-black leading-none ${
              plan.highlighted ? "text-white" : "text-[#0a0e27]"
            }`}
          >
            {plan.priceLabel != null ? (
              plan.priceLabel
            ) : plan.price === 0 ? (
              "Free"
            ) : (
              <>
                €<AnimatedPrice value={plan.price} annual={annual} />
              </>
            )}
          </span>
          {plan.period && (
            <span
              className={`text-[16px] ${
                plan.highlighted ? "text-[#bfdbfe]" : "text-[#94a3b8]"
              }`}
            >
              {plan.period}
            </span>
          )}
        </div>
      </div>
      <p
        className={`mt-3 text-[15px] ${
          plan.highlighted ? "text-[#bfdbfe]" : "text-[#64748b]"
        }`}
      >
        {plan.description}
      </p>

      <ul className="mt-8 space-y-3">
        {plan.features.map((f, fi) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3 + fi * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`flex items-center gap-3 text-[14px] ${
              plan.highlighted ? "text-[#e2e8f0]" : "text-[#475569]"
            }`}
          >
            <svg
              className={`h-4 w-4 shrink-0 ${
                plan.highlighted ? "text-[#93c5fd]" : "text-[#0000d8]"
              }`}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8.5l3.5 3.5L13 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {f}
          </motion.li>
        ))}
      </ul>
      </div>

      <Link
        href="/get-started"
        className={`mt-auto block w-full rounded-full py-4 text-center text-[14px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-[1.02] ${
          plan.highlighted
            ? "bg-white text-[#0000d8] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
            : "bg-[#0000d8] text-white hover:bg-[#1d4ed8] hover:shadow-[0_8px_30px_rgba(0,0,216,0.2)]"
        }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      {/* Hero with parallax */}
      <section ref={heroRef} className="relative overflow-hidden bg-white pb-4 pt-6">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#0000d8]/[0.03] blur-[120px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12"
        >
          <div className="pt-28 text-center sm:pt-36">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#0000d8]"
            >
              Pricing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px]"
            >
              Simple, transparent{" "}
              <span className="text-[#0000d8]">pricing.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-[#64748b] sm:text-[19px]"
            >
              Start small, scale as you grow. Every plan includes a 14-day free trial.
            </motion.p>

            {/* Billing toggle with spring */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <span
                className={`text-[14px] font-semibold transition-colors duration-300 ${
                  !annual ? "text-[#0a0e27]" : "text-[#94a3b8]"
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={() => setAnnual(!annual)}
                className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
                  annual ? "bg-[#0000d8]" : "bg-[#e2e8f0]"
                }`}
              >
                <motion.div
                  animate={{ x: annual ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm"
                />
              </button>
              <span
                className={`text-[14px] font-semibold transition-colors duration-300 ${
                  annual ? "text-[#0a0e27]" : "text-[#94a3b8]"
                }`}
              >
                Annual{" "}
                <span className="text-[#0000d8]">(-20%)</span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 h-px max-w-6xl origin-left bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent"
        />
      </section>

      {/* Cards */}
      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} annual={annual} />
            ))}
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-28 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center text-[12px] font-semibold uppercase tracking-[0.25em] text-[#0000d8]"
            >
              Support
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-center text-[28px] font-black leading-tight text-[#0a0e27] sm:text-[36px]"
            >
              Frequently asked{" "}
              <span className="text-[#0000d8]">questions</span>
            </motion.h2>
            <div className="mt-14 space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ${
                    openFaq === i
                      ? "ring-2 ring-[#0000d8]/20 shadow-[0_8px_30px_rgba(0,0,216,0.08)]"
                      : "ring-1 ring-[#e2e8f0] hover:ring-[#cbd5e1] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f8fafc] sm:px-8 sm:py-6"
                  >
                    <span className="text-[16px] font-bold text-[#0a0e27] sm:text-[17px]">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        openFaq === i
                          ? "bg-[#0000d8] text-white"
                          : "bg-[#0000d8]/10 text-[#0000d8]"
                      }`}
                    >
                      <motion.svg
                        animate={{ rotate: openFaq === i ? 135 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 4v12M4 10h12"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === i ? "auto" : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{
                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: openFaq === i ? 0.1 : 0 },
                    }}
                    className="overflow-hidden border-t border-[#e2e8f0]"
                  >
                    <p className="bg-[#f8fafc] px-6 py-5 text-[15px] leading-relaxed text-[#475569] sm:px-8 sm:py-6">
                      {faq.a}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
