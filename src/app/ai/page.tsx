"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const aiCapabilities = [
  {
    id: "catalog",
    category: "Understand Your Catalog",
    items: [
      {
        title: "Song Information",
        description: "Retrieve ISRC, UPC, release dates, and status for any track — just by asking.",
      },
      {
        title: "Track Versions & Files",
        description: "Show all versions of a track and their associated files in one overview.",
      },
      {
        title: "Credits & Splits",
        description: "Display credits and royalty splits across contributors without clicking through tabs.",
      },
      {
        title: "Contract & Asset Status",
        description: "Check contract status and identify missing assets instantly through conversation.",
      },
      {
        title: "Streaming Statistics",
        description: "Surface streaming statistics based on synced data — no dashboards needed.",
      },
    ],
  },
  {
    id: "insight",
    category: "Turn Data Into Insight",
    items: [
      {
        title: "Prioritized Task Lists",
        description: "Generate a prioritized task list based on missing or incomplete data across releases.",
      },
      {
        title: "Release Comparison",
        description: "Compare large sets of releases to identify what's most urgent and needs attention first.",
      },
      {
        title: "Deadline Warnings",
        description: "Get warned about upcoming deadlines before they become blockers.",
      },
      {
        title: "Blocker Detection",
        description: "Highlight blockers preventing a release from going live so you can act immediately.",
      },
      {
        title: "Daily Priorities",
        description: "Dave suggests what needs attention today, transforming raw label data into clear action.",
      },
    ],
  },
  {
    id: "operations",
    category: "Execute Operational Tasks",
    items: [
      {
        title: "Daily Planning",
        description: "Support daily planning by organizing tasks and follow-ups across your team.",
      },
      {
        title: "Email Drafting",
        description: "Help draft or trigger emails when required data is missing from artists or collaborators.",
      },
      {
        title: "Asset Upload Links",
        description: "Create shareable links for artists to upload missing assets directly into the system.",
      },
      {
        title: "Add Contributors",
        description: "Add contributors and people to songs without navigating through complex forms.",
      },
      {
        title: "Artist Database",
        description: "Add new artists to the database — all within the boundaries of your label's system.",
      },
    ],
  },
  {
    id: "philosophy",
    category: "Built for Labels — Not for Hype",
    items: [
      {
        title: "Real Data, Real Results",
        description: "Dave works with your real label data — not generic models or hypothetical scenarios.",
      },
      {
        title: "Respects Permissions",
        description: "Dave respects your label's permission structure, ensuring data stays where it belongs.",
      },
      {
        title: "Operations, Not Creativity",
        description: "Dave focuses on operational efficiency. He doesn't create music or replace creative decisions.",
      },
      {
        title: "Reduced Friction",
        description: "Dave helps reduce friction in complex release workflows — an operational intelligence layer on top of your label.",
      },
    ],
  },
];

function CapabilitySection({
  group,
  groupIndex,
}: {
  group: (typeof aiCapabilities)[number];
  groupIndex: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={sectionRef}
      id={group.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <motion.div style={{ y: sectionY }}>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#0000d8]"
        >
          {String(groupIndex + 1).padStart(2, "0")} — {group.category}
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {group.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-7 transition-[box-shadow,border-color] duration-500 hover:border-[#0000d8]/20 hover:shadow-[0_20px_50px_-12px_rgba(0,0,216,0.1)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0000d8]/[0.07] transition-colors duration-300 group-hover:bg-[#0000d8]/[0.12]">
                <div className="h-2.5 w-2.5 rounded-full bg-[#0000d8] transition-transform duration-300 group-hover:scale-125" />
              </div>
              <h3 className="mt-5 text-[19px] font-black text-[#0a0e27]">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AIPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const orbScale = useTransform(heroProgress, [0, 0.5], [1, 1.3]);
  const orbOpacity = useTransform(heroProgress, [0, 0.6], [0.6, 0]);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      {/* Hero with animated orb */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#020617] to-[#0a0e27] pb-24 pt-6">
        {/* Animated orb */}
        <motion.div
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-conic from-[#0000d8]/40 via-transparent to-[#93c5fd]/30 blur-[60px]"
              style={{ background: "conic-gradient(from 0deg, rgba(0,0,216,0.4), transparent, rgba(147,197,253,0.3), transparent)" }}
            />
            <div className="absolute inset-12 rounded-full bg-gradient-to-b from-[#0000d8]/20 to-transparent blur-[40px]" />
            <div className="absolute inset-24 rounded-full bg-[#020617]/80" />
          </div>
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12"
        >
          <div className="pt-28 text-center sm:pt-36">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#93c5fd]"
            >
              Label Intelligence
            </motion.p>

            <h1 className="mt-5 text-[36px] font-black leading-[1.04] tracking-tight text-white sm:text-[56px] md:text-[72px] lg:text-[88px]">
              {["AI", "is", "here!"].map((word, i) => (
                <motion.span
                  key={`w1-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Meet"].map((word, i) => (
                <motion.span
                  key={`w2-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block bg-gradient-to-r from-[#93c5fd] to-[#0000d8] bg-clip-text text-transparent"
              >
                Dave.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#bfdbfe] sm:text-[19px]"
            >
              Meet Dave, (y)our AI Assistant that works seamlessly together with your label data.
              He doesn&apos;t create music. He doesn&apos;t replace creative decisions.
              He helps labels work smarter, faster, and with more clarity.
            </motion.p>
          </div>

          {/* Audio waveform visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-16 flex h-24 max-w-lg items-end justify-center gap-[3px] sm:h-32 sm:gap-1"
          >
            {Array.from({ length: 32 }).map((_, i) => {
              const center = 16;
              const dist = Math.abs(i - center) / center;
              const maxH = 90 - dist * 60;
              const minH = 10 + dist * 5;
              return (
                <motion.div
                  key={i}
                  className="w-[4px] rounded-full bg-gradient-to-t from-[#0000d8] to-[#93c5fd] sm:w-[5px]"
                  animate={{
                    height: [`${minH}%`, `${maxH}%`, `${minH}%`],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.04,
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Capability sections — scroll-linked, no tabs */}
      <section className="bg-white px-4 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-24">
          {aiCapabilities.map((group, gi) => (
            <CapabilitySection key={group.id} group={group} groupIndex={gi} />
          ))}

          {/* Dashboard preview with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#020617] to-[#0a0e27] p-10 shadow-[0_40px_90px_rgba(0,0,0,0.35)] sm:p-16"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#0000d8]/20 blur-[100px]" />
            <div className="relative z-10 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#93c5fd]"
              >
                Ready to experience Dave?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-[28px] font-black text-white sm:text-[36px]"
              >
                An operational intelligence layer on top of your label
              </motion.h2>
              <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 sm:gap-6">
                {[
                  { label: "Catalog queries", value: "∞" },
                  { label: "Blockers detected", value: "24/7" },
                  { label: "Tasks organized", value: "Auto" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="rounded-2xl border border-[#1e293b] bg-[#020617]/60 p-5 sm:p-6"
                  >
                    <div className="text-[28px] font-black text-[#0000d8] sm:text-[32px]">{stat.value}</div>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#bfdbfe] sm:text-[13px]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 text-center"
          >
            <Link
              href="/get-started"
              className="inline-flex items-center rounded-full bg-[#0000d8] px-10 py-5 text-[14px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.04] hover:bg-[#1d4ed8] hover:shadow-[0_8px_30px_rgba(0,0,216,0.3)]"
            >
              Start using Dave
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
