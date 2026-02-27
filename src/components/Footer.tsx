"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto mt-8 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-[#e2e8f0] pt-6 text-[13px] text-[#64748b] sm:mt-12 sm:gap-5 sm:pt-8 sm:text-[14px] sm:flex-row">
      <p>© {new Date().getFullYear()} MyLabelDesk. All rights reserved.</p>
      <div className="flex flex-wrap gap-4">
        <Link href="/privacy" className="text-[#64748b] transition-colors hover:text-[#0a0e27]">
          Privacy
        </Link>
        <Link href="/terms" className="text-[#64748b] transition-colors hover:text-[#0a0e27]">
          Terms
        </Link>
        <Link href="/cookies" className="text-[#64748b] transition-colors hover:text-[#0a0e27]">
          Cookies
        </Link>
      </div>
    </footer>
  );
}
