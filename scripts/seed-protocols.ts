
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// We need to import the table schema. 
// Using relative path assuming this script is in root/scripts/ and schema is in app/features/protocols
// Check your file structure. Based on earlier view: app/features/health/schema.ts exports hubermanProtocols
// Correction: The schema for hubermanProtocols was defined in app/features/health/schema.ts
import { hubermanProtocols } from "../app/features/health/schema";

// DB Connection
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString);
const db = drizzle(client);

const protocols = [
  {
    title: "Morning Sunlight Viewing",
    category: "sleep",
    related_biomarkers: ["cortisol", "melatonin", "sleep_quality"],
    description: "View sunlight within 30-60 minutes of waking up to set your circadian rhythm using retinal ganglion cells.",
    scientific_basis: "Huberman Lab Episode 2: Master Your Sleep. Sunlight triggers cortisol pulse which sets the rhythm for melatonin release 12-14 hours later.",
    implementation_steps: {
        steps: [
            "Go outside within 30-60 mins of waking.",
            "View sunlight for 5-10 mins on sunny days, 20-30 mins on cloudy days.",
            "Do not wear sunglasses (eyeglasses/contacts are fine).",
            "Do not look directly at the sun if it hurts."
        ]
    },
    source_episode: "Master Your Sleep & Be More Alert When Awake",
  },
  {
    title: "Non-Sleep Deep Rest (NSDR)",
    category: "stress_management",
    related_biomarkers: ["cortisol", "hrv", "stress"],
    description: "A deep relaxation technique to recover lost sleep and reduce stress in real-time.",
    scientific_basis: "Huberman Lab: NSDR protocols replenish dopamine and reduce cortisol levels effectively.",
    implementation_steps: {
        steps: [
            "Find a quiet place to lie down.",
            "Listen to a 10-20 minute NSDR or Yoga Nidra script (e.g. on YouTube).",
            "Focus on breathing and body scan."
        ]
    },
    source_episode: "Sleep Toolkit: Tools for Optimizing Sleep & Sleep-Wake Timing",
  },
  {
    title: "Zone 2 Cardio",
    category: "exercise",
    related_biomarkers: ["resting_heart_rate", "vo2_max", "mitochondrial_health"],
    description: "Low intensity steady state cardio where you can hold a conversation but it requires effort.",
    scientific_basis: "Effective for building mitochondrial base, improving insulin sensitivity and fat oxidation.",
    implementation_steps: {
        steps: [
            "Perform 150-180 minutes per week.",
            "Keep heart rate at 60-70% of max.",
            "Can be brisk walking, jogging, cycling, or swimming."
        ]
    },
    source_episode: "Dr. Peter Attia: Exercise, Nutrition, Hormones for Longevity",
  },
  {
      title: "Cold Exposure (Deliberate Cold Plunge)",
      category: "metabolism",
      related_biomarkers: ["dopamine", "norepinephrine", "inflammation"],
      description: "Immersing body in cold water to spike dopamine and improve resilience.",
      scientific_basis: "Increases dopamine by 2.5x for hours. Increases metabolic rate via brown fat activation.",
      implementation_steps: {
          steps: [
              "Start with 1-3 minutes in cold water (10-15°C / 50-60°F).",
              "Focus on controlling breathing (slow exhales).",
              "Aim for 11 minutes total per week."
          ]
      },
      source_episode: "Using Deliberate Cold Exposure for Health and Performance"
  },
  {
      title: "Magnesium Threonate or Glycinate",
      category: "supplements",
      related_biomarkers: ["sleep_quality", "magnesium"],
      description: "Supplementing specific forms of magnesium to aid sleep onset and depth.",
      scientific_basis: "Magnesium Threonate crosses BBB effectively. Glycinate is muscle relaxing.",
      implementation_steps: {
         steps: [
             "Take 145mg Magnesium Threonate or 200mg Bisglycinate.",
             "Consume 30-60 minutes before sleep.",
             "Avoid if it causes digestive issues."
         ]
      },
      source_episode: "Master Your Sleep & Be More Alert When Awake"
  }
];

async function main() {
  console.log("🌱 Seeding Huberman Protocols...");
  
  try {
      // Basic insert without vectors for now
      // Note: embedding column is optional in schema definition if we didn't add notNull()
      // Let's check schema: embedding: vector("embedding", { dimensions: 768 }) - usually nullable by default in drizzle unless .notNull() is called
    for (const protocol of protocols) {
      await db.insert(hubermanProtocols).values(protocol);
    }
    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await client.end();
  }
}

main();
