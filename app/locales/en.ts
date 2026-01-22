import type { Translation } from "./types";

const en: Translation = {
  auth: {
    login: {
      title: "Login",
    }
  },
  users: {
    dashboard: {
      title: "Dashboard",
    }
  },
  health: {
    dashboard: {
      title: "Health Status Report",
      subtitle: "Based on Peter Attia's Longevity Framework",
      phase_badge: "Phase 1 Analysis",
      score_label: "Overall Health Score",
      unlock_cta: "Unlock Full Report",
      unlock_more_title: "Unlock {{count}} More Advanced Metrics",
      unlock_more_desc: "See your deep analysis for ApoB, Insulin, hs-CRP and detailed Huberman protocols.",
      upgrade_button: "Upgrade to Premium (₩19,900)",
      protocols_title: "Recommended Protocols",
      personalized_badge: "Personalized for You",
      strict_access_title: "Strict Protocol Access",
      strict_access_desc: "Get exact dosage, timing, and implementation guides for {{count}} specific protocols tailored to your blood work.",
      access_button: "Access Huberman Protocols",
      metrics: {
        optimal: "Optimal",
        poor: "Poor",
        sub_optimal: "Sub Optimal",
        hidden_title: "Hidden Metric",
        analysis_locked: "Analysis Locked",
      }
    },
    onboarding: {
      title: "Import Your Health Data",
      subtitle: "To provide scientific protocols, we need your latest blood work. Your data is encrypted and never shared.",
      steps: {
        connect: "Select Method",
        processing: "Processing",
        success: "Success",
      },
      actions: {
        connect_api: {
          title: "Connect Health Insurance API",
          description: "Authorize via simple ID verification. Fetches data from last 10 years.",
          features: {
            instant: "Instant import",
            verified: "Verified official records",
            no_errors: "No manual entry errors",
          },
          button: "Connect API",
        },
        upload: {
          title: "Upload File / Manual Entry",
          description: "Upload a PDF or CSV from your hospital.",
          drag_drop: "Click to upload or drag and drop",
          button: "Upload Report",
        },
      },
      processing: {
        analyzing: "Analyzing Biological Data",
        mapping: "Mapping your markers to Peter Attia's frameworks...",
        toast: "Connecting to Health Insurance API...",
        parsing_toast: "Parsing CSV data...",
      },
      success: {
        title: "Analysis Complete",
        description: "We found {{count}} biomarkers that need attention.",
        button: "View My Dashboard",
      },
    },
    protocol: {
      back_button: "Back to Dashboard",
      implementation_guide: {
        title: "Implementation Guide",
        step_prefix: "Step",
      },
      scientific_basis: {
        title: "Scientific Basis",
        default_text: "This protocol is based on mechanism of action studies showing significant improvement in biomarkers. Dr. Huberman emphasizes this implementation for its high efficacy-to-effort ratio.",
      },
      source: {
        title: "Source Material",
        podcast: "Huberman Lab Podcast",
        listen_button: "Listen to Episode",
      },
      biomarkers: {
        title: "Biomarkers Targeted",
      },
      view_details: "View Details",
      more_steps: "+{{count}} more steps",
    },
  },
  payments: {
    history: {
      title: "Payments",
      empty_state: "No payments found.",
      cta: "Make a test payment",
      table: {
        caption: "A list of your recent payments.",
        order_id: "Order ID",
        status: "Status",
        product: "Product",
        amount: "Amount",
        date: "Date",
        receipt: "Receipt",
        view_receipt: "View receipt",
      },
    },
    upgrade: {
      title: "Unlock Full Health Potential",
      subtitle: "Get personalized Huberman Lab protocols tailored to your unique biology.",
      plan: {
        title: "Premium Plan",
        popular: "POPULAR",
        description: "Everything you need to optimize your health.",
        price: "$9.99",
        interval: "/mo",
        features: [
          "Peter Attia Strict Analysis",
          "Unlimited Health Data Sync",
          "Huberman Lab Protocol Recommendations",
          "Trend Tracking & History",
        ],
        button: "Upgrade Now",
      },
    },
    checkout: {
      title: "Checkout",
      loading: "Loading payment methods...",
      demo_notice: "This is a page to demo the Toss Payments integration. You aren't actually buying anything.",
      button: "Buy for 10,000원",
    },
    success: {
      title: "Payment Complete",
      message: "We have verified the payment with the Toss API. Here is the data we got from Toss.",
      data_label: "Raw Data",
    },
    failure: {
      title: "Payment Verification Error",
      error_code: "Error code: {{code}}",
    },
  },
  common: {
    footer: {
      copyright: "© {{year}} {{appName}}. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    error: {
      title: "Error",
      message: "Server Error",
      back_home: "Go home",
    },
    not_found: {
      title: "Page not found",
      message: "The page you are looking for does not exist.",
      back_home: "Go home",
    },
    nav: {
      login: "Login",
      logout: "Logout",
      join: "Join",
      dashboard: "Dashboard",
      health: "Health",
      blog: "Blog",
      pricing: "Pricing",
      settings: "Settings",
    },
  },
  legal: {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  contact: {
    title: "Contact Us",
    subtitle: "We usually respond within 24 hours.",
    email: "Email",
    message: "Message",
    send: "Send Message",
  },
  blog: {
    posts: {
      title: "Blog",
      description: "Follow our development journey!",
      author_on: "By {{author}} on {{date}}",
    },
    post: {
      not_found: "404 Page Not Found",
      author_on: "{{author}} on {{date}}",
    },
  },
  home: {
    title: "HabitGrove",
    subtitle: "The Future of Personal Health Analysis",
    cta: "Start Your Analysis",
    features: {
      strict_standards: {
        title: "Strict Standards",
        description: "Goodbye 'Standard Range'. We analyze your blood work against optimal longevity targets defined by Dr. Peter Attia.",
      },
      actionable_protocols: {
        title: "Actionable Protocols",
        description: "Don't just get numbers. Get science-backed protocols from Huberman Lab to improve your metrics.",
      },
      preventative_focus: {
        title: "Preventative Focus",
        description: "Shift from reactive medicine to proactive health optimization. Catch metabolic dysfunction decades early.",
      },
    },
  },
};

export default en;
