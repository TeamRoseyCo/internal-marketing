"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Smartphone,
  Search,
  BarChart3,
  Palette,
  Code2,
  Gauge,
  Shield,
  CheckCircle,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We learn about your business, goals, and target audience to create a conversion-focused strategy.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design & Wireframes",
    description:
      "We create stunning designs that reflect your brand and guide visitors toward conversion.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build your website with clean code, fast performance, and SEO-ready structure.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Testing & Optimization",
    description:
      "Rigorous testing across devices and browsers ensures a flawless user experience.",
    icon: Gauge,
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "We launch your site and provide ongoing support to keep it performing at its best.",
    icon: Zap,
  },
];

const features = [
  {
    title: "Conversion-Focused",
    description: "Every element designed to turn visitors into leads and customers.",
  },
  {
    title: "Mobile-First",
    description: "Responsive design that looks perfect on every device.",
  },
  {
    title: "Lightning Fast",
    description: "Optimized for speed — because slow sites lose customers.",
  },
  {
    title: "SEO-Ready",
    description: "Built with search engines in mind from day one.",
  },
  {
    title: "Analytics Integrated",
    description: "Know exactly how visitors interact with your site.",
  },
  {
    title: "Easy to Update",
    description: "Simple content management so you stay in control.",
  },
];

const techStack = [
  { name: "Next.js", description: "React Framework", color: "brand-cyan" },
  { name: "Tailwind CSS", description: "Modern Styling", color: "brand-purple" },
  { name: "Vercel", description: "Fast Hosting", color: "brand-magenta" },
];

const stats = [
  { value: "2.5x", label: "Conversion Boost" },
  { value: "<2s", label: "Load Time" },
  { value: "100%", label: "Mobile Optimized" },
  { value: "A+", label: "SEO Score" },
];

export default function WebsiteDesignPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-surface overflow-hidden">
        <div className="container py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <FadeIn delay={0.1}>
                <span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                  Website Design
                </span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Websites That{" "}
                  <span className="gradient-accent-text">Convert</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Beautiful, fast, conversion-focused websites that turn visitors
                  into customers. Built with modern technology for peak
                  performance.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="btn-hero group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
                    <Link href="/contact" className="flex items-center gap-2">
                      Get Your Free Website Audit
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-white/20 hover:border-primary/50 bg-transparent hover:bg-white/5 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
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

      {/* Tech Stack Section */}
      <section className="py-16 border-b border-border/50">
        <div className="container">
          <FadeIn className="text-center mb-10">
            <p className="text-muted-foreground">
              Built with modern technology for peak performance
            </p>
          </FadeIn>
          <StaggerChildren
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            staggerDelay={0.1}
          >
            {techStack.map((tech) => (
              <StaggerItem key={tech.name}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="tech-card p-6 text-center"
                >
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: `hsl(var(--${tech.color}))` }}
                  >
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
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
              Websites Built for{" "}
              <span className="gradient-accent-text">Results</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              More than just pretty designs — we build websites that drive
              measurable business growth.
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
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <FadeIn className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Our Design <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven process that delivers websites on time and on budget.
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

      {/* Mobile First Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="tech-card p-8 md:p-10">
                <div className="w-14 h-14 mb-6 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-brand-purple" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Mobile-First Design
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Over 60% of web traffic comes from mobile devices. We design for
                  mobile first, ensuring your site looks and performs beautifully
                  on every screen size.
                </p>
                <ul className="space-y-3">
                  {[
                    "Responsive on All Devices",
                    "Touch-Optimized Interactions",
                    "Fast Mobile Load Times",
                    "Mobile-First SEO",
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
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-40 mx-auto mb-6 rounded-xl bg-brand-purple/10 border-2 border-brand-purple/30 flex items-center justify-center"
                      >
                        <Smartphone className="w-12 h-12 text-brand-purple" />
                      </motion.div>
                      <p className="text-4xl font-bold gradient-text mb-2">60%+</p>
                      <p className="text-muted-foreground">Mobile Traffic</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <div className="relative">
                <div
                  className="aspect-square rounded-2xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand-magenta) / 0.2), hsl(var(--brand-cyan) / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-brand-magenta/30 border-t-brand-magenta flex items-center justify-center"
                      >
                        <Gauge className="w-10 h-10 text-brand-magenta" />
                      </motion.div>
                      <p className="text-4xl font-bold gradient-text mb-2">
                        {"<"}2s
                      </p>
                      <p className="text-muted-foreground">Load Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="order-1 lg:order-2">
              <div className="tech-card p-8 md:p-10">
                <div className="w-14 h-14 mb-6 rounded-xl bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center">
                  <Gauge className="w-7 h-7 text-brand-magenta" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Lightning Fast Performance
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every second counts. Slow sites lose visitors and rankings. We
                  optimize every aspect of your site for blazing-fast load times.
                </p>
                <ul className="space-y-3">
                  {[
                    "Image Optimization",
                    "Code Minification",
                    "CDN Delivery",
                    "Core Web Vitals",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-brand-magenta flex-shrink-0" />
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
              background: "radial-gradient(circle, hsl(180 70% 45% / 0.15), transparent 70%)",
            }}
          />
        </div>
        <div className="container relative z-10">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready for a Website That Works?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get a free website audit and discover how a high-converting site can
              transform your business.
            </p>
            <Button asChild size="lg" className="btn-hero group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free Website Audit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
