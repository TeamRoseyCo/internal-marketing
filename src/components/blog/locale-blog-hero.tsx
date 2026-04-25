"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BlogPageTranslations } from "@/lib/page-translations";

interface LocaleBlogHeroProps {
  translations: BlogPageTranslations["hero"];
  backgroundImage?: string;
}

export function LocaleBlogHero({
  translations,
  backgroundImage = "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1920&q=80",
}: LocaleBlogHeroProps) {
  const fullTitle = `${translations.title} ${translations.titleHighlight}`.trim();

  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-wider mb-4 text-white"
        >
          {fullTitle}
        </motion.h1>

        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em]"
        >
          <Link href="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-white/50" />
          <span className="text-white/60">Blog</span>
        </motion.nav>
      </div>
    </section>
  );
}
