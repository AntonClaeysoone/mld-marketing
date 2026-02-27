"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  {
    title: "Discovery & A&R",
    items: [
      "A&R workflow",
      "Project workspace",
      "Digital signing",
      "Asset collection",
      "Artist & contributors",
    ],
  },
  {
    title: "Intelligence & Delivery",
    items: [
      "Track & artist rating",
      "Metadata & credits",
      "AI assistant",
      "Distribution prep",
      "Deadline tracking",
      "Streaming insights",
    ],
  },
  {
    title: "Business Operations",
    items: [
      "Signing progression",
      "Contract automation",
      "Release management",
      "Catalog management",
      "Task management",
    ],
  },
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
  const [selectedCapability, setSelectedCapability] = useState<string>(capabilityColumns[0].items[0]);
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const sweepDirection = 1 as const;
  const logoItems = [1, 2, 3, 4, 5];
  const flatCapabilities: string[] = capabilityColumns.flatMap((col) => [...col.items]);
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

      await new Promise((resolve) => setTimeout(resolve, 900));

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

      setShowLogo(true);

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
      <Navbar />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="bg-white pb-10 pt-6 text-[#0a0e27] shadow-[0_40px_120px_rgba(10,14,39,0.45)] sm:pb-16 sm:pt-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:gap-8 sm:px-8 lg:px-12">
          <motion.div variants={fadeUp} className="pt-20 sm:pt-28">
            <motion.div variants={titleStagger} className="space-y-2 text-left sm:space-y-4">
              {["THE OPERATING", "SYSTEM", "FOR RECORD", "LABELS"].map((line) => (
                <motion.div
                  key={line}
                  variants={titleLine}
                  className="flex items-center gap-3 sm:gap-6 md:gap-8"
                >
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

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.1,
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
                          duration: marqueeShift / 35,
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
          </motion.div>
        </div>
      </motion.section>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:gap-28 sm:pb-24 sm:pt-10 sm:px-8 lg:px-12 lg:pt-12">
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

          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center sm:mt-8">
            <div className="relative px-4 py-8 sm:px-12 sm:py-12" ref={toolsRef}>
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

        <section className="relative z-10 left-1/2 w-screen -translate-x-1/2 bg-[#0a0e27] px-5 py-14 sm:bg-white sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl space-y-10 sm:space-y-20">
            <div className="sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {capabilityColumns.map((column, columnIndex) => (
                  <button
                    key={column.title}
                    type="button"
                    onClick={() => setOpenAccordion(columnIndex)}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                      openAccordion === columnIndex
                        ? "bg-[#0000d8] text-white"
                        : "bg-white/[0.07] text-white/50"
                    }`}
                  >
                    {column.title}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={openAccordion}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  className="space-y-1"
                >
                  {capabilityColumns[openAccordion < 0 ? 0 : openAccordion]?.items.map((capability) => {
                    const isActive = capability === selectedCapability;
                    return (
                      <button
                        key={capability}
                        type="button"
                        onClick={() => handleCapabilitySelect(capability)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-left text-[14px] font-medium tracking-wide transition-all duration-200 ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/40"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 ${isActive ? "bg-[#0000d8]" : "bg-white/20"}`} />
                        {capability}
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative z-10 hidden gap-12 text-[15px] font-semibold uppercase tracking-[0.18em] text-[#0000d8] sm:grid sm:grid-cols-3 lg:text-[16px]">
              {capabilityColumns.map((column, columnIndex) => (
                <ul
                  key={`capability-column-${columnIndex}`}
                  className={`space-y-3 ${
                    columnIndex === 1 ? "text-center" : columnIndex === 2 ? "text-right" : ""
                  }`}
                >
                  {column.items.map((capability) => {
                    const isActive = capability === selectedCapability;
                    const alignClass =
                      columnIndex === 0
                        ? "items-start"
                        : columnIndex === 1
                          ? "items-center"
                          : "items-end";
                    return (
                      <li key={capability} className={alignClass}>
                        <button
                          type="button"
                          onClick={() => handleCapabilitySelect(capability)}
                          className={`relative z-10 inline-flex rounded-full !px-5 !py-2 transition-all duration-300 ${
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
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                  <div className="h-56 flex-1 rounded-[24px] bg-gradient-to-b from-[#020617] via-[#0000d8]/40 to-[#020617] shadow-[0_40px_80px_rgba(0,0,0,0.45)] sm:h-72 sm:rounded-[32px]" />
                </div>

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

        <Footer />
      </main>
    </div>
  );
}
