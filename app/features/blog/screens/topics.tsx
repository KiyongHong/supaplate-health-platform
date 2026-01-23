/**
 * Topics Main Screen
 *
 * Peter Attia style topics page with category navigation and topic card grid.
 * Displays all health topics organized by category with smooth scrolling navigation.
 */

import { useTranslation } from "react-i18next";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";

import { CATEGORIES } from "../data/topics-data";
import { CategoryNav } from "../components/category-nav";
import { TopicCard } from "../components/topic-card";
import type { Category } from "../data/topics-types";
import i18next from "~/core/lib/i18next.server";

interface LoaderData {
  categories: Category[];
  title: string;
  description: string;
}

/**
 * Meta function for the topics page
 */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: `Topics | ${import.meta.env.VITE_APP_NAME}` }];
  }
  return [
    { title: `${data.title} | ${import.meta.env.VITE_APP_NAME}` },
    { name: "description", content: data.description },
  ];
};

/**
 * Loader function for the topics page
 */
export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const t = await i18next.getFixedT(request);

  return {
    categories: CATEGORIES,
    title: t("topics.title"),
    description: t("topics.description"),
  };
}

interface TopicsProps {
  loaderData: LoaderData;
}

/**
 * Topics Page Component
 */
export default function Topics({ loaderData }: TopicsProps) {
  const { t, i18n } = useTranslation();
  const { categories } = loaderData;
  const isKorean = i18n.language === "ko";

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Hero Section */}
      <header className="px-5 py-16 text-center md:px-10 md:py-24">
        <h1 className="font-serif text-4xl font-normal tracking-tight text-stone-900 md:text-6xl">
          {t("topics.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">
          {t("topics.description")}
        </p>

        {/* Category Navigation */}
        <div className="mt-10">
          <CategoryNav categories={categories} />
        </div>
      </header>

      {/* Category Sections */}
      <main className="mx-auto max-w-screen-xl px-5 pb-24 md:px-10">
        {categories.map((category: Category) => (
          <section
            key={category.id}
            id={category.id}
            className="mb-20 scroll-mt-24"
          >
            {/* Category Header */}
            <h2 className="mb-10 border-b border-stone-300 pb-4 font-serif text-3xl font-normal text-stone-900 md:text-4xl">
              {isKorean ? category.nameKo : category.name}
            </h2>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {category.topics.map((topic) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  categoryId={category.id}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
