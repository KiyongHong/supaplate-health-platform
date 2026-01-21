# PRD: 개인 맞춤형 건강검진 분석 플랫폼

## 1. 개요

### 1.1 제품 비전
건강보험공단 API를 통해 개인의 건강검진 데이터를 불러와, 일반적인 기준이 아닌 **Peter Attia의 Strict 기준**으로 심층 분석하고, **Huberman 프로토콜 기반의 개인화된 건강 개선 프로토콜**을 제공하는 프리미엄 헬스케어 플랫폼

### 1.2 핵심 가치 제안
- 🔬 **엄격한 기준 적용**: 일반 건강검진 기준이 아닌 Peter Attia의 Longevity 관점 Strict 기준으로 분석
- 📊 **심층 분석**: AI 기반 건강검진 데이터 해석 및 리스크 예측
- 💡 **실행 가능한 프로토콜**: Huberman Lab 지식 데이터베이스 기반 과학적 프로토콜 제공
- 💳 **프리미엄 서비스**: 결제를 통한 상세 분석 리포트 및 맞춤형 프로토콜 제공

---

## 2. 목표 사용자

### 2.1 Primary Persona
- **Bio-hacker / Health Optimizer**: 일반 건강검진 결과에 만족하지 못하고 더 엄격한 기준으로 건강을 관리하고 싶은 사용자
- **Peter Attia / Huberman 팔로워**: Outlive, Huberman Lab 등의 콘텐츠를 소비하는 건강에 관심 있는 사용자

### 2.2 Secondary Persona
- 건강검진 결과를 더 깊이 이해하고 싶은 일반 사용자
- 예방적 건강 관리에 관심 있는 30-50대 전문직

---

## 3. 핵심 기능

### 3.1 Phase 1: MVP (1차 개발 범위)

#### 3.1.1 인증 및 건강검진 데이터 연동
| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 소셜 로그인 | Google, Kakao 등 OAuth 로그인 | P0 |
| 본인인증 | PASS 인증 또는 공동인증서 연동 | P0 |
| 건강보험공단 API 연동 | 최근 건강검진 데이터 조회 | P0 |
| 데이터 파싱 및 저장 | 검진 결과 구조화 및 Supabase 저장 | P0 |

#### 3.1.2 Peter Attia 기준 분석 엔진
| 지표 | 일반 기준 | Peter Attia Strict 기준 |
|------|-----------|------------------------|
| 공복 혈당 | < 100 mg/dL | < 90 mg/dL |
| HbA1c | < 5.7% | < 5.4% |
| Fasting Insulin | - | < 8 μIU/mL |
| LDL Cholesterol | < 130 mg/dL | < 70 mg/dL (or lower based on ApoB) |
| ApoB | - | < 60 mg/dL (optimal) |
| Triglycerides | < 150 mg/dL | < 100 mg/dL |
| HDL | > 40 mg/dL | > 60 mg/dL |
| hs-CRP | < 3.0 mg/L | < 1.0 mg/L |
| Liver Enzymes (ALT) | < 41 U/L | < 25 U/L |
| Blood Pressure | < 140/90 | < 120/80 |
| Resting Heart Rate | - | < 60 bpm |
| VO2 Max 추정 | - | Top 25% for age |

#### 3.1.3 분석 결과 대시보드
| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 지표별 비교 시각화 | 일반 기준 vs Strict 기준 비교 차트 | P0 |
| 위험도 스코어링 | 각 지표별 위험도 점수화 (Low/Medium/High/Critical) | P0 |
| 종합 건강 점수 | 전체 건강 상태 종합 점수 | P1 |
| 트렌드 분석 | 연도별 건강검진 결과 변화 추이 | P2 |

#### 3.1.4 Huberman Protocol 추천 시스템
| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 프로토콜 매칭 | 분석 결과 기반 관련 Huberman 프로토콜 자동 추천 | P0 |
| 프로토콜 상세 | 각 프로토콜의 과학적 근거 및 실행 방법 제공 | P1 |
| 개인화 조정 | 사용자 상황에 맞는 프로토콜 커스터마이징 | P2 |

#### 3.1.5 결제 및 프리미엄 서비스
| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 무료 티어 | 기본 분석 결과 미리보기 (일부 지표만) | P0 |
| 프리미엄 결제 | 1회 분석 또는 구독 모델 | P0 |
| 상세 리포트 제공 | PDF 다운로드 가능한 전체 분석 리포트 | P1 |
| 이메일 리포트 | 주기적 건강 리마인더 및 팁 발송 | P2 |

---

### 3.2 Phase 2: 확장 기능 (향후 개발)

- **wearable 연동**: Apple Health, Oura Ring 등 데이터 통합
- **AI 상담**: GPT 기반 건강 상담 챗봇
- **의료진 연결**: 원격 진료 또는 기능의학 전문가 연결
- **커뮤니티**: 건강 데이터 기반 익명 커뮤니티

---

## 4. 기술 스택

### 4.1 Frontend
- **Framework**: React Router v7 (Supaplate 기반)
- **UI Components**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts 또는 Chart.js
- **State Management**: Zustand

### 4.2 Backend
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth + 본인인증 서비스
- **API Integration**: 건강보험공단 API

### 4.3 AI/ML
- **분석 엔진**: Gemini API 또는 GPT-4 (건강 데이터 해석)
- **RAG System**: Huberman 지식 데이터베이스 검색

### 4.4 결제
- **PG**: Stripe (Supaplate 기본 지원) 또는 토스페이먼츠

### 4.5 인프라
- **Hosting**: Vercel 또는 Cloudflare Pages
- **Monitoring**: Sentry (Supaplate 기본 지원)

---

## 5. 데이터 모델

### 5.1 핵심 테이블

```sql
-- 사용자 프로필 (기존 Supaplate users 확장)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  ci VARCHAR(255), -- 본인인증 CI 값
  verified_at TIMESTAMP,
  subscription_status VARCHAR(50), -- 'free', 'premium', 'expired'
  created_at TIMESTAMP DEFAULT NOW()
);

-- 건강검진 데이터
CREATE TABLE health_checkups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  checkup_date DATE NOT NULL,
  raw_data JSONB, -- 원본 API 응답
  parsed_data JSONB, -- 파싱된 지표 데이터
  analysis_result JSONB, -- Peter Attia 기준 분석 결과
  protocols JSONB, -- 추천된 Huberman 프로토콜
  created_at TIMESTAMP DEFAULT NOW()
);

-- 결제 내역
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  checkup_id UUID REFERENCES health_checkups(id),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'KRW',
  status VARCHAR(50),
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Huberman 프로토콜 데이터베이스
CREATE TABLE huberman_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  category VARCHAR(100), -- 'sleep', 'nutrition', 'exercise', 'supplements'
  related_biomarkers TEXT[], -- 관련 생체지표
  description TEXT,
  scientific_basis TEXT,
  implementation_steps JSONB,
  source_episode VARCHAR(255),
  embedding VECTOR(768) -- 시맨틱 검색용
);
```

---

## 6. 화면 설계 (와이어프레임)

### 6.1 주요 화면 구성

1. **랜딩 페이지** (`/`)
   - Hero: "당신의 건강검진 결과, 진짜 괜찮은 걸까요?"
   - Peter Attia vs 일반 기준 비교 설명
   - 무료 분석 시작 CTA

2. **로그인/인증** (`/auth`)
   - 소셜 로그인
   - 본인인증 (건강보험 데이터 연동용)

3. **대시보드** (`/dashboard`)
   - 건강검진 데이터 조회 상태
   - 기본 분석 결과 미리보기 (무료)
   - 프리미엄 업그레이드 프롬프트

4. **상세 분석** (`/analysis/:id`) - 프리미엄
   - 지표별 상세 분석
   - Peter Attia 기준 비교 차트
   - 종합 위험도 평가

5. **프로토콜 추천** (`/protocols`) - 프리미엄
   - 분석 결과 기반 Huberman 프로토콜 목록
   - 각 프로토콜 상세 설명 및 실행 가이드

6. **결제** (`/pricing`)
   - 1회 분석: ₩19,900
   - 연간 구독: ₩99,000 (무제한 분석)

7. **리포트** (`/report/:id`) - 프리미엄
   - PDF 다운로드 가능한 전체 리포트
   - 공유 가능한 링크 생성

---

## 7. 성공 지표 (KPIs)

| 지표 | 목표 (3개월) | 목표 (6개월) |
|------|-------------|-------------|
| MAU | 1,000 | 5,000 |
| 무료 → 프리미엄 전환율 | 5% | 10% |
| 유료 고객 수 | 50 | 500 |
| 월 매출 | ₩1,000,000 | ₩10,000,000 |
| NPS | 40+ | 50+ |

---

## 8. 리스크 및 고려사항

### 8.1 법적/규제
- [ ] 건강보험공단 API 사용 약관 확인
- [ ] 개인정보보호법 준수 (건강정보는 민감정보)
- [ ] 의료법 관련 검토 (진단 행위 vs 정보 제공)

### 8.2 기술적
- [ ] 건강보험공단 API 연동 안정성
- [ ] 본인인증 서비스 비용 및 연동 복잡도
- [ ] Huberman 데이터베이스 저작권 검토

### 8.3 비즈니스
- [ ] Peter Attia 관련 상표권 이슈 확인
- [ ] 경쟁 서비스 분석 및 차별화 전략

---

## 9. 개발 일정 (예상)

| Phase | 기간 | 주요 마일스톤 |
|-------|------|--------------|
| Phase 0 | 1주 | 환경 설정, 데이터 모델 설계 |
| Phase 1.1 | 2주 | 인증 및 건강보험 API 연동 |
| Phase 1.2 | 2주 | 분석 엔진 개발 |
| Phase 1.3 | 2주 | 대시보드 UI 개발 |
| Phase 1.4 | 1주 | 결제 연동 |
| Phase 1.5 | 1주 | 테스트 및 버그 수정 |
| **총 MVP** | **9주** | **프로덕션 출시** |

---

## 10. 부록

### 10.1 참고 자료
- Peter Attia, "Outlive: The Science and Art of Longevity"
- Huberman Lab Podcast 에피소드
- 건강보험공단 건강검진 API 문서

### 10.2 용어 정의
- **Strict 기준**: Peter Attia가 제안하는 최적 건강을 위한 엄격한 기준
- **프로토콜**: 특정 목표 달성을 위한 구조화된 행동 지침
- **Biomarker**: 건강 상태를 측정할 수 있는 생체 지표
