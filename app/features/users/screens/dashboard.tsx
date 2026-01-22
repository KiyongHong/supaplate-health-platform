import { redirect } from "react-router";
import { LogOut, Activity, FlaskConical, Heart, AlertTriangle, ShieldCheck } from "lucide-react";

import { requireAuthentication } from "~/core/lib/guards.server";
import { Button } from "~/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/core/components/ui/card";
import { Badge } from "~/core/components/ui/badge";
import makeServerClient from "~/core/lib/supa-client.server";
import { getHealthCheckups } from "~/features/health/queries.server";
import { getRecommendations } from "~/features/protocols/services/recommendation.server";
import type { Route } from "./+types/dashboard";
import { useTranslation } from "react-i18next";
import i18next from "~/core/lib/i18next.server";

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: data?.title ?? `Dashboard | ${import.meta.env.VITE_APP_NAME}` }];
};

import { getUserProfile } from "~/features/users/queries.server";

export async function loader({ request }: Route.LoaderArgs) {
  const [client] = makeServerClient(request);
  await requireAuthentication(client);

  const {
    data: { user: authUser },
  } = await client.auth.getUser();

  if (!authUser) {
    return redirect("/login");
  }
  
  // Fetch full profile to get subscription status
  const user = await getUserProfile(authUser.id);
  // Fallback if profile doesn't exist yet/pending but normally existing login flow ensures it
  const finalUser = user || { ...authUser, subscription_status: 'free' };

  // Fetch latest health checkup
  const checkups = await getHealthCheckups(authUser.id);
  const latestCheckup = checkups[0];
  
  // Fetch Recommendations
  let recommendations: any[] = [];
  if (latestCheckup && latestCheckup.analysis_result) {
     recommendations = await getRecommendations(latestCheckup.analysis_result as any);
  }

  const t = await i18next.getFixedT(request);
  return { user: finalUser, latestCheckup, recommendations, title: t("users.dashboard.title") };
}

export async function action({ request }: Route.ActionArgs) {
  const [client] = makeServerClient(request);
  await client.auth.signOut();
  return redirect("/login");
}

function RiskBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    optimal: "bg-green-500 hover:bg-green-600",
    normal: "bg-blue-500 hover:bg-blue-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    critical: "bg-red-500 hover:bg-red-600",
  };

  return (
    <Badge className={`${colors[status] || "bg-gray-500"} text-white capitalize`}>
      {status}
    </Badge>
  );
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { user, latestCheckup, recommendations } = loaderData;
  const analysis = latestCheckup?.analysis_result as Record<string, any> | undefined;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("users.dashboard.header")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("users.dashboard.welcome", { name: (user as any).name || (user as any).user_metadata?.name || (user as any).email })}
          </p>
        </div>
        <div className="flex gap-2">
           {!latestCheckup && (
             <Button asChild variant="outline">
               <a href="/dashboard/verify-identity">{t("users.dashboard.verify_identity_to_start")}</a>
              </Button>
           )}
          <form method="post">
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {!latestCheckup ? (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">{t("users.dashboard.no_data.title")}</h3>
            <p className="text-muted-foreground max-w-sm mt-2 mb-6">
              {t("users.dashboard.no_data.description")}
            </p>
            <Button asChild>
              <a href="/dashboard/verify-identity">{t("users.dashboard.no_data.action")}</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Health Score Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("users.dashboard.health_score.title")}</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analysis?.overall_score ?? "N/A"} / 100</div>
                 <p className="text-xs text-muted-foreground mt-1">
                  {t("users.dashboard.health_score.description")}
                </p>
              </CardContent>
            </Card>
            {/* Add more summary cards here if needed */}
          </div>

          {/* Biomarkers Detail */}
          <h2 className="text-xl font-semibold mt-4">{t("users.dashboard.biomarkers.title")}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {/* HbA1c Card */}
             {analysis?.hba1c && (
                <Card>
                  <CardHeader className="pb-2">
                     <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium flex items-center gap-2">
                           <FlaskConical className="h-4 w-4" /> HbA1c
                        </CardTitle>
                        <RiskBadge status={analysis.hba1c.status} />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{(latestCheckup.raw_data as any).glucose.hba1c}%</div>
                     <p className="text-xs text-muted-foreground mt-1">
                        {t("users.dashboard.biomarkers.strict_target", { value: analysis.hba1c.target })}%
                     </p>
                  </CardContent>
                </Card>
             )}

             {/* LDL Card */}
             {analysis?.ldl && (
                <Card>
                  <CardHeader className="pb-2">
                     <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium flex items-center gap-2">
                           <Heart className="h-4 w-4" /> LDL Cholesterol
                        </CardTitle>
                         <RiskBadge status={analysis.ldl.status} />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{(latestCheckup.raw_data as any).lipids.ldl} mg/dL</div>
                     <p className="text-xs text-muted-foreground mt-1">
                        {t("users.dashboard.biomarkers.strict_target", { value: analysis.ldl.target })} mg/dL
                     </p>
                  </CardContent>
                </Card>
             )}

              {/* hs-CRP Card (Example of another marker) */}
              {analysis?.hsCrp && (
                <Card>
                  <CardHeader className="pb-2">
                     <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium flex items-center gap-2">
                           <AlertTriangle className="h-4 w-4" /> hs-CRP
                        </CardTitle>
                         <RiskBadge status={analysis.hsCrp.status} />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{(latestCheckup.raw_data as any).inflammation.hsCrp} mg/L</div>
                     <p className="text-xs text-muted-foreground mt-1">
                        {t("users.dashboard.biomarkers.strict_target", { value: analysis.hsCrp.target })} mg/L
                     </p>
                  </CardContent>
                </Card>
             )}
          </div>

          {/* Recommendations Section */}
          <h2 className="text-xl font-semibold mt-8 mb-4">{t("users.dashboard.protocols.title")}</h2>
          
          {(user as any).subscription_status === 'premium' ? (
              recommendations.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {recommendations.map((protocol) => (
                    <Card key={protocol.id}>
                      <CardHeader>
                        <CardTitle>{protocol.title}</CardTitle>
                        <CardDescription>{protocol.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {protocol.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {protocol.related_biomarkers?.map((tag: any) => (
                             <Badge key={tag} variant="secondary" className="uppercase text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">{t("users.dashboard.protocols.no_protocols")}</p>
              )
          ) : (
              <Card className="bg-muted/10 border-dashed relative overflow-hidden">
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center p-6 text-center flex-col gap-4">
                       <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                           <ShieldCheck className="h-6 w-6" />
                       </div>
                       <div>
                           <h3 className="text-lg font-semibold">{t("users.dashboard.protocols.premium_locked.title")}</h3>
                           <p className="text-muted-foreground max-w-sm mx-auto mb-4">
                               {t("users.dashboard.protocols.premium_locked.description")}
                           </p>
                           <Button asChild size="lg">
                               <a href="/dashboard/upgrade">{t("users.dashboard.protocols.premium_locked.action")}</a>
                           </Button>
                       </div>
                  </div>
                  {/* Blurred/Mock Content underneath */}
                  <div className="opacity-20 pointer-events-none filter blur-sm grid gap-4 md:grid-cols-2 p-6">
                      <Card><CardHeader><CardTitle>Hidden Protocol 1</CardTitle></CardHeader><CardContent className="h-24"></CardContent></Card>
                      <Card><CardHeader><CardTitle>Hidden Protocol 2</CardTitle></CardHeader><CardContent className="h-24"></CardContent></Card>
                  </div>
              </Card>
          )}

        </>
      )}
    </div>
  );
}
