"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Search,
  Smartphone,
  BarChart3,
  DollarSign,
  Repeat,
  MousePointer2,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const processSteps = [
  {
    number: "01",
    title: "Account Audit",
    description:
      "We analyze your current ad accounts, identify wasted spend, and uncover growth opportunities.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy & Setup",
    description:
      "We build your campaigns from the ground up with proper tracking, targeting, and creative assets.",
    icon: Target,
  },
  {
    number: "03",
    title: "Launch & Test",
    description:
      "We launch your campaigns with multiple ad variations to find what resonates with your audience.",
    icon: MousePointer2,
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description:
      "Continuous optimization based on real data. We scale winners and cut losers.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Report & Refine",
    description:
      "Transparent reporting showing exactly where every dollar goes and what it returns.",
    icon: BarChart3,
  },
];

const features = [
  {
    title: "Google Ads",
    description: "Search, Display, Shopping, and YouTube campaigns that capture intent.",
  },
  {
    title: "Meta Ads",
    description: "Facebook and Instagram ads that reach your ideal customers.",
  },
  {
    title: "Retargeting",
    description: "Bring back visitors who didn't convert the first time.",
  },
  {
    title: "Conversion Tracking",
    description: "Know exactly which ads drive leads and sales.",
  },
  {
    title: "Landing Pages",
    description: "High-converting pages designed to maximize your ad ROI.",
  },
  {
    title: "A/B Testing",
    description: "Continuous testing to improve performance over time.",
  },
];

const platforms = [
  { name: "Google Ads", description: "Search & Display", color: "brand-cyan" },
  { name: "Meta Ads", description: "Facebook & Instagram", color: "brand-purple" },
  { name: "YouTube Ads", description: "Video Marketing", color: "brand-magenta" },
];

const stats = [
  { value: "21x", label: "Average ROAS" },
  { value: "100+", label: "Leads in 48hrs" },
  { value: "-40%", label: "Cost Per Lead" },
  { value: "2M+", label: "Ad Spend Managed" },
];

export default function PaidAdsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <FadeIn delay={0.1}>
                <span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/20">
                  Paid Advertising
                </span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Ads That Pay for{" "}
                  <span className="gradient-accent-text">Themselves</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  ROI-focused Google Ads and Meta Ads campaigns that convert clicks
                  into customers. Every dollar tracked, every result measured.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-hero group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Your Free Ads Audit
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-white/20 hover:border-primary/50 bg-transparent hover:bg-white/5 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
                    <Link href="/results">See ROAS Results</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right: Stats Grid */}
            <div>
              <FadeIn direction="left" delay={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="tech-card p-6 text-center"
                    >
                      <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </section>

      {/* Platforms Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container">
          <FadeIn className="text-center mb-10">
            <p className="text-muted-foreground">
              We manage campaigns across all major advertising platforms
            </p>
          </FadeIn>
          <StaggerChildren
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            staggerDelay={0.1}
          >
            {platforms.map((platform) => (
              <StaggerItem key={platform.name}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="tech-card p-6 text-center"
                >
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: `hsl(var(--${platform.color}))` }}
                  >
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Full-Funnel Ad{" "}
              <span className="gradient-accent-text">Management</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From awareness to conversion, we build ad campaigns that drive
              measurable revenue.
            </p>
          </FadeIn>

          <StaggerChildren
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="tech-card p-6 h-full"
                >
                  <div className="w-10 h-10 mb-4 rounded-lg bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-brand-magenta" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Our Ad <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A data-driven methodology that maximizes your return on ad spend.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-magenta via-brand-purple to-brand-cyan hidden md:block" />

              <StaggerChildren className="space-y-8" staggerDelay={0.15}>
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <StaggerItem key={step.number}>
                      <div
                        className={`flex items-start gap-6 md:gap-12 ${
                          isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Content */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`flex-1 tech-card p-6 ${
                            isLeft ? "md:text-right" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              isLeft ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-sm font-mono text-brand-magenta">
                              {step.number}
                            </span>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Icon */}
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-brand-magenta/30 items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-brand-magenta" />
                        </div>

                        {/* Spacer for alignment */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="tech-card p-8 md:p-10">
                <div className="w-14 h-14 mb-6 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-brand-cyan" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  ROI-First Approach
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We don&apos;t just manage ads — we manage your return on
                  investment. Every campaign is tracked dollar-for-dollar so you
                  know exactly what&apos;s working.
                </p>
                <ul className="space-y-3">
                  {[
                    "Full Conversion Tracking Setup",
                    "Real-Time Performance Dashboards",
                    "Cost Per Lead Optimization",
                    "Revenue Attribution",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="relative">
                <div
                  className="aspect-square rounded-2xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand-cyan) / 0.2), hsl(var(--brand-magenta) / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center"
                      >
                        <TrendingUp className="w-12 h-12 text-brand-cyan" />
                      </motion.div>
                      <p className="text-4xl font-bold gradient-text mb-2">21x</p>
                      <p className="text-muted-foreground">Average ROAS</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Retargeting Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <div className="relative">
                <div
                  className="aspect-square rounded-2xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand-purple) / 0.2), hsl(var(--brand-magenta) / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-dashed border-brand-purple/30 flex items-center justify-center"
                      >
                        <Repeat className="w-12 h-12 text-brand-purple" />
                      </motion.div>
                      <p className="text-4xl font-bold gradient-text mb-2">70%</p>
                      <p className="text-muted-foreground">
                        Higher Conversion Rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="order-1 lg:order-2">
              <div className="tech-card p-8 md:p-10">
                <div className="w-14 h-14 mb-6 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center">
                  <Repeat className="w-7 h-7 text-brand-purple" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Smart Retargeting
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Most visitors don&apos;t convert on the first visit. Our
                  retargeting campaigns bring them back when they&apos;re ready to
                  buy — at a fraction of the cost.
                </p>
                <ul className="space-y-3">
                  {[
                    "Website Visitor Retargeting",
                    "Video Viewer Audiences",
                    "Lookalike Audiences",
                    "Dynamic Product Ads",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(320 80% 55% / 0.15), transparent 70%)",
            }}
          />
        </div>
        <div className="container relative z-10">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to Scale Your Ads?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get a free ads audit and discover how much revenue you&apos;re
              leaving on the table with your current campaigns.
            </p>
            <Button asChild size="lg" className="btn-hero group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free Ads Audit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
