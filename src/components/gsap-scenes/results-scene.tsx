"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    value: "21x",
    label: "Average ROAS",
    description: "Return on ad spend",
    gradient: "from-[hsl(180,100%,50%)] to-[hsl(180,100%,40%)]",
  },
  {
    value: "100+",
    label: "Leads in 48hrs",
    description: "For new campaigns",
    gradient: "from-[hsl(276,100%,60%)] to-[hsl(276,100%,45%)]",
  },
  {
    value: "300%",
    label: "Revenue Growth",
    description: "Average increase",
    gradient: "from-[hsl(320,100%,55%)] to-[hsl(320,100%,40%)]",
  },
  {
    value: "50+",
    label: "Happy Clients",
    description: "And counting",
    gradient: "from-[hsl(180,100%,50%)] to-[hsl(180,100%,40%)]",
  },
];

const testimonials = [
  {
    quote:
      "Flowryse transformed our online presence. We went from struggling to get leads to having more enquiries than we can handle.",
    author: "Sarah M.",
    role: "Business Owner",
  },
  {
    quote:
      "The ROI has been incredible. Every dollar we spend comes back multiplied. Best marketing investment we've made.",
    author: "James T.",
    role: "CEO",
  },
];

export function ResultsScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance - starts earlier
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Stats animation - faster entrance
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });

      // Stagger stats entrance
      statRefs.current.forEach((stat, index) => {
        if (!stat) return;
        statsTl.from(
          stat,
          {
            opacity: 0,
            scale: 0.85,
            y: 40,
            duration: 0.2,
            ease: "none",
          },
          index * 0.08
        );
      });

      // Testimonials slide in from sides
      testimonialRefs.current.forEach((testimonial, index) => {
        if (!testimonial) return;
        gsap.from(testimonial, {
          opacity: 0,
          x: index === 0 ? -80 : 80,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonial,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[hsl(0,0%,3%)] py-16 lg:py-20"
    >
      {/* Background elements - connecting gradient from previous section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] blur-[120px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(180 100% 50%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[400px] h-[400px] blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(276 100% 50%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] blur-[120px] opacity-18"
          style={{
            background:
              "radial-gradient(circle, hsl(320 100% 50%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Real </span>
            <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto">
            Numbers don't lie. Here's what our clients experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 lg:mb-16 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                statRefs.current[index] = el;
              }}
              className="glass-card p-4 sm:p-6 text-center"
            >
              <p
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
              <p className="text-white font-medium mb-1 text-sm sm:text-base">{stat.label}</p>
              <p className="text-xs sm:text-sm text-white/40">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              ref={(el) => {
                testimonialRefs.current[index] = el;
              }}
              className="glass-card p-5 sm:p-6 lg:p-8"
            >
              <blockquote className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-5 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(276,100%,50%)] to-[hsl(320,100%,50%)]" />
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-white/40">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
