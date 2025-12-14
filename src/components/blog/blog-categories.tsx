"use client";

interface BlogCategoriesProps {
  categories: { name: string; count: number }[];
}

export function BlogCategories({ categories }: BlogCategoriesProps) {
  return (
    <section className="py-8 border-b border-border/50">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              className="px-4 py-2 rounded-full text-sm border border-border hover:border-primary hover:text-primary transition-colors"
            >
              {category.name}{" "}
              <span className="text-muted-foreground">({category.count})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
