"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left bg-[#0000d8]"
      />

      <Navbar />

      <section ref={heroRef} className="relative overflow-hidden bg-white pb-4 pt-6">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 lg:px-12"
        >
          <div className="pt-28 sm:pt-36">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] font-medium uppercase tracking-[0.3em] text-[#0000d8]"
            >
              Legal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-[36px] font-black leading-[1.04] tracking-tight text-[#0a0e27] sm:text-[56px] md:text-[72px]"
            >
              Cookie Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-[15px] text-[#94a3b8]"
            >
              Last updated: February 2026
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 h-px max-w-6xl origin-left bg-gradient-to-r from-[#0000d8]/30 via-[#e2e8f0] to-transparent"
        />
      </section>

      <section className="bg-white px-4 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl pt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15px] leading-[1.8] text-[#64748b] sm:text-[16px]"
          >
            MyLabelDesk uses cookies to provide, secure, and improve the platform.
            This policy explains what cookies we use and why.
          </motion.p>

          <div className="mt-16 space-y-6">
            {cookieTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] p-8 transition-[box-shadow,border-color] duration-500 hover:border-[#cbd5e1] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 text-[28px] font-black leading-none text-[#0a0e27]/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-[20px] font-black text-[#0a0e27]">{type.title}</h2>
                    <p className="mt-3 text-[15px] leading-[1.8] text-[#64748b]">
                      {type.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {type.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-full bg-[#f1f5f9] px-4 py-1.5 text-[13px] font-semibold text-[#475569] transition-colors duration-300 group-hover:bg-[#0000d8]/[0.06] group-hover:text-[#0000d8]"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-16 pl-12 sm:pl-16"
          >
            <span className="absolute left-0 top-0 text-[32px] font-black leading-none text-[#0a0e27]/[0.06] sm:text-[40px]">
              04
            </span>
            <h2 className="text-[20px] font-black text-[#0a0e27] sm:text-[24px]">
              Managing cookies
            </h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-[#64748b] sm:text-[16px]">
              You can control cookies through your browser settings. Note that disabling essential
              cookies may affect platform functionality. For analytics and preference cookies,
              you can update your settings at any time from your workspace preferences.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
