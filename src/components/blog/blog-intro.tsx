// src/components/blog/blog-intro.tsx
// Blog intro section with subtitle, title, divider, and description
// Inspired by Raha Resort design pattern

"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";

interface BlogIntroProps {
  subtitle?: string;
  title?: string;
  description?: string;
}

export function BlogIntro({
  subtitle = "Stories & Strategies",
  title = "Marketing Insights & Strategies",
  description = "Actionable tips, strategies, and insights to help you grow your business through digital marketing.",
}: BlogIntroProps) {
  return (
    <section className="py-20 md:py-24 bg-card/30 border-y border-border/20">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <span className="inline-block text-xs md:text-sm font-semibold tracking-widest uppercase text-primary/80 mb-4">
              {subtitle}
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-brand-green to-primary mx-auto mb-6" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}
