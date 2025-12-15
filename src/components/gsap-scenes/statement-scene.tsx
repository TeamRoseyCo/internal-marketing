"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StatementScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLSpanElement>(null);
  const ryseRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main timeline that plays while the section is pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800", // Pin for 1800px of scroll
          pin: true,
          scrub: 1.2, // Smooth scrub
          anticipatePin: 1,
        },
      });

      // Phase 1 (0-15%): Fade in the sentence and words
      tl.from(
        [topLineRef.current, bottomLineRef.current],
        {
          opacity: 0,
          y: 40,
          duration: 0.15,
          ease: "none",
          stagger: 0.05,
        },
        0
      )
        .from(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.1,
            ease: "none",
          },
          0.1
        )

        // Phase 2 (15-35%): Hold visible, sentence text fades
        .to(
          [".sentence-text"],
          {
            opacity: 0,
            duration: 0.15,
            ease: "none",
          },
          0.2
        )

        // Phase 3 (35-60%): FLOW and RYSE move to center to form "FLOWRYSE"
        // FLOW moves right, RYSE moves left
        .to(
          flowRef.current,
          {
            x: "50%",
            duration: 0.25,
            ease: "none",
          },
          0.35
        )
        .to(
          ryseRef.current,
          {
            x: "-50%",
            duration: 0.25,
            ease: "none",
          },
          0.35
        )
        // Logo moves up and grows slightly
        .to(
          logoRef.current,
          {
            y: -80,
            scale: 1.2,
            duration: 0.25,
            ease: "none",
          },
          0.35
        )

        // Glow intensifies as words merge
        .to(
          glowRef.current,
          {
            opacity: 1,
            scale: 1.3,
            duration: 0.2,
            ease: "none",
          },
          0.5
        )

        // Phase 4 (60-100%): Combined text + logo zooms toward user
        .to(
          containerRef.current,
          {
            scale: 5,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          0.6
        )
        .to(
          glowRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: "none",
          },
          0.85
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[hsl(0,0%,3%)]"
    >
      {/* Dynamic background glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] blur-[150px]"
          style={{
            background:
              "radial-gradient(ellipse, hsl(276 100% 50% / 0.5) 0%, hsl(180 100% 50% / 0.3) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Main content centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div
          ref={containerRef}
          className="flex flex-col items-center justify-center"
        >
          {/* Logo above text */}
          <div ref={logoRef} className="mb-8">
            <Image
              src="/logo.png"
              alt="Flowryse"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>

          {/* Top line: "Your growth will" + FLOW */}
          <div
            ref={topLineRef}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6"
          >
            <span className="sentence-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/70 tracking-wide">
              Your growth will
            </span>
            <span
              ref={flowRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight bg-gradient-to-r from-[hsl(180,100%,60%)] via-[hsl(220,100%,60%)] to-[hsl(276,100%,60%)] bg-clip-text text-transparent"
            >
              FLOW
            </span>
          </div>

          {/* Bottom line: "And profits will" + RYSE */}
          <div
            ref={bottomLineRef}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-2 sm:mt-4"
          >
            <span className="sentence-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/70 tracking-wide">
              And profits will
            </span>
            <span
              ref={ryseRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight bg-gradient-to-r from-[hsl(276,100%,60%)] via-[hsl(320,100%,55%)] to-[hsl(350,100%,60%)] bg-clip-text text-transparent"
            >
              RYSE
            </span>
          </div>
        </div>
      </div>

      {/* Subtle particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/15"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
