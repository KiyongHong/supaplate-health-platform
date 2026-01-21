export const StrictCriteria = {
  glucose: { optimal: 90 }, // < 90 mg/dL
  hba1c: { optimal: 5.4, warning_limit: 5.7 }, // < 5.4%, Warning if >= 5.4 & < 5.7
  ldl: { optimal: 70, warning_limit: 110 }, // < 70 mg/dL
  triglycerides: { optimal: 100 }, // < 100 mg/dL
  hsCrp: { optimal: 1.0 }, // < 1.0 mg/L
  alt: { optimal: 25 }, // < 25 U/L
  bpSystolic: { optimal: 120 }, // < 120 mmHg
  bpDiastolic: { optimal: 80 }, // < 80 mmHg
};

export type AnalysisResult = {
  status: "optimal" | "normal" | "warning" | "critical";
  score: number;
  target: number;
};

export function analyzeBiomarker(name: string, value: number): AnalysisResult {
  switch (name) {
    case "hba1c":
      if (value < StrictCriteria.hba1c.optimal) return { status: "optimal", score: 100, target: StrictCriteria.hba1c.optimal };
      if (value < StrictCriteria.hba1c.warning_limit) return { status: "warning", score: 70, target: StrictCriteria.hba1c.optimal };
      return { status: "critical", score: 40, target: StrictCriteria.hba1c.optimal };

    case "ldl":
      if (value < StrictCriteria.ldl.optimal) return { status: "optimal", score: 100, target: StrictCriteria.ldl.optimal };
      if (value < StrictCriteria.ldl.warning_limit) return { status: "warning", score: 75, target: StrictCriteria.ldl.optimal };
      return { status: "critical", score: 50, target: StrictCriteria.ldl.optimal };
    
    // Default fallback for other markers (simplified logic for MVP)
    default:
      return { status: "normal", score: 80, target: 0 };
  }
}

export function calculateOverallScore(results: AnalysisResult[]): number {
  if (results.length === 0) return 0;
  const total = results.reduce((acc, curr) => acc + curr.score, 0);
  return Math.round(total / results.length);
}
