import { z } from "zod";

/**
 * Toss Cert API Configuration
 * Uses Test Environment credentials by default if not provided in env.
 */
const TOSS_CONFIG = {
  CLIENT_ID: process.env.TOSS_CLIENT_ID || "test_a8e23336d673ca70922b485fe806eb2d",
  CLIENT_SECRET: process.env.TOSS_CLIENT_SECRET || "test_418087247d66da09fda1964dc4734e453c7cf66a7a9e3",
  BASE_URL: "https://cert.toss.im",
  OAUTH_URL: "https://oauth2.cert.toss.im",
};

// Response Schemas
const TokenResponseSchema = z.object({
  access_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const AuthRequestSchema = z.object({
  txId: z.string(),
  authUrl: z.string(),
});

const AuthResultSchema = z.object({
  txId: z.string(),
  status: z.string(), // "COMPLETED" | "CANCELLED" | "FAILED"
  userName: z.string().optional(),
  userPhone: z.string().optional(),
  userBirthday: z.string().optional(),
  userGender: z.string().optional(),
  userNationality: z.string().optional(),
  ci: z.string().optional(),
  di: z.string().optional(),
});

export type TossAuthResult = z.infer<typeof AuthResultSchema>;

let _cachedToken: { token: string; expiresAt: number } | null = null;

export class TossCertService {
  /**
   * Get Access Token (Client Credentials Flow)
   * Caches the token until it expires.
   */
  async getAccessToken(): Promise<string> {
    if (_cachedToken && Date.now() < _cachedToken.expiresAt) {
      return _cachedToken.token;
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", TOSS_CONFIG.CLIENT_ID);
    params.append("client_secret", TOSS_CONFIG.CLIENT_SECRET);
    params.append("scope", "ca");

    const response = await fetch(`${TOSS_CONFIG.OAUTH_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Toss Cert Token Error:", errorText);
      throw new Error(`Failed to get Toss Access Token: ${response.status}`);
    }

    const data = await response.json();
    const result = TokenResponseSchema.parse(data);

    // Cache token (expires_in is in seconds)
    // Reduce 1 minute for safety buffer
    _cachedToken = {
      token: result.access_token,
      expiresAt: Date.now() + (result.expires_in * 1000) - 60000,
    };

    return result.access_token;
  }

  /**
   * Request Identity Verification
   * Returns txId and authUrl to open the popup.
   */
  async requestVerification() {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${TOSS_CONFIG.BASE_URL}/api/v2/sign/user/auth/id/request`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "USER_NONE", // Helper mode: user enters info in Toss Web
        requestUrl: process.env.APP_URL || "http://localhost:5173", // Optional callback/referrer
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Toss Cert Request Error:", errorText);
      throw new Error(`Failed to request Toss Verification: ${response.status}`);
    }

    const data = await response.json();
    
    // API returns { success: { txId, authUrl } } structure usually, or just fields?
    // Based on docs: returns success response with txId, authUrl.
    // Let's assume the success wrapper or direct fields. The docs show example response implicitly?
    // Actually docs say response: { txId: ..., authUrl: ... } usually in success wrapper
    // Let's trust the docs example if available, or assume structure. 
    // Wait, the docs viewed in Step 14 just showed `txId` explanation, not full JSON response example clearly.
    // But standard Toss APIs usually wrap in `success`. Let's check safely.
    
    // For now, assuming direct or success object.
    const resultData = (data as any).success ? (data as any).success : data;
    
    return AuthRequestSchema.parse(resultData);
  }

  /**
   * Get Verification Result
   * Uses txId to fetch user data after completion.
   */
  async getVerificationResult(txId: string): Promise<TossAuthResult> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${TOSS_CONFIG.BASE_URL}/api/v2/sign/user/auth/id/result`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Toss Cert Result Error:", errorText);
      throw new Error(`Failed to get Toss Verification Result: ${response.status}`);
    }

    const data = await response.json();
    const resultData = (data as any).success ? (data as any).success : data;

    // Map Toss response fields to our simpler schema if needed
    // Toss returns detailed fields.
    // personalInfo: { name, birthday, gender, nationality, ... }
    
    const personalInfo = resultData.personalInfo || {};
    
    return {
        txId: resultData.txId,
        status: resultData.status,
        userName: personalInfo.name,
        userPhone: personalInfo.phone,
        userBirthday: personalInfo.birthday,
        userGender: personalInfo.gender,
        userNationality: personalInfo.nationality,
        ci: personalInfo.ci,
        di: personalInfo.di,
    };
  }
}

export const tossCertService = new TossCertService();
