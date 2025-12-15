"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export function AnimatedBackground({
  className,
  intensity = "medium",
}: AnimatedBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
  });

  // Transform scroll into background movement
  const bgX = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

  const intensityMultiplier = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
  };

  const mult = intensityMultiplier[intensity];

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[hsl(0,0%,5%)]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundPosition: bgX,
        }}
      >
        {/* Purple orb - top right */}
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(276 100% 50% / ${0.15 * mult}) 0%, transparent 70%)`,
            x: useTransform(smoothProgress, [0, 1], [0, -100 * mult]),
            y: useTransform(smoothProgress, [0, 1], [0, 100 * mult]),
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Magenta orb - center left */}
        <motion.div
          className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(320 100% 50% / ${0.12 * mult}) 0%, transparent 70%)`,
            x: useTransform(smoothProgress, [0, 1], [0, 80 * mult]),
            y: useTransform(smoothProgress, [0, 1], [0, -50 * mult]),
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Cyan orb - bottom */}
        <motion.div
          className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(180 100% 50% / ${0.1 * mult}) 0%, transparent 70%)`,
            x: useTransform(smoothProgress, [0, 1], [0, 50 * mult]),
            y: useTransform(smoothProgress, [0, 1], [0, -80 * mult]),
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Additional smaller accent orbs */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(276 100% 60% / ${0.08 * mult}) 0%, transparent 60%)`,
            x: useTransform(smoothProgress, [0, 1], [0, -40 * mult]),
            y: useTransform(smoothProgress, [0, 1], [0, 60 * mult]),
          }}
        />
      </motion.div>

      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0,0%,5%)/50]" />
    </div>
  );
}

// Simpler version without scroll-linked movement (just animated)
export function AnimatedBackgroundSimple({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 animated-bg" />

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(276 100% 50% / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(320 100% 50% / 0.12) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute -bottom-1/4 right-1/3 w-[550px] h-[550px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(180 100% 50% / 0.1) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 25, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
}
