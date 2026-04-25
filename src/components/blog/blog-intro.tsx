// src/components/blog/blog-intro.tsx
// Blog intro section inspired by Raha Resort design
// Uses explicit colors with [data-theme="dark"] CSS overrides for proper theme support

"use client";

import { motion } from "framer-motion";

interface BlogIntroProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

export function BlogIntro({
  subtitle = "No Fluff. Just Wins.",
  title = "Marketing Playbooks That Actually Work",
  description = "We don't write theory. We write the exact systems we use to fill calendars, drive bookings, and turn locals into paying customers — every single month.",
}: BlogIntroProps) {
  return (
    <section className="py-20 md:py-28 bg-[#f8f6f3]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="block text-xs font-semibold tracking-[0.25em] uppercase text-[#0071e3] mb-4">
            {subtitle}
          </span>

          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1d1d1f] mb-6 leading-tight">
            {title}
          </h2>

          <div className="w-16 h-[2px] bg-[#0071e3] mx-auto mb-8" />

          <p className="text-lg md:text-xl text-[#6e6e73] leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
