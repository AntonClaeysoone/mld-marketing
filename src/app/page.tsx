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
  const [logoTilt, setLogoTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [marqueeShift, setMarqueeShift] = useState(0);
  const [marqueeCopies, setMarqueeCopies] = useState(2);
  const [activeNavItem, setActiveNavItem] = useState<(typeof navItems)[number] | null>(null);
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

  const handleLogoMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!showLogo) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 7;

    setLogoTilt({
      rotateX: -relativeY * maxTilt,
      rotateY: relativeX * maxTilt,
      glowX: (relativeX + 0.5) * 100,
      glowY: (relativeY + 0.5) * 100,
    });
  };

  const handleLogoMouseLeave = () => {
    setLogoTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
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
      {/* Full-width hero wrapper so left/right are white */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="bg-white pb-14 pt-8 text-[#0a0e27] shadow-[0_40px_120px_rgba(10,14,39,0.45)] sm:pt-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-8 lg:px-12">
          {/* Top navigation */}
          <motion.div
            variants={fadeUp}
            onMouseLeave={() => setActiveNavItem(null)}
            className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
          >
            <motion.header className="flex items-center justify-between gap-4 rounded-full bg-[#0a0e27] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f8fafc] sm:px-10 sm:py-5 sm:text-[12px]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-[0.3em]">
                  MYLABELDESK
                </span>
              </div>
              <nav className="hidden items-center gap-6 text-[11px] tracking-[0.18em] sm:flex">
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
                  <div className="relative overflow-hidden rounded-[32px] border border-[#1e2a7a] bg-[#0a0e27] p-8 shadow-[0_35px_90px_rgba(2,6,23,0.65)]">
                    <div className="pointer-events-none absolute -top-20 left-10 h-52 w-52 rounded-full bg-[#0000d8]/35 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-[#1d4ed8]/30 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-[1.1fr_1.9fr] gap-10">
                      <div className="space-y-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#93c5fd]">
                          {activeMegaMenu.eyebrow}
                        </p>
                        <h3 className="text-[28px] font-black leading-[1.06] tracking-tight text-white">
                          {activeMegaMenu.title}
                        </h3>
                        <p className="max-w-md text-[13px] normal-case leading-relaxed tracking-normal text-[#bfdbfe]">
                          {activeMegaMenu.description}
                        </p>
                        <button
                          type="button"
                          className="mt-2 inline-flex items-center rounded-full bg-[#0000d8] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1d4ed8]"
                        >
                          {activeMegaMenu.cta}
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        {activeMegaMenu.columns.map((column) => (
                          <div
                            key={column.title}
                            className="rounded-2xl border border-[#1e293b] bg-[#020617]/50 p-4"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7dd3fc]">
                              {column.title}
                            </p>
                            <ul className="mt-3 space-y-2">
                              {column.links.map((link) => (
                                <li key={link}>
                                  <button
                                    type="button"
                                    className="text-left text-[12px] normal-case tracking-normal text-[#e2e8f0] transition-colors hover:text-[#93c5fd]"
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
          <div className="pt-24">
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
              className="mt-8 overflow-hidden rounded-full bg-[#e5e7eb] px-10 py-6 shadow-[0_18px_40px_rgba(0,0,216,0.18)]"
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
                      className="flex items-center gap-8 pr-8"
                    >
                      {logoItems.map((i) => (
                        <div
                          key={`${copyIndex}-${i}`}
                          className="flex shrink-0 items-center justify-center rounded-full bg-[#0000d8] px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8fafc]"
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
            <div
              className="relative px-10 py-10"
              ref={toolsRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
            >
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
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateX: logoTilt.rotateX,
                      rotateY: logoTilt.rotateY,
                    }}
                    transition={{
                      duration: 0.28,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    style={{ transformPerspective: 900 }}
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
                      <motion.div
                        aria-hidden
                        animate={{
                          background: `radial-gradient(circle at ${logoTilt.glowX}% ${logoTilt.glowY}%, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 46%)`,
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute inset-0"
                      />
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
              {capabilityColumns.map((column, columnIndex) => (
                <ul
                  key={`capability-column-${columnIndex}`}
                  className={`space-y-2 ${
                    columnIndex === 1 ? "text-center" : columnIndex === 2 ? "text-right" : ""
                  }`}
                >
                  {column.map((capability) => {
                    const isActive = capability === selectedCapability;
                    return (
                      <li key={capability}>
                        <button
                          type="button"
                          onClick={() => handleCapabilitySelect(capability)}
                          className={`inline-flex items-center gap-2 border-b border-transparent py-0.5 transition-all duration-300 ${
                            isActive
                              ? "border-[#0000d8] text-[#0000d8]"
                              : "text-[#0000d8]/70 hover:text-[#0000d8]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all ${
                              isActive ? "bg-[#0000d8] opacity-100" : "bg-[#0000d8] opacity-0"
                            }`}
                          />
                          {capability}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex flex-col items-start gap-8 md:flex-row">
                <div className="relative h-64 flex-1 overflow-hidden rounded-[32px] md:flex-[1.6]">
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
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#93c5fd]">
                          {selectedCapability}
                        </p>
                        <h3 className="mt-2 text-[24px] font-black text-white">{primaryCard.title}</h3>
                        <p className="mt-2 max-w-md text-[13px] text-[#dbeafe]">{primaryCard.subtitle}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative h-64 flex-1 overflow-hidden rounded-[32px] md:flex-[1]">
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
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#bfdbfe]">Connected module</p>
                        <h3 className="mt-2 text-[22px] font-black text-white">{secondaryCard.title}</h3>
                        <p className="mt-2 text-[13px] text-[#dbeafe]">{secondaryCard.subtitle}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
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
