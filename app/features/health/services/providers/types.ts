/**
 * Health Data Provider Interfaces
 */

export interface HealthCheckupData {
  checkupDate: string;
  glucose: {
    fasting: number;
    hba1c?: number;
  };
  lipids: {
    totalCholesterol: number;
    ldl: number;
    hdl: number;
    triglycerides: number;
    apob?: number; // Advanced
  };
  inflammation: {
    hsCrp?: number; // Advanced
  };
  liver: {
    alt: number;
    ast: number;
    gammaGtp: number;
  };
  cardio: {
    bpSystolic: number;
    bpDiastolic: number;
    restingHeartRate?: number; // Advanced
  };
  metabolic: {
    insulin?: number; // Advanced
  };
};

export interface HealthDataProvider {
  /**
   * Defines the name of the provider (e.g., "MOCK", "NHIS", "CODEF")
   */
  name: string;

  /**
   * Fetches health checkup data for a given user identity.
   * @param authParams - Authentication parameters (e.g., CI, Certificates, Tokens)
   */
  getHealthData(authParams: any): Promise<HealthCheckupData[]>;
}
