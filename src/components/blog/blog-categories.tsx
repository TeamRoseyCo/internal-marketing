"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogCategoriesProps {
  categories: { name: string; count: number }[];
}

export function BlogCategories({ categories }: BlogCategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "All") {
      router.push(`/blog`);
    } else {
      router.push(`/blog?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const buttonClass = (active: boolean) =>
    `px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
      active
        ? "bg-primary text-white shadow-md"
        : "bg-white dark:bg-card text-foreground/70 hover:bg-primary/10 hover:text-primary border border-border"
    }`;

  return (
    <section className="py-10 bg-[#f8f6f3] dark:bg-[#0f0f12]">
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
            All Posts
          </button>

          {categories.map((category) => {
            if (category.name === "All") return null;
            const isActive = currentCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={buttonClass(isActive)}
              >
                {category.name}
                <span className="ml-2 opacity-60">({category.count})</span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
