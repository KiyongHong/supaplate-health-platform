/**
 * Topics Data
 *
 * Category and topic definitions for the Topics page.
 * This data structure is designed to be easily modifiable.
 *
 * Categories are based on Peter Attia's health framework and PRD requirements:
 * - Metabolic Health: Blood sugar, insulin, HbA1c
 * - Cardiovascular Health: Cholesterol, blood pressure, hs-CRP
 * - Sleep: Huberman sleep protocols
 * - Exercise: Strength, cardio, VO2 Max
 * - Nutrition: Diet, fasting, supplements
 * - Liver Health: ALT, liver function
 * - Longevity: Peter Attia Outlive concepts
 * - Protocols: Huberman protocols integration
 */

import type { Category, CategoryId } from "./topics-types";

/**
 * All categories with their topics
 * Ordered by relevance to health checkup analysis
 */
export const CATEGORIES: Category[] = [
  {
    id: "metabolic-health",
    name: "Metabolic Health",
    nameKo: "대사 건강",
    icon: "activity",
    topics: [
      {
        slug: "blood-sugar",
        title: "Blood Sugar Control",
        titleKo: "혈당 조절",
        description:
          "Understanding fasting glucose, post-meal spikes, and why Peter Attia recommends stricter targets than standard guidelines.",
        descriptionKo:
          "공복 혈당, 식후 혈당 스파이크, 그리고 Peter Attia가 일반 가이드라인보다 엄격한 목표를 권장하는 이유를 알아봅니다.",
        image: "/topics/blood-sugar.jpg",
        postCount: 0,
      },
      {
        slug: "insulin-resistance",
        title: "Insulin Resistance",
        titleKo: "인슐린 저항성",
        description:
          "The hidden driver of metabolic disease. Learn why fasting insulin is a critical biomarker often overlooked in standard tests.",
        descriptionKo:
          "대사 질환의 숨겨진 원인. 공복 인슐린이 표준 검사에서 종종 간과되는 중요한 바이오마커인 이유를 알아봅니다.",
        image: "/topics/insulin-resistance.jpg",
        postCount: 0,
      },
      {
        slug: "hba1c",
        title: "HbA1c Deep Dive",
        titleKo: "HbA1c 심층 분석",
        description:
          "Beyond the standard 5.7% threshold. Why Attia targets below 5.4% for optimal metabolic health.",
        descriptionKo:
          "표준 5.7% 기준을 넘어서. Attia가 최적의 대사 건강을 위해 5.4% 미만을 목표로 하는 이유.",
        image: "/topics/hba1c.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "cardiovascular-health",
    name: "Cardiovascular Health",
    nameKo: "심혈관 건강",
    icon: "heart",
    topics: [
      {
        slug: "apob",
        title: "ApoB: The Real Cholesterol Marker",
        titleKo: "ApoB: 진정한 콜레스테롤 지표",
        description:
          "Why ApoB matters more than LDL-C. Attia's strict target of <60 mg/dL for optimal cardiovascular protection.",
        descriptionKo:
          "ApoB가 LDL-C보다 중요한 이유. 최적의 심혈관 보호를 위한 Attia의 엄격한 목표 <60 mg/dL.",
        image: "/topics/apob.jpg",
        postCount: 0,
      },
      {
        slug: "blood-pressure",
        title: "Blood Pressure Optimization",
        titleKo: "혈압 최적화",
        description:
          "The silent killer. Why 120/80 should be your ceiling, not your target.",
        descriptionKo:
          "조용한 살인자. 120/80이 목표가 아니라 상한선이어야 하는 이유.",
        image: "/topics/blood-pressure.jpg",
        postCount: 0,
      },
      {
        slug: "inflammation",
        title: "Inflammation & hs-CRP",
        titleKo: "염증 & hs-CRP",
        description:
          "Chronic inflammation as a root cause. Attia's target of hs-CRP <1.0 mg/L.",
        descriptionKo:
          "만성 염증의 근본 원인. Attia의 hs-CRP <1.0 mg/L 목표.",
        image: "/topics/inflammation.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "sleep",
    name: "Sleep",
    nameKo: "수면",
    icon: "moon",
    topics: [
      {
        slug: "sleep-optimization",
        title: "Sleep Optimization",
        titleKo: "수면 최적화",
        description:
          "Huberman's evidence-based protocols for improving sleep quality and duration.",
        descriptionKo:
          "수면의 질과 지속 시간을 개선하기 위한 Huberman의 과학적 프로토콜.",
        image: "/topics/sleep-optimization.jpg",
        postCount: 0,
      },
      {
        slug: "circadian-rhythm",
        title: "Circadian Rhythm",
        titleKo: "생체 리듬",
        description:
          "Light exposure, timing, and the science of your internal clock.",
        descriptionKo: "광노출, 타이밍, 그리고 내부 시계의 과학.",
        image: "/topics/circadian-rhythm.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "exercise",
    name: "Exercise",
    nameKo: "운동",
    icon: "dumbbell",
    topics: [
      {
        slug: "zone2-training",
        title: "Zone 2 Training",
        titleKo: "존2 트레이닝",
        description:
          "The foundation of metabolic fitness. Building mitochondrial efficiency through low-intensity steady-state cardio.",
        descriptionKo:
          "대사 피트니스의 기초. 저강도 지속 유산소 운동을 통한 미토콘드리아 효율성 구축.",
        image: "/topics/zone2-training.jpg",
        postCount: 0,
      },
      {
        slug: "vo2max",
        title: "VO2 Max",
        titleKo: "VO2 Max",
        description:
          "The single best predictor of longevity. How to measure and improve your aerobic capacity.",
        descriptionKo:
          "장수의 가장 좋은 예측 지표. 유산소 능력을 측정하고 개선하는 방법.",
        image: "/topics/vo2max.jpg",
        postCount: 0,
      },
      {
        slug: "strength-training",
        title: "Strength & Muscle Mass",
        titleKo: "근력 & 근육량",
        description:
          "Preserving muscle mass as we age. Attia's framework for resistance training.",
        descriptionKo:
          "나이가 들어도 근육량 유지하기. Attia의 저항 훈련 프레임워크.",
        image: "/topics/strength-training.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition",
    nameKo: "영양",
    icon: "utensils",
    topics: [
      {
        slug: "protein",
        title: "Protein Intake",
        titleKo: "단백질 섭취",
        description:
          "Why most people under-consume protein. Attia's recommendations for optimal muscle protein synthesis.",
        descriptionKo:
          "대부분의 사람들이 단백질을 부족하게 섭취하는 이유. 최적의 근육 단백질 합성을 위한 Attia의 권장 사항.",
        image: "/topics/protein.jpg",
        postCount: 0,
      },
      {
        slug: "fasting",
        title: "Fasting & Time-Restricted Eating",
        titleKo: "단식 & 시간 제한 식이",
        description:
          "The science of fasting. Benefits, risks, and practical implementation.",
        descriptionKo: "단식의 과학. 이점, 위험, 그리고 실용적인 적용 방법.",
        image: "/topics/fasting.jpg",
        postCount: 0,
      },
      {
        slug: "supplements",
        title: "Supplements",
        titleKo: "보충제",
        description:
          "Evidence-based supplementation. What Huberman and Attia actually recommend.",
        descriptionKo:
          "과학적 근거 기반 보충제. Huberman과 Attia가 실제로 권장하는 것.",
        image: "/topics/supplements.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "liver-health",
    name: "Liver Health",
    nameKo: "간 건강",
    icon: "pill",
    topics: [
      {
        slug: "liver-enzymes",
        title: "Liver Enzymes (ALT/AST)",
        titleKo: "간 효소 (ALT/AST)",
        description:
          "Why Attia targets ALT <25 U/L. The liver as a metabolic hub.",
        descriptionKo:
          "Attia가 ALT <25 U/L을 목표로 하는 이유. 대사 허브로서의 간.",
        image: "/topics/liver-enzymes.jpg",
        postCount: 0,
      },
      {
        slug: "fatty-liver",
        title: "Fatty Liver Disease",
        titleKo: "지방간",
        description:
          "NAFLD: The silent epidemic. Prevention and reversal strategies.",
        descriptionKo: "NAFLD: 조용한 유행병. 예방 및 역전 전략.",
        image: "/topics/fatty-liver.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "longevity",
    name: "Longevity",
    nameKo: "장수",
    icon: "hourglass",
    topics: [
      {
        slug: "four-horsemen",
        title: "The Four Horsemen",
        titleKo: "네 가지 죽음의 기수",
        description:
          "Heart disease, cancer, neurodegenerative disease, and metabolic dysfunction. Attia's framework for longevity.",
        descriptionKo:
          "심장 질환, 암, 신경퇴행성 질환, 대사 기능 장애. Attia의 장수 프레임워크.",
        image: "/topics/four-horsemen.jpg",
        postCount: 0,
      },
      {
        slug: "healthspan",
        title: "Healthspan vs Lifespan",
        titleKo: "건강수명 vs 수명",
        description:
          "Living better, not just longer. The quality of your years matters.",
        descriptionKo:
          "단순히 오래 사는 것이 아니라 더 잘 사는 것. 삶의 질이 중요합니다.",
        image: "/topics/healthspan.jpg",
        postCount: 0,
      },
    ],
  },
  {
    id: "protocols",
    name: "Protocols",
    nameKo: "프로토콜",
    icon: "clipboard-list",
    topics: [
      {
        slug: "morning-routine",
        title: "Morning Routine Protocol",
        titleKo: "아침 루틴 프로토콜",
        description:
          "Huberman's evidence-based morning routine for optimal energy and focus.",
        descriptionKo:
          "최적의 에너지와 집중력을 위한 Huberman의 과학적 아침 루틴.",
        image: "/topics/morning-routine.jpg",
        postCount: 0,
      },
      {
        slug: "stress-management",
        title: "Stress Management",
        titleKo: "스트레스 관리",
        description:
          "Physiological sigh, cold exposure, and other tools for real-time stress reduction.",
        descriptionKo:
          "생리적 한숨, 냉수 노출, 그리고 실시간 스트레스 감소를 위한 다른 도구들.",
        image: "/topics/stress-management.jpg",
        postCount: 0,
      },
      {
        slug: "focus-protocol",
        title: "Focus & Productivity",
        titleKo: "집중력 & 생산성",
        description:
          "Dopamine, adenosine, and the neuroscience of sustained attention.",
        descriptionKo: "도파민, 아데노신, 그리고 지속적인 주의력의 신경과학.",
        image: "/topics/focus-protocol.jpg",
        postCount: 0,
      },
    ],
  },
];

/**
 * Get category by ID
 */
export function getCategoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

/**
 * Get all category IDs for navigation
 */
export function getCategoryIds(): CategoryId[] {
  return CATEGORIES.map((category) => category.id as CategoryId);
}

/**
 * Get topic by category and slug
 */
export function getTopicBySlug(
  categoryId: CategoryId,
  topicSlug: string
): { category: Category; topic: (typeof CATEGORIES)[0]["topics"][0] } | null {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  const topic = category.topics.find((t) => t.slug === topicSlug);
  if (!topic) return null;

  return { category, topic };
}
