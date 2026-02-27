"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation, useInView } from "framer-motion";

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
    transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] as const },
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
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

const capabilityColumns = [
  [
    "A&R workflow",
    "Project workspace",
    "Digital signing",
    "Asset collection",
    "Artist & contributors",
  ],
  [
    "Track & artist rating",
    "Metadata & credits",
    "AI assistant",
    "Distribution prep",
    "Deadline tracking",
    "Streaming insights",
  ],
  [
    "Signing progression",
    "Contract automation",
    "Release management",
    "Catalog management",
    "Task management",
  ],
] as const;

const capabilityCards = [
  {
    title: "Workflow timeline",
    subtitle: "Plan releases, owners, and deadlines in one flow.",
  },
  {
    title: "Artist pulse",
    subtitle: "Track momentum, ratings, and top opportunities.",
  },
  {
    title: "Metadata cockpit",
    subtitle: "Centralize credits, splits, and delivery requirements.",
  },
  {
    title: "Distribution board",
    subtitle: "Prepare release packages and lock launch checkpoints.",
  },
  {
    title: "Catalog control",
    subtitle: "Manage rights, contracts, and long-tail performance.",
  },
] as const;

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
  "Placeholder 1",
  "Placeholder 2",
  "Placeholder 3",
  "Placeholder 4",
];

const navItems = ["SOLUTIONS", "PRICING", "AI", "LOGIN/SIGNUP"] as const;

const megaMenuContent = {
  SOLUTIONS: {
    eyebrow: "Platform",
    title: "Built for modern record labels",
    description:
      "Unify A&R, release planning, contracts, assets, and distribution in one intelligent operating system.",
    columns: [
      {
        title: "Core operations",
        links: ["A&R workspace", "Release planning", "Task orchestration", "Contributor management"],
      },
      {
        title: "Creative + delivery",
        links: ["Metadata control", "Asset collection", "Distribution setup", "Quality checks"],
      },
      {
        title: "Business layer",
        links: ["Contract automation", "Rights management", "Catalog lifecycle", "Performance tracking"],
      },
    ],
    cta: "Explore all solutions",
  },
  PRICING: {
    eyebrow: "Plans",
    title: "Scale from boutique to enterprise",
    description:
      "Choose a plan based on team size and workflow complexity, then grow into advanced automation over time.",
    columns: [
      {
        title: "Starter",
        links: ["For small teams", "Essentials included", "Fast onboarding", "Email support"],
      },
      {
        title: "Growth",
        links: ["Advanced workflows", "Role permissions", "Automated reminders", "Priority support"],
      },
      {
        title: "Enterprise",
        links: ["Custom integrations", "Dedicated success lead", "Security reviews", "SLA coverage"],
      },
    ],
    cta: "Compare plans",
  },
  AI: {
    eyebrow: "Intelligence",
    title: "AI copilots for every label workflow",
    description:
      "Accelerate decisions with AI that understands projects, deadlines, catalogs, and release readiness.",
    columns: [
      {
        title: "Creative support",
        links: ["Track triage", "Opportunity scoring", "Artist insights", "Campaign ideas"],
      },
      {
        title: "Operations support",
        links: ["Metadata suggestions", "Release risk alerts", "Timeline optimization", "Smart task routing"],
      },
      {
        title: "Executive support",
        links: ["Weekly intelligence briefs", "Portfolio summaries", "Forecast snapshots", "Trend monitoring"],
      },
    ],
    cta: "See AI capabilities",
  },
  "LOGIN/SIGNUP": {
    eyebrow: "Access",
    title: "Secure access for every role",
    description:
      "Invite your team, assign permissions, and start collaborating with secure workspace access in minutes.",
    columns: [
      {
        title: "Get started",
        links: ["Create workspace", "Invite collaborators", "Set profile preferences", "Connect your tools"],
      },
      {
        title: "Security",
        links: ["Two-factor authentication", "Session controls", "Role-based access", "Audit history"],
      },
      {
        title: "Support",
        links: ["Live onboarding", "Knowledge center", "Customer success", "Contact sales"],
      },
    ],
    cta: "Login or create account",
  },
} as const;

export default function Home() {
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const logoMarqueeContainerRef = useRef<HTMLDivElement | null>(null);
  const logoMarqueeSetRef = useRef<HTMLDivElement | null>(null);
  const toolsInView = useInView(toolsRef, {
    once: true,
    margin: "-20% 0px",
  });
  const toolsControls = useAnimation();
  const [showLogo, setShowLogo] = useState(false);
  const [marqueeShift, setMarqueeShift] = useState(0);
  const [marqueeCopies, setMarqueeCopies] = useState(2);
  const [activeNavItem, setActiveNavItem] = useState<(typeof navItems)[number] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string>(capabilityColumns[0][0]);
  const sweepDirection = 1 as const;
  const logoItems = [1, 2, 3, 4, 5];
  const activeMegaMenu = activeNavItem ? megaMenuContent[activeNavItem] : null;
  const flatCapabilities: string[] = capabilityColumns.flat();
  const selectedCapabilityIndex = Math.max(
    0,
    flatCapabilities.findIndex((item) => item === selectedCapability),
  );
  const primaryCard = capabilityCards[selectedCapabilityIndex % capabilityCards.length];
  const secondaryCard = capabilityCards[(selectedCapabilityIndex + 2) % capabilityCards.length];

  const handleCapabilitySelect = (capability: string) => {
    if (capability === selectedCapability) return;
    setSelectedCapability(capability);
  };

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

      // Let them sit briefly before moving
      await new Promise((resolve) => setTimeout(resolve, 900));

      // 2) Move outward (slow, further "explosion")
      await toolsControls.start((index: number) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const offsetX = (col - 1.5) * 50;
        const offsetY = (row - 1.5) * 42;

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

      // 3) Start logo reveal as collapse begins
      setShowLogo(true);

      // Collapse quickly into center (larger, more dramatic)
      await toolsControls.start({
        x: 0,
        y: 0,
        scale: 0.45,
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
          duration: 0.18,
          ease: [0.22, 0.61, 0.36, 1],
        },
      });

    };

    runSequence();
  }, [toolsInView, toolsControls]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const measureMarquee = () => {
      if (!logoMarqueeContainerRef.current || !logoMarqueeSetRef.current) return;

      const containerWidth = logoMarqueeContainerRef.current.clientWidth;
      const singleSetWidth = logoMarqueeSetRef.current.scrollWidth;
      if (!containerWidth || !singleSetWidth) return;

      // Need enough copies so the visible window is always filled while moving by one full set.
      const neededCopies = Math.max(2, Math.ceil(1 + containerWidth / singleSetWidth));
      setMarqueeCopies(neededCopies);
      setMarqueeShift(singleSetWidth);
    };

    measureMarquee();

    const resizeObserver = new ResizeObserver(() => {
      measureMarquee();
    });

    if (logoMarqueeContainerRef.current) resizeObserver.observe(logoMarqueeContainerRef.current);
    if (logoMarqueeSetRef.current) resizeObserver.observe(logoMarqueeSetRef.current);

    window.addEventListener("resize", measureMarquee);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureMarquee);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0a0e27] sm:hidden"
          >
            <button
              type="button"
              className="absolute right-6 top-8 flex h-8 w-8 items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l16 16M17 1L1 17" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[20px] font-bold uppercase tracking-[0.25em] text-white transition-colors hover:text-[#818cf8]"
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-width hero wrapper so left/right are white */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="bg-white pb-10 pt-6 text-[#0a0e27] shadow-[0_40px_120px_rgba(10,14,39,0.45)] sm:pb-16 sm:pt-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:gap-8 sm:px-8 lg:px-12">
          {/* Top navigation */}
          <motion.div
            variants={fadeUp}
            onMouseLeave={() => setActiveNavItem(null)}
            className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
          >
            <motion.header className="flex items-center justify-between gap-5 rounded-full bg-[#0a0e27] px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-[#f8fafc] sm:px-12 sm:py-6 sm:text-[15px]">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-black tracking-[0.3em] sm:text-[14px]">
                  MYLABELDESK
                </span>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] sm:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <span className="block h-[2px] w-5 bg-white" />
                <span className="block h-[2px] w-5 bg-white" />
                <span className="block h-[2px] w-5 bg-white" />
              </button>
              <nav className="hidden items-center gap-7 text-[14px] tracking-[0.18em] sm:flex">
                {navItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseEnter={() => setActiveNavItem(item)}
                    className={`relative transition-colors ${
                      activeNavItem === item ? "text-[#818cf8]" : "hover:text-[#6366f1]"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#818cf8] transition-all duration-300 ${
                        activeNavItem === item ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </motion.header>

            <AnimatePresence>
              {activeMegaMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="mt-3 hidden sm:block"
                >
                  <div className="relative overflow-hidden rounded-[32px] border border-[#1e2a7a] bg-[#0a0e27] p-10 shadow-[0_35px_90px_rgba(2,6,23,0.65)]">
                    <div className="pointer-events-none absolute -top-20 left-10 h-52 w-52 rounded-full bg-[#0000d8]/35 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-[#1d4ed8]/30 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-[1.1fr_1.9fr] gap-12">
                      <div className="space-y-5">
                        <p className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#93c5fd]">
                          {activeMegaMenu.eyebrow}
                        </p>
                        <h3 className="text-[36px] font-black leading-[1.06] tracking-tight text-white">
                          {activeMegaMenu.title}
                        </h3>
                        <p className="max-w-md text-[17px] normal-case leading-relaxed tracking-normal text-[#bfdbfe]">
                          {activeMegaMenu.description}
                        </p>
                        <button
                          type="button"
                          className="mt-3 inline-flex items-center rounded-full bg-[#0000d8] px-6 py-3 text-[14px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1d4ed8]"
                        >
                          {activeMegaMenu.cta}
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-8">
                        {activeMegaMenu.columns.map((column) => (
                          <div
                            key={column.title}
                            className="rounded-2xl border border-[#1e293b] bg-[#020617]/50 p-5"
                          >
                            <p className="text-[14px] font-semibold uppercase tracking-[0.22em] text-[#7dd3fc]">
                              {column.title}
                            </p>
                            <ul className="mt-4 space-y-3">
                              {column.links.map((link) => (
                                <li key={link}>
                                  <button
                                    type="button"
                                    className="text-left text-[15px] normal-case tracking-normal text-[#e2e8f0] transition-colors hover:text-[#93c5fd]"
                                  >
                                    {link}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Hero - single column, bars directly under text like V1 */}
          <div className="pt-20 sm:pt-28">
            {/* Four rows: pill on the left, text on the right */}
            <motion.div variants={titleStagger} className="space-y-2 text-left sm:space-y-4">
              {["THE OPERATING", "SYSTEM", "FOR RECORD", "LABELS"].map((line) => (
                <motion.div
                  key={line}
                  variants={titleLine}
                  className="flex items-center gap-3 sm:gap-6 md:gap-8"
                >
                  {/* Animated pill that grows on load */}
                  <motion.div
                    variants={pillGrow}
                    className="h-5 flex-1 origin-left rounded-full bg-gradient-to-r from-[#0a0e27] to-[#0000d8] sm:h-8 md:h-10 lg:h-16"
                  />
                  <p className="shrink-0 text-[32px] font-black leading-[1.04] tracking-tight text-[#0000d8] sm:text-[52px] md:text-[72px] lg:text-[100px]">
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
              className="mt-8 overflow-hidden rounded-full bg-[#e5e7eb] px-4 py-4 shadow-[0_18px_40px_rgba(0,0,216,0.18)] sm:mt-10 sm:px-12 sm:py-8"
            >
              <div ref={logoMarqueeContainerRef}>
                <motion.div
                  className="flex w-max items-center"
                  animate={marqueeShift > 0 ? { x: [0, -marqueeShift] } : undefined}
                  transition={
                    marqueeShift > 0
                      ? {
                          duration: marqueeShift / 35, // px / sec for a slow LED-like scroll
                          ease: "linear",
                          repeat: Infinity,
                        }
                      : undefined
                  }
                >
                  {Array.from({ length: marqueeCopies }).map((_, copyIndex) => (
                    <div
                      key={`copy-${copyIndex}`}
                      ref={copyIndex === 0 ? logoMarqueeSetRef : undefined}
                      className="flex items-center gap-5 pr-5 sm:gap-10 sm:pr-10"
                    >
                      {logoItems.map((i) => (
                        <div
                          key={`${copyIndex}-${i}`}
                          className="flex shrink-0 items-center justify-center rounded-full bg-[#0000d8] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8fafc] sm:px-8 sm:py-4 sm:text-[14px]"
                        >
                          Logo {i}
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:gap-28 sm:pb-24 sm:pt-10 sm:px-8 lg:px-12 lg:pt-12">

        {/* Separate tools section - full-width dark like V1 */}
        <section className="-mx-4 space-y-8 bg-[#0a0e27] px-4 pt-12 pb-6 text-[#f8fafc] sm:-mx-8 sm:space-y-12 sm:px-8 sm:pt-16 sm:pb-8 lg:-mx-12 lg:px-12">
          <div className="mx-auto max-w-6xl space-y-5">
            <h2 className="text-[28px] font-black leading-[1.05] sm:text-[46px] md:text-[66px] lg:text-[92px]">
              Record labels are working in a handful of{" "}
              <span className="text-[#0000d8]">separate tools.</span>
            </h2>
            <p className="max-w-2xl text-[16px] leading-relaxed text-[#e5e7eb] sm:text-[19px] md:text-[22px]">
              Tools that were never built for labels.
            </p>
          </div>

          {/* Glowing tool grid */}
          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center sm:mt-8">
            <div className="relative px-4 py-8 sm:px-12 sm:py-12" ref={toolsRef}>
              {/* Large blue glow behind tools */}
              <div className="pointer-events-none absolute -inset-x-8 -inset-y-6 z-0 rounded-[40px] bg-[#0000d8] blur-3xl opacity-90 sm:-inset-x-16 sm:-inset-y-10 sm:rounded-[60px]" />
              <div className="relative z-10 grid grid-cols-4 gap-3 text-xs text-[#f8fafc] sm:gap-6 sm:text-sm">
                {tools.map((label, index) => (
                  <motion.div
                    key={label}
                    custom={index}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={toolsControls}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0a0e27] sm:h-20 sm:w-20 sm:rounded-2xl"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#e5e7eb] sm:text-[14px] sm:tracking-[0.16em]">
                      {label}
                    </span>
                  </motion.div>
                ))}
                {showLogo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src="/MLD_LOGO.png"
                        alt="MyLabelDesk logo"
                        fill
                        className="rounded-2xl object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl text-center">
            <h2 className="text-[24px] font-black leading-[1.08] sm:text-[38px] md:text-[54px] lg:text-[72px]">
              We recreated and connected all these tools into one{" "}
              <span className="text-[#0000d8]">powerful platform.</span>
            </h2>
          </div>
        </section>

        {/* Three-column capabilities section - full-width light */}
        <section className="relative z-10 left-1/2 w-screen -translate-x-1/2 bg-white px-4 py-12 text-[#0a0e27] sm:py-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl space-y-12 sm:space-y-20">
            <div className="relative z-10 grid gap-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0000d8] sm:grid-cols-3 sm:gap-12 sm:text-[15px] sm:tracking-[0.18em] lg:text-[16px]">
              {capabilityColumns.map((column, columnIndex) => (
                <ul
                  key={`capability-column-${columnIndex}`}
                  className={`space-y-2 sm:space-y-3 ${
                    columnIndex === 1 ? "sm:text-center" : columnIndex === 2 ? "sm:text-right" : ""
                  }`}
                >
                  {column.map((capability) => {
                    const isActive = capability === selectedCapability;
                    const alignClass =
                      columnIndex === 0
                        ? "items-start"
                        : columnIndex === 1
                          ? "items-start sm:items-center"
                          : "items-start sm:items-end";
                    return (
                      <li key={capability} className={alignClass}>
                        <button
                          type="button"
                          onClick={() => handleCapabilitySelect(capability)}
                          className={`relative z-10 inline-flex rounded-full !px-3 !py-1.5 text-[12px] transition-all duration-300 sm:!px-5 sm:!py-2 sm:text-[inherit] ${
                            isActive
                              ? "!bg-[#0000d8] text-white"
                              : "text-[#0000d8]/70 hover:text-[#0000d8]"
                          } ${alignClass}`}
                        >
                          {capability}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-6 sm:gap-10 md:flex-row md:items-start">
                <div className="relative h-56 flex-1 overflow-hidden rounded-[24px] sm:h-80 sm:rounded-[32px] md:flex-[1.6]">
                  <AnimatePresence mode="wait" custom={sweepDirection}>
                    <motion.div
                      key={`${selectedCapability}-left`}
                      custom={sweepDirection}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? -180 : 180,
                          scale: 0.94,
                          opacity: 0,
                          clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                        }),
                        center: {
                          x: 0,
                          scale: 1,
                          opacity: 1,
                          clipPath: "inset(0 0 0 0)",
                          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
                        },
                        exit: (direction: number) => ({
                          x: direction > 0 ? -180 : 180,
                          scale: 0.94,
                          opacity: 0,
                          clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
                          transition: { duration: 0.42, ease: [0.22, 0.61, 0.36, 1] },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#020617] to-[#0000d8]/40 p-6 shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                    >
                      <div className="absolute -top-14 left-10 h-40 w-40 rounded-full bg-[#0000d8]/40 blur-2xl" />
                      <div className="relative z-10 flex h-full flex-col justify-end">
                        <p className="text-[14px] uppercase tracking-[0.18em] text-[#93c5fd]">
                          {selectedCapability}
                        </p>
                        <h3 className="mt-2 text-[22px] font-black text-white sm:mt-3 sm:text-[30px]">{primaryCard.title}</h3>
                        <p className="mt-2 max-w-md text-[15px] text-[#dbeafe] sm:mt-3 sm:text-[17px]">{primaryCard.subtitle}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative h-56 flex-1 overflow-hidden rounded-[24px] sm:h-80 sm:rounded-[32px] md:flex-[1]">
                  <AnimatePresence mode="wait" custom={sweepDirection}>
                    <motion.div
                      key={`${selectedCapability}-right`}
                      custom={sweepDirection}
                      variants={{
                        enter: (direction: number) => ({
                          x: direction > 0 ? 180 : -180,
                          scale: 0.94,
                          opacity: 0,
                          clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                        }),
                        center: {
                          x: 0,
                          scale: 1,
                          opacity: 1,
                          clipPath: "inset(0 0 0 0)",
                          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
                        },
                        exit: (direction: number) => ({
                          x: direction > 0 ? 180 : -180,
                          scale: 0.94,
                          opacity: 0,
                          clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                          transition: { duration: 0.42, ease: [0.22, 0.61, 0.36, 1] },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] p-6 shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                    >
                      <div className="absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-[#3b82f6]/30 blur-2xl" />
                      <div className="relative z-10 flex h-full flex-col justify-end">
                        <p className="text-[14px] uppercase tracking-[0.18em] text-[#bfdbfe]">Connected module</p>
                        <h3 className="mt-2 text-[20px] font-black text-white sm:mt-3 sm:text-[28px]">{secondaryCard.title}</h3>
                        <p className="mt-2 text-[15px] text-[#dbeafe] sm:mt-3 sm:text-[17px]">{secondaryCard.subtitle}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="pt-6 text-center space-y-8 sm:pt-10 sm:space-y-12">
              <h2 className="text-[28px] font-black leading-[1.06] uppercase tracking-[0.18em] text-[#0000d8] sm:text-[42px] sm:tracking-[0.26em] md:text-[52px] lg:text-[66px]">
                Our partners
              </h2>

              <div className="space-y-8">
                {/* Top row: three partner cards */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                </div>

                {/* Bottom row: two partner cards + CTA column (CTA + small tile) */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />

                  <div className="flex flex-col gap-4 self-stretch sm:w-72 sm:gap-8">
                    <div className="flex h-56 items-center justify-center rounded-[24px] bg-gradient-to-b from-[#0000d8] via-[#1d4ed8] to-[#0000d8] text-center text-[14px] font-semibold uppercase tracking-[0.22em] text-white sm:h-72 sm:rounded-[32px] sm:text-[17px]">
                      Become partner today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer inside light area like V1 */}
        <footer className="mx-auto mt-8 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-[#e2e8f0] pt-6 text-[13px] text-[#64748b] sm:mt-12 sm:gap-5 sm:pt-8 sm:text-[14px] sm:flex-row">
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
