import { createHealthCheckup } from "~/features/health/queries.server";
import { analyzeBiomarker, calculateOverallScore } from "./analysis.server";
import type { HealthCheckupData } from "./health-api.server";

export async function processAndSaveCheckup(userId: string, data: HealthCheckupData) {
  // 1. Analyze Biomarkers
  const analysisResults: Record<string, any> = {};
  const scores: any[] = [];

  // Helper to run analysis and collect score
  const analyze = (key: string, value: number | undefined) => {
    if (value === undefined) return;
    const result = analyzeBiomarker(key, value);
    analysisResults[key] = result;
    scores.push(result);
  };

  analyze("hba1c", data.glucose.hba1c);
  analyze("ldl", data.lipids.ldl);
  analyze("hsCrp", data.inflammation.hsCrp);
  // Add more fields as needed mapping from HealthCheckupData to Analysis Engine keys

  // 2. Calculate Overall Score
  const overallScore = calculateOverallScore(scores);
  analysisResults["overall_score"] = overallScore;

  // 3. Save to Database
  return createHealthCheckup({
    user_id: userId,
    checkup_date: data.checkupDate,
    raw_data: data,
    parsed_data: data,
    analysis_result: analysisResults,
  });
}
