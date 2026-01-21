
import "dotenv/config";
import db from "~/core/db/drizzle-client.server";
import { hubermanProtocols } from "~/features/health/schema";

const protocols = [
  {
    title: "Zone 2 Cardio Training",
    category: "Exercise",
    related_biomarkers: ["ldl", "hba1c", "triglycerides", "bpSystolic", "bpDiastolic"],
    description: "Low intensity steady state cardio to improve mitochondrial health and metabolic function.",
    scientific_basis: "Improves insulin sensitivity and lipid clearance. Peter Attia recommends 3-4 hours per week.",
    implementation_steps: [
      "Keep heart rate at 180 - age",
      "Can hold a conversation but difficult",
      "Do 45-60 min sessions",
      "Aim for 3-4x per week"
    ],
    source_episode: "The Science of Fitness & Exercise",
  },
  {
    title: "Morning Sunlight Viewing",
    category: "Sleep",
    related_biomarkers: ["cortisol", "sleep_quality"],
    description: "View sunlight within 30-60 minutes of waking to anchor circadian rhythm.",
    scientific_basis: "Sets the circadian clock, boosts early day cortisol, and triggers timed melatonin release for sleep.",
    implementation_steps: [
      "Go outside within 1 hour of waking",
      "View sunlight for 10-30 mins (never look directly at sun)",
      "Do not wear sunglasses (eyeglasses are ok)",
      "If dark, turn on bright overhead lights"
    ],
    source_episode: "Master Your Sleep",
  },
  {
    title: "NSDR (Non-Sleep Deep Rest)",
    category: "Stress/Recovery",
    related_biomarkers: ["hscrp", "cortisol", "bpSystolic"],
    description: "A protocol to restore energy and focus, similar to Yoga Nidra.",
    scientific_basis: "Accelerates neuroplasticity and recovery. Reduces stress hormones.",
    implementation_steps: [
      "Find a quiet place to lie down",
      "Listen to an NSDR script (10-20 mins)",
      "Focus on breathing and body scanning",
      "Use when tired or after intense learning"
    ],
    source_episode: "Tools for Managing Stress & Anxiety",
  },
  {
    title: "Magnesium Threonate Supplementation",
    category: "Sleep/Cognition",
    related_biomarkers: ["sleep_quality", "magnesium"],
    description: "Specific form of magnesium that crosses the blood-brain barrier.",
    scientific_basis: "Supports sleep onset and cognitive function.",
    implementation_steps: [
      "Take 145mg of Magnesium Threonate",
      "30-60 minutes before sleep",
      "Combine with Apigenin (50mg) and Theanine (100-200mg) for best results"
    ],
    source_episode: "Master Your Sleep",
  },
  {
    title: "Strict Sugar Elimination",
    category: "Nutrition",
    related_biomarkers: ["hba1c", "glucose", "triglycerides", "ldl"],
    description: "Eliminate added sugars and refined carbohydrates to lower insulin.",
    scientific_basis: "Rapidly reduces liver fat and improves insulin sensitivity.",
    implementation_steps: [
      "Avoid all sweetened beverages",
      "Check labels for added sugar",
      "Focus on whole, unprocessed foods",
      "Replace simple carbs with complex carbs or fats"
    ],
    source_episode: "Sugar & The Brain",
  }
];

async function seed() {
  console.log("🌱 Seeding Huberman Protocols...");
  
  for (const protocol of protocols) {
    await db.insert(hubermanProtocols).values({
      ...protocol,
      implementation_steps: protocol.implementation_steps,
    });
  }

  console.log("✅ Seeding Complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding Failed:", err);
  process.exit(1);
});
