/**
 * Home Page Component
 *
 * The main landing page for the Health Optimizer platform.
 * Emphasizes Peter Attia's strict standards and Huberman protocols.
 */

import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import i18next from "~/core/lib/i18next.server";
import { Button } from "~/core/components/ui/button";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Health Optimizer - Beyond Average" },
    { name: "description", content: "Optimize your health with Peter Attia's strict standards and Huberman Lab protocols." },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);
  return {};
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center gap-6 py-20 px-4 text-center space-y-4 max-w-4xl mx-auto">
        <Badge variant="outline" className="text-sm font-medium py-1 px-3 rounded-full border-primary/20 bg-primary/5 text-primary">
          🚀 The Future of Personal Health Analysis
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 pb-2">
            Is Your "Normal" <br/> Actually Healthy?
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Most health checkups only flag you when you are sick. 
          We use <strong>Peter Attia’s strict standards</strong> to catch issues early and optimize your longevity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" asChild className="text-lg px-8 py-6 h-auto">
                <Link to="/join">
                    Start Your Analysis <ArrowRight className="ml-2 w-5 h-5"/>
                </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 h-auto">
                <Link to="/login">
                    Existing Users
                </Link>
            </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={<Activity className="w-10 h-10 text-red-500" />}
                title="Strict Standards"
                description="Goodbye 'Standard Range'. We analyze your blood work against optimal longevity targets defined by Dr. Peter Attia."
            />
            <FeatureCard 
                icon={<Zap className="w-10 h-10 text-amber-500" />}
                title="Actionable Protocols"
                description="Don't just get numbers. Get science-backed protocols from Huberman Lab to improve your metrics."
            />
            <FeatureCard 
                icon={<ShieldCheck className="w-10 h-10 text-green-500" />}
                title="Preventative Focus"
                description="Shift from reactive medicine to proactive health optimization. Catch metabolic dysfunction decades early."
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
