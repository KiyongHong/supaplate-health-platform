import { useState } from "react";
import { useNavigate, Form } from "react-router";
import { Loader2, FileDown, CheckCircle, Database, UploadCloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/core/components/ui/card";
import { Button } from "~/core/components/ui/button";
import { Progress } from "~/core/components/ui/progress";
import { Label } from "~/core/components/ui/label";
import { Input } from "~/core/components/ui/input";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
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
    toast.info("Connecting to Health Insurance API...");
    simulateProcessing();
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Parsing CSV data...");
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
                <h2 className="text-xl font-semibold">Analyzing Biological Data</h2>
                <p className="text-sm text-muted-foreground">Mapping your markers to Peter Attia's frameworks...</p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</p>
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
                  <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">Analysis Complete</h2>
                  <p className="text-sm text-muted-foreground">We found 5 biomarkers that need attention.</p>
              </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" size="lg" onClick={() => navigate("/dashboard/health")}>
                    View My Dashboard
                </Button>
            </CardFooter>
          </Card>
        </div>
      );
  }

  return (
    <div className="container max-w-4xl py-20 mx-auto px-4">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl font-bold">Import Your Health Data</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          To provide scientific protocols, we need your latest blood work. 
          Your data is encrypted and never shared.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="relative overflow-hidden cursor-pointer hover:border-primary transition-all group" onClick={handleConnectAPI}>
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10" />
            <CardHeader>
                <Database className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Connect Health Insurance API</CardTitle>
                <CardDescription>Authorize via simple ID verification. Fetches data from last 10 years.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                    <li>Instant import</li>
                    <li>Verified official records</li>
                    <li>No manual entry errors</li>
                 </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Connect API</Button>
            </CardFooter>
        </Card>

        <Card className="relative overflow-hidden">
            <CardHeader>
                <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
                <CardTitle>Upload File / Manual Entry</CardTitle>
                <CardDescription>Upload a PDF or CSV from your hospital.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 hover:bg-muted/50 transition-colors">
                    <FileDown className="w-8 h-8 text-muted-foreground mx-auto" />
                    <div className="text-sm text-muted-foreground">
                        <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                        <br />PDF, JPG, CSV (max 10MB)
                    </div>
                 </div>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleUploadFile}>Upload Report</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
