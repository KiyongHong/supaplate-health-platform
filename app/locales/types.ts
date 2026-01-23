export type Translation = {
  auth: {
    login: {
      title: string;
      header: {
        title: string;
        description: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      forgot_password: string;
      action: string;
      no_account: string;
      sign_up: string;
      errors: {
        email_not_confirmed: string;
        before_verify: string;
        resend_confirmation: string;
      };
    };
    register: {
      title: string;
      header: {
        title: string;
        description: string;
      };
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        hint: string;
        placeholder: string;
      };
      confirm_password: {
        label: string;
        placeholder: string;
      };
      marketing: string;
      terms: {
        text: string;
        tos: string;
        and: string;
        privacy: string;
      };
      action: string;
      success: {
        title: string;
        description: string;
      };
      already_have_account: string;
      sign_in: string;
    };
    forgot_password: {
      title: string;
      header: {
        title: string;
        description: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      action: string;
      success: string;
    };
    magic_link: {
      title: string;
      header: {
        title: string;
        description: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      action: string;
      success: string;
      errors: {
        create_account_first: string;
        invalid_email: string;
      };
    };
    otp: {
      start: {
        title: string;
        header: {
          title: string;
          description: string;
        };
        email: {
          label: string;
          placeholder: string;
        };
        action: string;
      };
      complete: {
        title: string;
        header: {
          title: string;
          description: string;
        };
        action: string;
        errors: {
          verify_failed: string;
        };
      };
    };
    new_password: {
      title: string;
      header: {
        title: string;
        description: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      confirm_password: {
        label: string;
        placeholder: string;
      };
      action: string;
      success: string;
    };
    confirm: {
      title: string;
      errors: {
        invalid_code: string;
        failed: string;
      };
      email_change_success: string;
    };
    email_verified: {
      title: string;
      header: string;
    };
    social: {
      or: string;
      continue_with: string;
      errors: {
        invalid_provider: string;
        invalid_code: string;
        login_failed: string;
      };
    };
  };
  users: {
    dashboard: {
      title: string;
      header: string;
      welcome: string;
      verify_identity_to_start: string;
      no_data: {
        title: string;
        description: string;
        action: string;
      };
      health_score: {
        title: string;
        description: string;
      };
      biomarkers: {
        title: string;
        strict_target: string;
      };
      protocols: {
        title: string;
        no_protocols: string;
        premium_locked: {
          title: string;
          description: string;
          action: string;
        };
      };
    };
    sidebar: {
      teams: {
        sales_forge: string;
        techco: string;
        growth_mate: string;
      };
      nav: {
        dashboard: string;
        overview: string;
        health_checkup: string;
        analytics: string;
        reports: string;
        customers: string;
        contacts: string;
        companies: string;
        deals: string;
        sales: string;
        pipeline: string;
        opportunities: string;
        quotes: string;
        invoices: string;
        settings: string;
        workspace: string;
        team: string;
        integrations: string;
      };
      projects: {
        sales_team: string;
        customer_success: string;
        marketing: string;
      };
    };
    verify_identity: {
      title: string;
      header: string;
    };
    components: {
      identity_verification: {
        title: string;
        description: string;
        verified: {
          title: string;
          description: string;
        };
        fields: {
          name: {
            label: string;
            placeholder: string;
          };
          birthday: {
            label: string;
            placeholder: string;
          };
          phone: {
            label: string;
            placeholder: string;
          };
          id_front: {
            label: string;
            placeholder: string;
          };
          id_back: {
            label: string;
            placeholder: string;
          };
          auth_method: {
            label: string;
          };
        };
        providers: {
          kakao: string;
          payco: string;
          samsung: string;
          kb: string;
          toss: string;
          naver: string;
        };
        action: {
          submitting: string;
          submit: string;
        };
      };
    };
    account: {
      title: string;
      errors: {
        load_profile: string;
        load_social: string;
      };
      forms: {
        edit_profile: {
          title: string;
          description: string;
          fields: {
            avatar: {
              label: string;
              max_size: string;
              formats: string;
            };
            name: {
              label: string;
              placeholder: string;
            };
            marketing_consent: {
              label: string;
            };
          };
          action: {
            save: string;
          };
          success: string;
        };
        change_email: {
          title: string;
          add_title: string;
          description: string;
          add_description: string;
          fields: {
            current_email: {
              label: string;
            };
            new_email: {
              label: string;
            };
          };
          action: {
            change: string;
            add: string;
          };
          success: string;
        };
        change_password: {
          title: string;
          add_title: string;
          description: string;
          add_description: string;
          fields: {
            new_password: {
              label: string;
            };
            confirm_password: {
              label: string;
            };
          };
          action: {
            change: string;
            add: string;
          };
          success: string;
        };
        connect_social: {
          title: string;
          description: string;
        };
        delete_account: {
          title: string;
          fields: {
            confirm_delete: string;
            confirm_irreversible: string;
          };
          action: {
            delete: string;
          };
        };
      };
    };
  };
  health: {
    dashboard: {
      title: string;
      subtitle: string;
      phase_badge: string;
      score_label: string;
      unlock_cta: string;
      unlock_more_title: string;
      unlock_more_desc: string;
      upgrade_button: string;
      protocols_title: string;
      personalized_badge: string;
      strict_access_title: string;
      strict_access_desc: string;
      access_button: string;
      metrics: {
        optimal: string;
        poor: string;
        sub_optimal: string;
        hidden_title: string;
        analysis_locked: string;
      }
    };
    onboarding: {
      title: string;
      subtitle: string;
      steps: {
        connect: string;
        processing: string;
        success: string;
      };
      actions: {
        connect_api: {
          title: string;
          description: string;
          features: {
            instant: string;
            verified: string;
            no_errors: string;
          };
          button: string;
        };
        upload: {
          title: string;
          description: string;
          drag_drop: string;
          button: string;
        };
      };
      processing: {
        analyzing: string;
        mapping: string;
        toast: string;
        parsing_toast: string;
      };
      success: {
        title: string;
        description: string;
        button: string;
      };
    };
    protocol: {
      back_button: string;
      implementation_guide: {
        title: string;
        step_prefix: string;
      };
      scientific_basis: {
        title: string;
        default_text: string;
      };
      source: {
        title: string;
        podcast: string;
        listen_button: string;
      };
      biomarkers: {
        title: string;
      };
      view_details: string;
      more_steps: string;
    };
  };
  payments: {
    history: {
      title: string;
      empty_state: string;
      cta: string;
      table: {
        caption: string;
        order_id: string;
        status: string;
        product: string;
        amount: string;
        date: string;
        receipt: string;
        view_receipt: string;
      };
    };
    upgrade: {
      title: string;
      subtitle: string;
      plan: {
        title: string;
        popular: string;
        description: string;
        price: string;
        interval: string;
        features: string[];
        button: string;
      };
    };
    checkout: {
      title: string;
      loading: string;
      demo_notice: string;
      button: string;
    };
    success: {
      title: string;
      message: string;
      data_label: string;
    };
    failure: {
      title: string;
      error_code: string;
    };
  };
  common: {
    languages: {
      en: string;
      ko: string;
    };
    footer: {
      copyright: string;
      privacy: string;
      terms: string;
    };
    error: {
      title: string;
      message: string;
      back_home: string;
    };
    not_found: {
      title: string;
      message: string;
      back_home: string;
    };
    nav: {
      login: string;
      logout: string;
      join: string;
      dashboard: string;
      health: string;
      blog: string;
      pricing: string;
      settings: string;
    };
  };
  legal: {
    privacy: string;
    terms: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    message: string;
    send: string;
  };
  blog: {
    posts: {
      title: string;
      description: string;
      author_on: string;
    };
    post: {
      not_found: string;
      author_on: string;
    };
  };
  topics: {
    title: string;
    description: string;
    browse_content: string;
    back_to_topics: string;
    category_not_found: string;
    explore_category: string;
    category_description: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
    features: {
      strict_standards: {
        title: string;
        description: string;
      };
      actionable_protocols: {
        title: string;
        description: string;
      };
      preventative_focus: {
        title: string;
        description: string;
      };
    }
  };
};
