"use client";

// src/app/[locale]/services/seo/page.tsx
// Locale-specific SEO service page

import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Search, FileText, Link2, MapPin, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import { getSEOPageTranslations } from "@/lib/page-translations";
import { ServiceStructuredData } from "@/components/seo/structured-data";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const featureIcons = [Search, FileText, Link2, MapPin, BarChart3, TrendingUp];
const processIcons = [Search, FileText, BarChart3, Link2, TrendingUp];

interface LocaleSEOPageProps {
  params: Promise<{ locale: string }>;
}

export default function LocaleSEOPage({ params }: LocaleSEOPageProps) {
  const { locale } = use(params);
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : 'us';
  const t = getSEOPageTranslations(validLocale);

  return (
    <>
      {/* Service Structured Data */}
      <ServiceStructuredData locale={validLocale} service="seo" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-[hsl(130_65%_45%/0.1)] text-[hsl(130_65%_45%)] border border-[hsl(130_65%_45%/0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.hero.badge}
            </motion.span>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {t.hero.title}{" "}
              <span className="gradient-text">{t.hero.titleHighlight}</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href={`/${validLocale}/contact`} className="flex items-center gap-2 sm:gap-3">
                  {t.hero.cta}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href={`/${validLocale}/results`} className="flex items-center gap-2">
                  {t.hero.ctaSecondary}
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
            {[
              { value: 300, suffix: "%", label: t.stats.trafficIncrease },
              { value: 60, suffix: "%", label: t.stats.lowerCost },
              { value: 12, suffix: "+", label: t.stats.longTerm, prefix: "" },
            ].map((stat, index) => (
              <motion.div key={index} className="text-center" variants={staggerItem} transition={{ duration: 0.6 }}>
                <motion.p
                  className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
                </motion.p>
                <p className="text-base md:text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              {t.features.title}{" "}
              <span className="gradient-accent-text">{t.features.titleHighlight}</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {t.features.items.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div key={feature.title} variants={staggerItem} transition={{ duration: 0.5 }}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="service-card service-card-green p-7 md:p-8 h-full"
                  >
                    <div className="w-12 h-12 mb-5 rounded-xl bg-[hsl(130_65%_45%/0.15)] border border-[hsl(130_65%_45%/0.3)] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[hsl(130_65%_45%)]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
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
              {t.process.title} <span className="gradient-text">{t.process.titleHighlight}</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {t.process.subtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(130_65%_45%)] via-[hsl(320_80%_55%)] to-[hsl(180_70%_50%)] hidden md:block" />
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {t.process.steps.map((step, index) => {
                  const Icon = processIcons[index % processIcons.length];
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div key={index} variants={staggerItem} transition={{ duration: 0.5 }}>
                      <div className={`flex items-start gap-6 md:gap-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`flex-1 service-card service-card-green p-6 md:p-8 ${isLeft ? "md:text-right" : ""}`}
                        >
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <span className="text-sm font-mono text-[hsl(130_65%_45%)]">{String(index + 1).padStart(2, '0')}</span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
                        </motion.div>
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-background border-2 border-[hsl(130_65%_45%/0.3)] items-center justify-center flex-shrink-0 z-10">
                          <Icon className="w-6 h-6 text-[hsl(130_65%_45%)]" />
                        </div>
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

      {/* Local SEO Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="service-card service-card-magenta p-8 md:p-10">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-[hsl(320_80%_55%/0.15)] border border-[hsl(320_80%_55%/0.3)] flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-[hsl(320_80%_55%)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{t.localSeo.title}</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.localSeo.subtitle}</p>
                <ul className="space-y-4">
                  {t.localSeo.features.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base">
                      <span className="w-6 h-6 rounded-full bg-[hsl(320_80%_55%/0.15)] flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[hsl(320_80%_55%)]" />
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
                  style={{ background: "linear-gradient(135deg, hsl(320 80% 55% / 0.2), hsl(130 65% 45% / 0.1))" }}
                >
                  <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-28 h-28 mx-auto mb-6 rounded-full bg-[hsl(320_80%_55%/0.1)] border border-[hsl(320_80%_55%/0.3)] flex items-center justify-center"
                      >
                        <MapPin className="w-14 h-14 text-[hsl(320_80%_55%)]" />
                      </motion.div>
                      <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">{t.localSeo.stat}</p>
                      <p className="text-lg text-muted-foreground">{t.localSeo.statLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, hsl(130 65% 45% / 0.15), transparent 70%)" }} />
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
            <motion.div className="inline-block mb-8" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="px-5 py-2 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                {t.cta.badge}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              {t.cta.title} <span className="gradient-text">{t.cta.titleHighlight}</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">{t.cta.subtitle}</p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href={`/${validLocale}/contact`} className="flex items-center gap-2 sm:gap-3">
                  {t.cta.button}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto btn-ghost-glass overflow-hidden rounded-xl">
                <Link href={`/${validLocale}/results`} className="flex items-center gap-2">
                  {t.cta.buttonSecondary}
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
