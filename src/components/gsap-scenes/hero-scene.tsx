"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const vslRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance animations (not scroll-linked, plays on load)
      const entranceTl = gsap.timeline({ delay: 0.3 });

      entranceTl
        .from(badgeRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          subheadRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          vslRef.current,
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        );

      // Scroll-triggered exit animation - faster transition
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400", // Shorter scroll distance for exit
          scrub: 0.8,
        },
      })
        .to(contentRef.current, {
          opacity: 0,
          scale: 0.95,
          y: -30,
          ease: "none",
        })
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
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
      className="relative min-h-screen w-full overflow-hidden bg-[hsl(0,0%,3%)]"
    >
      {/* Background gradient orbs - more visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-10 -right-10 w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, hsl(276 100% 50% / 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, hsl(180 100% 50% / 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-10 right-1/3 w-[400px] h-[400px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, hsl(320 100% 50% / 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main content - tighter vertical spacing */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 py-12 lg:py-16"
      >
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left max-w-xl">
          {/* Badge */}
          <span
            ref={badgeRef}
            className="inline-block px-5 py-2 mb-5 text-sm font-medium rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80"
          >
            Global Marketing Agency
          </span>

          {/* Headline - larger on desktop */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-5 leading-[1.05]"
          >
            <span className="text-white">More Growth.</span>
            <br />
            <span className="text-white">More Clients.</span>
            <br />
            <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
              Guaranteed.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="text-base sm:text-lg lg:text-xl text-white/60 mb-6 leading-relaxed"
          >
            Stop waiting for customers to find you. We put your business in front
            of people actively searching for your services.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="rounded-full px-7 py-5 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Get Your Free Strategy Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-7 py-5 text-base font-semibold border-white/20 text-white hover:bg-white/10"
            >
              <Link href="/results">See Our Results</Link>
            </Button>
          </div>

          {/* Trust text */}
          <p className="mt-5 text-sm text-white/40">
            Join 50+ businesses scaling profitably with targeted marketing.
          </p>
        </div>

        {/* Right: VSL Placeholder - more compact */}
        <div ref={vslRef} className="flex-1 w-full max-w-xl lg:max-w-md xl:max-w-lg">
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
              {/* VSL Placeholder - will be replaced with actual video */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[hsl(276,100%,50%/0.1)] via-transparent to-[hsl(180,100%,50%/0.1)]">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1.5" />
                  </div>
                  <p className="text-white/40 text-sm">VSL Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-3 -left-3 md:-left-6 glass-card p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">21x</p>
                  <p className="text-xs text-white/50">Avg. ROAS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
}
