"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BlogPageTranslations } from "@/lib/page-translations";

interface LocaleBlogHeroProps {
  translations: BlogPageTranslations["hero"];
}

export function LocaleBlogHero({ translations }: LocaleBlogHeroProps) {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 bg-[#fbfbfd] [data-theme=dark]_&]:bg-[#1c1c1e]">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-6"
          >
            <Link href="/" className="hover:text-[#0071e3] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span>Blog</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1d1d1f] mb-6 leading-[1.05]"
          >
            {translations.title}{" "}
            <span className="text-[#0071e3]">{translations.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#6e6e73] leading-relaxed max-w-2xl mx-auto"
          >
            {translations.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
