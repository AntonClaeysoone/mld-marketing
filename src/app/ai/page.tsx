"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const aiCapabilities = [
  {
    id: "creative",
    category: "Creative Support",
    items: [
      {
        title: "Track Triage",
        description: "AI listens and categorizes incoming demos by genre, energy, and potential.",
      },
      {
        title: "Opportunity Scoring",
        description: "Surface the highest-potential signings based on streaming data and market trends.",
      },
      {
        title: "Artist Insights",
        description: "Automated briefs on an artist's trajectory, audience, and growth potential.",
      },
      {
        title: "Campaign Ideas",
        description: "Generate release marketing strategies based on genre, audience, and timing.",
      },
    ],
  },
  {
    id: "operations",
    category: "Operations",
    items: [
      {
        title: "Metadata Suggestions",
        description: "Auto-fill credits, ISRC codes, and contributor data from your catalog history.",
      },
      {
        title: "Release Risk Alerts",
        description: "Flag missing assets, incomplete metadata, or tight deadlines before they become blockers.",
      },
      {
        title: "Timeline Optimization",
        description: "Suggest ideal release dates based on market activity and historical performance.",
      },
      {
        title: "Smart Task Routing",
        description: "Auto-assign tasks to the right team member based on workload and expertise.",
      },
    ],
  },
  {
    id: "executive",
    category: "Executive Intelligence",
    items: [
      {
        title: "Weekly Briefs",
        description: "Automated summaries of label activity, releases, and key metrics delivered weekly.",
      },
      {
        title: "Portfolio Summaries",
        description: "Bird's-eye performance view across your entire catalog and artist roster.",
      },
      {
        title: "Forecast Snapshots",
        description: "Revenue and streaming projections based on release pipeline and historical data.",
      },
      {
        title: "Trend Monitoring",
        description: "Track emerging genres, sounds, and market shifts relevant to your catalog.",
      },
    ],
  },
];

const pulseLines = Array.from({ length: 5 });

export default function AIPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#020617] to-[#0a0e27] pb-20 pt-6">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0000d8]/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="pt-28 text-center sm:pt-36"
          >
            <motion.p
              variants={fadeUp}
              className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#93c5fd]"
            >
              AI Intelligence
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-[36px] font-black leading-[1.04] tracking-tight text-white sm:text-[56px] md:text-[72px] lg:text-[88px]"
            >
              Your label&apos;s{" "}
              <span className="bg-gradient-to-r from-[#93c5fd] to-[#0000d8] bg-clip-text text-transparent">
                AI copilot.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#bfdbfe] sm:text-[20px]"
            >
              AI that understands your projects, deadlines, catalog, and release readiness —
              accelerating decisions across every workflow.
            </motion.p>
          </motion.div>

          {/* Animated pulse visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="mx-auto mt-16 flex h-32 max-w-md items-center justify-center gap-2 sm:h-40"
          >
            {pulseLines.map((_, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-full bg-gradient-to-t from-[#0000d8] to-[#93c5fd] sm:w-3"
                animate={{
                  height: ["20%", `${40 + Math.random() * 50}%`, "20%"],
                }}
                transition={{
                  duration: 1.2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white px-4 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {aiCapabilities.map((cap, i) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all ${
                  activeTab === i
                    ? "bg-[#0000d8] text-white"
                    : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                }`}
              >
                {cap.category}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="mt-16 grid gap-6 sm:grid-cols-2"
            >
              {aiCapabilities[activeTab].items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white p-8 transition-all hover:border-[#0000d8]/30 hover:shadow-[0_20px_60px_rgba(0,0,216,0.1)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0000d8]/10">
                    <div className="h-3 w-3 rounded-full bg-[#0000d8]" />
                  </div>
                  <h3 className="mt-5 text-[20px] font-black text-[#0a0e27]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#64748b]">{item.description}</p>
                  <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#0000d8]/5 transition-all group-hover:bg-[#0000d8]/10" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Placeholder visualization */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-24 overflow-hidden rounded-[32px] bg-gradient-to-b from-[#020617] to-[#0a0e27] p-10 shadow-[0_40px_90px_rgba(0,0,0,0.4)] sm:p-16"
          >
            <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#0000d8]/20 blur-[100px]" />
            <div className="relative z-10 text-center">
              <p className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#93c5fd]">
                AI Dashboard Preview
              </p>
              <h2 className="mt-4 text-[28px] font-black text-white sm:text-[36px]">
                Intelligence at your fingertips
              </h2>
              <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-6">
                {["Active releases", "Risk alerts", "Tasks auto-routed"].map((label) => (
                  <div key={label} className="rounded-2xl border border-[#1e293b] bg-[#020617]/60 p-6">
                    <div className="text-[32px] font-black text-[#0000d8]">—</div>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.16em] text-[#bfdbfe]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <Link
              href="/login"
              className="inline-flex items-center rounded-full bg-[#0000d8] px-10 py-5 text-[14px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1d4ed8]"
            >
              Try AI features
            </Link>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
