/**
 * Health Platform Schema
 *
 * Defines tables for health checkup data and Huberman protocols.
 */
import { sql } from "drizzle-orm";
import {
  date,
  jsonb,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  uuid,
  vector,
} from "drizzle-orm/pg-core";
import { authUid, authUsers, authenticatedRole } from "drizzle-orm/supabase";

import { timestamps } from "~/core/db/helpers.server";

/**
 * Health Checkups Table
 *
 * Stores raw and analyzed health checkup data.
 */
export const healthCheckups = pgTable(
  "health_checkups",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id")
      .references(() => authUsers.id, { onDelete: "cascade" })
      .notNull(),
    checkup_date: date("checkup_date").notNull(),
    raw_data: jsonb("raw_data"), // Original API response
    parsed_data: jsonb("parsed_data"), // Parsed biomarker data
    analysis_result: jsonb("analysis_result"), // Peter Attia strict analysis
    protocols: jsonb("protocols"), // Recommended protocols
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    // RLS: Users can only view their own checkups
    pgPolicy("select-checkup-policy", {
      for: "select",
      to: authenticatedRole,
      using: sql`${authUid} = ${table.user_id}`,
    }),
    pgPolicy("insert-checkup-policy", {
        for: "insert",
        to: authenticatedRole,
        withCheck: sql`${authUid} = ${table.user_id}`,
    }),
  ]
);

/**
 * Huberman Protocols Table
 *
 * Stores health protocols/interventions with vector embeddings for semantic search.
 */
export const hubermanProtocols = pgTable(
  "huberman_protocols",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    category: text("category").notNull(), // sleep, nutrition, exercise, etc.
    related_biomarkers: text("related_biomarkers").array(),
    description: text("description"),
    scientific_basis: text("scientific_basis"),
    implementation_steps: jsonb("implementation_steps"),
    source_episode: text("source_episode"),
    // pgvector embedding (768 dimensions for typical models like text-embedding-3-small or similar)
    // Adjust dimension based on the model we plan to use (e.g. 1536 for openai, 768 for palm/gemini often)
    embedding: vector("embedding", { dimensions: 768 }),
    ...timestamps,
  },
  (table) => [
     // RLS: Public read access might be desired, or authenticated only
     pgPolicy("read-protocols-policy", {
         for: "select",
         to: authenticatedRole,
         using: sql`true`,
     })
  ]
);
