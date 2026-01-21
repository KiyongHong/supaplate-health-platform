import type { Route } from "./+types/verify-identity";

import { redirect } from "react-router";

import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { processAndSaveCheckup } from "~/features/health/services/checkup.server";
import { fetchHealthDataFromAPI } from "~/features/health/services/health-api.server";
import { IdentityVerification } from "~/features/users/components/identity-verification";
import { updateUserProfile } from "~/features/users/queries.server";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Verify Identity | Health Platform" }];
};

export async function action({ request }: Route.ActionArgs) {
  const [client] = makeServerClient(request);
  await requireAuthentication(client);
  
  const { data: { user } } = await client.auth.getUser();
  if (!user) return redirect("/login");

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "verify") {
    // Mock Identity Verification
    const ci = "mock_ci_" + Date.now();
    await updateUserProfile(user.id, {
      ci,
      verified_at: new Date(),
    });

    // Fetch Health Data from API (Mock)
    const healthData = await fetchHealthDataFromAPI(ci);

    // Process and Save Health Data (w/ Analysis)
    for (const data of healthData) {
      await processAndSaveCheckup(user.id, data);
    }

    return { success: true };
  }

  return null;
}

export default function VerifyIdentityScreen() {
  return (
    <div className="container max-w-lg py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Identity</h1>
      <IdentityVerification />
    </div>
  );
}
