"use client";

import { ReactNode, useRef, forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSceneProps {
  children: ReactNode;
  className?: string;
  id?: string;
  snap?: boolean;
  background?: "animated" | "static" | "transparent";
}

export const ScrollScene = forwardRef<HTMLElement, ScrollSceneProps>(
  function ScrollScene(
    { children, className, id, snap = true, background = "transparent" },
    ref
  ) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative min-h-screen w-full overflow-hidden",
          snap && "snap-start snap-always",
          background === "animated" && "animated-bg",
          className
        )}
      >
        {children}
      </section>
    );
  }
);

// Scene content wrapper with centering
interface SceneContentProps {
  children: ReactNode;
  className?: string;
}

export function SceneContent({ children, className }: SceneContentProps) {
  return (
    <div
      className={cn(
        "relative z-10 flex items-center justify-center min-h-screen px-4",
        className
      )}
    >
      {children}
    </div>
  );
}

// Parallax wrapper - moves element based on scroll
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = moves opposite to scroll
  direction?: "vertical" | "horizontal";
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = "vertical",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const movement = useTransform(scrollYProgress, [0, 1], [
    speed * 100,
    speed * -100,
  ]);

  const transform =
    direction === "vertical"
      ? { y: movement }
      : { x: movement };

  return (
    <motion.div ref={ref} style={transform} className={className}>
      {children}
    </motion.div>
  );
}

// Scroll-linked opacity and scale reveal
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from direction
interface SlideInProps {
  children: ReactNode;
  className?: string;
  from?: "left" | "right" | "top" | "bottom";
  delay?: number;
}

export function SlideIn({
  children,
  className,
  from = "bottom",
  delay = 0,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 50%"],
  });

  const directions = {
    left: { x: [-100, 0], y: [0, 0] },
    right: { x: [100, 0], y: [0, 0] },
    top: { x: [0, 0], y: [-100, 0] },
    bottom: { x: [0, 0], y: [100, 0] },
  };

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], directions[from].x);
  const y = useTransform(scrollYProgress, [0, 1], directions[from].y);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hook to get scroll progress for a section
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, scrollYProgress };
}
