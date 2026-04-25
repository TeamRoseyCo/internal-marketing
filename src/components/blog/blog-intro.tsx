// src/components/blog/blog-intro.tsx
// Blog intro section inspired by Raha Resort design
// Clean centered subtitle, serif title, divider, description on light background

"use client";

import { motion } from "framer-motion";

interface BlogIntroProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

export function BlogIntro({
  subtitle = "Stories & Strategies",
  title = "Marketing Insights & Strategies",
  description = "Explore actionable tips, proven strategies, and data-driven insights to help you grow your business through digital marketing.",
}: BlogIntroProps) {
  return (
    <section className="py-20 md:py-28 bg-[#f8f6f3] dark:bg-[#0f0f12]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
            {subtitle}
          </span>

          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6 leading-tight">
            {title}
          </h2>

          <div className="w-16 h-[2px] bg-primary mx-auto mb-8" />

          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
