"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingParticlesProps {
  /** Number of particles to render */
  count?: number;
  /** Color palette for particles - uses refined muted colors by default */
  colors?: string[];
  /** Whether to use muted luxury colors (default) or vibrant brand colors */
  variant?: "luxury" | "brand";
  /** Additional className for the container */
  className?: string;
}

/**
 * Floating particles background effect
 * Uses Framer Motion for smooth CSS-based animations
 * Respects user's reduced motion preferences
 */
export function FloatingParticles({
  count = 40,
  colors,
  variant = "luxury",
  className = "",
}: FloatingParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  // Color palettes - brand red/green palette
  const luxuryColors = [
    "hsl(0 70% 55% / 0.35)", // Soft rose red
    "hsl(355 60% 45% / 0.3)", // Muted crimson
    "hsl(40 20% 75% / 0.25)", // Warm off-white
    "hsl(130 55% 45% / 0.25)", // Soft green
  ];

  const brandColors = [
    "hsl(0 75% 50% / 0.4)", // Rose red
    "hsl(355 70% 45% / 0.35)", // Crimson
    "hsl(130 65% 45% / 0.3)", // Leaf green
    "hsl(140 50% 38% / 0.25)", // Forest green
  ];

  const particleColors = colors || (variant === "luxury" ? luxuryColors : brandColors);

  // Generate stable particle data using useMemo to avoid hydration issues
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Use deterministic "random" based on index for SSR consistency
      const seed = i * 13.37;
      const pseudoRandom = (offset: number) => ((seed + offset) % 100) / 100;

      return {
        id: i,
        left: pseudoRandom(0) * 100,
        top: pseudoRandom(50) * 100,
        size: 1.5 + pseudoRandom(100) * 3,
        color: particleColors[i % particleColors.length],
        opacity: 0.2 + pseudoRandom(150) * 0.4,
        blur: pseudoRandom(200) > 0.8 ? 1 : 0,
        // Animation parameters
        duration: 8 + pseudoRandom(250) * 12, // 8-20s
        delay: pseudoRandom(300) * 3, // 0-3s delay
        xRange: 20 + pseudoRandom(350) * 30, // 20-50px movement
        yRange: 20 + pseudoRandom(400) * 30,
      };
    });
  }, [count, particleColors]);

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity * 0.5, // Reduce opacity for static
              filter: particle.blur ? `blur(${particle.blur}px)` : undefined,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: particle.blur ? `blur(${particle.blur}px)` : undefined,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
            x: [-particle.xRange / 2, particle.xRange / 2, -particle.xRange / 2],
            y: [-particle.yRange / 2, particle.yRange / 2, -particle.yRange / 2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
