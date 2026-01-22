import { type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { useLoaderData, Link } from "react-router";
import { fetchHealthDataFromAPI } from "../services/health-api.server";
import { ATTIA_STANDARDS, analyzeMetric, HealthStatus, type MetricStandard } from "../lib/attia-standards";
import { getProtocolsForMetric, type Protocol } from "../lib/huberman-protocols";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/core/components/ui/card";
import { Badge } from "~/core/components/ui/badge";
import { Button } from "~/core/components/ui/button";
import { ShieldCheck, ShieldAlert, Activity, ArrowRight, Lock, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18next from "~/core/lib/i18next.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // In a real app, retrieve the user's CI and Subscription Status from the DB/Session
  const dummyCI = "dummy-ci-12345"; 
  const isPremium = false; // MOCK: Toggle this to test premium view

  const healthDataList = await fetchHealthDataFromAPI(dummyCI);
  const healthData = healthDataList[0]; // Take the most recent one

  if (!healthData) {
    return { analysis: [], protocols: [], isPremium, title: (await i18next.getFixedT(request))("health.dashboard.title") };
  }

  // Analyze specific metrics we care about
  const results = [];
  // Lipids
  if (healthData.lipids.ldl) results.push(analyzeMetric("ldl", healthData.lipids.ldl));
  if (healthData.lipids.apob) results.push(analyzeMetric("apob", healthData.lipids.apob));
  if (healthData.lipids.triglycerides) results.push(analyzeMetric("triglycerides", healthData.lipids.triglycerides));
  if (healthData.lipids.hdl) results.push(analyzeMetric("hdl", healthData.lipids.hdl));
  
  // Metabolic
  if (healthData.glucose.hba1c) results.push(analyzeMetric("hba1c", healthData.glucose.hba1c));
  if (healthData.glucose.fasting) results.push(analyzeMetric("fasting_glucose", healthData.glucose.fasting));
  if (healthData.metabolic.insulin) results.push(analyzeMetric("insulin", healthData.metabolic.insulin));
  
  // Inflammation
  if (healthData.inflammation.hsCrp) results.push(analyzeMetric("hs_crp", healthData.inflammation.hsCrp));

  // Filter out nulls
  const validResults = results.filter(Boolean);

  // Collect Protocols
  const protocolMap = new Map<string, Protocol>();
  validResults.forEach((res) => {
    if (res && res.status !== HealthStatus.OPTIMAL) {
      const protocols = getProtocolsForMetric(res.metric, res.status);
      protocols.forEach(p => protocolMap.set(p.id, p));
    }
  });

  // Calculate Overall Score (Mock)
  const score = 100 - (validResults.filter(r => r?.status === HealthStatus.POOR).length * 15) - (validResults.filter(r => r?.status === HealthStatus.SUB_OPTIMAL).length * 5);


  return { 
    analysis: validResults,
    protocols: Array.from(protocolMap.values()),
    score: Math.max(0, score),
    isPremium,
    title: (await i18next.getFixedT(request))("health.dashboard.title"),
  };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.title ?? "Health Dashboard"} | ${import.meta.env.VITE_APP_NAME}`,
    },
  ];
};

export default function HealthDashboard() {
  const { analysis, protocols, score, isPremium } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  // For Free Users: Only show 2 metrics unlocked
  const unlockedMetrics = isPremium ? analysis : analysis.slice(0, 2);
  const lockedMetrics = isPremium ? [] : analysis.slice(2);

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
           <Badge variant="outline" className="mb-2">{t("health.dashboard.phase_badge")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight">{t("health.dashboard.title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("health.dashboard.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-xl border">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{t("health.dashboard.score_label")}</p>
                <p className="text-3xl font-bold text-primary">{score}/100</p>
            </div>
            {!isPremium && (
                <Button size="sm" className="hidden md:flex" asChild>
                    <Link to="/upgrade">{t("health.dashboard.unlock_cta")} <Crown className="ml-2 w-4 h-4 text-yellow-400" fill="currentColor" /></Link>
                </Button>
            )}
        </div>
      </div>

       {/* Unlocked Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {unlockedMetrics.map((item) => (
          <MetricCard key={item!.metric} item={item!} />
        ))}
        
        {/* Blurred / Locked Metrics for Free Users */}
        {!isPremium && lockedMetrics.map((item) => (
             <LockedMetricCard key={item!.metric} item={item!} />
        ))}
      </div>
      
      {!isPremium && (
          <div className="relative rounded-xl border border-dashed p-8 text-center bg-muted/30">
               <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-primary" />
               </div>
               <h3 className="text-lg font-semibold mb-2">{t("health.dashboard.unlock_more_title", { count: lockedMetrics.length })}</h3>
               <p className="text-muted-foreground max-w-md mx-auto mb-6">
                   {t("health.dashboard.unlock_more_desc")}
               </p>
               <Button size="lg" className="w-full md:w-auto" asChild>
                   <Link to="/upgrade">{t("health.dashboard.upgrade_button")}</Link>
               </Button>
          </div>
      )}

      {/* Protocols Section - Conditional */}
      {protocols.length > 0 && (
        <div className="mt-12 relative">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    {t("health.dashboard.protocols_title")}
                </h2>
                {isPremium && <Badge>{t("health.dashboard.personalized_badge")}</Badge>}
             </div>
            
            <div className={`grid gap-6 md:grid-cols-2 ${!isPremium ? 'opacity-40 blur-sm pointer-events-none select-none' : ''}`}>
                {protocols.map(protocol => (
                    <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
            </div>

            {/* Lock Overlay for Protocols */}
            {!isPremium && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                     <div className="bg-background/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border text-center max-w-md mx-4">
                        <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">{t("health.dashboard.strict_access_title")}</h3>
                        <p className="text-muted-foreground mb-6">
                            {t("health.dashboard.strict_access_desc", { count: protocols.length })}
                        </p>
                        <Button className="w-full font-bold" size="lg" asChild>
                             <Link to="/upgrade">{t("health.dashboard.access_button")}</Link>
                        </Button>
                     </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
}

function MetricCard({ item }: { item: NonNullable<ReturnType<typeof analyzeMetric>> }) {
  const { t } = useTranslation();
  const isOptimal = item.status === HealthStatus.OPTIMAL;
  const isPoor = item.status === HealthStatus.POOR;
  const isSubOptimal = item.status === HealthStatus.SUB_OPTIMAL;

  let statusColor = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (isSubOptimal) statusColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  if (isPoor) statusColor = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {item.metric.toUpperCase().replace("_", " ")}
        </CardTitle>
        {isOptimal ? (
           <ShieldCheck className="h-4 w-4 text-green-500" />
        ) : (
           <ShieldAlert className={`h-4 w-4 ${isPoor ? "text-red-500" : "text-yellow-500"}`} />
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-2xl font-bold">
            {item.value} <span className="text-sm font-normal text-muted-foreground">{item.standard.unit}</span>
        </div>
        <Badge variant="secondary" className={`mt-2 ${statusColor} border-0`}>
            {isOptimal && t("health.dashboard.metrics.optimal")}
            {isSubOptimal && t("health.dashboard.metrics.sub_optimal")}
            {isPoor && t("health.dashboard.metrics.poor")}
        </Badge>
        
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          {item.message}
        </p>
        
        <div className="mt-4 text-xs space-y-1 bg-muted/50 p-2 rounded">
            <div className="flex justify-between">
                <span>Optimal:</span>
                <span className="font-medium">
                  {item.standard.ranges.optimal.max ? `< ${item.standard.ranges.optimal.max}` : ""}
                  {item.standard.ranges.optimal.min ? `> ${item.standard.ranges.optimal.min}` : ""}
                </span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LockedMetricCard({ item }: { item: NonNullable<ReturnType<typeof analyzeMetric>> }) {
    const { t } = useTranslation();
    return (
        <Card className="h-full flex flex-col opacity-60 relative overflow-hidden">
             <div className="absolute inset-0 backdrop-blur-[2px] z-10 flex items-center justify-center bg-background/10">
                 <Lock className="w-6 h-6 text-muted-foreground/50" />
             </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground blur-[2px]">
                    {t("health.dashboard.metrics.hidden_title")}
                </CardTitle>
                 <ShieldAlert className="h-4 w-4 text-muted-foreground/30" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold blur-sm text-foreground/50">
                    ?? <span className="text-sm font-normal">mg/dL</span>
                </div>
                 <Badge variant="outline" className="mt-2 blur-[2px] opacity-50">
                    {t("health.dashboard.metrics.analysis_locked")}
                </Badge>
            </CardContent>
        </Card>
    )
}


function ProtocolCard({ protocol }: { protocol: Protocol }) {
    const { t } = useTranslation();
    return (
        <Card className="border-l-4 border-l-primary h-full">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="outline" className="mb-2 capitalize">{protocol.category}</Badge>
                        <CardTitle className="text-lg">{protocol.title}</CardTitle>
                    </div>
                </div>
                <CardDescription className="line-clamp-2">{protocol.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {protocol.actionItems.slice(0, 2).map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 shrink-0">
                                {i + 1}
                            </span>
                            <span className="line-clamp-1">{action}</span>
                        </div>
                    ))}
                    {protocol.actionItems.length > 2 && (
                        <p className="text-xs text-muted-foreground pl-7 pt-1">{t("health.protocol.more_steps", { count: protocol.actionItems.length - 2 })}</p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                    <Link to={`/dashboard/health/protocols/${protocol.id}`}>{t("health.protocol.view_details")} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                 </Button>
            </CardFooter>
        </Card>
    )
}
