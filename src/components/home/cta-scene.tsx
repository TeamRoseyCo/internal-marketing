"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollScene, SceneContent, GlassCard } from "@/components/scroll";

export function CTAScene() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Card animation
  const cardScale = useTransform(smoothProgress, [0.1, 0.4], [0.9, 1]);
  const cardOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  const cardY = useTransform(smoothProgress, [0.1, 0.4], [60, 0]);

  // Background glow pulse
  const glowOpacity = useTransform(
    smoothProgress,
    [0.3, 0.5, 0.7],
    [0.3, 0.6, 0.4]
  );

  return (
    <ScrollScene
      id="cta"
      className="relative bg-[hsl(0,0%,3%)] py-20"
      snap={true}
      ref={containerRef}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: glowOpacity }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] blur-[150px]"
          style={{
            background: "radial-gradient(ellipse, hsl(276 100% 40% / 0.4) 0%, hsl(320 100% 40% / 0.2) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      <SceneContent className="relative z-10">
        <motion.div
          style={{ scale: cardScale, opacity: cardOpacity, y: cardY }}
          className="max-w-3xl mx-auto px-4"
        >
          <GlassCard
            variant="strong"
            className="p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(276,100%,50%)] to-transparent opacity-50" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                <span className="text-white">Ready to </span>
                <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
                  Grow
                </span>
                <span className="text-white">?</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Book a free strategy call and discover how we can help you get more
              leads, more clients, and scale your business profitably.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[hsl(276,100%,50%)] to-[hsl(320,100%,50%)] hover:from-[hsl(276,100%,55%)] hover:to-[hsl(320,100%,55%)] text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] group"
              >
                <Link href="/contact" className="flex items-center gap-3">
                  Get Your Free Strategy Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-sm text-white/30"
            >
              No commitment required. Let's talk about your growth.
            </motion.p>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(180,100%,50%)] to-transparent opacity-30" />
          </GlassCard>
        </motion.div>
      </SceneContent>
    </ScrollScene>
  );
}
