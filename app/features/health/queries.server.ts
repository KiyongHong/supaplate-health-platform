import { desc, eq } from "drizzle-orm";
import db from "~/core/db/drizzle-client.server";
import { healthCheckups } from "./schema";

export async function createHealthCheckup(data: typeof healthCheckups.$inferInsert) {
  return db.insert(healthCheckups).values(data).returning();
}

export async function getHealthCheckups(userId: string) {
  return db
    .select()
    .from(healthCheckups)
    .where(eq(healthCheckups.user_id, userId))
    .orderBy(desc(healthCheckups.checkup_date));
}
