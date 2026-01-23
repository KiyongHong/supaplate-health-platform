/**
 * Category Screen
 *
 * Displays all topics within a specific category.
 * Provides navigation back to the main topics page.
 */

import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { data } from "react-router";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";

import { getCategoryById, CATEGORIES } from "../data/topics-data";
import { TopicCard } from "../components/topic-card";
import type { Category, CategoryId } from "../data/topics-types";
import i18next from "~/core/lib/i18next.server";

interface LoaderDataSuccess {
  category: Category;
  categoryName: string;
  categoryDescription: string;
  allTopicsLabel: string;
}

interface LoaderDataNotFound {
  notFound: true;
  categories: Category[];
}

type LoaderData = LoaderDataSuccess | LoaderDataNotFound;

/**
 * Meta function for the category page
 */
export const meta: MetaFunction<typeof loader> = ({ data: loaderData }) => {
  if (!loaderData || "notFound" in loaderData) {
    return [{ title: `Category Not Found | ${import.meta.env.VITE_APP_NAME}` }];
  }

  return [
    { title: `${loaderData.categoryName} | ${import.meta.env.VITE_APP_NAME}` },
    { name: "description", content: loaderData.categoryDescription },
  ];
};

/**
 * Loader function for the category page
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
  const t = await i18next.getFixedT(request);
  const categoryId = params.category as CategoryId;
  const category = getCategoryById(categoryId);

  if (!category) {
    return data(
      {
        notFound: true as const,
        categories: CATEGORIES,
      },
      { status: 404 }
    );
  }

  const locale = request.headers.get("accept-language")?.startsWith("ko")
    ? "ko"
    : "en";

  return {
    category,
    categoryName: locale === "ko" ? category.nameKo : category.name,
    categoryDescription: t("topics.category_description", {
      category: locale === "ko" ? category.nameKo : category.name,
    }),
    allTopicsLabel: t("topics.title"),
  };
}

interface CategoryProps {
  loaderData: LoaderData;
}

/**
 * Category Page Component
 */
export default function CategoryPage({ loaderData }: CategoryProps) {
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === "ko";

  // Handle 404 case
  if ("notFound" in loaderData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F2ED]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-900">
            {t("topics.category_not_found")}
          </h1>
          <Link
            to="/topics"
            className="mt-4 inline-flex items-center gap-2 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeftIcon className="size-4" />
            {t("topics.back_to_topics")}
          </Link>
        </div>
      </div>
    );
  }

  const { category } = loaderData;
  const categoryName = isKorean ? category.nameKo : category.name;

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Header */}
      <header className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-screen-xl">
          {/* Back Link */}
          <Link
            to="/topics"
            className="mb-6 inline-flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900"
            viewTransition
          >
            <ArrowLeftIcon className="size-4" />
            {t("topics.back_to_topics")}
          </Link>

          <h1 className="font-serif text-4xl font-normal tracking-tight text-stone-900 md:text-5xl">
            {categoryName}
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            {t("topics.explore_category", { category: categoryName })}
          </p>
        </div>
      </header>

      {/* Topics Grid */}
      <main className="mx-auto max-w-screen-xl px-5 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {category.topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              categoryId={category.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
