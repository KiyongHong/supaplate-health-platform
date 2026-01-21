/**
 * Peter Attia's Strict Health Standards
 *
 * Defines ranges and analysis logic based on "Outlive" and his podcast principles.
 * Focuses on optimal longevity rather than just "normal" ranges.
 */

export enum HealthStatus {
  OPTIMAL = "OPTIMAL",
  NORMAL = "NORMAL",
  SUB_OPTIMAL = "SUB_OPTIMAL", // "Warning"
  POOR = "POOR", // "Danger"
}

export interface MetricStandard {
  unit: string;
  ranges: {
    optimal: { min?: number; max?: number };
    normal: { min?: number; max?: number };
    poor: { min?: number; max?: number }; // Anything outside normal/optimal usually maps to poor or sub-optimal
  };
  description: string;
}

export const ATTIA_STANDARDS: Record<string, MetricStandard> = {
  // Lipids
  ldl: {
    unit: "mg/dL",
    ranges: {
      optimal: { max: 70 }, // Aggressive target
      normal: { min: 70, max: 100 },
      poor: { min: 100 },
    },
    description: "Low-Density Lipoprotein. Attia targets < 70 mg/dL (or even lower) for high-risk prevention.",
  },
  apob: {
    unit: "mg/dL",
    ranges: {
      optimal: { max: 60 }, // Gold standard
      normal: { min: 60, max: 80 },
      poor: { min: 80 },
    },
    description: "ApoB is the primary driver of atherosclerosis. Target < 60 mg/dL.",
  },
  triglycerides: {
    unit: "mg/dL",
    ranges: {
      optimal: { max: 100 },
      normal: { min: 100, max: 150 },
      poor: { min: 150 },
    },
    description: "Measure of metabolic health. Should be lower than 100 mg/dL.",
  },
  hdl: {
    unit: "mg/dL",
    ranges: {
      optimal: { min: 60 },
      normal: { min: 40, max: 60 },
      poor: { max: 40 },
    },
    description: "High-Density Lipoprotein. Functional HDL matters more, but generally higher is better.",
  },
  
  // Metabolic
  hba1c: {
    unit: "%",
    ranges: {
      optimal: { max: 5.1 },
      normal: { min: 5.1, max: 5.7 },
      poor: { min: 5.7 },
    },
    description: "Average blood glucose. Attia prefers keeping it as low as possible without hypoglycemia.",
  },
  fasting_glucose: {
    unit: "mg/dL",
    ranges: {
      optimal: { max: 85 },
      normal: { min: 85, max: 100 },
      poor: { min: 100 },
    },
    description: "Fasting Glucose. Lower end of normal is better.",
  },
  insulin: {
    unit: "uIU/mL",
    ranges: {
      optimal: { max: 6 }, // Fasting insulin
      normal: { min: 6, max: 10 },
      poor: { min: 10 },
    },
    description: "Fasting Insulin. A very sensitive marker for metabolic dysfunction.",
  },

  // Inflammation
  hs_crp: {
    unit: "mg/L",
    ranges: {
      optimal: { max: 0.5 },
      normal: { min: 0.5, max: 1.0 },
      poor: { min: 1.0 },
    },
    description: "High-sensitivity C-reactive Protein. Marker of systemic inflammation. < 0.5 is ideal.",
  },
  
  // Liver
  alt: {
    unit: "U/L",
    ranges: {
      optimal: { max: 20 },
      normal: { min: 20, max: 30 },
      poor: { min: 30 },
    },
    description: "Alanine Transaminase. Liver enzyme. Should be low.",
  },
};

export interface AnalysisResult {
  metric: string;
  value: number;
  status: HealthStatus;
  standard: MetricStandard;
  message: string;
}

export function analyzeMetric(metricKey: string, value: number): AnalysisResult | null {
  const standard = ATTIA_STANDARDS[metricKey];
  if (!standard) return null;

  let status = HealthStatus.POOR;
  let message = "Needs attention.";

  // Check Optimal
  const opt = standard.ranges.optimal;
  if (
    (opt.max === undefined || value < opt.max) &&
    (opt.min === undefined || value > opt.min)
  ) {
    status = HealthStatus.OPTIMAL;
    message = "Excellent. Within strict optimal range.";
    return { metric: metricKey, value, status, standard, message };
  }

  // Check Normal (which might be "Sub-optimal" in Attia terms if it's not "Optimal")
  const norm = standard.ranges.normal;
  if (
    (norm.max === undefined || value <= norm.max) &&
    (norm.min === undefined || value >= norm.min)
  ) {
    status = HealthStatus.NORMAL; // Or SUB_OPTIMAL depending on philosophy
    message = "Normal range, but could be optimized.";
     // If the value is close to the boundary, we might flag it.
     // For now, let's keep it simple.
  }
  
  // If neither Optimal (returned above) nor Normal, it remains POOR.
  if (status !== HealthStatus.NORMAL) {
       status = HealthStatus.POOR;
       message = "Outside of optimal and normal ranges. Action recommended.";
  }
  
  // Refine Logic based on detailed ranges if needed
  // For Attia, "Normal" often equals "Sub-optimal". 
  // We will map: Optimal -> Optimal, Normal -> Sub-optimal, Poor -> Poor 
  
  if (status === HealthStatus.NORMAL) {
      status = HealthStatus.SUB_OPTIMAL;
      message = "Within standard reference range, but not optimal for longevity.";
  }

  return { metric: metricKey, value, status, standard, message };
}
