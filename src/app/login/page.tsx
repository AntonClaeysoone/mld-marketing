"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0e27] lg:flex-row">
      <Navbar />

      {/* Left panel — branding with animated gradient */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden p-12 lg:flex xl:p-16">
        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#0000d8]/30 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="pointer-events-none absolute right-10 top-1/3 h-48 w-48 rounded-full bg-[#1d4ed8]/20 blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, 15, -15, 0],
            y: [0, -20, 25, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="pointer-events-none absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-[#93c5fd]/10 blur-[60px]"
        />

        <div className="relative z-10 pt-24">
          <Link href="/" className="text-[14px] font-black uppercase tracking-[0.3em] text-white">
            MYLABELDESK
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[36px] font-black leading-[1.08] text-white xl:text-[48px]"
          >
            The operating system for{" "}
            <span className="text-[#93c5fd]">record labels.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[17px] leading-relaxed text-[#bfdbfe]"
          >
            Join hundreds of labels managing their entire workflow from one connected platform.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex items-center gap-3 rounded-xl border border-[#1e293b] bg-[#020617]/40 px-5 py-4 backdrop-blur-sm"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[#020617] bg-gradient-to-br from-[#93c5fd] to-[#0000d8]"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">500+ labels onboarded</p>
              <p className="text-[12px] text-[#94a3b8]">Trusted by independents and majors</p>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-[13px] text-[#64748b]">
          <Link href="/privacy" className="transition-colors hover:text-[#bfdbfe]">Privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-[#bfdbfe]">Terms</Link>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center px-6 py-32 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10 lg:hidden"
          >
            <Link href="/" className="text-[14px] font-black uppercase tracking-[0.3em] text-white">
              MYLABELDESK
            </Link>
          </motion.div>

          {/* Mode toggle */}
          <div className="flex gap-1 rounded-full bg-[#1e293b] p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`relative flex-1 rounded-full py-3 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                  mode === m ? "text-white" : "text-[#94a3b8]"
                }`}
              >
                {mode === m && (
                  <motion.div
                    layoutId="modeToggle"
                    className="absolute inset-0 rounded-full bg-[#0000d8]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{m === "login" ? "Login" : "Sign up"}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === "login" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === "login" ? 16 : -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="mt-10 text-[28px] font-black text-white sm:text-[32px]">
                {mode === "login" ? "Welcome back" : "Create your workspace"}
              </h1>
              <p className="mt-2 text-[15px] text-[#94a3b8]">
                {mode === "login"
                  ? "Sign in to your MyLabelDesk workspace."
                  : "Start your 14-day free trial. No credit card required."}
              </p>

              <div className="mt-8 space-y-4">
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                      Label name
                    </label>
                    <input
                      type="text"
                      placeholder="Your label"
                      onFocus={() => setFocusedField("label")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl border bg-[#020617] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569] ${
                        focusedField === "label"
                          ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.15)]"
                          : "border-[#1e293b]"
                      }`}
                    />
                  </motion.div>
                )}
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@label.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full rounded-xl border bg-[#020617] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569] ${
                      focusedField === "email"
                        ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.15)]"
                        : "border-[#1e293b]"
                    }`}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full rounded-xl border bg-[#020617] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#475569] ${
                      focusedField === "password"
                        ? "border-[#0000d8] shadow-[0_0_0_3px_rgba(0,0,216,0.15)]"
                        : "border-[#1e293b]"
                    }`}
                  />
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full rounded-full bg-[#0000d8] py-4 text-[14px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1d4ed8]"
                >
                  {mode === "login" ? "Sign in" : "Create workspace"}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#1e293b]" />
            <span className="text-[12px] uppercase tracking-[0.14em] text-[#475569]">or</span>
            <div className="h-px flex-1 bg-[#1e293b]" />
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01, borderColor: "#475569" }}
            whileTap={{ scale: 0.99 }}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-[#1e293b] py-4 text-[14px] font-semibold text-white transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          {/* Mobile footer links */}
          <div className="mt-10 flex justify-center gap-6 text-[13px] text-[#475569] lg:hidden">
            <Link href="/privacy" className="transition-colors hover:text-[#bfdbfe]">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-[#bfdbfe]">Terms</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
