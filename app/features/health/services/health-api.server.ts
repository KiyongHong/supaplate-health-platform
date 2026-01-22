import type { HealthDataProvider, HealthCheckupData } from "./providers/types";
import { MockHealthProvider } from "./providers/mock-provider";
import { NHISHealthProvider } from "./providers/nhis-provider";

// Re-export types for consumers
export type { HealthCheckupData };

/**
 * Health Data Service Factory
 * Selects the appropriate provider based on environment variables.
 */
class HealthDataService {
  private provider: HealthDataProvider;

  constructor() {
    const providerType = process.env.HEALTH_API_PROVIDER || "MOCK";
    
    switch (providerType) {
      case "NHIS":
      case "REAL":
        this.provider = new NHISHealthProvider();
        break;
      case "MOCK":
      default:
        this.provider = new MockHealthProvider();
        break;
    }
    
    console.log(`[HealthDataService] Initialized with provider: ${this.provider.name}`);
  }

  async getHealthData(authParams: any): Promise<HealthCheckupData[]> {
    return this.provider.getHealthData(authParams);
  }
}

// Singleton instance
const service = new HealthDataService();

export async function fetchHealthDataFromAPI(authParams: any): Promise<HealthCheckupData[]> {
  return service.getHealthData(authParams);
}

