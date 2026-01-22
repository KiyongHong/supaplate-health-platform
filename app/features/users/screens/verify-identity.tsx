import type { Route } from "./+types/verify-identity";

import { redirect } from "react-router";

import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { processAndSaveCheckup } from "~/features/health/services/checkup.server";
import { fetchHealthDataFromAPI } from "~/features/health/services/health-api.server";
import { IdentityVerification } from "~/features/users/components/identity-verification";

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
    // Extract form data for Identity Verification (Simple Auth)
    const userName = formData.get("userName") as string;
    const phoneNo = formData.get("phoneNo") as string;
    const birthday = formData.get("birthday") as string;
    const identityFront = formData.get("identityFront") as string;
    const identityBack = formData.get("identityBack") as string;
    const loginTypeLevel = formData.get("loginTypeLevel") as string;

    const identity = `${identityFront}${identityBack}`; // Basic construction

    // Mock Identity Verification Persistence (Optional for now)
    // In a real flow, you might save the "pending" request ID.
    
    // Fetch Health Data from API
    // This will trigger the Codef Simple Auth Request
    // Note: The UI currently just waits for this to return. 
    // In reality, Codef usually returns a "waiting for user" signal if async.
    // For "sync" Simple Auth (some providers), it might block until user approves on phone.
    // We assume a blocking call or we will need to handle the "CF-03002" in the provider to return a specific status.
    const healthData = await fetchHealthDataFromAPI({
        userId: user.id,
        loginType: "5", // Simple Auth
        loginTypeLevel, 
        userName,
        phoneNo,
        birthday,
        identity
    });

    // Process and Save Health Data (w/ Analysis)
    // If healthData is empty (validation failed or user denied), this loop won't run.
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
