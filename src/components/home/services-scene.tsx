"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Users, Target, Zap, ArrowRight } from "lucide-react";
import { ScrollScene, SceneContent, ServiceGlassCard } from "@/components/scroll";

const services = [
  {
    icon: TrendingUp,
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description: "Dominate search results and get found by customers actively looking for your services.",
    href: "/services/seo",
    accentColor: "cyan" as const,
  },
  {
    icon: Users,
    title: "Social Media",
    subtitle: "Management & Growth",
    description: "Build your brand presence and engage your audience across all major platforms.",
    href: "/services/social-media",
    accentColor: "purple" as const,
  },
  {
    icon: Target,
    title: "Paid Ads",
    subtitle: "Google & Meta Advertising",
    description: "ROI-focused campaigns that convert clicks into customers with measurable results.",
    href: "/services/paid-ads",
    accentColor: "magenta" as const,
  },
  {
    icon: Zap,
    title: "Web Design",
    subtitle: "High-Converting Websites",
    description: "Beautiful, fast websites designed to turn visitors into leads and customers.",
    href: "/services/website-design",
    accentColor: "cyan" as const,
  },
];

export function ServicesScene() {
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
  const headerY = useTransform(smoothProgress, [0.1, 0.25], [50, 0]);

  return (
    <ScrollScene
      id="services"
      className="relative bg-[hsl(0,0%,5%)] py-20"
      snap={true}
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] blur-[120px] opacity-30"
          style={{ background: "radial-gradient(circle, hsl(276 100% 40%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] blur-[100px] opacity-25"
          style={{ background: "radial-gradient(circle, hsl(180 100% 40%) 0%, transparent 70%)" }}
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
              <span className="text-white">How We Help You </span>
              <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
                Grow
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
              Data-driven strategies that turn marketing spend into measurable revenue.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              // Stagger the entrance - each card slides in from alternating sides
              const slideFrom = index % 2 === 0 ? -100 : 100;
              const cardX = useTransform(
                smoothProgress,
                [0.15 + index * 0.05, 0.35 + index * 0.05],
                [slideFrom, 0]
              );
              const cardOpacity = useTransform(
                smoothProgress,
                [0.15 + index * 0.05, 0.3 + index * 0.05],
                [0, 1]
              );
              const cardY = useTransform(
                smoothProgress,
                [0.15 + index * 0.05, 0.35 + index * 0.05],
                [30, 0]
              );

              return (
                <motion.div
                  key={service.title}
                  style={{ x: cardX, opacity: cardOpacity, y: cardY }}
                >
                  <Link href={service.href} className="block group h-full">
                    <ServiceGlassCard
                      accentColor={service.accentColor}
                      className="p-6 h-full flex flex-col"
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Icon */}
                      <div
                        className="w-12 h-12 mb-4 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor:
                            service.accentColor === "cyan"
                              ? "hsl(180 100% 50% / 0.1)"
                              : service.accentColor === "purple"
                              ? "hsl(276 100% 50% / 0.1)"
                              : "hsl(320 100% 50% / 0.1)",
                          border: `1px solid ${
                            service.accentColor === "cyan"
                              ? "hsl(180 100% 50% / 0.3)"
                              : service.accentColor === "purple"
                              ? "hsl(276 100% 50% / 0.3)"
                              : "hsl(320 100% 50% / 0.3)"
                          }`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{
                            color:
                              service.accentColor === "cyan"
                                ? "hsl(180 100% 50%)"
                                : service.accentColor === "purple"
                                ? "hsl(276 100% 50%)"
                                : "hsl(320 100% 50%)",
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{
                          color:
                            service.accentColor === "cyan"
                              ? "hsl(180 100% 60%)"
                              : service.accentColor === "purple"
                              ? "hsl(276 100% 65%)"
                              : "hsl(320 100% 60%)",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-3">{service.subtitle}</p>

                      {/* Description */}
                      <p className="text-sm text-white/60 leading-relaxed flex-grow">
                        {service.description}
                      </p>

                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </ServiceGlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SceneContent>
    </ScrollScene>
  );
}
