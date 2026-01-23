import type { Translation } from "./types";

const en: Translation = {
  auth: {
    login: {
      title: "Login",
      header: {
        title: "Welcome back",
        description: "Enter your email to sign in to your account",
      },
      email: {
        label: "Email",
        placeholder: "m@example.com",
      },
      password: {
        label: "Password",
        placeholder: "Enter your password",
      },
      forgot_password: "Forgot your password?",
      action: "Sign In",
      no_account: "Don't have an account?",
      sign_up: "Sign up",
      errors: {
        email_not_confirmed: "Email not confirmed",
        before_verify: "You need to verify your email before you can sign in.",
        resend_confirmation: "Resend confirmation email",
      },
    },
    register: {
      title: "Create an account",
      header: {
        title: "Create an account",
        description: "Enter your information to create an account",
      },
      name: {
        label: "Name",
        placeholder: "John Doe",
      },
      email: {
        label: "Email",
        placeholder: "m@example.com",
      },
      password: {
        label: "Password",
        hint: "Must be at least 8 characters",
        placeholder: "Enter your password",
      },
      confirm_password: {
        label: "Confirm Password",
        placeholder: "Confirm your password",
      },
      marketing: "I agree to receive marketing emails.",
      terms: {
        text: "I agree to the",
        tos: "Terms of Service",
        and: "and",
        privacy: "Privacy Policy",
      },
      action: "Sign Up",
      success: {
        title: "Check your email",
        description: "We've sent you a verification link to your email address.",
      },
      already_have_account: "Already have an account?",
      sign_in: "Sign in",
    },
    forgot_password: {
      title: "Forgot Password",
      header: {
        title: "Forgot Password",
        description: "Enter your email address and we'll send you a link to reset your password",
      },
      email: {
        label: "Email",
        placeholder: "m@example.com",
      },
      action: "Send Reset Link",
      success: "Check your email for a password reset link",
    },
    magic_link: {
      title: "Magic Link",
      header: {
        title: "Magic Link Login",
        description: "We'll send you a magic link to sign in without a password.",
      },
      email: {
        label: "Email",
        placeholder: "Enter your email",
      },
      action: "Send Magic Link",
      success: "Check your email for the magic link.",
      errors: {
        create_account_first: "Please create an account first.",
        invalid_email: "Please enter a valid email address.",
      },
    },
    otp: {
      start: {
        title: "OTP Login",
        header: {
          title: "Sign in with OTP",
          description: "We'll send you a one-time password to your email.",
        },
        email: {
          label: "Email",
          placeholder: "Enter your email",
        },
        action: "Send Code",
      },
      complete: {
        title: "Verify OTP",
        header: {
          title: "Enter Code",
          description: "Enter the 6-digit code sent to your email.",
        },
        action: "Verify",
        errors: {
          verify_failed: "Verification failed. Please try again.",
        },
      },
    },
    new_password: {
      title: "Update Password",
      header: {
        title: "Update Password",
        description: "Enter your new password below",
      },
      password: {
        label: "New Password",
        placeholder: "Enter your new password",
      },
      confirm_password: {
        label: "Confirm Password",
        placeholder: "Confirm your new password",
      },
      action: "Update Password",
      success: "Your password has been updated successfully",
    },
    confirm: {
      title: "Confirm",
      errors: {
        invalid_code: "Invalid or expired confirmation code",
        failed: "Confirmation failed",
      },
      email_change_success: "Your email has been changed successfully",
    },
    email_verified: {
      title: "Email Verification",
      header: "Email Verification",
    },
    social: {
      or: "OR",
      continue_with: "Continue with {{provider}}",
      errors: {
        invalid_provider: "Invalid authentication provider.",
        invalid_code: "Invalid authentication code.",
        login_failed: "Login failed.",
      },
    },
  },
  users: {
    dashboard: {
      title: "Dashboard",
      header: "Dashboard Overview",
      welcome: "Welcome back, {{name}}!",
      verify_identity_to_start: "Verify Identity to Start",
      no_data: {
        title: "No Health Data Available",
        description: "You haven't completed a health checkup analysis yet. Verify your identity to import your health data.",
        action: "Verify Identity",
      },
      health_score: {
        title: "Health Score",
        description: "Your overall health status based on strict standards.",
      },
      biomarkers: {
        title: "Key Biomarkers",
        strict_target: "Strict Target: < {{value}}",
      },
      protocols: {
        title: "Recommended Protocols",
        no_protocols: "No specific protocols recommended at this time based on your current data.",
        premium_locked: {
          title: "Premium Protocols Locked",
          description: "Upgrade to Premium to unlock personalized health improvement protocols based on Huberman Lab science.",
          action: "Unlock Protocols",
        },
      },
    },
    sidebar: {
      teams: {
        sales_forge: "Sales Forge",
        techco: "TechCo",
        growth_mate: "Growth Mate",
      },
      nav: {
        dashboard: "Dashboard",
        overview: "Overview",
        health_checkup: "Health Checkup",
        analytics: "Analytics",
        reports: "Reports",
        customers: "Customers",
        contacts: "Contacts",
        companies: "Companies",
        deals: "Deals",
        sales: "Sales",
        pipeline: "Pipeline",
        opportunities: "Opportunities",
        quotes: "Quotes",
        invoices: "Invoices",
        settings: "Settings",
        workspace: "Workspace",
        team: "Team",
        integrations: "Integrations",
      },
      projects: {
        sales_team: "Sales Team",
        customer_success: "Customer Success",
        marketing: "Marketing",
      },
    },
    verify_identity: {
      title: "Verify Identity",
      header: "Identity Verification",
    },
    components: {
      identity_verification: {
        title: "Identity Verification",
        description: "Verify your identity to access health services.",
        verified: {
          title: "Verified",
          description: "Your identity has been successfully verified.",
        },
        fields: {
          name: {
            label: "Name",
            placeholder: "Enter your name",
          },
          birthday: {
            label: "Date of Birth",
            placeholder: "YYYYMMDD",
          },
          phone: {
            label: "Phone Number",
            placeholder: "01012345678",
          },
          id_front: {
            label: "ID Front (First 6 digits)",
            placeholder: "YYMMDD",
          },
          id_back: {
            label: "ID Back (First 1 digit)",
            placeholder: "1",
          },
          auth_method: {
            label: "Authentication Method",
          },
        },
        providers: {
          kakao: "KakaoTalk",
          payco: "Payco",
          samsung: "Samsung Pass",
          kb: "KB Mobile Certification",
          toss: "Toss",
          naver: "Naver",
        },
        action: {
          submitting: "Verifying...",
          submit: "Verify Identity",
        },
      },
    },
    account: {
      title: "Account",
      errors: {
        load_profile: "Failed to load profile",
        load_social: "Failed to load social accounts",
      },
      forms: {
        edit_profile: {
          title: "Profile",
          description: "Update your personal information.",
          fields: {
            avatar: {
              label: "Profile Picture",
              max_size: "Max size: 5MB",
              formats: "Formats: JPEG, PNG, WEBP",
            },
            name: {
              label: "Name",
              placeholder: "Your Name",
            },
            marketing_consent: {
              label: "Receive marketing emails",
            },
          },
          action: {
            save: "Save Changes",
          },
          success: "Profile updated successfully.",
        },
        change_email: {
          title: "Email",
          add_title: "Add Email",
          description: "Update your email address.",
          add_description: "Add an email address to your account.",
          fields: {
            current_email: {
              label: "Current Email",
            },
            new_email: {
              label: "New Email",
            },
          },
          action: {
            change: "Change Email",
            add: "Add Email",
          },
          success: "Check your new email for a verification link.",
        },
        change_password: {
          title: "Password",
          add_title: "Add Password",
          description: "Change your password.",
          add_description: "Add a password to your account.",
          fields: {
            new_password: {
              label: "New Password",
            },
            confirm_password: {
              label: "Confirm Password",
            },
          },
          action: {
            change: "Change Password",
            add: "Set Password",
          },
          success: "Password updated successfully.",
        },
        connect_social: {
          title: "Social Accounts",
          description: "Connect your social accounts for easier login.",
        },
        delete_account: {
          title: "Delete Account",
          fields: {
            confirm_delete: "I confirm that I want to delete my account.",
            confirm_irreversible: "I understand that this action is irreversible.",
          },
          action: {
            delete: "Delete Account",
          },
        },
      },
    },
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
    languages: {
      en: "English",
      ko: "Korean",
    },
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
  topics: {
    title: "Topics",
    description: "Explore health topics based on Peter Attia's strict standards and Huberman Lab protocols.",
    browse_content: "BROWSE CONTENT",
    back_to_topics: "Back to Topics",
    category_not_found: "Category not found",
    explore_category: "Explore all {{category}} topics",
    category_description: "All topics in {{category}}",
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
