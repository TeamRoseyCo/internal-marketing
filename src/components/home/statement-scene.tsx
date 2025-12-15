"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollScene, SceneContent } from "@/components/scroll";

export function StatementScene() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Phase 1 (0-0.3): Full text visible, words in position
  // Phase 2 (0.3-0.5): White text fades, FLOW moves down, RYSE moves up
  // Phase 3 (0.5-0.7): Words connect in center
  // Phase 4 (0.7-1): FLOWRYSE zooms in toward user

  // "Watch your business" - top white text
  const topTextOpacity = useTransform(smoothProgress, [0.2, 0.35], [1, 0]);
  const topTextY = useTransform(smoothProgress, [0.2, 0.35], [0, -30]);

  // "And watch it" - bottom white text
  const bottomTextOpacity = useTransform(smoothProgress, [0.2, 0.35], [1, 0]);
  const bottomTextY = useTransform(smoothProgress, [0.2, 0.35], [0, 30]);

  // FLOW word movement - starts at top, moves to center
  const flowY = useTransform(smoothProgress, [0.3, 0.5], [0, 120]);
  const flowOpacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);

  // RYSE word movement - starts at bottom, moves to center
  const ryseY = useTransform(smoothProgress, [0.3, 0.5], [0, -120]);
  const ryseOpacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);

  // Combined FLOWRYSE zoom effect
  const combinedScale = useTransform(smoothProgress, [0.5, 0.8], [1, 3]);
  const combinedOpacity = useTransform(smoothProgress, [0.75, 0.9], [1, 0]);

  // Background glow intensifies as words merge
  const glowIntensity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);

  return (
    <ScrollScene
      id="statement"
      className="relative bg-[hsl(0,0%,3%)]"
      snap={true}
      ref={containerRef}
    >
      {/* Dynamic background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: glowIntensity }}
      >
        {/* Center glow when words merge */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[100px]"
          style={{
            background: "radial-gradient(ellipse, hsl(276 100% 50% / 0.3) 0%, hsl(180 100% 50% / 0.2) 50%, transparent 70%)",
          }}
        />
      </motion.div>

      <SceneContent className="relative z-10 flex flex-col items-center justify-center gap-0">
        {/* Container for the word animation */}
        <motion.div
          className="relative flex flex-col items-center justify-center"
          style={{ scale: combinedScale, opacity: combinedOpacity }}
        >
          {/* Top section: "Watch your business FLOW" */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-1 sm:gap-4">
            <motion.span
              style={{ opacity: topTextOpacity, y: topTextY }}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/70 tracking-wide text-center"
            >
              Watch your business
            </motion.span>
            <motion.span
              style={{ opacity: flowOpacity, y: flowY }}
              className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-glow-cyan"
            >
              <span className="bg-gradient-to-r from-[hsl(180,100%,60%)] to-[hsl(180,100%,45%)] bg-clip-text text-transparent">
                FLOW
              </span>
            </motion.span>
          </div>

          {/* Spacer - shrinks as words come together */}
          <motion.div
            className="h-16 sm:h-20 md:h-24"
            style={{
              height: useTransform(smoothProgress, [0.3, 0.5], [96, 0]),
            }}
          />

          {/* Bottom section: "And watch it RYSE" */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-1 sm:gap-4">
            <motion.span
              style={{ opacity: bottomTextOpacity, y: bottomTextY }}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/70 tracking-wide text-center"
            >
              And watch it
            </motion.span>
            <motion.span
              style={{ opacity: ryseOpacity, y: ryseY }}
              className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-glow-magenta"
            >
              <span className="bg-gradient-to-r from-[hsl(320,100%,55%)] to-[hsl(320,100%,45%)] bg-clip-text text-transparent">
                RYSE
              </span>
            </motion.span>
          </div>
        </motion.div>

        {/* Particle effects around the words */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 3) * 20}%`,
                opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 0.6]),
                scale: useTransform(smoothProgress, [0.4, 0.7], [0, 1.5]),
              }}
            />
          ))}
        </div>
      </SceneContent>

      {/* Transition gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[hsl(0,0%,5%)] pointer-events-none z-20" />
    </ScrollScene>
  );
}
