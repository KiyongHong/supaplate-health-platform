import { redirect } from "react-router";
import { Check, ShieldCheck } from "lucide-react";
import { requireAuthentication } from "~/core/lib/guards.server";
import { Button } from "~/core/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/core/components/ui/card";
import makeServerClient from "~/core/lib/supa-client.server";
import { processPayment } from "~/features/payments/services/payment.server";
import type { Route } from "./+types/upgrade";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Upgrade to Premium | Health Platform" }];
};

export async function action({ request }: Route.ActionArgs) {
    const [client] = makeServerClient(request);
    await requireAuthentication(client);

    const { data: { user } } = await client.auth.getUser();
    if (!user) return redirect("/login");

    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "subscribe") {
        await processPayment(user.id, "mock_card");
        return redirect("/dashboard");
    }
    
    return null;
}

export default function UpgradeScreen() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6 gap-8 text-center max-w-4xl mx-auto w-full">
            <div>
                 <h1 className="text-4xl font-bold tracking-tight mb-2">Unlock Full Health Potential</h1>
                 <p className="text-xl text-muted-foreground">Get personalized Huberman Lab protocols tailored to your unique biology.</p>
            </div>

            <Card className="w-full max-w-md border-primary shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl">Premium Plan</CardTitle>
                    <CardDescription>Everything you need to optimize your health.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="text-4xl font-bold">
                        $9.99<span className="text-lg font-normal text-muted-foreground">/mo</span>
                    </div>
                    
                    <ul className="grid gap-2 text-left mt-4">
                         <li className="flex items-center gap-2">
                             <Check className="h-4 w-4 text-primary" />
                             <span>Peter Attia Strict Analysis</span>
                         </li>
                         <li className="flex items-center gap-2">
                             <Check className="h-4 w-4 text-primary" />
                             <span>Unlimited Health Data Sync</span>
                         </li>
                         <li className="flex items-center gap-2 font-medium">
                             <ShieldCheck className="h-4 w-4 text-primary" />
                             <span>Huberman Lab Protocol Recommendations</span>
                         </li>
                         <li className="flex items-center gap-2">
                             <Check className="h-4 w-4 text-primary" />
                             <span>Trend Tracking & History</span>
                         </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <form method="post" className="w-full">
                        <input type="hidden" name="intent" value="subscribe" />
                        <Button type="submit" className="w-full" size="lg">Upgrade Now</Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
