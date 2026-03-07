"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const solutions = [
  {
    id: "review",
    category: "Input & Decision",
    title: "Internally Review & Decide",
    description: "Make signing decisions transparent and logged. Structured review workflows keep everyone aligned.",
    features: ["Reduced approval cycles", "Complete decision history", "Team voting and approvals", "Structured review workflows"],
  },
  {
    id: "messaging",
    category: "Input & Decision",
    title: "Messaging System",
    description: "Keep all label communication tied to releases and decisions. No more lost context in email threads.",
    features: ["Searchable message history", "File sharing in context", "Team and artist messaging", "Communication tied to releases"],
  },
  {
    id: "intake",
    category: "Input & Decision",
    title: "Gather Information",
    description: "Standardize how information enters your system. Structured intake reduces missing data and speeds up onboarding.",
    features: ["Consistent information structure", "File uploads and attachments", "Automated data collection", "Standardized intake forms"],
  },
  {
    id: "structurize",
    category: "Structure & Operations",
    title: "Structurize",
    description: "Turn ad-hoc processes into repeatable workflows. Templates and automation ensure consistency across every release.",
    features: ["Consistent operations", "Custom data structures", "Automated process steps", "Repeatable workflow templates"],
  },
  {
    id: "artists",
    category: "Structure & Operations",
    title: "Artist Overview",
    description: "Single source of truth for every artist. See their complete history, active contracts, and current status in one place.",
    features: ["Performance overview", "Release catalog and status", "Active contracts and terms", "Complete artist history"],
  },
  {
    id: "writers",
    category: "Structure & Operations",
    title: "Writers Overview",
    description: "Track songwriting credits and splits across all releases. Maintain accurate records for royalty distribution and legal compliance.",
    features: ["Royalty-ready records", "Collaboration history", "Split tracking across releases", "Writer profiles and credits"],
  },
  {
    id: "playlists",
    category: "Structure & Operations",
    title: "Playlist Overview",
    description: "Organize and track playlists alongside releases. See what's performing and maintain clear curation workflows.",
    features: ["Curation workflows", "Performance insights", "Track placement tracking", "Playlist organization"],
  },
  {
    id: "contracts",
    category: "Contracts, Data & Output",
    title: "Contract Generation",
    description: "Generate contracts with correct metadata automatically. Version control and e-signature integration reduce errors and delays.",
    features: ["Version control and history", "E-signature integration", "Auto-filled from release data", "Template-based generation"],
  },
  {
    id: "statistics",
    category: "Contracts, Data & Output",
    title: "Track Artist / Statistics",
    description: "Monitor performance across releases and artists. Real-time metrics help you make informed decisions about future signings.",
    features: ["Custom dashboards", "Social media metrics", "Streaming and sales analytics", "Real-time performance tracking"],
  },
  {
    id: "reports",
    category: "Contracts, Data & Output",
    title: "Autogenerate Reports",
    description: "Generate reports for stakeholders on schedule. Financial summaries, release status, and compliance data without manual work.",
    features: ["Automated distribution", "Multi-format exports", "Custom report templates", "Scheduled report generation"],
  },
  {
    id: "whitelabel",
    category: "Scale & Brand",
    title: "Whitelabel",
    description: "Present MyLabelDesk as your own platform. Custom branding builds trust with artists, partners, and external stakeholders.",
    features: ["Branded emails and portals", "Theming controls", "Branded login and navigation", "Custom domain with SSL"],
  },
  {
    id: "customizable",
    category: "Scale & Brand",
    title: "Customizable Per Label",
    description: "MyLabelDesk adapts to your label's needs. Need to gather custom assets like artwork moodboards or the background story of a track? Customize MyLabelDesk to fit your workflow.",
    features: ["Custom asset collection fields", "Label-specific data structures", "Flexible intake forms", "Adaptable workflows per label"],
  },
  {
    id: "distribution",
    category: "Delivery",
    title: "Distribution",
    description: "We currently integrate with different distribution partners. Export your data and import it on your distribution platform seamlessly.",
    features: ["Multi-distributor support", "Seamless data export", "Distribution-ready formatting", "Partner integrations"],
  },
] as const;

const categories = [...new Set(solutions.map((s) => s.category))];

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1 : 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      id={solution.id}
      className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-7 transition-[box-shadow,border-color] duration-500 hover:border-[#0000d8]/20 hover:shadow-[0_24px_48px_-12px_rgba(0,0,216,0.12)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0000d8]/60">
          {solution.category}
        </p>
        <span className="pointer-events-none select-none text-[44px] font-black leading-none text-[#0a0e27]/[0.03] transition-colors duration-500 group-hover:text-[#0000d8]/[0.08]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-1 text-[21px] font-black text-[#0a0e27]">
        {solution.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#64748b]">
        {solution.description}
      </p>
      <ul className="mt-5 space-y-2">
        {solution.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#475569]">
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#0000d8]/40 transition-colors duration-300 group-hover:bg-[#0000d8]" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const filtered = activeCategory
    ? solutions.filter((s) => s.category === activeCategory)
    : solutions;

  const headingLine1 = ["From", "demo", "intake"];
  const headingLine2 = ["to", "signed", "releases."];

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      {/* Hero with parallax */}
      <section ref={heroRef} className="relative overflow-hidden bg-white pb-4 pt-6">
        <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#0000d8]/[0.03] blur-[100px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12"
        >
          <div className="pt-28 pb-16 sm:pt-36">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#0000d8]"
            >
              Features
            </motion.p>

            <h1 className="mt-6 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px] lg:text-[88px]">
              {headingLine1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}{" "}
              {headingLine2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.45 + i * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`mr-[0.22em] inline-block ${i === 2 ? "text-[#0000d8]" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-[17px] leading-[1.7] text-[#64748b] sm:text-[19px]"
            >
              One structured system for label operations. Every decision, contract, and release
              tracked from intake to reporting.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-px max-w-6xl origin-left bg-gradient-to-r from-[#0000d8]/30 via-[#e2e8f0] to-transparent"
        />
      </section>

      {/* Solutions grid */}
      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Sticky filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="sticky top-0 z-40 -mx-4 border-b border-[#f1f5f9] bg-white/90 px-4 py-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`relative rounded-full px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  activeCategory === null ? "text-[#0000d8]" : "text-[#94a3b8] hover:text-[#475569]"
                }`}
              >
                {activeCategory === null && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-[#0000d8]/[0.07]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">All</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative rounded-full px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                    activeCategory === cat ? "text-[#0000d8]" : "text-[#94a3b8] hover:text-[#475569]"
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full bg-[#0000d8]/[0.07]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory ?? "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((solution, i) => (
                <SolutionCard key={solution.id} solution={solution} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

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
              Ready to streamline your label?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto mt-4 max-w-lg text-[16px] text-[#bfdbfe] sm:text-[18px]"
            >
              See how leading labels use MyLabelDesk to automate workflows and stay organized.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-8"
            >
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[14px] font-bold uppercase tracking-[0.2em] text-[#0000d8] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
              >
                Get started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
