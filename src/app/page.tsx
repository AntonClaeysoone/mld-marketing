"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const pillGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const titleStagger = {
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const tools = [
  "Email",
  "Sheets",
  "Drive",
  "WhatsApp",
  "Slack",
  "Calendar",
  "Royalties",
  "Tasks",
  "CRM",
  "Accounting",
  "Promo",
  "Contracts",
];

export default function Home() {
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const toolsInView = useInView(toolsRef, {
    once: true,
    margin: "-20% 0px",
  });
  const toolsControls = useAnimation();
   const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (!toolsInView) return;

    const runSequence = async () => {
      // 1) Fade in one by one
      await toolsControls.start((index: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          delay: index * 0.12,
          duration: 0.45,
          ease: [0.22, 0.61, 0.36, 1],
        },
      }));

      // Let them sit for ~2.3s fully visible
      await new Promise((resolve) => setTimeout(resolve, 2300));

      // 2) Move outward (slow, further "explosion")
      await toolsControls.start((index: number) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const offsetX = (col - 1.5) * 40;
        const offsetY = (row - 1.5) * 34;

        return {
          x: offsetX,
          y: offsetY,
          scale: 1.05,
          transition: {
            duration: 1.15,
            ease: [0.22, 0.61, 0.36, 1],
          },
        };
      });

      // 3) Collapse quickly into center (larger, more dramatic), then reveal logo square
      await toolsControls.start({
        x: 0,
        y: 0,
        scale: 1.95,
        borderRadius: 24,
        backgroundColor: "#0000d8",
        transition: {
          duration: 0.35,
          ease: [0.22, 0.61, 0.36, 1],
        },
      });

      // Quickly fade the collapsed block down, then pop logo
      await toolsControls.start({
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.25,
          ease: [0.22, 0.61, 0.36, 1],
        },
      });

      setShowLogo(true);
    };

    runSequence();
  }, [toolsInView, toolsControls]);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      {/* Full-width hero wrapper so left/right are white */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="bg-white pb-14 pt-8 text-[#0a0e27] shadow-[0_40px_120px_rgba(10,14,39,0.45)] sm:pt-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-8 lg:px-12">
          {/* Top navigation */}
          <motion.header
            variants={fadeUp}
            className="flex items-center justify-between gap-4 rounded-full bg-[#0a0e27] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8fafc] sm:px-10 sm:py-5 sm:text-[12px]"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black tracking-[0.3em]">
                MYLABELDESK
              </span>
            </div>
            <nav className="hidden items-center gap-6 text-[11px] tracking-[0.18em] sm:flex">
              <button className="transition-colors hover:text-[#6366f1]">JOBS</button>
              <button className="transition-colors hover:text-[#6366f1]">PRICING</button>
              <button className="transition-colors hover:text-[#6366f1]">PROFILE</button>
              <button className="transition-colors hover:text-[#6366f1]">
                LOGIN/SIGNUP
              </button>
            </nav>
          </motion.header>

          {/* Hero - single column, bars directly under text like V1 */}
          <div className="pt-4">
            {/* Four rows: pill on the left, text on the right */}
            <motion.div variants={titleStagger} className="space-y-3 text-left">
              {["THE OPERATING", "SYSTEM", "FOR RECORD", "LABELS"].map((line) => (
                <motion.div
                  key={line}
                  variants={titleLine}
                  className="flex items-center gap-6 lg:justify-between"
                >
                  {/* Animated pill that grows on load */}
                  <motion.div
                    variants={pillGrow}
                    className="hidden h-14 origin-left rounded-full bg-gradient-to-r from-[#0a0e27] to-[#0000d8] lg:block lg:flex-1"
                  />
                  <p className="shrink-0 text-[40px] font-black leading-[1.04] tracking-tight text-[#0000d8] sm:text-[56px] lg:text-[78px]">
                    {line}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Full-width pill with partner logo placeholders */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.1, // after title + bar animations
                duration: 0.6,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="mt-8 flex items-center rounded-full bg-[#e5e7eb] px-10 py-6 shadow-[0_18px_40px_rgba(0,0,216,0.18)]"
            >
              <div className="grid w-full grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-full bg-[#0000d8] px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8fafc]"
                  >
                    Logo {i}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-20 pt-8 sm:px-8 lg:px-12 lg:pt-10">

        {/* Separate tools section - full-width dark like V1 */}
        <section className="-mx-4 space-y-10 bg-[#0a0e27] px-4 pt-14 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 text-[#f8fafc]">
          <div className="mx-auto max-w-6xl space-y-4">
            <h2 className="text-[36px] font-black leading-[1.05] sm:text-[52px] lg:text-[72px]">
              Record labels are working in a handful of{" "}
              <span className="text-[#0000d8]">separate tools.</span>
            </h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-[#e5e7eb] sm:text-[17px]">
              Tools that were never built for labels.
            </p>
          </div>

          {/* Glowing tool grid */}
          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center">
            <div className="relative px-10 py-10" ref={toolsRef}>
              {/* Large blue glow behind tools */}
              <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 z-0 rounded-[60px] bg-[#0000d8] blur-3xl opacity-90" />
              <div className="relative z-10 grid grid-cols-4 gap-5 text-xs text-[#f8fafc] sm:text-sm">
                {tools.map((label, index) => (
                  <motion.div
                    key={label}
                    custom={index}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={toolsControls}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a0e27]"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e5e7eb]">
                      {label}
                    </span>
                  </motion.div>
                ))}
                {showLogo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0000d8] text-[10px] font-black uppercase tracking-[0.26em] text-white">
                      MYLABELDESK
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-4xl text-center">
            <h2 className="text-[30px] font-black leading-[1.08] sm:text-[42px] lg:text-[56px]">
              We recreated and connected all these tools into one{" "}
              <span className="text-[#0000d8]">powerful platform.</span>
            </h2>
          </div>
        </section>

        {/* Three-column capabilities section - full-width light */}
        <section className="relative left-1/2 w-screen -translate-x-1/2 bg-white px-4 py-20 text-[#0a0e27] sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="grid gap-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0000d8] sm:grid-cols-3 sm:text-[12px] lg:text-[13px]">
              <ul className="space-y-2">
                <li>A&amp;R workflow</li>
                <li>Project workspace</li>
                <li>Digital signing</li>
                <li>Asset collection</li>
                <li>Artist &amp; contributors</li>
              </ul>
              <ul className="space-y-2">
                <li>Track &amp; artist rating</li>
                <li>Metadata &amp; credits</li>
                <li>AI assistant</li>
                <li>Distribution prep</li>
                <li>Deadline tracking</li>
                <li>Streaming insights</li>
              </ul>
              <ul className="space-y-2">
                <li>Signing progression</li>
                <li>Contract automation</li>
                <li>Release management</li>
                <li>Catalog management</li>
                <li>Task management</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-8 md:flex-row items-start">
              <div className="h-64 flex-1 md:flex-[1.6] rounded-[32px] bg-gradient-to-b from-[#020617] via-[#020617] to-[#0000d8]/40 shadow-[0_40px_90px_rgba(0,0,0,0.45)]" />
              <div className="h-64 flex-1 md:flex-[1] rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_90px_rgba(0,0,0,0.45)]" />
            </div>

            <div className="pt-8 text-center space-y-10">
              <h2 className="text-[34px] font-black leading-[1.06] uppercase tracking-[0.26em] text-[#0000d8] sm:text-[42px] lg:text-[52px]">
                Our partners
              </h2>

              <div className="space-y-6">
                {/* Top row: three partner cards */}
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="h-56 flex-1 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />
                  <div className="h-56 flex-1 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />
                  <div className="h-56 flex-1 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />
                </div>

                {/* Bottom row: two partner cards + CTA column (CTA + small tile) */}
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="h-56 flex-1 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />
                  <div className="h-56 flex-1 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)]" />

                  <div className="flex flex-col gap-6 sm:w-56 self-stretch">
                    <div className="flex h-56 items-center justify-center rounded-[32px] bg-gradient-to-b from-[#0000d8] via-[#1d4ed8] to-[#0000d8] text-center text-[13px] font-semibold uppercase tracking-[0.22em] text-white">
                      Become partner today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer inside light area like V1 */}
        <footer className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-[#e2e8f0] pt-6 text-[11px] text-[#64748b] sm:flex-row">
          <p>© {new Date().getFullYear()} MyLabelDesk. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <button className="text-[#64748b] transition-colors hover:text-[#0a0e27]">
              Privacy
            </button>
            <button className="text-[#64748b] transition-colors hover:text-[#0a0e27]">
              Terms
            </button>
            <button className="text-[#64748b] transition-colors hover:text-[#0a0e27]">
              Cookies
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
