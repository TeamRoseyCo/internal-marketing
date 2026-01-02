"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Users, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { HeroVideoPlayer } from "@/components/video/hero-video-player";

// Animated counter component
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

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

// Services data with brand accent colors (red/green palette)
const services = [
  {
    icon: TrendingUp,
    title: "SEO Services",
    description:
      "Dominate search results and get found by customers actively looking for your services.",
    href: "/services/seo",
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 45%)",
    iconBg: "hsl(130 65% 45% / 0.15)",
  },
  {
    icon: Users,
    title: "Social Media Management",
    description:
      "Build your brand presence and engage your audience across all major platforms.",
    href: "/services/social-media",
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 50%)",
    iconBg: "hsl(0 75% 50% / 0.15)",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description:
      "ROI-focused Google Ads and Meta Ads campaigns that convert clicks into customers.",
    href: "/services/paid-ads",
    cardClass: "service-card service-card-green",
    iconColor: "hsl(130 65% 45%)",
    iconBg: "hsl(130 65% 45% / 0.15)",
  },
  {
    icon: Zap,
    title: "Website Design",
    description:
      "High-converting websites designed to turn visitors into leads and customers.",
    href: "/services/website-design",
    cardClass: "service-card service-card-rose",
    iconColor: "hsl(0 75% 50%)",
    iconBg: "hsl(0 75% 50% / 0.15)",
  },
];

// Stats data with numeric values for animation
const stats = [
  { value: 21, suffix: "x", label: "Average ROAS" },
  { value: 100, suffix: "+", label: "Leads in 48hrs" },
  { value: 300, suffix: "%", label: "Revenue Growth" },
  { value: 50, suffix: "+", label: "Happy Clients" },
];

// FAQ data
const faqs = [
  {
    question: "How quickly can I see results?",
    answer:
      "Most clients start seeing qualified leads within the first 2-4 weeks. We focus on quick wins while building long-term sustainable growth strategies.",
  },
  {
    question: "Do you work with businesses worldwide?",
    answer:
      "Absolutely! We work with clients globally. Our strategies work anywhere Google and Meta operate, and we adapt our approach to your specific market.",
  },
  {
    question: "What makes Rosey Co. different from other agencies?",
    answer:
      "We're results-obsessed. Every campaign is tracked dollar-for-dollar, and we focus on ROI, not vanity metrics. If we don't deliver leads, we pause fees until we do.",
  },
  {
    question: "What platforms do you advertise on?",
    answer:
      "We specialize in Google Ads, Meta (Facebook & Instagram) Ads, and organic SEO. These platforms consistently deliver the best ROI for businesses.",
  },
  {
    question: "How do I know if my ads are working?",
    answer:
      "Full transparency with tracking dashboards showing exactly where leads come from, cost per lead, conversion rates, and ROI. No vanity metrics - just real revenue data.",
  },
];

// Why us points
const whyUsPoints = [
  "ROI-focused campaigns tracked dollar-for-dollar",
  "Transparent reporting with real-time dashboards",
  "No long-term contracts - month-to-month flexibility",
  "Dedicated account manager for your business",
  "Results guarantee - we pause fees if we don't deliver",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - VSL Focused */}
      <section className="relative overflow-hidden">
        {/* Floating particles */}
        <FloatingParticles variant="luxury" count={40} />

        <div className="container py-16 md:py-24 lg:py-32 relative z-10">
          {/* Centered headline - BOLD */}
          <div className="text-center max-w-5xl mx-auto mb-16 md:mb-20">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Global Marketing Agency
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              More Growth. More Clients.{" "}
              <span className="gradient-accent-text">Guaranteed.</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Stop waiting for customers to find you. We put your business in front
              of people actively searching for your services.
            </motion.p>
          </div>

{/* VSL Video - Hidden for now
          <motion.div
            className="relative max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroVideoPlayer />
          </motion.div>
          */}

          {/* CTA Buttons - Centered */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto">
              <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                Get Your Free Strategy Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
              <Link href="/results" className="flex items-center gap-2">
                See Our Results
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </Button>
          </motion.div>

          <motion.p
            className="text-center text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Join 50+ businesses scaling profitably with targeted marketing.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-7 h-7 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
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

      {/* Services Section */}
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
              How We Help Your Business{" "}
              <span className="gradient-accent-text">Grow</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              From SEO to paid ads, we deliver data-driven strategies that turn
              marketing spend into measurable revenue.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center sm:justify-items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={staggerItem}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-xs sm:max-w-none"
                >
                  <Link href={service.href} className="block group h-full">
                    <div className={`${service.cardClass} p-7 md:p-8 h-full`}>
                      <div
                        className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: service.iconBg,
                          border: `1px solid ${service.iconColor}30`,
                        }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: service.iconColor }}
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
                Your Most Trusted{" "}
                <span className="gradient-text">Marketing Partner</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We don&apos;t just run campaigns. We become an extension of your team,
                obsessed with your growth and committed to your success.
              </p>

              <motion.ul
                className="space-y-5 inline-block text-left"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {whyUsPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4"
                    variants={staggerItem}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span className="text-lg text-foreground/90">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-10 flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-8">
                  <Link href="/contact" className="flex items-center gap-2">
                    Start Growing Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square rounded-3xl p-1 bg-gradient-to-br from-primary/20 via-brand-green/10 to-brand-forest/20">
                <div className="w-full h-full rounded-3xl bg-card/50 backdrop-blur-sm flex items-center justify-center border border-border/30">
                  <div className="text-center p-12">
                    <motion.div
                      className="w-40 h-40 mx-auto mb-8 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-brand-green/20 flex items-center justify-center">
                        <TrendingUp className="w-12 h-12 text-primary" />
                      </div>
                    </motion.div>
                    <p className="text-2xl font-semibold mb-2">Results That Matter</p>
                    <p className="text-muted-foreground">
                      Data-driven growth for your business
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32">
        <div className="container max-w-md mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Common <span className="gradient-accent-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about working with Rosey Co.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Accordion type="single" collapsible className="w-full">
                  {/* Glassmorphism card wrapper */}
                  <div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group hover:from-primary/20 hover:via-border/30 hover:to-primary/20 transition-all duration-500">
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-card/60 backdrop-blur-xl rounded-2xl border-0 overflow-hidden relative"
                    >
                      {/* Subtle top highlight for glass effect */}
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <AccordionTrigger className="text-left text-lg md:text-xl font-semibold hover:no-underline py-6 px-6 md:px-8">
                        <span className="flex items-center gap-4">
                          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 bg-primary/10 text-primary border border-primary/20">
                            {index + 1}
                          </span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base md:text-lg text-muted-foreground pb-6 px-6 md:px-8 pl-[4.25rem] md:pl-[4.75rem] leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                </Accordion>
              </motion.div>
            ))}
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

            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight mb-8">
              Ready to{" "}
              <span className="gradient-text">Grow</span>{" "}
              Your Business?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book a free strategy call and discover how we can help you get more
              leads and scale your business.
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

            <motion.p
              className="mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No commitment required. 100% free consultation.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
