import { eq } from "drizzle-orm";
import db from "~/core/db/drizzle-client.server";
import { profiles } from "./schema";

export async function updateUserProfile(userId: string, data: Partial<typeof profiles.$inferInsert>) {
  return db
    .update(profiles)
    .set(data)
    .where(eq(profiles.profile_id, userId));
}

export async function updateSubscription(userId: string, status: "free" | "premium") {
  return db.update(profiles).set({ subscription_status: status }).where(eq(profiles.profile_id, userId));
}

export async function getUserProfile(userId: string) {
  return db.select().from(profiles).where(eq(profiles.profile_id, userId)).then(res => res[0]);
}
