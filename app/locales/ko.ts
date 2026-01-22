import type { Translation } from "./types";

const ko: Translation = {
  auth: {
    login: {
      title: "로그인",
    }
  },
  users: {
    dashboard: {
      title: "대시보드",
    }
  },
  health: {
    dashboard: {
      title: "건강 상태 리포트",
      subtitle: "Peter Attia의 장수 프레임워크 기준",
      phase_badge: "Phase 1 분석",
      score_label: "종합 건강 점수",
      unlock_cta: "전체 리포트 잠금 해제",
      unlock_more_title: "{{count}}개의 추가 심층 지표 잠금 해제",
      unlock_more_desc: "ApoB, 인슐린, hs-CRP 및 상세 Huberman 프로토콜 분석을 확인하세요.",
      upgrade_button: "프리미엄 업그레이드 (₩19,900)",
      protocols_title: "권장 프로토콜",
      personalized_badge: "나만을 위한 맞춤형",
      strict_access_title: "엄격한 프로토콜 접근",
      strict_access_desc: "귀하의 혈액 검사 결과에 맞춘 {{count}}개의 상세 프로토콜(복용량, 시기, 실행 가이드)을 확인하세요.",
      access_button: "Huberman 프로토콜 접근하기",
      metrics: {
        optimal: "최적",
        poor: "주의",
        sub_optimal: "관리 필요",
        hidden_title: "숨겨진 지표",
        analysis_locked: "분석 잠김",
      }
    },
    onboarding: {
      title: "건강 데이터 불러오기",
      subtitle: "과학적인 프로토콜을 제공하기 위해 최신 혈액 검사 결과가 필요합니다. 귀하의 데이터는 암호화되어 안전하게 보호됩니다.",
      steps: {
        connect: "방법 선택",
        processing: "분석 중",
        success: "완료",
      },
      actions: {
        connect_api: {
          title: "건강보험공단 API 연결",
          description: "간편 인증을 통해 지난 10년치 데이터를 자동으로 불러옵니다.",
          features: {
            instant: "즉시 가져오기",
            verified: "공식 기록 확인",
            no_errors: "수동 입력 오류 없음",
          },
          button: "공단 데이터 연결",
        },
        upload: {
          title: "파일 업로드 / 직접 입력",
          description: "병원에서 받은 PDF나 CSV 파일을 업로드하세요.",
          drag_drop: "클릭하여 업로드하거나 파일을 여기로 끌어다 놓으세요",
          button: "리포트 업로드",
        },
      },
      processing: {
        analyzing: "생체 데이터 분석 중",
        mapping: "Peter Attia의 프레임워크에 지표를 매핑하는 중...",
        toast: "건강보험공단 API에 연결하는 중...",
        parsing_toast: "CSV 데이터를 분석하는 중...",
      },
      success: {
        title: "분석 완료",
        description: "관리가 필요한 {{count}}개의 바이오마커를 발견했습니다.",
        button: "내 대시보드 보기",
      },
    },
    protocol: {
      back_button: "대시보드로 돌아가기",
      implementation_guide: {
        title: "실행 가이드",
        step_prefix: "단계",
      },
      scientific_basis: {
        title: "과학적 근거",
        default_text: "이 프로토콜은 바이오마커의 유의미한 개선을 보여주는 작용 기전 연구를 기반으로 합니다. Huberman 박사는 노력 대비 효율이 높은 이 방식을 강조합니다.",
      },
      source: {
        title: "참고 자료",
        podcast: "Huberman Lab 팟캐스트",
        listen_button: "에피소드 듣기",
      },
      biomarkers: {
        title: "목표 바이오마커",
      },
      view_details: "상세 보기",
      more_steps: "+{{count}}개 단계 더보기",
    },
  },
  payments: {
    history: {
      title: "결제 내역",
      empty_state: "결제 내역이 없습니다.",
      cta: "테스트 결제하기",
      table: {
        caption: "최근 결제 내역 목록입니다.",
        order_id: "주문 ID",
        status: "상태",
        product: "상품",
        amount: "금액",
        date: "날짜",
        receipt: "영수증",
        view_receipt: "영수증 보기",
      },
    },
    upgrade: {
      title: "건강의 잠재력을 모두 깨우세요",
      subtitle: "귀하의 고유한 생체 지표에 맞춘 개인별 Huberman Lab 프로토콜을 받아보세요.",
      plan: {
        title: "프리미엄 플랜",
        popular: "인기",
        description: "건강을 최적화하는 데 필요한 모든 것.",
        price: "₩19,900",
        interval: "/월",
        features: [
          "Peter Attia의 엄격한 분석",
          "무제한 건강 데이터 동기화",
          "Huberman Lab 프로토콜 추천",
          "트렌드 추적 및 히스토리",
        ],
        button: "지금 업그레이드",
      },
    },
    checkout: {
      title: "결제",
      loading: "결제 수단을 불러오는 중...",
      demo_notice: "이 페이지는 토스페이먼츠 연동 데모 페이지입니다. 실제로 결제가 이루어지지 않습니다.",
      button: "10,000원에 구매하기",
    },
    success: {
      title: "결제 완료",
      message: "토스 API를 통해 결제가 확인되었습니다. 토스에서 받은 데이터는 다음과 같습니다.",
      data_label: "원본 데이터",
    },
    failure: {
      title: "결제 확인 오류",
      error_code: "오류 코드: {{code}}",
    },
  },
  common: {
    footer: {
      copyright: "© {{year}} {{appName}}. 모든 권리 보유.",
      privacy: "개인정보 처리방침",
      terms: "이용약관",
    },
    error: {
      title: "오류",
      message: "서버 오류",
      back_home: "홈으로 돌아가기",
    },
    not_found: {
      title: "페이지를 찾을 수 없습니다",
      message: "요청하신 페이지가 존재하지 않습니다.",
      back_home: "홈으로 돌아가기",
    },
    nav: {
      login: "로그인",
      logout: "로그아웃",
      join: "회원가입",
      dashboard: "대시보드",
      health: "건강",
      blog: "블로그",
      pricing: "가격",
      settings: "설정",
    },
  },
  legal: {
    privacy: "개인정보 처리방침",
    terms: "이용약관",
  },
  contact: {
    title: "문의하기",
    subtitle: "보통 24시간 이내에 답변을 드립니다.",
    email: "이메일",
    message: "메시지",
    send: "메시지 보내기",
  },
  blog: {
    posts: {
      title: "블로그",
      description: "우리의 개발 여정을 따라오세요!",
      author_on: "{{author}}님이 {{date}}에 작성",
    },
    post: {
      not_found: "404 페이지를 찾을 수 없습니다",
      author_on: "{{author}}님이 {{date}}에 작성",
    },
  },
  home: {
    title: "HabitGrove",
    subtitle: "개인형 건강 분석의 미래",
    cta: "분석 시작하기",
    features: {
      strict_standards: {
        title: "엄격한 기준",
        description: "'병원 기준치'는 잊으세요. Peter Attia 박사가 정의한 최적의 장수 목표치로 혈액 검사를 분석합니다.",
      },
      actionable_protocols: {
        title: "실행 가능한 프로토콜",
        description: "단순한 숫자만 보여드리지 않습니다. 지표를 개선하기 위한 Huberman Lab의 과학적 프로토콜을 제공합니다.",
      },
      preventative_focus: {
        title: "예방 중심",
        description: "사후 치료에서 선제적 건강 최적화로 전환하세요. 대사 기능 장애를 수십 년 앞서 발견합니다.",
      },
    },
  },
};

export default ko;
