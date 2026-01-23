/**
 * Blog Schema
 *
 * Defines the database schema for the blog system.
 */
import { boolean, pgTable, text, uuid, jsonb } from "drizzle-orm/pg-core";

import { timestamps } from "~/core/db/helpers.server";
import { profiles } from "~/features/users/schema";

/**
 * Posts Table
 *
 * Stores blog posts content and metadata.
 */
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: jsonb("content"), // Stores Tiptap JSON output
  category: text("category").notNull(), // Maps to one of the 8 fixed categories
  image_url: text("image_url"),
  published: boolean("published").default(false).notNull(),
  author_id: uuid("author_id")
    .references(() => profiles.profile_id, { onDelete: "set null" }),

  // Adds created_at and updated_at timestamp columns
  ...timestamps,
});
