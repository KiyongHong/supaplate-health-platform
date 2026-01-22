import { NHISHealthProvider } from "./nhis-provider";
import type { CodefHealthCheckupResponse } from "./codef-types";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock Data based on scraped documentation
const MOCK_CODEF_RESPONSE: CodefHealthCheckupResponse = {
  resCheckupTarget: "Y",
  resResultList: [
    {
      resType: "1",
      resCheckupType: "General",
      resCheckupYear: "2023",
      resCheckupDate: "20231015",
      resOrganizationName: "Test Hospital",
      resOpinion: "Good",
      resOriGinalData: "Y",
      resHeight: "175",
      resWeight: "70",
      resWaist: "80",
      resBMI: "22.9",
      resBloodPressure: "120/80",
      resFastingBloodSuger: "95",
      resTotalCholesterol: "180",
      resHDLCholesterol: "50",
      resLDLCholesterol: "110",
      resTriglyceride: "100",
      resAST: "20",
      resALT: "21",
      resyGPT: "25",
    }
  ]
};

describe("NHISHealthProvider", () => {
  let provider: NHISHealthProvider;

  beforeEach(() => {
    provider = new NHISHealthProvider();
  });

  // Mock the private fetchCodefData method (or strictly test parseCodefItem which is private)
  // Since we want to test the public API `getHealthData`, we need to mock the internal fetch.
  // Ideally, we would have dependency injection for the fetcher, but for this quick implementation,
  // we can cast to any to spy on the private method or mock the global fetch?
  // Let's mock the global fetch since the real implementation uses it.

  it("should correctly parse Codef response", async () => {
    // Mock successful Codef API response
    global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes("oauth/token")) {
             return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ access_token: "mock_token" })
             });
        }
        if (url.includes("nhis-health-check")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ 
                    result: { code: "CF-00000" },
                    data: MOCK_CODEF_RESPONSE 
                })
            });
        }
        return Promise.reject(new Error("Unknown URL"));
    }) as any;

    // We assume credentials are set or we fake them
    process.env.CODEF_CLIENT_ID = "test_id";
    process.env.CODEF_CLIENT_SECRET = "test_secret";
    // Re-instantiate to pick up env vars
    provider = new NHISHealthProvider();

    const results = await provider.getHealthData({ userId: "test", identity: "test" });

    expect(results).toHaveLength(1);
    const result = results[0];

    expect(result.checkupDate).toBe("20231015");
    expect(result.cardio.bpSystolic).toBe(120);
    expect(result.cardio.bpDiastolic).toBe(80);
    expect(result.glucose.fasting).toBe(95);
    expect(result.lipids.totalCholesterol).toBe(180);
    expect(result.lipids.ldl).toBe(110);
    expect(result.liver.gammaGtp).toBe(25);
  });

  it("should correctly handle Simple Auth parameters", async () => {
     const mockFetch = vi.fn().mockImplementation((url: string, options: any) => {
        if (url.includes("oauth/token")) {
             return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ access_token: "mock_token" })
             });
        }
        // Verify Simple Auth Body
        if (url.includes("nhis-health-check")) {
            const body = JSON.parse(options.body);
            expect(body.loginType).toBe("5");
            expect(body.loginTypeLevel).toBe("1");
            expect(body.userName).toBe("Test User");
            expect(body.organization).toBe("0002");
            expect(body.phoneNo).toBe("01012345678");
            
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ 
                    result: { code: "CF-00000" },
                    data: MOCK_CODEF_RESPONSE 
                })
            });
        }
        return Promise.reject(new Error("Unknown URL"));
    });
    global.fetch = mockFetch as any;

    process.env.CODEF_CLIENT_ID = "test_id";
    process.env.CODEF_CLIENT_SECRET = "test_secret";
    provider = new NHISHealthProvider();

    const results = await provider.getHealthData({
        userId: "user-123",
        loginType: "5",
        loginTypeLevel: "1", // Kakao
        userName: "Test User",
        phoneNo: "01012345678",
        identity: "9001011",
        birthday: "19900101"
    });

    expect(results).toHaveLength(1);
    expect(mockFetch).toHaveBeenCalledTimes(2); // Token + API
  });
});
