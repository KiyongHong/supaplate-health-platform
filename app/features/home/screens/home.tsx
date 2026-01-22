/**
 * Home Page Component
 *
 * The main landing page for the Health Optimizer platform.
 * Emphasizes Peter Attia's strict standards and Huberman protocols.
 */

import type { Route } from "./+types/home";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router";
import i18next from "~/core/lib/i18next.server";
import { Button } from "~/core/components/ui/button";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: data?.title ?? "Health Optimizer - Beyond Average" },
    { name: "description", content: data?.description ?? "Optimize your health with Peter Attia's strict standards and Huberman Lab protocols." },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);
  return {
    title: t("home.title"),
    description: t("home.subtitle"),
  };
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center gap-6 py-20 px-4 text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 pb-2">
            {t("home.title")}
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("home.subtitle")}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" asChild className="text-lg px-8 py-6 h-auto">
                <Link to="/join">
                    {t("home.cta")} <ArrowRight className="ml-2 w-5 h-5"/>
                </Link>
            </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<Activity className="w-10 h-10 text-red-500" />}
                title={t("home.features.strict_standards.title")}
                description={t("home.features.strict_standards.description")}
            />
            <FeatureCard 
                icon={<Zap className="w-10 h-10 text-amber-500" />}
                title={t("home.features.actionable_protocols.title")}
                description={t("home.features.actionable_protocols.description")}
            />
            <FeatureCard 
                icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
                title={t("home.features.preventative_focus.title")}
                description={t("home.features.preventative_focus.description")}
            />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-card p-6 rounded-xl border shadow-sm text-center flex flex-col items-center gap-4">
            <div className="p-3 bg-background rounded-full border shadow-sm">
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

function Badge({ children, className, variant }: any) {
    return <span className={`inline-flex items-center border ${className}`}>{children}</span>
}
