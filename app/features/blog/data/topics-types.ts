/**
 * Topics Types
 *
 * TypeScript type definitions for the Topics page data structure.
 * Categories and topics are organized for easy modification and i18n support.
 */

/**
 * Individual topic within a category
 */
export interface Topic {
  /** URL-friendly identifier */
  slug: string;
  /** English title */
  title: string;
  /** Korean title */
  titleKo: string;
  /** English description */
  description: string;
  /** Korean description */
  descriptionKo: string;
  /** Image path (relative to /public/topics/) */
  image: string;
  /** Number of posts in this topic (for display) */
  postCount?: number;
}

/**
 * Category containing multiple topics
 */
export interface Category {
  /** URL-friendly identifier */
  id: string;
  /** English name */
  name: string;
  /** Korean name */
  nameKo: string;
  /** Category icon (optional, lucide icon name) */
  icon?: string;
  /** Topics within this category */
  topics: Topic[];
}

/**
 * Category ID type for type safety
 */
export type CategoryId =
  | "metabolic-health"
  | "cardiovascular-health"
  | "sleep"
  | "exercise"
  | "nutrition"
  | "liver-health"
  | "longevity"
  | "protocols";
