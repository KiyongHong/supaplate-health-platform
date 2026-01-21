import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import { ArrowLeft, Clock, BookOpen, ExternalLink, PlayCircle } from "lucide-react";
import { Button } from "~/core/components/ui/button";
import { Badge } from "~/core/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/core/components/ui/card";
import { PROTOCOLS, type Protocol } from "../lib/huberman-protocols";

export async function loader({ params }: LoaderFunctionArgs) {
  const protocolId = params.id as string;
  const protocol = PROTOCOLS[protocolId];
  const isPremium = false; // Mock premium status

  if (!protocol) {
    throw new Response("Protocol Not Found", { status: 404 });
  }

  return { protocol, isPremium };
}

export default function ProtocolDetail() {
  const { protocol, isPremium } = useLoaderData<typeof loader>();

  return (
    <div className="container max-w-4xl py-12 mx-auto px-4">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/dashboard/health"><ArrowLeft className="mr-2 w-4 h-4"/> Back to Dashboard</Link>
        </Button>
        <div className="flex items-center gap-3 mb-4">
             <Badge variant="secondary" className="text-sm py-1 px-3 bg-primary/10 text-primary hover:bg-primary/20">{protocol.category}</Badge>
             <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {protocol.frequency}
             </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{protocol.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
            {protocol.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" /> Implementation Guide
                </h2>
                <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
                    {protocol.actionItems.map((step, i) => (
                        <div key={i} className="flex gap-4">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                {i + 1}
                             </div>
                             <div>
                                 <h3 className="font-semibold mb-1">Step {i + 1}</h3>
                                 <p className="text-muted-foreground">{step}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </section>

             <section>
                <h2 className="text-2xl font-bold mb-4">Scientific Basis</h2>
                <div className="bg-muted/30 p-6 rounded-xl border">
                    <p className="leading-relaxed text-muted-foreground">
                        {/* Mock scientific basis if not in data object */}
                        This protocol is based on mechanism of action studies showing significant improvement in biomarkers. 
                        Dr. Huberman emphasizes this implementation for its high efficacy-to-effort ratio.
                    </p>
                </div>
            </section>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Source Material</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative group cursor-pointer overflow-hidden text-center">
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                         <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                         <span className="sr-only">Play Episode</span>
                    </div>
                    <div>
                        <p className="font-medium text-sm mb-1">{protocol.source}</p>
                        <p className="text-xs text-muted-foreground">Huberman Lab Podcast</p>
                    </div>
                    <Button variant="outline" className="w-full gap-2" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Listen to Episode <ExternalLink className="w-3 h-3" />
                        </a>
                    </Button>
                </CardContent>
            </Card>

             <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-lg text-primary">Biomarkers Targeted</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                         {/* Mock related biomarkers */}
                         {["LDL", "Cortisol", "Glucose"].map(tag => (
                             <Badge key={tag} variant="outline" className="bg-background">{tag}</Badge>
                         ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
