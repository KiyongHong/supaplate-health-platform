import type { HealthDataProvider, HealthCheckupData } from "./types";

/**
 * Mock Provider for development and testing.
 * Returns slightly randomized data to simulate real-world variations.
 */
export class MockHealthProvider implements HealthDataProvider {
  name = "MOCK";

  async getHealthData(authParams: any): Promise<HealthCheckupData[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(`[MockProvider] Fetching data... Params:`, authParams);

    return [
      {
        checkupDate: new Date().toISOString().split("T")[0],
        glucose: {
          fasting: 92 + Math.floor(Math.random() * 15), // 92-107 (Strict < 90)
          hba1c: 5.3 + Math.random() * 0.5, // 5.3-5.8 (Strict < 5.4)
        },
        lipids: {
          totalCholesterol: 180 + Math.floor(Math.random() * 40),
          ldl: 90 + Math.floor(Math.random() * 40), // 90-130 (Strict < 70)
          hdl: 40 + Math.floor(Math.random() * 30), // 40-70 (Strict > 60)
          triglycerides: 80 + Math.floor(Math.random() * 80), // 80-160 (Strict < 100)
          apob: 70 + Math.floor(Math.random() * 30), // Mocking advanced metric
        },
        inflammation: {
          hsCrp: 0.5 + Math.random() * 2.5, // 0.5-3.0 (Strict < 1.0)
        },
        liver: {
          alt: 20 + Math.floor(Math.random() * 20),
          ast: 20 + Math.floor(Math.random() * 20),
          gammaGtp: 15 + Math.floor(Math.random() * 30),
        },
        cardio: {
          bpSystolic: 115 + Math.floor(Math.random() * 20),
          bpDiastolic: 75 + Math.floor(Math.random() * 15),
          restingHeartRate: 55 + Math.floor(Math.random() * 15),
        },
        metabolic: {
          insulin: 4 + Math.floor(Math.random() * 10), // 4-14 (Strict < 8)
        },
      },
    ];
  }
}
