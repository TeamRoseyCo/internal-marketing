"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Search,
  FileText,
  Link2,
  MapPin,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "We analyze your current SEO performance, identify opportunities, and understand your competitive landscape.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy Development",
    description:
      "Based on data, we create a customized SEO roadmap targeting keywords that drive qualified traffic.",
    icon: FileText,
  },
  {
    number: "03",
    title: "On-Page Optimization",
    description:
      "We optimize your website structure, content, and technical elements for maximum search visibility.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Link Building",
    description:
      "We build high-quality backlinks from authoritative sources to boost your domain authority.",
    icon: Link2,
  },
  {
    number: "05",
    title: "Monitor & Scale",
    description:
      "Continuous tracking, reporting, and optimization to compound your organic growth over time.",
    icon: TrendingUp,
  },
];

const features = [
  {
    title: "Technical SEO",
    description: "Site speed, mobile optimization, crawlability, and indexing improvements.",
  },
  {
    title: "On-Page SEO",
    description: "Title tags, meta descriptions, headers, and content optimization.",
  },
  {
    title: "Off-Page SEO",
    description: "Link building, brand mentions, and authority building.",
  },
  {
    title: "Local SEO",
    description: "Google Business Profile, local citations, and geo-targeted content.",
  },
  {
    title: "Content Strategy",
    description: "Keyword research, content planning, and blog optimization.",
  },
  {
    title: "Analytics & Reporting",
    description: "Monthly reports with rankings, traffic, and conversion data.",
  },
];

const stats = [
  { value: "300%", label: "Avg. Traffic Increase" },
  { value: "Top 3", label: "Keyword Rankings" },
  { value: "40%", label: "Lower Acquisition Cost" },
  { value: "12mo", label: "Long-Term Results" },
];

export default function SEOServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <FadeIn delay={0.1}>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                  SEO Services
                </span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Get Found by Customers{" "}
                  <span className="gradient-accent-text">Searching for You</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Dominate search results with data-driven SEO strategies. We help
                  businesses rank higher, drive qualified traffic, and convert
                  visitors into customers.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-hero group">
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Your Free SEO Audit
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/results">See SEO Results</Link>
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

      {/* What We Do Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Complete SEO <span className="gradient-accent-text">Solutions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to rank higher and drive organic traffic that
              converts.
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
                  <div className="w-10 h-10 mb-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-brand-cyan" />
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
              Our SEO <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers consistent, measurable results.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-magenta hidden md:block" />

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
                            <span className="text-sm font-mono text-brand-cyan">
                              {step.number}
                            </span>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Icon */}
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-brand-cyan/30 items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-brand-cyan" />
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

      {/* Local SEO Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="tech-card p-8 md:p-10">
                <div className="w-14 h-14 mb-6 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-brand-purple" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Local SEO Expertise
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Dominate local search results and get found by customers in your
                  area. We optimize your Google Business Profile, build local
                  citations, and create geo-targeted content.
                </p>
                <ul className="space-y-3">
                  {[
                    "Google Business Profile Optimization",
                    "Local Citation Building",
                    "Review Management Strategy",
                    "Location-Based Content",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0" />
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
                      "linear-gradient(135deg, hsl(var(--brand-purple) / 0.2), hsl(var(--brand-cyan) / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center"
                      >
                        <MapPin className="w-12 h-12 text-brand-purple" />
                      </motion.div>
                      <p className="text-4xl font-bold gradient-text mb-2">
                        3-Pack
                      </p>
                      <p className="text-muted-foreground">
                        Google Maps Rankings
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
              Ready to Rank Higher?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free SEO audit and discover exactly what&apos;s holding your
              website back from page one rankings.
            </p>
            <Button asChild size="lg" className="btn-hero group">
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free SEO Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
