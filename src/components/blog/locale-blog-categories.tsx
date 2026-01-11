"use client";

import { motion } from "framer-motion";
import { BlogPageTranslations } from "@/lib/page-translations";
import { LocaleCode } from "@/lib/locales";

interface LocaleBlogCategoriesProps {
  categories: { name: string; count: number }[];
  translations: BlogPageTranslations["categories"];
  locale: LocaleCode;
}

export function LocaleBlogCategories({
  categories,
  translations,
  locale,
}: LocaleBlogCategoriesProps) {
  return (
    <section className="py-8 border-b border-border/30">
      <div className="container">
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* All category button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all duration-300"
          >
            {translations.all}
          </motion.button>

          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-card/60 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              {category.name}{" "}
              <span className="text-muted-foreground/60 ml-1">
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
