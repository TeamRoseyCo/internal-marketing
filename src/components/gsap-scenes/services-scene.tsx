"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Users, Target, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description:
      "Dominate search results and get found by customers actively looking for your services.",
    href: "/services/seo",
    gradient: "from-[hsl(180,100%,50%)] to-[hsl(180,100%,40%)]",
    iconColor: "hsl(180, 100%, 50%)",
  },
  {
    icon: Users,
    title: "Social Media",
    subtitle: "Management & Growth",
    description:
      "Build your brand presence and engage your audience across all major platforms.",
    href: "/services/social-media",
    gradient: "from-[hsl(276,100%,60%)] to-[hsl(276,100%,45%)]",
    iconColor: "hsl(276, 100%, 60%)",
  },
  {
    icon: Target,
    title: "Paid Ads",
    subtitle: "Google & Meta Advertising",
    description:
      "ROI-focused campaigns that convert clicks into customers with measurable results.",
    href: "/services/paid-ads",
    gradient: "from-[hsl(320,100%,55%)] to-[hsl(320,100%,40%)]",
    iconColor: "hsl(320, 100%, 55%)",
  },
  {
    icon: Zap,
    title: "Web Design",
    subtitle: "High-Converting Websites",
    description:
      "Beautiful, fast websites designed to turn visitors into leads and customers.",
    href: "/services/website-design",
    gradient: "from-[hsl(50,100%,50%)] to-[hsl(40,100%,45%)]",
    iconColor: "hsl(50, 100%, 50%)",
  },
];

export function ServicesScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !cardsWrapperRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      // Set initial state - all cards except first start below viewport
      gsap.set(cards.slice(1), { yPercent: 100 });

      // Set z-index so later cards stack on top
      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: i + 1 });
      });

      // Header entrance animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Main stacking cards timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: "top 15%",
          end: `+=${cards.length * 400}`, // 400px scroll per card
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // Animate each card to stack on top
      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already in place

        const prev = cards[i - 1];

        // Push previous card slightly back/down
        tl.to(
          prev,
          {
            scale: 0.95,
            yPercent: -3,
            filter: "brightness(0.7)",
            duration: 0.5,
          },
          ">"
        )
          // Bring this card up on top of the stack
          .to(
            card,
            {
              yPercent: 0,
              duration: 0.5,
            },
            "<"
          );
      });

      // Final card stays visible briefly
      tl.to({}, { duration: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[hsl(0,0%,4%)] py-20"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] blur-[120px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, hsl(276 100% 40%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(180 100% 40%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - stays visible during card animation */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">How We Help You </span>
            <span className="bg-gradient-to-r from-[hsl(180,100%,50%)] via-[hsl(276,100%,60%)] to-[hsl(320,100%,50%)] bg-clip-text text-transparent">
              Grow
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            Data-driven strategies that turn marketing spend into measurable
            revenue.
          </p>
        </div>

        {/* Stacking Cards Wrapper */}
        <div
          ref={cardsWrapperRef}
          className="relative max-w-lg mx-auto h-[420px]"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full"
              >
                <Link href={service.href} className="block h-full group">
                  <div className="h-full glass-card p-6 sm:p-8 transition-all duration-300 group-hover:border-white/20 flex flex-col">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 mb-5 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${service.iconColor} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${service.iconColor} 30%, transparent)`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: service.iconColor }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-4">
                      {service.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors mt-auto">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
