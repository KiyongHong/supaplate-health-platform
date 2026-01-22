import { redirect, useLoaderData } from "react-router";
import { Check, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18next from "~/core/lib/i18next.server";
import { type MetaFunction, type LoaderFunctionArgs } from "react-router";
import { requireAuthentication } from "~/core/lib/guards.server";
import { Button } from "~/core/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/core/components/ui/card";
import makeServerClient from "~/core/lib/supa-client.server";
import { processPayment } from "~/features/payments/services/payment.server";
import type { Route } from "./+types/upgrade";

export async function loader({ request }: LoaderFunctionArgs) {
  return { title: (await i18next.getFixedT(request))("payments.upgrade.title") };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return [{ title: `${data?.title} | ${import.meta.env.VITE_APP_NAME}` }];
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
    const { t } = useTranslation();
    const features = t("payments.upgrade.plan.features", { returnObjects: true }) as string[];
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6 gap-8 text-center max-w-4xl mx-auto w-full">
            <div>
                 <h1 className="text-4xl font-bold tracking-tight mb-2">{t("payments.upgrade.title")}</h1>
                 <p className="text-xl text-muted-foreground">{t("payments.upgrade.subtitle")}</p>
            </div>

            <Card className="w-full max-w-md border-primary shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {t("payments.upgrade.plan.popular")}
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl">{t("payments.upgrade.plan.title")}</CardTitle>
                    <CardDescription>{t("payments.upgrade.plan.description")}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="text-4xl font-bold">
                        {t("payments.upgrade.plan.price")}<span className="text-lg font-normal text-muted-foreground">{t("payments.upgrade.plan.interval")}</span>
                    </div>
                    
                    <ul className="grid gap-2 text-left mt-4">
                        {features.map((feature, i) => (
                             <li key={i} className="flex items-center gap-2">
                                 <Check className="h-4 w-4 text-primary" />
                                 <span>{feature}</span>
                             </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <form method="post" className="w-full">
                        <input type="hidden" name="intent" value="subscribe" />
                        <Button type="submit" className="w-full" size="lg">{t("payments.upgrade.plan.button")}</Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
