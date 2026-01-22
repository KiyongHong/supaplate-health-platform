export type Translation = {
  auth: Record<string, any>;
  users: Record<string, any>;
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
