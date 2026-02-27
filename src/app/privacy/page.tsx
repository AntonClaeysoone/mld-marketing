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
              Privacy Policy
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
