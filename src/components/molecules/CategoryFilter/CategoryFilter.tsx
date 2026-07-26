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
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600",
        )}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
