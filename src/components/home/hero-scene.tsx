"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollScene, SceneContent, Parallax } from "@/components/scroll";

export function HeroScene() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Hero content fades and scales down as you scroll
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, -50]);

  return (
    <ScrollScene
      id="hero"
      className="relative"
      snap={true}
      ref={containerRef}
    >
      {/* Floating gradient orbs for parallax depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Parallax speed={-0.3} className="absolute -top-20 -right-20 w-[500px] h-[500px]">
          <div
            className="w-full h-full rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(276 100% 50% / 0.15) 0%, transparent 70%)" }}
          />
        </Parallax>

        <Parallax speed={0.2} className="absolute top-1/3 -left-32 w-[400px] h-[400px]">
          <div
            className="w-full h-full rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(180 100% 50% / 0.1) 0%, transparent 70%)" }}
          />
        </Parallax>

        <Parallax speed={-0.15} className="absolute bottom-20 right-1/4 w-[300px] h-[300px]">
          <div
            className="w-full h-full rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(320 100% 50% / 0.12) 0%, transparent 70%)" }}
          />
        </Parallax>
      </div>

      {/* Main hero content */}
      <SceneContent className="relative z-10">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 mb-8 text-sm font-medium rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80">
              Global Marketing Agency
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
          >
            <span className="text-white">More Growth.</span>
            <br />
            <span className="text-white">More Clients.</span>
            <br />
            <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
              Guaranteed.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stop waiting for customers to find you. We put your business in front
            of people actively searching for your services.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/results">See Our Results</Link>
            </Button>
          </motion.div>

          {/* Trust badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 text-sm text-white/40"
          >
            Join 50+ businesses scaling profitably with targeted marketing.
          </motion.p>
        </motion.div>
      </SceneContent>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </ScrollScene>
  );
}
