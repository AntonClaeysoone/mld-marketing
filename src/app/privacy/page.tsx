"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Information we collect",
    content:
      "We collect information you provide directly, such as your name, email address, label name, and payment details when you create an account or subscribe to a plan. We also collect usage data to improve the platform experience.",
  },
  {
    title: "How we use your information",
    content:
      "Your information is used to operate and improve MyLabelDesk, communicate with you about your account, provide customer support, and send relevant updates about platform features and changes.",
  },
  {
    title: "Data sharing",
    content:
      "We do not sell your personal data. We may share information with service providers who help us operate the platform, and when required by law or to protect our rights.",
  },
  {
    title: "Data security",
    content:
      "We implement industry-standard security measures including encryption in transit and at rest, regular security audits, and access controls to protect your data.",
  },
  {
    title: "Your rights",
    content:
      "You have the right to access, correct, or delete your personal data. You can also request data portability or object to certain processing activities. Contact us to exercise these rights.",
  },
  {
    title: "Contact",
    content:
      "For privacy-related questions, contact us at privacy@mylabeldesk.com or through your workspace settings.",
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
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
