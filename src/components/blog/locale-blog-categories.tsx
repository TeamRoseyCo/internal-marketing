"use client";

import { motion } from "framer-motion";
import { BlogPageTranslations } from "@/lib/page-translations";
import { LocaleCode } from "@/lib/locales";
import { getTranslatedCategory } from "@/lib/blog-helpers";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "All") {
      router.push(`/${locale}/blog`);
    } else {
      router.push(`/${locale}/blog?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const buttonClass = (active: boolean) =>
    `px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
      active
        ? "bg-[#0071e3] text-white shadow-md"
        : "bg-white text-[#1d1d1f] hover:bg-[#0071e3]/10 hover:text-[#0071e3] border border-[#e8e8ed]"
    }`;

  return (
    <section className="py-10 bg-[#f8f6f3]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => handleCategoryClick("All")}
            className={buttonClass(currentCategory === "all")}
          >
            {translations.all}
          </button>

          {categories.map((category) => {
            if (category.name === "All") return null;
            const translatedName = getTranslatedCategory(category.name, translations);
            const isActive = currentCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={buttonClass(isActive)}
              >
                {translatedName}
                <span className="ml-2 opacity-60">({category.count})</span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
