"use client";

import { useState } from "react";
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

export default function Navbar() {
  const pathname = usePathname();
  const [activeNavItem, setActiveNavItem] = useState<NavLabel | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeMegaMenu = activeNavItem ? megaMenuContent[activeNavItem] : null;

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
        onMouseLeave={() => setActiveNavItem(null)}
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
                onMouseEnter={() => setActiveNavItem(item.label)}
                className={`relative transition-colors ${
                  activeNavItem === item.label || pathname === item.href
                    ? "text-[#818cf8]"
                    : "hover:text-[#6366f1]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#818cf8] transition-all duration-300 ${
                    activeNavItem === item.label ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            ))}
          </nav>
        </header>

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
                    <Link
                      href={activeMegaMenu.cta.href}
                      className="mt-3 inline-flex items-center rounded-full bg-[#0000d8] px-6 py-3 text-[14px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1d4ed8]"
                    >
                      {activeMegaMenu.cta.label}
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
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
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="text-left text-[15px] normal-case tracking-normal text-[#e2e8f0] transition-colors hover:text-[#93c5fd]"
                              >
                                {link.label}
                              </Link>
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
      </div>
    </>
  );
}
