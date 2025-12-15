"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTAScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance with scale and glow - starts earlier for smoother transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      tl.from(cardRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 50,
        duration: 1,
        ease: "none",
      }).from(
        glowRef.current,
        {
          opacity: 0,
          scale: 0.85,
          duration: 1,
          ease: "none",
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] w-full bg-[hsl(0,0%,3%)] py-16 lg:py-20 flex items-center"
    >
      {/* Animated background glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-[140px]"
          style={{
            background:
              "radial-gradient(ellipse, hsl(276 100% 40% / 0.35) 0%, hsl(320 100% 40% / 0.2) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={cardRef} className="max-w-3xl mx-auto">
          <div className="glass-card p-6 sm:p-10 md:p-14 text-center relative overflow-hidden">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(276,100%,50%)] to-transparent opacity-50" />

            {/* Content */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
              <span className="text-white">Ready to </span>
              <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
                Grow
              </span>
              <span className="text-white">?</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
              Book a free strategy call and discover how we can help you get more
              leads, more clients, and scale your business profitably.
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-[hsl(276,100%,50%)] to-[hsl(320,100%,50%)] hover:from-[hsl(276,100%,55%)] hover:to-[hsl(320,100%,55%)] text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] group"
            >
              <Link href="/contact" className="flex items-center gap-3">
                Get Your Free Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="mt-6 text-sm text-white/30">
              No commitment required. Let's talk about your growth.
            </p>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(180,100%,50%)] to-transparent opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
