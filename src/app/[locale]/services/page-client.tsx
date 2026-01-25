"use client";

// src/app/[locale]/services/page-client.tsx
// Client component for services overview page with animations

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Target, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import { getServicesPageTranslations } from "@/lib/page-translations";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface ServicesPageClientProps {
  locale: string;
}

export default function ServicesPageClient({ locale }: ServicesPageClientProps) {
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : 'us';
  const t = getServicesPageTranslations(validLocale);

  const services = [
    {
      icon: TrendingUp,
      title: t.services.seo.title,
      description: t.services.seo.description,
      features: t.services.seo.features,
      href: `/${validLocale}/services/seo`,
      stat: { value: 300, suffix: "%", label: t.services.seo.stat.label },
      cardClass: "service-card service-card-green",
      iconColor: "hsl(130 65% 45%)",
      iconBg: "hsl(130 65% 45% / 0.15)",
    },
    {
      icon: Users,
      title: t.services.socialMedia.title,
      description: t.services.socialMedia.description,
      features: t.services.socialMedia.features,
      href: `/${validLocale}/services/social-media`,
      stat: { value: 5, suffix: "x", label: t.services.socialMedia.stat.label },
      cardClass: "service-card service-card-rose",
      iconColor: "hsl(0 75% 50%)",
      iconBg: "hsl(0 75% 50% / 0.15)",
    },
    {
      icon: Target,
      title: t.services.paidAds.title,
      description: t.services.paidAds.description,
      features: t.services.paidAds.features,
      href: `/${validLocale}/services/paid-ads`,
      stat: { value: 21, suffix: "x", label: t.services.paidAds.stat.label },
      cardClass: "service-card service-card-green",
      iconColor: "hsl(130 65% 45%)",
      iconBg: "hsl(130 65% 45% / 0.15)",
    },
    {
      icon: Zap,
      title: t.services.webDesign.title,
      description: t.services.webDesign.description,
      features: t.services.webDesign.features,
      href: `/${validLocale}/services/website-design`,
      stat: { value: 2.5, suffix: "x", label: t.services.webDesign.stat.label, isDecimal: true },
      cardClass: "service-card service-card-rose",
      iconColor: "hsl(0 75% 50%)",
      iconBg: "hsl(0 75% 50% / 0.15)",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
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
              <span className="gradient-accent-text">{t.hero.titleHighlight}</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            className="space-y-12"
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
                  <div className={service.cardClass}>
                    <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-10 lg:p-12 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}>
                      {/* Content */}
                      <div className={isReversed ? "lg:col-start-2" : ""}>
                        <div
                          className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: service.iconBg, border: `1px solid ${service.iconColor}30` }}
                        >
                          <Icon className="w-8 h-8" style={{ color: service.iconColor }} />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                        <ul className="grid grid-cols-2 gap-3 mb-8">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: service.iconColor }} />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button asChild size="lg" className="btn-hero">
                          <Link href={service.href} className="flex items-center gap-2">
                            {t.common.learnMore}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>

                      {/* Stat Card */}
                      <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                        <div
                          className="aspect-square max-w-sm mx-auto rounded-3xl p-1"
                          style={{ background: `linear-gradient(135deg, ${service.iconColor}30, ${service.iconColor}10)` }}
                        >
                          <div className="w-full h-full rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/30">
                            <div className="text-center p-8">
                              <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">
                                {service.stat.isDecimal ? (
                                  <>{service.stat.value}{service.stat.suffix}</>
                                ) : (
                                  <AnimatedCounter value={service.stat.value} suffix={service.stat.suffix} duration={2} />
                                )}
                              </p>
                              <p className="text-lg text-muted-foreground">{service.stat.label}</p>
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
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, hsl(0 75% 50% / 0.15), transparent 70%)" }}
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
                {t.cta.badge}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              {t.cta.title}{" "}
              <span className="gradient-text">{t.cta.titleHighlight}</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>

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
