"use client";

import { FadeIn } from "@/components/animations";

export function BlogHero() {
  return (
    <section className="relative bg-hero-surface overflow-hidden">
      <div className="container py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <span className="inline-block px-5 py-2 mb-8 text-sm font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Our Blog
            </span>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 leading-[1.05]">
              Marketing Insights &{" "}
              <span className="gradient-accent-text">Strategies</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Actionable tips, strategies, and insights to help you grow your
              business through digital marketing.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}
