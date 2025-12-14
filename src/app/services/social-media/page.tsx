"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Camera,
  BarChart3,
  Calendar,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const processSteps = [
  {
    number: "01",
    title: "Brand Audit",
    description:
      "We analyze your current social presence, audience demographics, and competitor strategies.",
    icon: BarChart3,
  },
  {
    number: "02",
    title: "Strategy Creation",
    description:
      "We develop a tailored content strategy aligned with your brand voice and business goals.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "Content Production",
    description:
      "Our creative team produces engaging content that resonates with your target audience.",
    icon: Camera,
  },
  {
    number: "04",
    title: "Community Management",
    description:
      "We engage with your audience, respond to comments, and build genuine relationships.",
    icon: MessageCircle,
  },
  {
    number: "05",
    title: "Analyze & Optimize",
    description:
      "Continuous performance tracking and strategy refinement based on real engagement data.",
    icon: Heart,
  },
];

const features = [
  {
    title: "Content Creation",
    description: "Scroll-stopping graphics, videos, and copy tailored to each platform.",
  },
  {
    title: "Community Management",
    description: "Active engagement with your followers to build brand loyalty.",
  },
  {
    title: "Social Strategy",
    description: "Data-driven content calendars aligned with your business goals.",
  },
  {
    title: "Influencer Outreach",
    description: "Connect with relevant influencers to expand your reach.",
  },
  {
    title: "Paid Social Campaigns",
    description: "Targeted ads that convert followers into customers.",
  },
  {
    title: "Analytics & Reporting",
    description: "Monthly reports with engagement, reach, and growth metrics.",
  },
];

const platforms = [
  { icon: Instagram, name: "Instagram", color: "brand-magenta" },
  { icon: Facebook, name: "Facebook", color: "brand-cyan" },
  { icon: Linkedin, name: "LinkedIn", color: "brand-purple" },
];

const stats = [
  { value: "5x", label: "Engagement Growth" },
  { value: "250%", label: "Follower Increase" },
  { value: "40+", label: "Posts Per Month" },
  { value: "24hr", label: "Response Time" },
];

export default function SocialMediaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <FadeIn delay={0.1}>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                  Social Media Management
                </span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Build a Brand People{" "}
                  <span className="gradient-text">Actually Follow</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Turn your social media into a lead-generating machine. We create
                  content that stops the scroll, builds community, and converts
                  followers into customers.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-hero group">
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Your Social Strategy
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/results">See Our Work</Link>
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
      <section className="py-16 border-b border-border/50">
        <div className="container">
          <FadeIn className="text-center mb-10">
            <p className="text-muted-foreground">
              We manage your presence across all major platforms
            </p>
          </FadeIn>
          <StaggerChildren
            className="flex flex-wrap justify-center gap-8"
            staggerDelay={0.1}
          >
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <StaggerItem key={platform.name}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="flex items-center gap-3 px-6 py-4 tech-card"
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{ color: `hsl(var(--${platform.color}))` }}
                    />
                    <span className="font-semibold">{platform.name}</span>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Full-Service Social{" "}
              <span className="gradient-accent-text">Management</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From content creation to community building, we handle everything so
              you can focus on your business.
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
                  <div className="w-10 h-10 mb-4 rounded-lg bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-brand-purple" />
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
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to building and growing your social presence.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple via-brand-magenta to-brand-cyan hidden md:block" />

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
                            <span className="text-sm font-mono text-brand-purple">
                              {step.number}
                            </span>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Icon */}
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-brand-purple/30 items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-brand-purple" />
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

      {/* Content Preview Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="tech-card p-8 md:p-10">
                <div className="w-14 h-14 mb-6 rounded-xl bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-brand-magenta" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Content That Converts
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We don&apos;t just post content for the sake of posting. Every
                  piece of content we create is designed to engage your audience
                  and drive them toward becoming customers.
                </p>
                <ul className="space-y-3">
                  {[
                    "Scroll-Stopping Graphics",
                    "Engaging Video Content",
                    "Strategic Copywriting",
                    "Story & Reel Creation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-brand-magenta flex-shrink-0" />
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
                      "linear-gradient(135deg, hsl(var(--brand-magenta) / 0.2), hsl(var(--brand-purple) / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center"
                      >
                        <Heart className="w-12 h-12 text-brand-magenta" />
                      </motion.div>
                      <p className="text-4xl font-bold gradient-text mb-2">40+</p>
                      <p className="text-muted-foreground">
                        Custom Posts Monthly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-hero-surface">
        <div className="container">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free social media audit and discover how to turn your
              followers into customers.
            </p>
            <Button asChild size="lg" className="btn-hero group">
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free Social Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
