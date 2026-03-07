"use client";

import Link from "next/link";

const platformLinks = [
  { label: "A&R Workspace", href: "/solutions#ar" },
  { label: "Release Planning", href: "/solutions#releases" },
  { label: "Contract Automation", href: "/solutions#contracts" },
  { label: "Asset Collection", href: "/solutions#assets" },
  { label: "Distribution", href: "/solutions#distribution" },
  { label: "Catalog Management", href: "/solutions#catalog" },
];

const companyLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "AI Features", href: "/ai" },
  { label: "Get Started", href: "/get-started" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

function FooterColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7dd3fc]">
      {children}
    </p>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[14px] text-[#94a3b8] transition-colors duration-200 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a0e27] pt-16 sm:pt-24">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#0000d8]/[0.06] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Main footer grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-[14px] font-black tracking-[0.3em] text-white">
                MYLABELDESK
              </span>
            </Link>
            <p className="max-w-[260px] text-[14px] leading-relaxed text-[#94a3b8]">
              The operating system for modern record labels. Scout, plan, ship,
              and grow — all in one platform.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/company/mylabeldesk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e293b] bg-[#020617]/60 text-[#94a3b8] transition-all duration-200 hover:border-[#0000d8]/50 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mylabeldesk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e293b] bg-[#020617]/60 text-[#94a3b8] transition-all duration-200 hover:border-[#0000d8]/50 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://x.com/mylabeldesk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e293b] bg-[#020617]/60 text-[#94a3b8] transition-all duration-200 hover:border-[#0000d8]/50 hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform column */}
          <div className="space-y-4">
            <FooterColumnTitle>Platform</FooterColumnTitle>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="space-y-4">
            <FooterColumnTitle>Company</FooterColumnTitle>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div className="space-y-5">
            <FooterColumnTitle>Get started</FooterColumnTitle>
            <p className="text-[14px] leading-relaxed text-[#94a3b8]">
              Start your 14-day free trial. No credit card required.
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full bg-[#0000d8] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_8px_24px_rgba(0,0,216,0.3)]"
            >
              Try it free
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[#1e293b]/60 py-7 sm:mt-20 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-[#475569]">
            © {new Date().getFullYear()} MyLabelDesk. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#475569] transition-colors duration-200 hover:text-[#94a3b8]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
