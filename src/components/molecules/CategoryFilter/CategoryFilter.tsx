"use client";

import { cn } from "@/utils/cn";

type CategoryFilterProps = {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
};

const CategoryFilter = ({
  categories,
  active,
  onChange,
}: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={cn(
          "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
          active === cat
            ? "bg-zinc-900 text-white"
            : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-900",
        )}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
