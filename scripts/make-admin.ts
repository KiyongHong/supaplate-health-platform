import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as userSchema from "../app/features/users/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema: userSchema });

async function makeAdmin(email: string) {
  console.log(`Searching for user with email: ${email}`);

  // Note: We need to join with auth.users to find by email, but auth schema is in supabase.
  // Alternatively, we can just look up profile if we had email there, but we don't.
  // Simple way: User provides UUID. Or we try to match email?
  // Since we can't easily query auth.users from here without raw sql or schema,
  // let's assume usage: npm run db:make-admin <uuid> or we use raw sql to find by email.
  
  // Actually, Drizzle doesn't have auth schema. 
  // Let's rely on UUID for now as it's safer/easier if known.
  // Or simpler: Ask user to login, get their ID from Supabase, then run this.
  
  // BUT, to be user friendly, let's try to query auth.users if we have access.
  // Usually we don't have access to auth schema via standard connection unless superuser.
  // Let's provide a raw SQL fallback or just ask for UUID.
  
  const idOrEmail = email;
  let userId = idOrEmail;

  if (idOrEmail.includes("@")) {
      // Try to find user by email using raw query
      console.log("Looking up UUID for email...");
      const result = await client`select id from auth.users where email = ${idOrEmail}`;
      if (result.length === 0) {
          console.error("User not found in auth.users");
          process.exit(1);
      }
      userId = result[0].id;
      console.log(`Found UUID: ${userId}`);
  }

  console.log(`Promoting user ${userId} to admin...`);
  await db.update(userSchema.profiles)
    .set({ role: "admin" })
    .where(eq(userSchema.profiles.profile_id, userId));

  console.log("Success! User is now an admin.");
  process.exit(0);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: npx tsx scripts/make-admin.ts <email_or_uuid>");
  process.exit(1);
}

makeAdmin(args[0]).catch((err) => {
  console.error(err);
  process.exit(1);
});
