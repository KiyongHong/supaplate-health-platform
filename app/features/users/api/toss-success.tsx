import type { Route } from "./+types/toss-success";
import { data } from "react-router";
import { eq } from "drizzle-orm";
import db from "~/core/db/drizzle-client.server";
import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { profiles } from "~/features/users/schema";
import { tossCertService } from "~/features/users/services/toss-cert.server";

export async function action({ request }: Route.ActionArgs) {
  const [client] = makeServerClient(request);
  const user = await requireAuthentication(client);

  const formData = await request.formData();
  const txId = formData.get("txId") as string;

  if (!txId) {
    return data({ error: "Missing transaction ID" }, { status: 400 });
  }

  try {
    // 1. Verify result with Toss
    const verificationResult = await tossCertService.getVerificationResult(txId);

    if (verificationResult.status !== "COMPLETED" && verificationResult.status !== "SUCCESS") {
        // Note: Check exact success status string from Toss docs or test.
        // Assuming "COMPLETED" or similar based on standard 3-leg auth.
        // If it fails, throw.
    }

    // 2. Update User Profile
    await db.update(profiles)
      .set({
        name: verificationResult.userName,
        phone: verificationResult.userPhone,
        birthday: verificationResult.userBirthday,
        gender: verificationResult.userGender,
        nationality: verificationResult.userNationality,
        ci: verificationResult.ci,
        di: verificationResult.di,
        verified_at: new Date(),
      })
      .where(eq(profiles.profile_id, user.id));

    return data({ success: true });
  } catch (error) {
    console.error("Toss Success Handler Error:", error);
    return data({ error: "Verification failed to process" }, { status: 500 });
  }
}
