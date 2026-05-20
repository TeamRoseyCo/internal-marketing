"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import type { CaseStudy } from "@/lib/dashboard-supabase";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

interface Props {
  params: { locale: string };
}

export default function CaseStudiesPageClient({ params }: Props) {
  const { locale } = params;
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : "us";
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/case-studies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCaseStudies(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Extract unique service tags for filtering
  const allServices = Array.from(
    new Set(caseStudies.flatMap((cs) => cs.services || []))
  ).sort();

  const filtered = filter === "all"
    ? caseStudies
    : caseStudies.filter((cs) => cs.services?.includes(filter));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Work
            </motion.span>
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Client{" "}
              <span className="gradient-accent-text">Case Studies</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Real results from real businesses. Explore how we&apos;ve helped
              clients grow with custom websites, SEO, ads, and automation.
            </motion.p>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-7 h-7 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-y border-border/30">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm rounded-full border transition-all ${
                filter === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              All ({caseStudies.length})
            </button>
            {allServices.slice(0, 8).map((service) => (
              <button
                key={service}
                onClick={() => setFilter(service)}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  filter === service
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground mt-4">Loading case studies...</p>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((cs) => (
                <motion.div key={cs.client_slug} variants={staggerItem} transition={{ duration: 0.5 }}>
                  <Link href={`/${validLocale}/case-studies/${cs.client_slug}`}>
                    <div className="rounded-2xl p-px bg-gradient-to-br from-border/50 via-border/20 to-border/50 group hover:from-primary/20 hover:via-border/30 hover:to-primary/20 transition-all duration-500 h-full">
                      <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Client Name & Industry */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {cs.client_name}
                          </h3>
                          {cs.industry_context && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {cs.industry_context}
                            </p>
                          )}
                        </div>

                        {/* Challenge Preview */}
                        {cs.challenge && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                            {cs.challenge}
                          </p>
                        )}

                        {/* Highlights */}
                        {cs.highlights && cs.highlights.length > 0 && (
                          <div className="mb-4">
                            {cs.highlights.slice(0, 2).map((h, i) => (
                              <div key={i} className="flex items-start gap-2 mb-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                <span className="text-sm text-muted-foreground line-clamp-1">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Services Tags */}
                        {cs.services && cs.services.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                            {cs.services.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                              >
                                {s}
                              </span>
                            ))}
                            {cs.services.length > 3 && (
                              <span className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                                +{cs.services.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Arrow */}
                        <div className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          View case study <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No case studies found for this filter.</p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 text-primary hover:underline"
              >
                Show all case studies
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              Ready to Be Our{" "}
              <span className="gradient-text">Next Success Story?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book a free strategy call and let&apos;s discuss how we can achieve
              similar results for your business.
            </p>
            <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
              <Link href={`/${validLocale}/contact`} className="flex items-center gap-2 sm:gap-3">
                Get Your Free Strategy Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
