"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidLocale, LocaleCode } from "@/lib/locales";
import type { CaseStudy } from "@/lib/dashboard-supabase";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

interface Props {
  params: { locale: string; slug: string };
}

export default function CaseStudyDetailClient({ params }: Props) {
  const { locale, slug } = params;
  const validLocale: LocaleCode = isValidLocale(locale) ? locale : "us";
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/case-studies?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCaseStudy(data[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-32 text-center">
        <div className="inline-block w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground mt-4">Loading case study...</p>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
        <p className="text-muted-foreground mb-8">This case study doesn&apos;t exist or hasn&apos;t been published yet.</p>
        <Button asChild>
          <Link href={`/${validLocale}/case-studies`}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Studies
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href={`/${validLocale}/case-studies`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Case Studies
              </Link>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {caseStudy.client_name}
            </motion.h1>

            {caseStudy.industry_context && (
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {caseStudy.industry_context}
              </motion.p>
            )}

            {/* Services Tags */}
            {caseStudy.services && caseStudy.services.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {caseStudy.services.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {s}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Challenge & Approach */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Challenge */}
            {caseStudy.challenge && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <h2 className="text-2xl md:text-3xl font-bold">The Challenge</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </motion.div>
            )}

            {/* Approach */}
            {caseStudy.approach && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <h2 className="text-2xl md:text-3xl font-bold">Our Approach</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {caseStudy.approach}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      {caseStudy.highlights && caseStudy.highlights.length > 0 && (
        <section className="py-20 md:py-28 border-y border-border/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.7 }}
              >
                Key <span className="gradient-accent-text">Results</span>
              </motion.h2>

              <motion.div
                className="grid sm:grid-cols-2 gap-4 md:gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
              >
                {caseStudy.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/60 border border-border/30"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-base text-muted-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.7 }}
              >
                <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
                <blockquote className="text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
                  &ldquo;{caseStudy.testimonial}&rdquo;
                </blockquote>
                {caseStudy.testimonial_by && (
                  <p className="text-lg text-muted-foreground font-medium">
                    — {caseStudy.testimonial_by}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

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
              Want Results Like{" "}
              <span className="gradient-text">These?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book a free strategy call and let&apos;s discuss how we can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 h-auto">
                <Link href={`/${validLocale}/contact`} className="flex items-center gap-2 sm:gap-3">
                  Get Your Free Strategy Call
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto border-2 border-white/20 hover:border-primary/50 bg-transparent hover:bg-white/5 transition-all duration-300">
                <Link href={`/${validLocale}/case-studies`} className="flex items-center gap-2">
                  More Case Studies
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
