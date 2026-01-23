/**
 * Topic Card Component
 *
 * Peter Attia style topic card with image, title, description, and CTA button.
 * Used in the Topics page grid layout.
 */

import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import type { Topic } from "../data/topics-types";

interface TopicCardProps {
  topic: Topic;
  categoryId: string;
}

export function TopicCard({ topic, categoryId }: TopicCardProps) {
  const { i18n, t } = useTranslation();
  const isKorean = i18n.language === "ko";

  const title = isKorean ? topic.titleKo : topic.title;
  const description = isKorean ? topic.descriptionKo : topic.description;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Topic Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-stone-200">
        <img
          src={topic.image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to placeholder on error
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/600x400/e8e4df/6b7280?text=${encodeURIComponent(title)}`;
          }}
        />
      </div>

      {/* Topic Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 font-sans text-lg font-bold uppercase tracking-wide text-stone-900">
          {title}
        </h3>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-600">
          {description}
        </p>

        {/* CTA Button - Links to category page for now (TODO: link to topic detail when content is ready) */}
        <Link
          to={`/topics/${categoryId}`}
          className="inline-flex w-fit items-center justify-center rounded-full bg-stone-800 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-stone-700"
          viewTransition
        >
          {t("topics.browse_content")}
        </Link>
      </div>
    </article>
  );
}
