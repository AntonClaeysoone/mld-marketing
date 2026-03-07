"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, type MotionValue, motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Music, Globe, Sparkles, Handshake } from "lucide-react";

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

const featureList = [
  "A&R workflow",
  "Track & artist rating",
  "Signing progression",
  "Project workspace",
  "Metadata & credits",
  "Contract automation",
  "Digital signing",
  "AI assistant",
  "Release management",
  "Asset collection",
  "Distribution prep",
  "Catalog management",
  "Artists & groups",
  "Task management",
  "Streaming insights",
] as const;

const featureImages: Record<string, { src: string; alt: string }[]> = {
  "Track & artist rating": [
    { src: "/Features/RateTheSong.jpg", alt: "Rate the Song" },
    { src: "/Features/RateTheArtist.jpg", alt: "Rate the Artist" },
  ],
  "Release management": [
    { src: "/Features/ReleaseManagement.jpeg", alt: "Release Management" },
  ],
  "Contract automation": [
    { src: "/Features/Contract.jpeg", alt: "Contract Automation" },
  ],
  "Artists & groups": [
    { src: "/Features/ArtistGroups.jpeg", alt: "Artists & Groups" },
  ],
  "Asset collection": [
    { src: "/Features/AssetCollection.jpeg", alt: "Asset Collection" },
  ],
};

const featureDescriptions: Record<string, string[]> = {
  "Contract automation": [
    "Contract Generation is the automated creation of release agreements based on pre-set deal terms and artist data. The system pulls in metadata, splits, legal information, and commercial terms to instantly generate accurate, ready-to-sign contracts.",
    "It standardizes structure, reduces manual errors, and ensures every agreement reflects the correct percentages, rights, and timelines — all prepared for seamless review and in-platform signing.",
  ],
  "Artists & groups": [
    "Artists & Groups is the centralized database of all individual artists, primary acts, and collaborative groups within the label ecosystem. It stores structured profiles with linked releases, roles, contracts, splits, and publishing information, ensuring every contributor is clearly defined and connected across projects.",
  ],
  "Asset collection": [
    "Collect Missing Assets is a dedicated overview that instantly shows which releases are incomplete and exactly what is still missing: from masters and artwork to metadata, legal details, splits, or publishing information. It eliminates back-and-forth communication by clearly flagging gaps, assigning responsibility, and keeping teams aligned on deadlines, ensuring every project is fully ready before distribution or release.",
  ],
};

const featureDescriptionLayout: Record<string, "side" | "below"> = {
  "Contract automation": "side",
  "Artists & groups": "below",
  "Asset collection": "below",
};

const tools: { name: string; icon: string }[] = [
  { name: "Email", icon: "/toolicons/email.svg" },
  { name: "Sheets", icon: "/toolicons/sheets.svg" },
  { name: "Drive", icon: "/toolicons/drive.svg" },
  { name: "WhatsApp", icon: "/toolicons/whatsapp.svg" },
  { name: "Slack", icon: "/toolicons/slack.svg" },
  { name: "Calendar", icon: "/toolicons/calendar.svg" },
  { name: "Royalties", icon: "/toolicons/royalties.svg" },
  { name: "Tasks", icon: "/toolicons/tasks.svg" },
  { name: "CRM", icon: "/toolicons/crm.svg" },
  { name: "Accounting", icon: "/toolicons/accounting.svg" },
  { name: "Promo", icon: "/toolicons/promo.svg" },
  { name: "Contracts", icon: "/toolicons/contracts.svg" },
  { name: "Placeholder 1", icon: "/toolicons/placeholder-1.svg" },
  { name: "Placeholder 2", icon: "/toolicons/placeholder-2.svg" },
  { name: "Placeholder 3", icon: "/toolicons/placeholder-3.svg" },
  { name: "Placeholder 4", icon: "/toolicons/placeholder-4.svg" },
];

function BecomePartnerFormCard() {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "relative col-span-1 flex flex-col justify-center overflow-hidden rounded-xl px-6 py-8",
        "border border-[#1e293b]/80 bg-[#0a0e27] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]",
        "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      )}
    >
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#0000d8]/20 blur-[80px]" />
      <div className="relative z-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0000d8]">
          Partner with us
        </p>
        <h3 className="mt-2 text-[22px] font-black leading-tight text-white sm:text-[26px]">
          Become a partner
        </h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#94a3b8]">
          Interested in partnering with us? Tell us about your company and we&apos;ll get back to you.
        </p>
        {submitted ? (
          <p className="mt-6 text-[15px] text-[#bfdbfe]">
            Thanks! We&apos;ll get back to you soon.
          </p>
        ) : (
          <form
            className="mt-6 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label htmlFor="partner-name" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                Your name
              </label>
              <input
                id="partner-name"
                type="text"
                name="name"
                placeholder="John Doe"
                required
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full rounded-xl border bg-[#020617] px-4 py-3 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569]",
                  focusedField === "name" ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.2)]" : "border-[#1e293b]",
                )}
              />
            </div>
            <div>
              <label htmlFor="partner-email" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                Email
              </label>
              <input
                id="partner-email"
                type="email"
                name="email"
                placeholder="you@company.com"
                required
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full rounded-xl border bg-[#020617] px-4 py-3 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569]",
                  focusedField === "email" ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.2)]" : "border-[#1e293b]",
                )}
              />
            </div>
            <div>
              <label htmlFor="partner-company" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                Company / label
              </label>
              <input
                id="partner-company"
                type="text"
                name="company"
                placeholder="Your company"
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full rounded-xl border bg-[#020617] px-4 py-3 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569]",
                  focusedField === "company" ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.2)]" : "border-[#1e293b]",
                )}
              />
            </div>
            <div>
              <label htmlFor="partner-message" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                How would you like to partner?
              </label>
              <textarea
                id="partner-message"
                name="message"
                placeholder="Tell us more..."
                rows={3}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full resize-none rounded-xl border bg-[#020617] px-4 py-3 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569]",
                  focusedField === "message" ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.2)]" : "border-[#1e293b]",
                )}
              />
            </div>
            <button
              type="submit"
              className="mt-1 w-fit rounded-full bg-[#0000d8] px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
            >
              Send request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const partnerFeatures = [
  {
    Icon: Music,
    name: "What Da House",
    description: "Events and community for dance music and labels.",
    href: "/",
    cta: "Learn more",
    hideOverlay: true,
    background: (
      <div className="absolute inset-0">
        <Image
          src={encodeURI("/PartnerPicturesBig/MylabeldeskParaisoYordi.jpg")}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    ),
    className: "min-h-[16rem] sm:min-h-0 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Globe,
    name: "Paraiso",
    description: "",
    href: "/",
    cta: "Learn more",
    hideOverlay: true,
    background: (
      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-neutral-100 p-8">
        <Image
          src="/PartnersPictures/logo-transparant.png"
          alt="What Da House"
          width={280}
          height={120}
          className="object-contain"
        />
      </div>
    ),
    className: "min-h-[10rem] sm:min-h-0 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Sparkles,
    name: "Start it X",
    description: "",
    href: "/",
    cta: "Learn more",
    hideOverlay: true,
    background: (
      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-neutral-100 p-8">
        <Image
          src="/PartnersPictures/si-x_logo-black-web-2.png"
          alt="Start it X"
          width={200}
          height={80}
          className="object-contain"
        />
      </div>
    ),
    className: "min-h-[10rem] sm:min-h-0 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Handshake,
    name: "Become partner today",
    description: "Join our network of distribution and technology partners.",
    href: "/",
    cta: "Get in touch",
    hideOverlay: true,
    background: (
      <div className="absolute inset-0">
        <Image
          src={encodeURI("/PartnerPicturesBig/MylabeldeskParaisoThierry.jpg")}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    ),
    className: "min-h-[16rem] sm:min-h-0 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
];

function ScrollWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export default function Home() {
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const logoMarqueeContainerRef = useRef<HTMLDivElement | null>(null);
  const logoMarqueeSetRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: revealProgress } = useScroll({ target: revealRef, offset: ["start 0.85", "end 0.4"] });
  const toolsInView = useInView(toolsRef, {
    once: true,
    margin: "-20% 0px",
  });
  const toolsControls = useAnimation();
  const [showLogo, setShowLogo] = useState(false);
  const [marqueeShift, setMarqueeShift] = useState(0);
  const [marqueeCopies, setMarqueeCopies] = useState(2);
  const [selectedCapability, setSelectedCapability] = useState<string>(featureList[1]);
  const logoItems = [
    { src: "/PartnersPictures/logo-transparant.png", alt: "What Da House" },
    { src: "/PartnersPictures/songstats.svg", alt: "Songstats" },
    { src: "/PartnersPictures/4878-27853-paraiso-logo-test-website-a92a019f3374201e.png", alt: "Paraiso" },
    { src: "/PartnersPictures/Alternative_Distribution_Alliance_logo.svg", alt: "Alternative Distribution Alliance" },
    { src: "/PartnersPictures/si-x_logo-black-web-2.png", alt: "Start it X" },
  ];
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
    <div className="min-h-screen overflow-x-hidden bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="bg-white pb-10 pt-6 text-[#0a0e27] shadow-[0_40px_120px_rgba(10,14,39,0.45)] sm:pb-16 sm:pt-12"
      >
        <div className="mx-auto flex w-[calc(100%-2rem)] max-w-6xl flex-col gap-6 sm:w-[calc(100%-4rem)] sm:gap-8 lg:w-[calc(100%-6rem)]">
          <motion.div variants={fadeUp} className="pt-20 sm:pt-28">
            <motion.div variants={titleStagger} className="space-y-2 text-left sm:space-y-4">
              {["THE OPERATING", "SYSTEM", "FOR RECORD", "LABELS"].map((line) => (
                <motion.div
                  key={line}
                  variants={titleLine}
                  className="flex items-center gap-2 sm:gap-4 md:gap-6"
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
              className="mt-8 overflow-hidden rounded-full bg-[#e5e7eb] px-3 py-4 shadow-[0_18px_40px_rgba(0,0,216,0.18)] sm:mt-10 sm:py-8 sm:px-6"
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
                      className="flex items-center gap-4 pr-4 sm:gap-8 sm:pr-8"
                    >
                      {logoItems.map((item, i) => (
                        <div
                          key={`${copyIndex}-${i}`}
                          className="relative flex shrink-0 items-center justify-center px-2 sm:px-4"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={120}
                            height={48}
                            unoptimized
                            className="h-8 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
                          />
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

          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-center overflow-hidden sm:mt-8 sm:overflow-visible">
            <div className="relative px-4 py-8 sm:px-12 sm:py-12" ref={toolsRef}>
              <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 z-0 rounded-[40px] bg-[#0000d8] blur-3xl opacity-90 sm:-inset-x-16 sm:-inset-y-10 sm:rounded-[60px]" />
              <div className="relative z-10 grid grid-cols-4 gap-3 text-xs text-[#f8fafc] sm:gap-6 sm:text-sm">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    custom={index}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={toolsControls}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0a0e27] sm:h-20 sm:w-20 sm:rounded-2xl"
                  >
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                    />
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

        <section className="relative z-10 -mx-4 w-[calc(100%+2rem)] bg-[#0a0e27] px-5 py-14 sm:left-1/2 sm:-mx-0 sm:w-screen sm:-translate-x-1/2 sm:bg-white sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl space-y-10 sm:space-y-20">
            {/* Mobile: scrollable pills + images */}
            <div className="sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {featureList.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleCapabilitySelect(feature)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                      feature === selectedCapability
                        ? "bg-[#0000d8] text-white"
                        : "bg-white/[0.07] text-white/50"
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCapability}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-4"
                >
                  {featureImages[selectedCapability] ? (
                    <>
                      {featureImages[selectedCapability].map((img) => (
                        <div key={img.src} className="overflow-hidden rounded-2xl">
                          <Image src={img.src} alt={img.alt} width={800} height={500} className="h-auto w-full" />
                        </div>
                      ))}
                      {featureDescriptions[selectedCapability] && (
                        <div className="rounded-[20px] bg-[#0a0e27] px-6 py-8">
                          {featureDescriptions[selectedCapability].map((paragraph, i) => (
                            <p
                              key={i}
                              className={`text-[13px] leading-[1.7] text-[#cbd5e1] ${i > 0 ? "mt-5" : ""}`}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex h-60 items-center justify-center rounded-2xl bg-white/5">
                      <p className="text-sm text-white/30">Coming soon</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop: feature list left + screenshots right */}
            <div className="hidden sm:flex sm:gap-10 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-[240px] shrink-0 space-y-0.5 lg:w-[280px]"
              >
                {featureList.map((feature) => {
                  const isActive = feature === selectedCapability;
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleCapabilitySelect(feature)}
                      className={`block w-full text-left text-[13px] font-black uppercase tracking-[0.06em] py-2 transition-all duration-200 lg:text-[15px] ${
                        isActive ? "text-[#0a0e27]" : "text-[#0a0e27]/30 hover:text-[#0a0e27]/55"
                      }`}
                    >
                      {isActive ? (
                        <span className="rounded bg-[#0000d8] px-2.5 py-1 text-white">{feature}</span>
                      ) : (
                        feature
                      )}
                    </button>
                  );
                })}
              </motion.div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCapability}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                    className={
                      featureDescriptionLayout[selectedCapability] === "side"
                        ? "flex gap-5"
                        : "flex flex-col gap-5"
                    }
                  >
                    {featureImages[selectedCapability] ? (
                      <>
                        {featureDescriptionLayout[selectedCapability] === "side" ? (
                          <div className="flex min-w-0 flex-1 flex-col gap-5">
                            {featureImages[selectedCapability].map((img) => (
                              <div
                                key={img.src}
                                className="flex-1 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  width={900}
                                  height={550}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          featureImages[selectedCapability].map((img) => (
                            <div
                              key={img.src}
                              className="overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                width={900}
                                height={550}
                                className="h-auto w-full"
                              />
                            </div>
                          ))
                        )}
                        {featureDescriptionLayout[selectedCapability] === "side" && featureDescriptions[selectedCapability] && (
                          <div className="flex w-[280px] shrink-0 lg:w-[300px]">
                            <div className="flex flex-col justify-center rounded-[20px] bg-[#0a0e27] px-7 py-10 lg:px-9 lg:py-12">
                              {featureDescriptions[selectedCapability].map((paragraph, i) => (
                                <p
                                  key={i}
                                  className={`text-[13.5px] leading-[1.7] text-[#cbd5e1] lg:text-[14.5px] ${i > 0 ? "mt-6" : ""}`}
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        {featureDescriptionLayout[selectedCapability] === "below" && featureDescriptions[selectedCapability] && (
                          <div className="rounded-[20px] bg-[#0a0e27] px-7 py-8 lg:px-9 lg:py-10">
                            {featureDescriptions[selectedCapability].map((paragraph, i) => (
                              <p
                                key={i}
                                className={`text-[13.5px] leading-[1.7] text-[#cbd5e1] lg:text-[14.5px] ${i > 0 ? "mt-5" : ""}`}
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-[#0a0e27]/[0.03]">
                        <p className="text-lg font-medium text-[#0a0e27]/20">Coming soon</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-6 text-center space-y-8 sm:pt-10 sm:space-y-12">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[28px] font-black leading-[1.06] uppercase tracking-[0.18em] text-[#0000d8] sm:text-[42px] sm:tracking-[0.26em] md:text-[52px] lg:text-[66px]"
              >
                Our partners
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto w-full max-w-5xl"
              >
                <BentoGrid className="lg:grid-rows-3">
                  <BecomePartnerFormCard />
                  {partnerFeatures.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                  ))}
                </BentoGrid>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scroll-linked text reveal */}
        <section ref={revealRef} className="relative -mx-4 w-[calc(100%+2rem)] px-4 py-24 sm:-mx-8 sm:w-[calc(100%+4rem)] sm:px-8 sm:py-40 lg:-mx-12 lg:w-[calc(100%+6rem)] lg:px-12">
          <div className="mx-auto max-w-5xl">
            <p className="flex flex-wrap text-[26px] font-black leading-[1.35] tracking-tight text-[#f8fafc] sm:text-[38px] md:text-[50px] lg:text-[62px]">
              {("One platform to scout, plan, ship, and grow. No more switching between tools. No more lost context. Just your label, running at full speed.").split(" ").map((word, i, arr) => {
                const start = i / arr.length;
                const end = start + 1 / arr.length;
                return <ScrollWord key={i} word={word} range={[start, end]} progress={revealProgress} />;
              })}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden px-4 py-24 sm:-mx-8 sm:w-[calc(100%+4rem)] sm:px-8 sm:py-32 lg:-mx-12 lg:w-[calc(100%+6rem)] lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0000d8]/20 to-[#0a0e27]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0000d8]/15 blur-[120px] sm:h-[500px] sm:w-[500px]" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto max-w-3xl text-center"
          >
            <h2 className="text-[32px] font-black leading-[1.06] text-white sm:text-[48px] md:text-[64px]">
              Ready to run your label{" "}
              <span className="bg-gradient-to-r from-[#93c5fd] to-[#0000d8] bg-clip-text text-transparent">smarter?</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#bfdbfe] sm:text-[19px]"
            >
              Start your 14-day free trial. No credit card required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-full bg-white px-10 py-5 text-[14px] font-bold uppercase tracking-[0.2em] text-[#0000d8] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
              >
                Get started free
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <div className="relative -mx-4 w-[calc(100%+2rem)] sm:-mx-8 sm:w-[calc(100%+4rem)] lg:-mx-12 lg:w-[calc(100%+6rem)]">
          <Footer />
        </div>
      </main>
    </div>
  );
}
