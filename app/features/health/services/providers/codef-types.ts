export interface CodefHealthCheckupResponse {
  resCheckupTarget: string; // 검진대상 여부
  resResultList: CodefCheckupResult[];
  resPreviewList?: any[]; // 이전검진내역 간단보기 (Not using for detailed analysis)
  resReferenceList?: any[]; // 참고치 (Not using)
}

export interface CodefCheckupResult {
  resType: string;
  resCheckupType: string; // 검진종류 (e.g. "일반검진")
  resCheckupYear: string; // 검진년도
  resCheckupDate: string; // 검진일자 (YYYYMMDD)
  resOrganizationName: string; // 검진기관명
  resOpinion: string; // 종합소견
  resOriGinalData: string; // 원본데이터 유무
  
  // Lists containing the actual data
  resQuestionInfoList?: CodefQuestionInfo[];
  resInfantsCheckupList?: any[]; // 영유아 검진 (Not using)
  resInfantsDentalList?: any[]; // 영유아 구강 (Not using)
  
  // This is where most physical exam data lives in the "General Health Checkup"
  // Note: The structure might vary slightly based on Codef's actual Parsing.
  // Based on scraping, "resInfantsCheckupList" was prominent, but for adults
  // there usually is a list of physical exam results.
  // Let's assume standard fields are often flattened or in a specific list.
  // Re-checking the structure: Codef often returns flattened fields for Adult checkups 
  // OR they might be inside 'resResultList' items directly if mapped.
  // However, looking at the JSON, we see `resPreviewList` which has the parsed data like `resFastingBloodSuger`.
  // Wait, `resPreviewList` seems to be "Previous Checkup History".
  // The actual detailed current result should be in `resResultList`.
  // Let's define the fields that might appear in `resResultList` item or its children.
  
  // Derived common fields often returned by Codef for consistency:
  resHeight?: string; 
  resWeight?: string; 
  resWaist?: string; 
  resBMI?: string; 
  resSightLeft?: string;
  resSightRight?: string;
  resHearingLeft?: string;
  resHearingRight?: string;
  resBloodPressure?: string; // "120/80"
  resUrinaryProtein?: string; 
  resHemoglobin?: string; 
  resFastingBloodSuger?: string; 
  resTotalCholesterol?: string; 
  resHDLCholesterol?: string; 
  resTriglyceride?: string; 
  resLDLCholesterol?: string; 
  resSerumCreatinine?: string; 
  resGFR?: string; 
  resAST?: string; 
  resALT?: string; 
  resGammaGTP?: string; // resyGPT in some docs
  resyGPT?: string; 
  resTBChestDisease?: string; 
  resOsteoporosis?: string; 
}

export interface CodefQuestionInfo {
  resSmokingStatus?: string;
  resAlcoholAmtList?: any[];
  resPhysicalActivityList?: any[];
}

export interface CodefAuthParams {
  userId?: string; // Internal User ID
  organization: string; // "0002"
  loginType: string; // "5" for Simple Auth
  loginTypeLevel: string; // "1": Kakao, "2": Payco, etc.
  userName: string;
  phoneNo: string;
  identity: string; // Resident Number (Front + 1 digit back or full)
  birthday: string; // YYYYMMDD
  type?: string; // "1": General Checkup
}
