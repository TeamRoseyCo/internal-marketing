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

  return (
    <section className="py-8 border-b border-border/30">
      <div className="container">
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* All category button */}
          <motion.button
            onClick={() => handleCategoryClick("All")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              currentCategory === "all"
                ? "bg-primary text-white border-primary hover:bg-primary/90"
                : "bg-foreground/5 border-border/40 text-foreground hover:text-primary hover:border-primary/60 hover:bg-foreground/10"
            }`}
          >
            All Posts
          </motion.button>

          {categories.map((category, index) => {
            if (category.name === "All") return null;
            const isActive = currentCategory === category.name;

            return (
              <motion.button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                    : "bg-card/60 backdrop-blur-sm border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {category.name}{" "}
                <span className="text-muted-foreground/60 ml-1">
                  ({category.count})
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
