"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const cookieTypes = [
  {
    title: "Essential cookies",
    description:
      "Required for the platform to function. These handle authentication, security, and session management. They cannot be disabled.",
    examples: ["Session tokens", "CSRF protection", "Load balancing"],
  },
  {
    title: "Analytics cookies",
    description:
      "Help us understand how you use MyLabelDesk so we can improve the experience. All data is anonymized.",
    examples: ["Page views", "Feature usage", "Error tracking"],
  },
  {
    title: "Preference cookies",
    description:
      "Remember your settings and preferences, such as language, timezone, and display options.",
    examples: ["Theme preference", "Language settings", "Dashboard layout"],
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      <Navbar />

      <section className="bg-white pb-16 pt-6 shadow-[0_40px_120px_rgba(10,14,39,0.45)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="pt-28 sm:pt-36"
          >
            <motion.p
              variants={fadeUp}
              className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#0000d8]"
            >
              Legal
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px]"
            >
              Cookie Policy
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-[15px] text-[#94a3b8]"
            >
              Last updated: February 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl pt-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-[15px] leading-relaxed text-[#64748b] sm:text-[16px]"
          >
            MyLabelDesk uses cookies to provide, secure, and improve the platform.
            This policy explains what cookies we use and why.
          </motion.p>

          <div className="mt-14 space-y-10">
            {cookieTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="rounded-[24px] border border-[#e2e8f0] p-8"
              >
                <h2 className="text-[20px] font-black text-[#0a0e27]">{type.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#64748b]">
                  {type.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {type.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full bg-[#f1f5f9] px-4 py-1.5 text-[13px] font-semibold text-[#475569]"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-14"
          >
            <h2 className="text-[20px] font-black text-[#0a0e27] sm:text-[24px]">
              Managing cookies
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#64748b] sm:text-[16px]">
              You can control cookies through your browser settings. Note that disabling essential
              cookies may affect platform functionality. For analytics and preference cookies,
              you can update your settings at any time from your workspace preferences.
            </p>
          </motion.div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
