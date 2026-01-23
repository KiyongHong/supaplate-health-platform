import type { Route } from "./+types/verify-identity";

import { redirect } from "react-router";

import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { processAndSaveCheckup } from "~/features/health/services/checkup.server";
import { fetchHealthDataFromAPI } from "~/features/health/services/health-api.server";
import { IdentityVerification } from "~/features/users/components/identity-verification";
import i18next from "~/core/lib/i18next.server";
import { useTranslation } from "react-i18next";
import React from "react";

export const meta: Route.MetaFunction = ({ data }: { data: { title?: string } }) => {
  return [{ title: data?.title ?? "Verify Identity | Health Platform" }];
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);
  return {
    title: t("users.verify_identity.title"),
  };
}

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
  const { t } = useTranslation();
  
  // Dynamic script loading for Toss Cert
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.toss.im/cert/v1";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleVerify = async () => {
    try {
      // 1. Request TxId
      const reqResponse = await fetch("/api/users/toss/request", { method: "POST" });
      const reqData = await reqResponse.json();

      if (!reqResponse.ok) {
        throw new Error(reqData.error || "Failed to start verification");
      }

      const { txId, authUrl } = reqData;
      
      // 2. Open Toss Cert Popup
      // @ts-ignore - TossCert is loaded globally by the script
      if (typeof window.TossCert === "undefined") {
         alert("Toss Cert SDK not loaded yet. Please refresh.");
         return;
      }

      // @ts-ignore
      const tossCert = window.TossCert();
      tossCert.preparePopup();

      tossCert.start({
        authUrl,
        txId,
        onSuccess: async () => {
          // 3. Handle Success
          const successResponse = await fetch("/api/users/toss/success", {
            method: "POST",
            body: new URLSearchParams({ txId }),
          });
          
          if (successResponse.ok) {
             window.location.reload(); // Reload to show verified status
          } else {
             alert("Verification processing failed checking server.");
          }
        },
        onFail: (error: any) => {
          console.error("Toss Cert Failed", error);
          alert("Verification failed or cancelled.");
        },
      });

    } catch (error) {
      console.error(error);
      alert("An error occurred during verification initialization.");
    }
  };

  return (
    <div className="container max-w-lg py-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">{t("users.verify_identity.header")}</h1>
      
      <div className="bg-card p-6 rounded-lg border shadow-sm w-full text-center">
        <p className="text-muted-foreground mb-6">
          {t("users.verify_identity.description", "Verify your identity safely using Toss App.")}
        </p>
        
        <button 
          onClick={handleVerify}
          className="bg-[#3182F6] hover:bg-[#1B64DA] text-white font-bold py-3 px-6 rounded-lg w-full transition-colors flex items-center justify-center gap-2"
        >
          {/* Toss Logo SVG could go here */}
          {t("users.verify_identity.button", "Verify with Toss")}
        </button>
      </div>
    </div>
  );
}
