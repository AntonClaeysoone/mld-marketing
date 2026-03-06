"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Acceptance of terms",
    content:
      "By accessing or using MyLabelDesk, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform.",
  },
  {
    title: "Account responsibilities",
    content:
      "You are responsible for maintaining the security of your account credentials and for all activity under your workspace. Notify us immediately of any unauthorized access.",
  },
  {
    title: "Acceptable use",
    content:
      "You agree to use MyLabelDesk only for lawful purposes related to record label management. You may not use the platform to infringe on intellectual property rights or distribute harmful content.",
  },
  {
    title: "Subscription & billing",
    content:
      "Paid plans are billed on a recurring basis. You may cancel at any time, and cancellation takes effect at the end of the current billing period. Refunds are handled on a case-by-case basis.",
  },
  {
    title: "Intellectual property",
    content:
      "You retain ownership of all content you upload to MyLabelDesk. We retain ownership of the platform, its design, code, and branding. You grant us a limited license to host and display your content within the platform.",
  },
  {
    title: "Limitation of liability",
    content:
      'MyLabelDesk is provided "as is." We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.',
  },
  {
    title: "Changes to terms",
    content:
      "We may update these terms from time to time. We will notify you of material changes via email or in-app notification. Continued use after changes constitutes acceptance.",
  },
];

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0e27] text-[#0a0e27]">
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
              Terms of Service
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
        <div className="mx-auto max-w-3xl space-y-16 pt-12">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-12 sm:pl-16"
            >
              <span className="absolute left-0 top-0 text-[32px] font-black leading-none text-[#0a0e27]/[0.06] sm:text-[40px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[20px] font-black text-[#0a0e27] sm:text-[24px]">
                {section.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.8] text-[#64748b] sm:text-[16px]">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
