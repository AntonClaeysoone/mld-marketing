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

const solutions = [
  {
    id: "ar",
    category: "Discovery",
    title: "A&R Workspace",
    description: "Scout, evaluate, and sign talent from one unified pipeline.",
    features: ["Artist scouting pipeline", "Demo review queue", "Opportunity scoring", "Digital deal memos"],
  },
  {
    id: "releases",
    category: "Planning",
    title: "Release Planning",
    description: "Orchestrate every milestone from recording to launch day.",
    features: ["Timeline builder", "Milestone tracking", "Team assignments", "Deadline alerts"],
  },
  {
    id: "tasks",
    category: "Operations",
    title: "Task Orchestration",
    description: "Assign, track, and automate tasks across your entire team.",
    features: ["Kanban & list views", "Auto-assignments", "Priority levels", "Progress dashboards"],
  },
  {
    id: "contributors",
    category: "People",
    title: "Contributor Management",
    description: "Centralize every artist, writer, producer, and collaborator.",
    features: ["Unified profiles", "Credit tracking", "Split management", "Contact directory"],
  },
  {
    id: "metadata",
    category: "Data",
    title: "Metadata Control",
    description: "Ensure every track ships with complete, accurate metadata.",
    features: ["ISRC generation", "Credit validation", "Format compliance", "Bulk editing"],
  },
  {
    id: "assets",
    category: "Creative",
    title: "Asset Collection",
    description: "Collect artwork, stems, masters, and promo materials in one vault.",
    features: ["Upload portal", "Version control", "Approval flows", "Format conversion"],
  },
  {
    id: "distribution",
    category: "Delivery",
    title: "Distribution Setup",
    description: "Prepare delivery packages and launch across all platforms.",
    features: ["DSP formatting", "Pre-save campaigns", "Territory settings", "Launch checklists"],
  },
  {
    id: "contracts",
    category: "Legal",
    title: "Contract Automation",
    description: "Generate, send, and track contracts with built-in templates.",
    features: ["Template library", "E-signatures", "Renewal alerts", "Clause management"],
  },
  {
    id: "catalog",
    category: "Catalog",
    title: "Catalog Lifecycle",
    description: "Manage rights, royalties, and long-tail performance over time.",
    features: ["Rights tracking", "Royalty calculations", "Performance analytics", "Re-release workflows"],
  },
] as const;

const categories = [...new Set(solutions.map((s) => s.category))];

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filtered = activeCategory
    ? solutions.filter((s) => s.category === activeCategory)
    : solutions;

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      <section className="bg-white pb-16 pt-6 shadow-[0_40px_120px_rgba(10,14,39,0.45)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="pt-28 sm:pt-36"
          >
            <motion.p
              variants={fadeUp}
              className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#0000d8]"
            >
              Platform
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px] lg:text-[88px]"
            >
              Every tool a label needs.{" "}
              <span className="text-[#0000d8]">One platform.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#475569] sm:text-[20px]"
            >
              From scouting artists to shipping releases, MyLabelDesk replaces the patchwork of
              tools with one connected operating system.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-3 pb-12 pt-4">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all ${
                activeCategory === null
                  ? "bg-[#0000d8] text-white"
                  : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all ${
                  activeCategory === cat
                    ? "bg-[#0000d8] text-white"
                    : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Solution cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory ?? "all"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((solution, i) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                  id={solution.id}
                  className="group relative overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:border-[#0000d8]/30 hover:shadow-[0_20px_60px_rgba(0,0,216,0.12)]"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0000d8]/60">
                    {solution.category}
                  </p>
                  <h3 className="mt-3 text-[22px] font-black text-[#0a0e27]">
                    {solution.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#64748b]">
                    {solution.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {solution.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#475569]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0000d8]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#0000d8]/5 transition-all duration-500 group-hover:bg-[#0000d8]/10" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-20 flex flex-col items-center gap-6 rounded-[32px] bg-gradient-to-b from-[#020617] to-[#0000d8]/60 px-8 py-16 text-center shadow-[0_40px_90px_rgba(0,0,0,0.4)]"
          >
            <h2 className="text-[28px] font-black text-white sm:text-[40px]">
              Ready to unify your label?
            </h2>
            <p className="max-w-lg text-[16px] text-[#bfdbfe] sm:text-[18px]">
              See how MyLabelDesk connects every workflow into one powerful platform.
            </p>
            <Link
              href="/login"
              className="mt-2 inline-flex items-center rounded-full bg-white px-8 py-4 text-[14px] font-bold uppercase tracking-[0.2em] text-[#0000d8] transition-all hover:bg-[#f1f5f9]"
            >
              Get started
            </Link>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
