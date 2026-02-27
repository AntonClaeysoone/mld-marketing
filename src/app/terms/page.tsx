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
      "MyLabelDesk is provided \"as is.\" We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    title: "Changes to terms",
    content:
      "We may update these terms from time to time. We will notify you of material changes via email or in-app notification. Continued use after changes constitutes acceptance.",
  },
];

export default function TermsPage() {
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
              Terms of Service
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
        <div className="mx-auto max-w-3xl space-y-12 pt-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <h2 className="text-[20px] font-black text-[#0a0e27] sm:text-[24px]">
                {section.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#64748b] sm:text-[16px]">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
        <Footer />
      </section>
    </div>
  );
}
