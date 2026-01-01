"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

// Animation variants (matching homepage)
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Services data with brand accent colors (red/green palette - matching homepage)
// Green cards get red accents (KPI/button), red cards get green accents
const services = [
  {
    icon: TrendingUp,
    title: "SEO Services",
    description:
      "Dominate search results and get found by customers actively searching for your services. Our data-driven SEO strategies deliver sustainable organic growth.",
    features: [
      "Technical SEO Audits",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "Content Strategy",
    ],
    href: "/services/seo",
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 45%)",
    iconBg: "hsl(130 65% 45% / 0.15)",
    accentColor: "hsl(0 75% 50%)", // Red accent for KPI/button
    stats: { value: 300, suffix: "%", label: "Avg. Traffic Increase" },
  },
  {
    icon: Users,
    title: "Social Media Management",
    description:
      "Build your brand presence and engage your audience across all major platforms. We create content that converts followers into customers.",
    features: [
      "Content Creation",
      "Community Management",
      "Influencer Outreach",
      "Analytics & Reporting",
      "Brand Strategy",
    ],
    href: "/services/social-media",
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 50%)",
    iconBg: "hsl(0 75% 50% / 0.15)",
    accentColor: "hsl(130 45% 32%)", // Darker green accent for KPI/button
    stats: { value: 5, suffix: "x", label: "Engagement Growth" },
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description:
      "ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers. Every dollar tracked, every result measured.",
    features: [
      "Google Ads Management",
      "Meta Ads (Facebook & Instagram)",
      "Retargeting Campaigns",
      "A/B Testing",
      "Conversion Tracking",
    ],
    href: "/services/paid-ads",
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 45%)",
    iconBg: "hsl(130 65% 45% / 0.15)",
    accentColor: "hsl(0 75% 50%)", // Red accent for KPI/button
    stats: { value: 21, suffix: "x", label: "Average ROAS" },
  },
  {
    icon: Zap,
    title: "Website Design",
    description:
      "High-converting websites designed to turn visitors into leads and customers. Fast, beautiful, and built for results.",
    features: [
      "Conversion-Focused Design",
      "Mobile-First Development",
      "Speed Optimization",
      "SEO-Ready Structure",
      "Analytics Integration",
    ],
    href: "/services/website-design",
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 50%)",
    iconBg: "hsl(0 75% 50% / 0.15)",
    accentColor: "hsl(130 45% 32%)", // Darker green accent for KPI/button
    stats: { value: 2.5, suffix: "x", label: "Conversion Rate Boost" },
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Marketing That{" "}
              <span className="gradient-accent-text">Delivers Results</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              From SEO to paid ads, we deliver data-driven strategies that turn
              marketing spend into measurable revenue. Choose your path to growth.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-7 h-7 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            className="space-y-12 md:space-y-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const isReversed = index % 2 === 1;

              return (
                <motion.div
                  key={service.title}
                  variants={staggerItem}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`${service.cardClass} overflow-hidden`}>
                    <div
                      className={`grid lg:grid-cols-2 gap-8 p-8 md:p-10 lg:p-12 ${
                        isReversed ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Content */}
                      <div
                        className={`flex flex-col justify-center ${
                          isReversed ? "lg:order-2" : ""
                        }`}
                      >
                        <div
                          className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: service.iconBg,
                            border: `1px solid ${service.iconColor}30`,
                          }}
                        >
                          <Icon
                            className="w-8 h-8"
                            style={{ color: service.iconColor }}
                          />
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
                          {service.title}
                        </h2>

                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 text-base"
                            >
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{
                                  backgroundColor: service.iconBg,
                                }}
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  style={{ color: service.iconColor }}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                              <span className="text-foreground/90">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          asChild
                          className="w-fit group text-base px-6 py-4 h-auto font-medium transition-all duration-300"
                          style={{
                            backgroundColor: service.accentColor,
                            color: "white",
                          }}
                        >
                          <Link
                            href={service.href}
                            className="flex items-center gap-2 hover:opacity-90"
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>

                      {/* Stats Card */}
                      <div
                        className={`flex items-center justify-center ${
                          isReversed ? "lg:order-1" : ""
                        }`}
                      >
                        <div
                          className="relative w-full max-w-sm aspect-square rounded-3xl p-1"
                          style={{
                            background: `linear-gradient(135deg, ${service.iconColor}33, ${service.iconColor}0d)`,
                          }}
                        >
                          <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                            <div className="text-center">
                              <motion.p
                                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
                                style={{ color: service.accentColor }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <AnimatedCounter
                                  value={service.stats.value}
                                  suffix={service.stats.suffix}
                                  duration={2}
                                />
                              </motion.p>
                              <p className="text-lg text-muted-foreground">
                                {service.stats.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(0 75% 50% / 0.15), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(130 65% 45% / 0.15), transparent 70%)",
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-5 py-2 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Let&apos;s Talk
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              Not Sure Which Service Is{" "}
              <span className="gradient-text">Right for You?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book a free strategy call and we&apos;ll help you identify the best
              approach to grow your business.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                  Get Your Free Strategy Call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href="/results" className="flex items-center gap-2">
                  View Case Studies
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
