"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Smartphone,
  Search,
  Palette,
  Code2,
  Gauge,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedArticles, websiteDesignArticles } from "@/components/blog/related-articles";
import { AnimatedCounter } from "@/components/ui/animated-counter";

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
  { name: "Next.js", description: "React Framework", color: "hsl(355 70% 45%)" },
  { name: "Tailwind CSS", description: "Modern Styling", color: "hsl(130 65% 45%)" },
  { name: "Vercel", description: "Fast Hosting", color: "hsl(0 75% 50%)" },
];

const stats = [
  { value: 2.5, suffix: "x", label: "Conversion Boost", isDecimal: true },
  { value: 2, suffix: "s", label: "Load Time", prefix: "<" },
  { value: 100, suffix: "%", label: "Mobile Optimized" },
];

export default function WebsiteDesignPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(355_70%_45%/0.1)] text-[hsl(355_70%_45%)] border border-[hsl(355_70%_45%/0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Website Design
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Websites That{" "}
              <span className="gradient-accent-text">Convert</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Beautiful, fast, conversion-focused websites that turn visitors
              into customers. Built with modern technology for peak
              performance.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                  Get Your Free Website Audit
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href="/results" className="flex items-center gap-2">
                  See Our Work
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
                  {stat.prefix || ""}
                  {stat.isDecimal ? (
                    <>{stat.value}{stat.suffix}</>
                  ) : (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2 + index * 0.3}
                    />
                  )}
                </motion.p>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 md:py-16 border-y border-border/50">
        <div className="container">
          <motion.p
            className="text-center text-muted-foreground mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Built with modern technology for peak performance
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                className="service-card service-card-crimson p-6 text-center"
              >
                <h3
                  className="font-semibold text-lg mb-1"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
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
              Websites Built for{" "}
              <span className="gradient-accent-text">Results</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              More than just pretty designs — we build websites that drive
              measurable business growth.
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
                  className="service-card service-card-crimson p-7 md:p-8 h-full"
                >
                  <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(355_70%_45%/0.15)] border border-[hsl(355_70%_45%/0.3)] flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[hsl(355_70%_45%)]" />
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
              Our Design <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A proven process that delivers websites on time and on budget.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(355_70%_45%)] via-[hsl(130_65%_45%)] to-[hsl(0_75%_50%)] hidden md:block" />

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
                          className={`flex-1 service-card service-card-crimson p-6 md:p-8 ${
                            isLeft ? "md:text-right" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              isLeft ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <span className="text-sm font-mono text-[hsl(355_70%_45%)]">
                              {step.number}
                            </span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Icon */}
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-[hsl(355_70%_45%/0.3)] items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-[hsl(355_70%_45%)]" />
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

      {/* Mobile First Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="service-card service-card-green p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(130_65%_45%/0.15)] border border-[hsl(130_65%_45%/0.3)] flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-[hsl(130_65%_45%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Mobile-First Design
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Over 60% of web traffic comes from mobile devices. We design for
                  mobile first, ensuring your site looks and performs beautifully
                  on every screen size.
                </p>
                <ul className="space-y-4">
                  {[
                    "Responsive on All Devices",
                    "Touch-Optimized Interactions",
                    "Fast Mobile Load Times",
                    "Mobile-First SEO",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(130_65%_45%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(130_65%_45%)]" />
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
                      "linear-gradient(135deg, hsl(276 60% 55% / 0.2), hsl(220 70% 60% / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-44 mx-auto mb-6 rounded-2xl bg-[hsl(130_65%_45%/0.1)] border-2 border-[hsl(130_65%_45%/0.3)] flex items-center justify-center"
                      >
                        <Smartphone className="w-12 h-12 text-[hsl(130_65%_45%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                        <AnimatedCounter value={60} suffix="%+" duration={2} />
                      </p>
                      <p className="text-lg text-muted-foreground">Mobile Traffic</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
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
                      "linear-gradient(135deg, hsl(320 80% 55% / 0.2), hsl(220 70% 60% / 0.1))",
                  }}
                >
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-28 h-28 mx-auto mb-6 rounded-full border-4 border-[hsl(0_75%_50%/0.3)] border-t-[hsl(0_75%_50%)] flex items-center justify-center"
                      >
                        <Gauge className="w-12 h-12 text-[hsl(0_75%_50%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                        {"<"}2s
                      </p>
                      <p className="text-lg text-muted-foreground">Load Time</p>
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
              <div className="service-card service-card-rose p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(0_75%_50%/0.15)] border border-[hsl(0_75%_50%/0.3)] flex items-center justify-center">
                  <Gauge className="w-8 h-8 text-[hsl(0_75%_50%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Lightning Fast Performance
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Every second counts. Slow sites lose visitors and rankings. We
                  optimize every aspect of your site for blazing-fast load times.
                </p>
                <ul className="space-y-4">
                  {[
                    "Image Optimization",
                    "Code Minification",
                    "CDN Delivery",
                    "Core Web Vitals",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(0_75%_50%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(0_75%_50%)]" />
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
        title="Web Design & Conversion Insights"
        subtitle="Build websites that convert with our latest strategies"
        articles={websiteDesignArticles}
        viewAllHref="/blog"
        viewAllText="View All Articles"
      />

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(220 70% 60% / 0.15), transparent 70%)",
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
                Get Started
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              Ready for a Website{" "}
              <span className="gradient-text">That Works?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Get a free website audit and discover how a high-converting site can
              transform your business.
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
                  Get Your Free Website Audit
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
