import type { Route } from "./+types/toss-request";
import { data } from "react-router";
import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { tossCertService } from "~/features/users/services/toss-cert.server";

export async function action({ request }: Route.ActionArgs) {
  const [client] = makeServerClient(request);
  await requireAuthentication(client);

  try {
    const result = await tossCertService.requestVerification();
    return data(result);
  } catch (error) {
    console.error("Toss Request Error:", error);
    return data({ error: "Failed to initiate verification" }, { status: 500 });
  }
}
