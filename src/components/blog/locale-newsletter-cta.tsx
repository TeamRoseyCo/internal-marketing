"use client";

import { Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { BlogPageTranslations } from "@/lib/page-translations";

interface LocaleNewsletterCTAProps {
  translations: BlogPageTranslations["newsletter"];
}

export function LocaleNewsletterCTA({ translations }: LocaleNewsletterCTAProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(0 75% 50% / 0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(130 65% 45% / 0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            {translations.title}{" "}
            <span className="gradient-text">{translations.titleHighlight}</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {translations.subtitle}
          </p>

          {/* Clean form card with explicit contrast */}
          <div className="rounded-2xl p-6 md:p-8 max-w-lg mx-auto bg-white border border-[#e8e8ed] shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e6e73] pointer-events-none" />
                <input
                  type="email"
                  placeholder={translations.placeholder}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#d2d2d7] bg-white text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30 transition-all"
                />
              </div>
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] shadow-md transition-colors whitespace-nowrap"
              >
                {translations.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-sm text-[#6e6e73] mt-4 text-center">
              {translations.disclaimer}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
