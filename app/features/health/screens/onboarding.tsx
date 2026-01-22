import { useState } from "react";
import { useNavigate, Form } from "react-router";
import { Loader2, FileDown, CheckCircle, Database, UploadCloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/core/components/ui/card";
import { Button } from "~/core/components/ui/button";
import { Progress } from "~/core/components/ui/progress";
import { Label } from "~/core/components/ui/label";
import { Input } from "~/core/components/ui/input";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { type MetaFunction, type LoaderFunctionArgs } from "react-router";
import i18next from "~/core/lib/i18next.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const t = await i18next.getFixedT(request);
    return { title: t("health.onboarding.title") };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.title ?? "Onboarding"} | ${import.meta.env.VITE_APP_NAME}`,
    },
  ];
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Select Method, 2: Processing, 3: Success
  const [progress, setProgress] = useState(0);

  const simulateProcessing = () => {
    setStep(2);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setStep(3), 500);
      }
      setProgress(current);
    }, 300);
  };

  const handleConnectAPI = () => {
    toast.info(t("health.onboarding.processing.toast"));
    simulateProcessing();
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(t("health.onboarding.processing.parsing_toast"));
    simulateProcessing();
  };

  if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/20">
        <Card className="w-full max-w-md text-center py-10">
          <CardContent className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">{t("health.onboarding.processing.analyzing")}</h2>
                <p className="text-sm text-muted-foreground">{t("health.onboarding.processing.mapping")}</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground">{Math.round(progress)}% {t("health.onboarding.steps.processing")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 3) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/20">
          <Card className="w-full max-w-md text-center py-10 border-green-500/20 bg-green-500/5">
            <CardContent className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/20">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
              </div>
              <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">{t("health.onboarding.success.title")}</h2>
                  <p className="text-sm text-muted-foreground">{t("health.onboarding.success.description", { count: 5 })}</p>
              </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" size="lg" onClick={() => navigate("/dashboard/health")}>
                    {t("health.onboarding.success.button")}
                </Button>
            </CardFooter>
          </Card>
        </div>
      );
  }

  return (
    <div className="container max-w-4xl py-20 mx-auto px-4">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl font-bold">{t("health.onboarding.title")}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {t("health.onboarding.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="relative overflow-hidden cursor-pointer hover:border-primary transition-all group" onClick={handleConnectAPI}>
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10" />
            <CardHeader>
                <Database className="w-10 h-10 text-primary mb-2" />
                <CardTitle>{t("health.onboarding.actions.connect_api.title")}</CardTitle>
                <CardDescription>{t("health.onboarding.actions.connect_api.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>{t("health.onboarding.actions.connect_api.features.instant")}</li>
                    <li>{t("health.onboarding.actions.connect_api.features.verified")}</li>
                    <li>{t("health.onboarding.actions.connect_api.features.no_errors")}</li>
                 </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full">{t("health.onboarding.actions.connect_api.button")}</Button>
            </CardFooter>
        </Card>

        <Card className="relative overflow-hidden">
            <CardHeader>
                <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
                <CardTitle>{t("health.onboarding.actions.upload.title")}</CardTitle>
                <CardDescription>{t("health.onboarding.actions.upload.description")}</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 hover:bg-muted/50 transition-colors">
                    <FileDown className="w-8 h-8 text-muted-foreground mx-auto" />
                    <div className="text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">{t("health.onboarding.actions.upload.drag_drop")}</span>
                        <br />PDF, JPG, CSV (max 10MB)
                    </div>
                 </div>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleUploadFile}>{t("health.onboarding.actions.upload.button")}</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
