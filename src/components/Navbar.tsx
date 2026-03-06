"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "SOLUTIONS", href: "/solutions" },
  { label: "PRICING", href: "/pricing" },
  { label: "AI", href: "/ai" },
  { label: "LOGIN/SIGNUP", href: "/login" },
] as const;

type NavLabel = (typeof navItems)[number]["label"];

const megaMenuContent: Record<
  NavLabel,
  {
    eyebrow: string;
    title: string;
    description: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    cta: { label: string; href: string };
  }
> = {
  SOLUTIONS: {
    eyebrow: "Platform",
    title: "Built for modern record labels",
    description:
      "Unify A&R, release planning, contracts, assets, and distribution in one intelligent operating system.",
    columns: [
      {
        title: "Core operations",
        links: [
          { label: "A&R workspace", href: "/solutions#ar" },
          { label: "Release planning", href: "/solutions#releases" },
          { label: "Task orchestration", href: "/solutions#tasks" },
          { label: "Contributor management", href: "/solutions#contributors" },
        ],
      },
      {
        title: "Creative + Business",
        links: [
          { label: "Metadata control", href: "/solutions#metadata" },
          { label: "Asset collection", href: "/solutions#assets" },
          { label: "Distribution setup", href: "/solutions#distribution" },
          { label: "Quality checks", href: "/solutions#quality" },
          { label: "Contract automation", href: "/solutions#contracts" },
          { label: "Rights management", href: "/solutions#rights" },
          { label: "Catalog lifecycle", href: "/solutions#catalog" },
          { label: "Performance tracking", href: "/solutions#performance" },
        ],
      },
    ],
    cta: { label: "Explore all solutions", href: "/solutions" },
  },
  PRICING: {
    eyebrow: "Plans",
    title: "Scale from boutique to enterprise",
    description:
      "Choose a plan based on team size and workflow complexity, then grow into advanced automation over time.",
    columns: [
      {
        title: "Starter",
        links: [
          { label: "For small teams", href: "/pricing#starter" },
          { label: "Essentials included", href: "/pricing#starter" },
          { label: "Fast onboarding", href: "/pricing#starter" },
          { label: "Email support", href: "/pricing#starter" },
        ],
      },
      {
        title: "Growth & Enterprise",
        links: [
          { label: "Advanced workflows", href: "/pricing#growth" },
          { label: "Role permissions", href: "/pricing#growth" },
          { label: "Automated reminders", href: "/pricing#growth" },
          { label: "Priority support", href: "/pricing#growth" },
          { label: "Custom integrations", href: "/pricing#enterprise" },
          { label: "Dedicated success lead", href: "/pricing#enterprise" },
          { label: "Security reviews", href: "/pricing#enterprise" },
          { label: "SLA coverage", href: "/pricing#enterprise" },
        ],
      },
    ],
    cta: { label: "Compare plans", href: "/pricing" },
  },
  AI: {
    eyebrow: "Intelligence",
    title: "AI copilots for every label workflow",
    description:
      "Accelerate decisions with AI that understands projects, deadlines, catalogs, and release readiness.",
    columns: [
      {
        title: "Creative support",
        links: [
          { label: "Track triage", href: "/ai#creative" },
          { label: "Opportunity scoring", href: "/ai#creative" },
          { label: "Artist insights", href: "/ai#creative" },
          { label: "Campaign ideas", href: "/ai#creative" },
        ],
      },
      {
        title: "Operations + Executive",
        links: [
          { label: "Metadata suggestions", href: "/ai#operations" },
          { label: "Release risk alerts", href: "/ai#operations" },
          { label: "Timeline optimization", href: "/ai#operations" },
          { label: "Smart task routing", href: "/ai#operations" },
          { label: "Weekly intelligence briefs", href: "/ai#executive" },
          { label: "Portfolio summaries", href: "/ai#executive" },
          { label: "Forecast snapshots", href: "/ai#executive" },
          { label: "Trend monitoring", href: "/ai#executive" },
        ],
      },
    ],
    cta: { label: "See AI capabilities", href: "/ai" },
  },
  "LOGIN/SIGNUP": {
    eyebrow: "Access",
    title: "Secure access for every role",
    description:
      "Invite your team, assign permissions, and start collaborating with secure workspace access in minutes.",
    columns: [
      {
        title: "Get started",
        links: [
          { label: "Create workspace", href: "/login" },
          { label: "Invite collaborators", href: "/login" },
          { label: "Set profile preferences", href: "/login" },
          { label: "Connect your tools", href: "/login" },
        ],
      },
      {
        title: "Security & Support",
        links: [
          { label: "Two-factor authentication", href: "/login" },
          { label: "Session controls", href: "/login" },
          { label: "Role-based access", href: "/login" },
          { label: "Audit history", href: "/login" },
          { label: "Live onboarding", href: "/login" },
          { label: "Knowledge center", href: "/login" },
          { label: "Customer success", href: "/login" },
          { label: "Contact sales", href: "/login" },
        ],
      },
    ],
    cta: { label: "Login or create account", href: "/login" },
  },
};

function MegaMenuLink({ link, index }: { link: { label: string; href: string }; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={link.href}
        className="group/link relative flex items-center gap-2 rounded-lg px-3 py-2 -mx-3 text-left text-[15px] normal-case tracking-normal text-[#94a3b8] transition-colors duration-200 hover:text-white"
      >
        <span className="absolute inset-0 rounded-lg bg-white/[0.04] opacity-0 transition-opacity duration-200 group-hover/link:opacity-100" />
        <span className="relative z-10">{link.label}</span>
        <svg
          className="relative z-10 h-3.5 w-3.5 shrink-0 -translate-x-2 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-60"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.li>
  );
}

function MegaMenuColumn({ column, columnIndex }: { column: { title: string; links: { label: string; href: string }[] }; columnIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 + columnIndex * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-[#1e293b]/60 bg-[#020617]/40 p-5 backdrop-blur-sm"
    >
      <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7dd3fc]">
        <span className="h-px w-4 bg-[#7dd3fc]/40" />
        {column.title}
      </p>
      <ul className="mt-4 space-y-0.5">
        {column.links.map((link, i) => (
          <MegaMenuLink key={link.label} link={link} index={i} />
        ))}
      </ul>
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeNavItem, setActiveNavItem] = useState<NavLabel | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeMegaMenu = activeNavItem ? megaMenuContent[activeNavItem] : null;

  const handleMouseEnterNav = (label: NavLabel) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveNavItem(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveNavItem(null);
    }, 120);
  };

  const handleMouseEnterDropdown = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <>
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
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-[20px] font-bold uppercase tracking-[0.25em] transition-colors hover:text-[#818cf8] ${
                      pathname === item.href ? "text-[#818cf8]" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onMouseLeave={handleMouseLeave}
        className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)]"
      >
        <header className="flex items-center justify-between gap-5 rounded-full bg-[#0a0e27] px-5 py-4 text-[14px] font-semibold uppercase tracking-[0.2em] text-[#f8fafc] sm:px-12 sm:py-6 sm:text-[15px]">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[12px] font-black tracking-[0.3em] sm:text-[14px]">
              MYLABELDESK
            </span>
          </Link>
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
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => handleMouseEnterNav(item.label)}
                className={`relative transition-colors duration-200 ${
                  activeNavItem === item.label || pathname === item.href
                    ? "text-[#818cf8]"
                    : "hover:text-[#6366f1]"
                }`}
              >
                {item.label}
                {activeNavItem === item.label && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#818cf8]"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </header>

        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{
                opacity: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              onMouseEnter={handleMouseEnterDropdown}
              className="mt-3 hidden overflow-hidden sm:block"
            >
              <div className="relative rounded-[28px] border border-[#1e293b]/80 bg-[#0a0e27]/95 p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {/* Animated accent glow that shifts per menu */}
                <motion.div
                  key={`glow-${activeNavItem}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute -top-20 left-10 h-44 w-44 rounded-full bg-[#0000d8]/25 blur-[80px]"
                />
                <motion.div
                  key={`glow2-${activeNavItem}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="pointer-events-none absolute -bottom-16 right-10 h-48 w-48 rounded-full bg-[#1d4ed8]/20 blur-[80px]"
                />

                {/* Top subtle border glow */}
                <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#0000d8]/40 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNavItem}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 grid grid-cols-[1.1fr_1.9fr] gap-10"
                  >
                    {/* Left: branding panel */}
                    <div className="flex flex-col justify-between">
                      <div className="space-y-4">
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                          className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#93c5fd]"
                        >
                          {activeMegaMenu.eyebrow}
                        </motion.p>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className="text-[32px] font-black leading-[1.08] tracking-tight text-white"
                        >
                          {activeMegaMenu.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                          className="max-w-sm text-[15px] normal-case leading-relaxed tracking-normal text-[#94a3b8]"
                        >
                          {activeMegaMenu.description}
                        </motion.p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6"
                      >
                        <Link
                          href={activeMegaMenu.cta.href}
                          className="group/cta inline-flex items-center gap-2 rounded-full bg-[#0000d8] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_8px_24px_rgba(0,0,216,0.3)]"
                        >
                          {activeMegaMenu.cta.label}
                          <svg
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Right: link columns */}
                    <div className="grid grid-cols-2 gap-4">
                      {activeMegaMenu.columns.map((column, ci) => (
                        <MegaMenuColumn key={column.title} column={column} columnIndex={ci} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
