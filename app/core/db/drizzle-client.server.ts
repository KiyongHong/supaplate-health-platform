import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as userSchema from "~/features/users/schema";
import * as blogSchema from "~/features/blog/schema";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client, { 
  schema: { ...userSchema, ...blogSchema } 
});

export default db;
