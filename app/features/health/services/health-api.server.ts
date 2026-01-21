export type HealthCheckupData = {
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
    apob?: number;
  };
  inflammation: {
    hsCrp?: number;
  };
  liver: {
    alt: number;
    ast: number;
    gammaGtp: number;
  };
  cardio: {
    bpSystolic: number;
    bpDiastolic: number;
    restingHeartRate?: number;
  };
  metabolic: {
    insulin?: number;
  };
};

export async function fetchHealthDataFromAPI(ci: string): Promise<HealthCheckupData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log(`Fetching health data for CI: ${ci}`);

  // Mock Data based on Peter Attia's concerns (slightly elevated values for demonstration)
  return [
    {
      checkupDate: new Date().toISOString().split("T")[0],
      glucose: {
        fasting: 98, // Attia strict < 90
        hba1c: 5.6, // Attia strict < 5.4
      },
      lipids: {
        totalCholesterol: 200,
        ldl: 110, // Attia strict < 70
        hdl: 45, // Attia strict > 60
        triglycerides: 140, // Attia strict < 100
      },
      inflammation: {
        hsCrp: 1.5, // Attia strict < 1.0
      },
      liver: {
        alt: 30, // Attia strict < 25
        ast: 28,
        gammaGtp: 35,
      },
      cardio: {
        bpSystolic: 125, // Attia strict < 120
        bpDiastolic: 82, // Attia strict < 80
      },
      metabolic: {
        insulin: 10, // Attia strict < 8
      }
    },
  ];
}
