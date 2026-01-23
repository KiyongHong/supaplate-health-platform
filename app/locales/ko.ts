import type { Translation } from "./types";

const ko: Translation = {
  auth: {
    login: {
      title: "로그인",
      header: {
        title: "환영합니다",
        description: "계정에 로그인하려면 이메일을 입력하세요",
      },
      email: {
        label: "이메일",
        placeholder: "m@example.com",
      },
      password: {
        label: "비밀번호",
        placeholder: "비밀번호를 입력하세요",
      },
      forgot_password: "비밀번호를 잊으셨나요?",
      action: "로그인",
      no_account: "계정이 없으신가요?",
      sign_up: "회원가입",
      errors: {
        email_not_confirmed: "이메일이 확인되지 않았습니다",
        before_verify: "로그인하기 전에 이메일 인증이 필요합니다.",
        resend_confirmation: "인증 이메일 재전송",
      },
    },
    register: {
      title: "계정 만들기",
      header: {
        title: "계정 만들기",
        description: "계정을 생성하기 위해 정보를 입력해주세요",
      },
      name: {
        label: "이름",
        placeholder: "홍길동",
      },
      email: {
        label: "이메일",
        placeholder: "m@example.com",
      },
      password: {
        label: "비밀번호",
        hint: "최소 8자 이상이어야 합니다",
        placeholder: "비밀번호를 입력하세요",
      },
      confirm_password: {
        label: "비밀번호 확인",
        placeholder: "비밀번호를 다시 입력하세요",
      },
      marketing: "마케팅 이메일 수신에 동의합니다.",
      terms: {
        text: "다음",
        tos: "이용약관",
        and: "과",
        privacy: "개인정보 처리방침에 동의합니다",
      },
      action: "회원가입",
      success: {
        title: "이메일을 확인해주세요",
        description: "입력하신 이메일 주소로 인증 링크를 보냈습니다.",
      },
      already_have_account: "이미 계정이 있으신가요?",
      sign_in: "로그인",
    },
    forgot_password: {
      title: "비밀번호 찾기",
      header: {
        title: "비밀번호 찾기",
        description: "이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다",
      },
      email: {
        label: "이메일",
        placeholder: "m@example.com",
      },
      action: "재설정 링크 보내기",
      success: "이메일로 발송된 비밀번호 재설정 링크를 확인해주세요",
    },
    magic_link: {
      title: "매직 링크",
      header: {
        title: "매직 링크 로그인",
        description: "비밀번호 없이 로그인할 수 있는 링크를 보내드립니다.",
      },
      email: {
        label: "이메일",
        placeholder: "이메일을 입력하세요",
      },
      action: "매직 링크 보내기",
      success: "이메일함에서 매직 링크를 확인하세요.",
      errors: {
        create_account_first: "먼저 계정을 생성해주세요.",
        invalid_email: "유효한 이메일 주소를 입력해주세요.",
      },
    },
    otp: {
      start: {
        title: "OTP 로그인",
        header: {
          title: "OTP로 로그인",
          description: "일회용 비밀번호를 이메일로 보내드립니다.",
        },
        email: {
          label: "이메일",
          placeholder: "이메일을 입력하세요",
        },
        action: "코드 보내기",
      },
      complete: {
        title: "OTP 확인",
        header: {
          title: "코드 입력",
          description: "이메일로 전송된 6자리 코드를 입력하세요.",
        },
        action: "확인",
        errors: {
          verify_failed: "인증에 실패했습니다. 다시 시도해주세요.",
        },
      },
    },
    new_password: {
      title: "새 비밀번호",
      header: {
        title: "새 비밀번호 설정",
        description: "새 비밀번호를 입력해주세요.",
      },
      password: {
        label: "새 비밀번호",
        placeholder: "새 비밀번호 입력",
      },
      confirm_password: {
        label: "비밀번호 확인",
        placeholder: "새 비밀번호 확인",
      },
      action: "비밀번호 설정",
      success: "비밀번호가 성공적으로 업데이트되었습니다.",
    },
    confirm: {
      title: "이메일 확인",
      errors: {
        invalid_code: "유효하지 않거나 만료된 확인 코드입니다.",
        failed: "확인에 실패했습니다.",
      },
      email_change_success: "이메일이 성공적으로 변경되었습니다.",
    },
    email_verified: {
      title: "이메일 인증됨",
      header: "이메일 인증",
    },
    social: {
      or: "또는",
      continue_with: "{{provider}}로 계속하기",
      errors: {
        invalid_provider: "유효하지 않은 인증 제공자입니다.",
        invalid_code: "유효하지 않은 인증 코드입니다.",
        login_failed: "로그인에 실패했습니다.",
      },
    },
  },
  users: {
    dashboard: {
      title: "대시보드",
      header: "대시보드 개요",
      welcome: "환영합니다, {{name}}님!",
      verify_identity_to_start: "시작하려면 본인 인증을 완료하세요",
      no_data: {
        title: "건강 데이터 없음",
        description: "아직 건강검진 분석을 완료하지 않았습니다. 본인 인증을 통해 건강 데이터를 가져오세요.",
        action: "본인 인증하기",
      },
      health_score: {
        title: "건강 점수",
        description: "엄격한 기준에 따른 종합 건강 상태입니다.",
      },
      biomarkers: {
        title: "주요 바이오마커",
        strict_target: "엄격 목표: < {{value}}",
      },
      protocols: {
        title: "추천 프로토콜",
        no_protocols: "현재 데이터에 기반한 특별한 추천 프로토콜이 없습니다.",
        premium_locked: {
          title: "프리미엄 프로토콜 잠김",
          description: "프리미엄으로 업그레이드하여 Huberman Lab 과학 기반의 개인화된 건강 개선 프로토콜을 잠금 해제하세요.",
          action: "프로토콜 잠금 해제",
        },
      },
    },
    sidebar: {
      teams: {
        sales_forge: "세일즈 포지",
        techco: "테크코",
        growth_mate: "그로스 메이트",
      },
      nav: {
        dashboard: "대시보드",
        overview: "개요",
        health_checkup: "건강검진",
        analytics: "분석",
        reports: "보고서",
        customers: "고객",
        contacts: "연락처",
        companies: "회사",
        deals: "거래",
        sales: "영업",
        pipeline: "파이프라인",
        opportunities: "기회",
        quotes: "견적",
        invoices: "청구서",
        settings: "설정",
        workspace: "워크스페이스",
        team: "팀",
        integrations: "연동",
      },
      projects: {
        sales_team: "영업팀",
        customer_success: "고객 성공",
        marketing: "마케팅",
      },
    },
    verify_identity: {
      title: "본인 인증",
      header: "신원 확인",
    },
    components: {
      identity_verification: {
        title: "신원 확인",
        description: "건강 서비스를 이용하려면 본인 인증이 필요합니다.",
        verified: {
          title: "인증 완료",
          description: "신원 확인이 성공적으로 완료되었습니다.",
        },
        fields: {
          name: {
            label: "이름",
            placeholder: "이름을 입력하세요",
          },
          birthday: {
            label: "생년월일",
            placeholder: "YYYYMMDD",
          },
          phone: {
            label: "휴대폰 번호",
            placeholder: "01012345678",
          },
          id_front: {
            label: "주민등록번호 앞자리",
            placeholder: "YYMMDD",
          },
          id_back: {
            label: "주민등록번호 뒷자리 첫 번째 숫자",
            placeholder: "1",
          },
          auth_method: {
            label: "인증 방법",
          },
        },
        providers: {
          kakao: "카카오톡",
          payco: "페이코",
          samsung: "삼성패스",
          kb: "KB모바일",
          toss: "토스",
          naver: "네이버",
        },
        action: {
          submitting: "인증 중...",
          submit: "본인 인증하기",
        },
      },
    },
    account: {
      title: "계정",
      errors: {
        load_profile: "프로필을 불러오는데 실패했습니다",
        load_social: "소셜 계정을 불러오는데 실패했습니다",
      },
      forms: {
        edit_profile: {
          title: "프로필",
          description: "개인 정보를 업데이트하세요.",
          fields: {
            avatar: {
              label: "프로필 사진",
              max_size: "최대 크기: 5MB",
              formats: "형식: JPEG, PNG, WEBP",
            },
            name: {
              label: "이름",
              placeholder: "이름",
            },
            marketing_consent: {
              label: "마케팅 이메일 수신 동의",
            },
          },
          action: {
            save: "변경 사항 저장",
          },
          success: "프로필이 성공적으로 업데이트되었습니다.",
        },
        change_email: {
          title: "이메일",
          add_title: "이메일 추가",
          description: "이메일 주소를 업데이트하세요.",
          add_description: "계정에 이메일 주소를 추가하세요.",
          fields: {
            current_email: {
              label: "현재 이메일",
            },
            new_email: {
              label: "새 이메일",
            },
          },
          action: {
            change: "이메일 변경",
            add: "이메일 추가",
          },
          success: "새 이메일로 발송된 확인 링크를 확인하세요.",
        },
        change_password: {
          title: "비밀번호",
          add_title: "비밀번호 추가",
          description: "비밀번호를 변경하세요.",
          add_description: "계정에 비밀번호를 추가하세요.",
          fields: {
            new_password: {
              label: "새 비밀번호",
            },
            confirm_password: {
              label: "비밀번호 확인",
            },
          },
          action: {
            change: "비밀번호 변경",
            add: "비밀번호 설정",
          },
          success: "비밀번호가 성공적으로 업데이트되었습니다.",
        },
        connect_social: {
          title: "소셜 계정",
          description: "간편 로그인을 위해 소셜 계정을 연결하세요.",
        },
        delete_account: {
          title: "계정 삭제",
          fields: {
            confirm_delete: "계정 삭제를 확인합니다.",
            confirm_irreversible: "이 작업은 되돌릴 수 없음을 이해합니다.",
          },
          action: {
            delete: "계정 삭제",
          },
        },
      },
    },
  },
  health: {
    dashboard: {
      title: "건강 대시보드",
      subtitle: "종합 건강 개요",
      phase_badge: "{{phase}} 단계",
      score_label: "건강 점수",
      unlock_cta: "분석 잠금 해제",
      unlock_more_title: "상세 분석 잠금 해제",
      unlock_more_desc: "고급 건강 지표와 개인화된 프로토콜에 액세스하세요.",
      upgrade_button: "프리미엄으로 업그레이드",
      protocols_title: "나의 프로토콜",
      personalized_badge: "개인화됨",
      strict_access_title: "엄격한 기준 분석",
      strict_access_desc: "Peter Attia의 엄격한 기준 분석에 액세스하세요.",
      access_button: "액세스하기",
      metrics: {
        optimal: "최적",
        poor: "나쁨",
        sub_optimal: "주의",
        hidden_title: "숨겨진 지표",
        analysis_locked: "분석 잠금됨",
      }
    },
    onboarding: {
      title: "건강검진 가져오기",
      subtitle: "시작하려면 건강 데이터를 연결하세요",
      steps: {
        connect: "연동",
        processing: "처리 중",
        success: "성공",
      },
      actions: {
        connect_api: {
          title: "API로 연동",
          description: "건강보험공단에서 데이터를 안전하게 가져옵니다.",
          features: {
            instant: "즉시 가져오기",
            verified: "검증된 데이터",
            no_errors: "오류 없음",
          },
          button: "건강보험공단 연동",
        },
        upload: {
          title: "파일 업로드",
          description: "건강검진 결과 PDF/이미지를 업로드하세요.",
          drag_drop: "파일을 끌어다 놓거나 클릭하여 업로드",
          button: "파일 업로드",
        },
      },
      processing: {
        analyzing: "건강 데이터 분석 중...",
        mapping: "엄격한 기준에 매핑 중...",
        toast: "처리가 시작되었습니다",
        parsing_toast: "문서 파싱 중...",
      },
      success: {
        title: "가져오기 성공!",
        description: "건강 데이터가 성공적으로 가져와져 분석되었습니다.",
        button: "대시보드 보기",
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
        default_text: "Huberman Lab 프로토콜 기반.",
      },
      source: {
        title: "출처",
        podcast: "Huberman Lab 팟캐스트",
        listen_button: "에피소드 듣기",
      },
      biomarkers: {
        title: "관련 바이오마커",
      },
      view_details: "자세히 보기",
      more_steps: "+ {{count}}개 단계 더보기",
    },
  },
  payments: {
    history: {
      title: "결제 내역",
      empty_state: "결제 내역이 없습니다.",
      cta: "요금제 보기",
      table: {
        caption: "최근 거래 목록입니다.",
        order_id: "주문 ID",
        status: "상태",
        product: "상품",
        amount: "금액",
        date: "날짜",
        receipt: "영수증",
        view_receipt: "보기",
      },
    },
    upgrade: {
      title: "요금제 업그레이드",
      subtitle: "귀하에게 맞는 요금제를 선택하세요.",
      plan: {
        title: "프리미엄",
        popular: "가장 인기",
        description: "모든 기능과 개인화된 프로토콜을 잠금 해제하세요.",
        price: "$19",
        interval: "/월",
        features: [
          "고급 건강 분석",
          "개인화된 프로토콜",
          "엄격한 기준 비교",
          "우선 지원",
        ],
        button: "지금 업그레이드",
      },
    },
    checkout: {
      title: "결제",
      loading: "결제 불러오는 중...",
      demo_notice: "이것은 데모 결제 흐름입니다.",
      button: "결제 진행하기",
    },
    success: {
      title: "결제 성공!",
      message: "구매해 주셔서 감사합니다.",
      data_label: "거래 데이터",
    },
    failure: {
      title: "결제 실패",
      error_code: "오류 코드: {{code}}",
    },
  },
  common: {
    languages: {
      en: "English",
      ko: "한국어",
    },
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
  topics: {
    title: "주제별 탐색",
    description: "Peter Attia의 엄격한 기준과 Huberman Lab 프로토콜을 기반으로 건강 주제를 탐색하세요.",
    browse_content: "콘텐츠 보기",
    back_to_topics: "주제로 돌아가기",
    category_not_found: "카테고리를 찾을 수 없습니다",
    explore_category: "모든 {{category}} 주제 탐색",
    category_description: "{{category}} 관련 모든 주제",
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
