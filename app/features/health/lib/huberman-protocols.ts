/**
 * Huberman Lab Protocols
 *
 * Evidence-based protocols mapped to health goals and biomarker improvements.
 */

import { HealthStatus } from "./attia-standards";

export interface Protocol {
  id: string;
  title: string;
  category: "sleep" | "nutrition" | "exercise" | "stress" | "supplementation" | "light";
  description: string;
  actionItems: string[];
  duration?: string; // e.g., "Daily", "12 weeks"
  frequency?: string; // e.g., "Morning", "3x/week"
  source?: string; // e.g. "Huberman Lab Episode #12"
}

export const PROTOCOLS: Record<string, Protocol> = {
  morning_sunlight: {
    id: "morning_sunlight",
    title: "Morning Sunlight Viewing",
    category: "light",
    description: "View sunlight within 30-60 minutes of waking to set circadian rhythm.",
    actionItems: [
      "Go outside within 30-60 mins of waking.",
      "View sunlight for 10-30 mins (no sunglasses, do not verify directly at sun).",
      "On cloudy days, extend time to 20-30 mins.",
    ],
    frequency: "Daily",
    source: "Huberman Lab: Sleep Toolkit",
  },
  zone2_cardio: {
    id: "zone2_cardio",
    title: "Zone 2 Cardio Training",
    category: "exercise",
    description: "Low-intensity steady-state cardio to improve mitochondrial function and metabolic health.",
    actionItems: [
      "Perform cardio at a pace where you can hold a conversation but it requires effort.",
      "Aim for 180-200 minutes per week total.",
      "Sessions should be 45-60 minutes long.",
    ],
    duration: "Ongoing",
    frequency: "3-4x/week",
    source: "Peter Attia / Huberman Lab",
  },
  magnesium_threonate: {
    id: "magnesium_threonate",
    title: "Magnesium Threonate for Sleep",
    category: "supplementation",
    description: "Support sleep quality and cognitive function.",
    actionItems: ["Take 145mg of Magnesium Threonate 30-60 minutes before bed."],
    frequency: "Daily",
    source: "Huberman Lab: Sleep Toolkit",
  },
  low_carb_breakfast: {
    id: "low_carb_breakfast",
    title: "Meat & Nut Breakfast",
    category: "nutrition",
    description: "Stabilize blood sugar and dopamine for the day.",
    actionItems: [
        "Avoid starches and sugars at breakfast.",
        "Focus on high biological value protein and healthy fats.",
    ],
    frequency: "Daily",
    source: "Huberman Lab",
  },
  sauna_protocol: {
    id: "sauna_protocol",
    title: "Heat Exposure (Sauna)",
    category: "stress",
    description: "Improve cardiovascular health and reduce inflammation.",
    actionItems: [
        "57-100 degrees Celsius",
        "Total of 57 minutes per week minimum"
    ],
    frequency: "2-3x/week",
    source: "Huberman Lab"
  }
};

// Map Biomarker Issues to Protocols
export const BIOMARKER_TO_PROTOCOL: Record<string, string[]> = {
  // If Metabolic Health is poor (High Glucose, HbA1c, Insulin)
  hba1c: ["zone2_cardio", "low_carb_breakfast", "morning_sunlight"],
  fasting_glucose: ["zone2_cardio", "low_carb_breakfast"],
  insulin: ["zone2_cardio", "low_carb_breakfast"],
  
  // If Lipids are poor
  triglycerides: ["zone2_cardio", "low_carb_breakfast"], // Sugar drives trigs
  ldl: ["zone2_cardio"], // Clearance improves
  apob: ["zone2_cardio"],

  // Inflammation
  hs_crp: ["sauna_protocol", "morning_sunlight"], // Anti-inflammatory
  
  // General Sleep (often related to Cortisol/Inflammation)
  sleep: ["morning_sunlight", "magnesium_threonate"],
};

export function getProtocolsForMetric(metricKey: string, status: HealthStatus): Protocol[] {
  if (status === HealthStatus.OPTIMAL) return [];

  const protocolIds = BIOMARKER_TO_PROTOCOL[metricKey];
  if (!protocolIds) return [];

  return protocolIds.map((id) => PROTOCOLS[id]).filter(Boolean);
}
