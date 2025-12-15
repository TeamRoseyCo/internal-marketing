"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "strong";
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const variants = {
    default: "bg-slate-900/50 backdrop-blur-2xl backdrop-saturate-150",
    subtle: "bg-black/20 backdrop-blur-md",
    strong: "bg-slate-900/70 backdrop-blur-3xl backdrop-saturate-200",
  };

  return (
    <motion.div
      className={cn(
        // Base glass styles
        variants[variant],
        "rounded-3xl",
        "border border-white/[0.08]",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        // Hover styles
        hoverEffect && "transition-all duration-300",
        hoverEffect &&
          "hover:border-white/[0.15] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Service-specific glass card with color accent
interface ServiceGlassCardProps extends GlassCardProps {
  accentColor: "cyan" | "magenta" | "purple";
}

export function ServiceGlassCard({
  children,
  className,
  accentColor,
  ...props
}: ServiceGlassCardProps) {
  const accentStyles = {
    cyan: {
      border: "hover:border-[hsl(180,100%,50%)]/30",
      shadow: "hover:shadow-[0_30px_60px_-15px_hsl(180,100%,50%,0.15)]",
      glow: "before:bg-gradient-to-r before:from-transparent before:via-[hsl(180,100%,50%)]/50 before:to-transparent",
    },
    magenta: {
      border: "hover:border-[hsl(320,100%,50%)]/30",
      shadow: "hover:shadow-[0_30px_60px_-15px_hsl(320,100%,50%,0.15)]",
      glow: "before:bg-gradient-to-r before:from-transparent before:via-[hsl(320,100%,50%)]/50 before:to-transparent",
    },
    purple: {
      border: "hover:border-[hsl(276,100%,50%)]/30",
      shadow: "hover:shadow-[0_30px_60px_-15px_hsl(276,100%,50%,0.15)]",
      glow: "before:bg-gradient-to-r before:from-transparent before:via-[hsl(276,100%,50%)]/50 before:to-transparent",
    },
  };

  const accent = accentStyles[accentColor];

  return (
    <motion.div
      className={cn(
        // Glass base
        "bg-slate-900/50 backdrop-blur-2xl backdrop-saturate-150",
        "rounded-3xl",
        "border border-white/[0.08]",
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
        // Top glow line
        "relative overflow-hidden",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-px",
        accent.glow,
        // Hover
        "transition-all duration-300",
        accent.border,
        accent.shadow,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
