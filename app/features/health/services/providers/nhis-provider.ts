import type { HealthDataProvider, HealthCheckupData } from "./types";
import type { CodefHealthCheckupResponse, CodefCheckupResult } from "./codef-types";

/**
 * NHIS Provider Implementation using Codef API
 */
export class NHISHealthProvider implements HealthDataProvider {
  name = "NHIS_CODEF";
  
  private clientId: string | undefined;
  private clientSecret: string | undefined;
  private accessToken: string | undefined;

  constructor() {
    this.clientId = process.env.CODEF_CLIENT_ID;
    this.clientSecret = process.env.CODEF_CLIENT_SECRET;
  }

  async getHealthData(authParams: any): Promise<HealthCheckupData[]> {
    console.log(`[NHISProvider] Connecting to Codef API...`);
    
    // 1. Ensure we have credentials
    if (!this.clientId || !this.clientSecret) {
      console.warn("Missing Codef credentials. Returning mock data or throwing error.");
      // For now, if no credentials, we might want to throw or return empty.
      // throw new Error("CODEF_CLIENT_ID and CODEF_CLIENT_SECRET are required.");
    }

    // 2. Fetch Data from Codef
    let rawData: CodefHealthCheckupResponse | null = null;
    
    try {
      rawData = await this.fetchCodefData(authParams);
    } catch (error) {
      console.error("Failed to fetch data from Codef:", error);
      throw error;
    }

    if (!rawData || !rawData.resResultList) {
      return [];
    }

    // 3. Parse Data
    // We Map all available results.
    const parsedData = rawData.resResultList.map(item => this.parseCodefItem(item));
    
    // Filter out any nulls if parsing failed for some items
    return parsedData.filter((item): item is HealthCheckupData => item !== null);
  }

  private async fetchCodefData(authParams: any): Promise<CodefHealthCheckupResponse> {
    const CODEF_API_URL = "https://api.codef.io/v1/kr/public/pp/nhis-health-check";

    // Need an access token first
    const token = await this.getAccessToken();

    // Construct body based on Auth Params (Simple Auth)
    const body: any = {
      organization: "0002",
      id: authParams.userId, // Codef often needs 'id' field, mapped from our user id or specific id
      // Map known Simple Auth fields
      loginType: authParams.loginType,
      loginTypeLevel: authParams.loginTypeLevel,
      userName: authParams.userName,
      phoneNo: authParams.phoneNo,
      identity: authParams.identity,
      birthday: authParams.birthday,
      type: "1", // General Checkup
    };

    // Remove undefined fields
    Object.keys(body).forEach(key => body[key] === undefined && delete body[key]);

    const response = await fetch(CODEF_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Codef API Error: ${response.status} ${errorText}`);
    }

    const json = await response.json();
    
    // Check Codef Result Code
    if (json.result?.code !== "CF-00000") {
         console.warn("Codef returned non-success code:", json.result);
         // If CF-03002 (2FA required), we should propagate that, but for now we log.
    }
    
    return json.data as CodefHealthCheckupResponse;
  }

  private async getAccessToken(): Promise<string> {
      // Basic OAuth 2.0 Client Credentials flow for Codef
      if (this.accessToken) return this.accessToken;

      const TOKEN_URL = "https://oauth.codef.io/oauth/token";
      const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

      const response = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&scope=read' // scope might vary
      });

       if (!response.ok) {
        throw new Error("Failed to get Codef Access Token");
       }

       const data = await response.json();
       this.accessToken = data.access_token;
       return this.accessToken!;
  }

  private parseCodefItem(item: CodefCheckupResult): HealthCheckupData | null {
    if (!item.resCheckupDate) return null;

    const parseNum = (val: string | undefined) => {
        if (!val) return 0;
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
    }

    // Blood Pressure "120/80"
    let bpSystolic = 0;
    let bpDiastolic = 0;
    if (item.resBloodPressure) {
        const parts = item.resBloodPressure.split('/');
        if (parts.length === 2) {
            bpSystolic = parseNum(parts[0]);
            bpDiastolic = parseNum(parts[1]);
        }
    }

    // Codef keys are sometimes Korean in certain products, but based on the JSON doc they are English-ish "res..."
    // We map them here.

    return {
      checkupDate: item.resCheckupDate, // YYYYMMDD
      glucose: {
        fasting: parseNum(item.resFastingBloodSuger),
        // hba1c might not be in the basic preview list, check if available in Codef response
        // If not present, it stays undefined
      },
      lipids: {
        totalCholesterol: parseNum(item.resTotalCholesterol),
        ldl: parseNum(item.resLDLCholesterol),
        hdl: parseNum(item.resHDLCholesterol),
        triglycerides: parseNum(item.resTriglyceride),
      },
      liver: {
        alt: parseNum(item.resALT),
        ast: parseNum(item.resAST),
        gammaGtp: parseNum(item.resGammaGTP || item.resyGPT),
      },
      cardio: {
        bpSystolic,
        bpDiastolic,
      },
      metabolic: {
        // Insulin is usually not in standard NHIS checkup
      },
      inflammation: {
          // hsCRP is usually not in standard NHIS checkup
      }
    };
  }
}
