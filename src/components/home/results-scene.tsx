"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollScene, SceneContent, GlassCard } from "@/components/scroll";

const stats = [
  {
    value: "21x",
    label: "Average ROAS",
    description: "Return on ad spend",
    color: "cyan"
  },
  {
    value: "100+",
    label: "Leads in 48hrs",
    description: "For new campaigns",
    color: "purple"
  },
  {
    value: "300%",
    label: "Revenue Growth",
    description: "Average increase",
    color: "magenta"
  },
  {
    value: "50+",
    label: "Happy Clients",
    description: "And counting",
    color: "cyan"
  },
];

const testimonials = [
  {
    quote: "Flowryse transformed our online presence. We went from struggling to get leads to having more enquiries than we can handle.",
    author: "Sarah M.",
    role: "Business Owner",
  },
  {
    quote: "The ROI has been incredible. Every dollar we spend comes back multiplied. Best marketing investment we've made.",
    author: "James T.",
    role: "CEO",
  },
];

export function ResultsScene() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Header animation
  const headerOpacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const headerY = useTransform(smoothProgress, [0.1, 0.25], [40, 0]);

  return (
    <ScrollScene
      id="results"
      className="relative bg-[hsl(0,0%,4%)] py-20"
      snap={true}
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-20 w-[400px] h-[400px] blur-[100px] opacity-20"
          style={{ background: "radial-gradient(circle, hsl(180 100% 50%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, hsl(320 100% 50%) 0%, transparent 70%)" }}
        />
      </div>

      <SceneContent className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 w-full">
          {/* Header */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">Real </span>
              <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
                Results
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
              Numbers don't lie. Here's what our clients experience.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat, index) => {
              const statScale = useTransform(
                smoothProgress,
                [0.2 + index * 0.03, 0.35 + index * 0.03],
                [0.8, 1]
              );
              const statOpacity = useTransform(
                smoothProgress,
                [0.2 + index * 0.03, 0.35 + index * 0.03],
                [0, 1]
              );

              const gradientColor =
                stat.color === "cyan"
                  ? "from-[hsl(180,100%,50%)] to-[hsl(180,100%,40%)]"
                  : stat.color === "purple"
                  ? "from-[hsl(276,100%,60%)] to-[hsl(276,100%,45%)]"
                  : "from-[hsl(320,100%,55%)] to-[hsl(320,100%,40%)]";

              return (
                <motion.div
                  key={stat.label}
                  style={{ scale: statScale, opacity: statOpacity }}
                >
                  <GlassCard
                    variant="subtle"
                    className="p-6 text-center h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="text-white font-medium mb-1">{stat.label}</p>
                    <p className="text-xs sm:text-sm text-white/40">{stat.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => {
              const testimonialOpacity = useTransform(
                smoothProgress,
                [0.4 + index * 0.05, 0.55 + index * 0.05],
                [0, 1]
              );
              const testimonialX = useTransform(
                smoothProgress,
                [0.4 + index * 0.05, 0.55 + index * 0.05],
                [index === 0 ? -50 : 50, 0]
              );

              return (
                <motion.div
                  key={testimonial.author}
                  style={{ opacity: testimonialOpacity, x: testimonialX }}
                >
                  <GlassCard variant="default" className="p-6 sm:p-8 h-full">
                    <blockquote className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(276,100%,50%)] to-[hsl(320,100%,50%)]" />
                      <div>
                        <p className="font-semibold text-white">{testimonial.author}</p>
                        <p className="text-sm text-white/40">{testimonial.role}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SceneContent>
    </ScrollScene>
  );
}
