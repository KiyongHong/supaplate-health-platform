/**
 * Category Navigation Component
 *
 * Pill-button style navigation for quick jumping to category sections.
 * Based on Peter Attia Topics page design.
 */

import { useTranslation } from "react-i18next";

import type { Category } from "../data/topics-types";

interface CategoryNavProps {
  categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const { i18n } = useTranslation();
  const isKorean = i18n.language === "ko";

  const handleScrollTo = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => handleScrollTo(category.id)}
          className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition-all hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900"
        >
          {isKorean ? category.nameKo : category.name}
        </button>
      ))}
    </nav>
  );
}
