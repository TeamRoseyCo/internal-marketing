"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Search,
  BarChart3,
  DollarSign,
  Repeat,
  MousePointer2,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RelatedArticles, paidAdsArticles } from "@/components/blog/related-articles";

// Animation variants
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
  { name: "Google Ads", description: "Search & Display", color: "hsl(355 70% 45%)" },
  { name: "Meta Ads", description: "Facebook & Instagram", color: "hsl(130 65% 45%)" },
  { name: "YouTube Ads", description: "Video Marketing", color: "hsl(0 75% 50%)" },
];

const stats = [
  { value: 21, suffix: "x", label: "Average ROAS" },
  { value: 100, suffix: "+", label: "Leads in 48hrs" },
  { value: 40, suffix: "%", label: "Lower Cost Per Lead" },
];

export default function PaidAdsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(0_75%_50%/0.1)] text-[hsl(0_75%_50%)] border border-[hsl(0_75%_50%/0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Paid Advertising
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Ads That Pay for{" "}
              <span className="gradient-accent-text">Themselves</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              ROI-focused Google Ads and Meta Ads campaigns that convert clicks
              into customers. Every dollar tracked, every result measured.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                  Get Your Free Ads Audit
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href="/results" className="flex items-center gap-2">
                  See ROAS Results
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={staggerItem}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2 + index * 0.3}
                  />
                </motion.p>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 md:py-16 border-y border-border/50">
        <div className="container">
          <motion.p
            className="text-center text-muted-foreground mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            We manage campaigns across all major advertising platforms
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                className="service-card service-card-rose p-6 text-center"
              >
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {platform.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Full-Funnel Ad{" "}
              <span className="gradient-accent-text">Management</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              From awareness to conversion, we build ad campaigns that drive
              measurable revenue.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="service-card service-card-rose p-7 md:p-8 h-full"
                >
                  <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(0_75%_50%/0.15)] border border-[hsl(0_75%_50%/0.3)] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[hsl(0_75%_50%)]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Our Ad <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A data-driven methodology that maximizes your return on ad spend.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(0_75%_50%)] via-[hsl(276_60%_55%)] to-[hsl(180_70%_50%)] hidden md:block" />

              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <motion.div
                      key={step.number}
                      variants={staggerItem}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`flex items-start gap-6 md:gap-12 ${
                          isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Content */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`flex-1 service-card service-card-rose p-6 md:p-8 ${
                            isLeft ? "md:text-right" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              isLeft ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-sm font-mono text-[hsl(0_75%_50%)]">
                              {step.number}
                            </span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Icon */}
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-[hsl(0_75%_50%/0.3)] items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-[hsl(0_75%_50%)]" />
                        </div>

                        {/* Spacer for alignment */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="service-card service-card-crimson p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(180_70%_50%/0.15)] border border-[hsl(180_70%_50%/0.3)] flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-[hsl(180_70%_50%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  ROI-First Approach
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We don&apos;t just manage ads — we manage your return on
                  investment. Every campaign is tracked dollar-for-dollar so you
                  know exactly what&apos;s working.
                </p>
                <ul className="space-y-4">
                  {[
                    "Full Conversion Tracking Setup",
                    "Real-Time Performance Dashboards",
                    "Cost Per Lead Optimization",
                    "Revenue Attribution",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(180_70%_50%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(180_70%_50%)]" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div
                  className="aspect-square rounded-3xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(180 70% 50% / 0.2), hsl(320 80% 55% / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-28 h-28 mx-auto mb-6 rounded-full bg-[hsl(180_70%_50%/0.1)] border border-[hsl(180_70%_50%/0.3)] flex items-center justify-center"
                      >
                        <TrendingUp className="w-14 h-14 text-[hsl(180_70%_50%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                        <AnimatedCounter value={21} suffix="x" duration={2} />
                      </p>
                      <p className="text-lg text-muted-foreground">Average ROAS</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Retargeting Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div
                  className="aspect-square rounded-3xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(276 60% 55% / 0.2), hsl(320 80% 55% / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-28 h-28 mx-auto mb-6 rounded-full border-2 border-dashed border-[hsl(276_60%_55%/0.3)] flex items-center justify-center"
                      >
                        <Repeat className="w-14 h-14 text-[hsl(276_60%_55%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                        <AnimatedCounter value={70} suffix="%" duration={2} />
                      </p>
                      <p className="text-lg text-muted-foreground">
                        Higher Conversion Rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="service-card service-card-green p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(276_60%_55%/0.15)] border border-[hsl(276_60%_55%/0.3)] flex items-center justify-center">
                  <Repeat className="w-8 h-8 text-[hsl(276_60%_55%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Smart Retargeting
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Most visitors don&apos;t convert on the first visit. Our
                  retargeting campaigns bring them back when they&apos;re ready to
                  buy — at a fraction of the cost.
                </p>
                <ul className="space-y-4">
                  {[
                    "Website Visitor Retargeting",
                    "Video Viewer Audiences",
                    "Lookalike Audiences",
                    "Dynamic Product Ads",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(276_60%_55%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(276_60%_55%)]" />
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <RelatedArticles
        title="Paid Ads Insights"
        subtitle="Maximize your ad spend with our latest strategies"
        articles={paidAdsArticles}
        viewAllHref="/blog?category=paid-ads"
        viewAllText="View All Paid Ads Articles"
      />

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(320 80% 55% / 0.15), transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(276 60% 55% / 0.15), transparent 70%)",
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
                Start Scaling
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              Ready to <span className="gradient-text">Scale Your Ads?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Get a free ads audit and discover how much revenue you&apos;re
              leaving on the table with your current campaigns.
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
                  Get Your Free Ads Audit
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
