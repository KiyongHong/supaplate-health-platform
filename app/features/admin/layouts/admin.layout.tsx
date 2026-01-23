import type { LoaderFunctionArgs } from "react-router";

import { Outlet, redirect } from "react-router";
import { eq } from "drizzle-orm";

import db from "~/core/db/drizzle-client.server";
import { AdminSidebar } from "../components/admin-sidebar";
import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { profiles } from "~/features/users/schema";

export async function loader({ request }: LoaderFunctionArgs) {
  const [client] = makeServerClient(request);
  
  // 1. Require Authentication
  const user = await requireAuthentication(client);

  // 2. Check Admin Role
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.profile_id, user.id),
  });

  if (!profile || profile.role !== "admin") {
    // If not admin, redirect to home
    throw redirect("/");
  }

  return { user, profile };
}

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-stone-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
