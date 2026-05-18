import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  FolderOpen,
  LineChart,
  ListChecks,
  LockKeyhole,
  Menu,
  MessageCircle,
  PenLine,
  Phone,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Workflow,
  X
} from "lucide-react";
import { Reveal } from "../components/Reveal";

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "dark";
};

type CountMetric = {
  end: number;
  finalLabel: string;
  prefix?: string;
  rangeEnd?: number;
  suffix?: string;
};

type RoiBubble = IconCard & {
  metric: CountMetric;
  value: string;
};

type ProductStage = {
  title: string;
  headerCopy: string;
  status: string;
};

type IntegrationLogo = {
  name: string;
  description: string;
  logo: string;
};

type FaqItem = {
  question: string;
  answer: string[];
};

type FaqGroup = {
  title: string;
  description: string;
  items: FaqItem[];
};

type DemoSubmitState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: "Submitting..." }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type DemoFormValues = {
  firstName: string;
  lastName: string;
  firmName: string;
  email: string;
  phone: string;
  role: string;
  caseload: string;
  message: string;
  consent: boolean;
};

type DemoFormField = keyof DemoFormValues;
type DemoFormErrors = Partial<Record<DemoFormField, string>>;
type DemoFormTouched = Partial<Record<DemoFormField, boolean>>;

type DemoErrorResponse = {
  message?: string;
  errors?: Partial<Record<DemoFormField, string[]>>;
};

const initialDemoFormValues: DemoFormValues = {
  firstName: "",
  lastName: "",
  firmName: "",
  email: "",
  phone: "",
  role: "",
  caseload: "",
  message: "",
  consent: false
};

const demoFormFieldOrder: DemoFormField[] = [
  "firstName",
  "lastName",
  "firmName",
  "email",
  "phone",
  "role",
  "caseload",
  "message",
  "consent"
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]{7,40}$/;

function normalizeDemoForm(values: DemoFormValues): DemoFormValues {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    firmName: values.firmName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    role: values.role.trim(),
    caseload: values.caseload.trim(),
    message: values.message.trim(),
    consent: values.consent
  };
}

function validateDemoForm(values: DemoFormValues): DemoFormErrors {
  const normalized = normalizeDemoForm(values);
  const errors: DemoFormErrors = {};

  if (!normalized.firstName) {
    errors.firstName = "Enter your first name.";
  } else if (normalized.firstName.length > 80) {
    errors.firstName = "First name must be 80 characters or fewer.";
  }

  if (!normalized.lastName) {
    errors.lastName = "Enter your last name.";
  } else if (normalized.lastName.length > 80) {
    errors.lastName = "Last name must be 80 characters or fewer.";
  }

  if (!normalized.firmName) {
    errors.firmName = "Enter your firm name.";
  } else if (normalized.firmName.length < 2) {
    errors.firmName = "Firm name must be at least 2 characters.";
  } else if (normalized.firmName.length > 160) {
    errors.firmName = "Firm name must be 160 characters or fewer.";
  }

  if (!normalized.email) {
    errors.email = "Enter your work email.";
  } else if (!emailPattern.test(normalized.email)) {
    errors.email = "Enter a valid work email.";
  } else if (normalized.email.length > 180) {
    errors.email = "Email must be 180 characters or fewer.";
  }

  if (normalized.phone && !phonePattern.test(normalized.phone)) {
    errors.phone = "Enter a valid phone number or leave it blank.";
  }

  if (normalized.role.length > 120) {
    errors.role = "Role must be 120 characters or fewer.";
  }

  if (normalized.caseload.length > 80) {
    errors.caseload = "Matter volume must be 80 characters or fewer.";
  }

  if (normalized.message.length > 1200) {
    errors.message = "Message must be 1200 characters or fewer.";
  }

  if (!normalized.consent) {
    errors.consent = "Confirm that Innobridge can contact you.";
  }

  return errors;
}

function getFirstDemoFormError(errors: DemoFormErrors) {
  return demoFormFieldOrder.find((field) => errors[field]);
}

function focusDemoFormField(field: DemoFormField) {
  window.requestAnimationFrame(() => {
    document.getElementById(field)?.focus();
  });
}

function mapServerErrors(errors: DemoErrorResponse["errors"]): DemoFormErrors {
  if (!errors) {
    return {};
  }

  return demoFormFieldOrder.reduce<DemoFormErrors>((mappedErrors, field) => {
    const message = errors[field]?.[0];

    if (message) {
      mappedErrors[field] = message;
    }

    return mappedErrors;
  }, {});
}

const countNumberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const premiumSurfaceSelector = [
  ".feature-card",
  ".outcome-card",
  ".price-card",
  ".quote-card",
  ".value-card",
  ".demo-card",
  ".faq-item",
  ".roi-bubble",
  ".time-compare-block",
  ".fin-table-card"
].join(", ");

function usePremiumPointerGlow() {
  useEffect(() => {
    const canUsePointerGlow = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canUsePointerGlow) {
      return;
    }

    const updateSurfaceGlow = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const surface = element?.closest<HTMLElement>(premiumSurfaceSelector);

      if (!surface) {
        return;
      }

      const rect = surface.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      surface.style.setProperty("--glow-x", `${x.toFixed(1)}%`);
      surface.style.setProperty("--glow-y", `${y.toFixed(1)}%`);
      surface.dataset.glowActive = "true";
    };

    const clearSurfaceGlow = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const surface = element?.closest<HTMLElement>(premiumSurfaceSelector);
      const relatedNode = event.relatedTarget instanceof Node ? event.relatedTarget : null;

      if (!surface || (relatedNode && surface.contains(relatedNode))) {
        return;
      }

      delete surface.dataset.glowActive;
    };

    document.addEventListener("pointermove", updateSurfaceGlow, { passive: true });
    document.addEventListener("pointerout", clearSurfaceGlow, { passive: true });

    return () => {
      document.removeEventListener("pointermove", updateSurfaceGlow);
      document.removeEventListener("pointerout", clearSurfaceGlow);
    };
  }, []);
}

function formatCountNumber(value: number) {
  return countNumberFormatter.format(value);
}

function AnimatedMetric({ end, finalLabel, prefix = "", rangeEnd, suffix = "" }: CountMetric) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const animationTarget = element.closest(".roi-bubble") ?? element;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let animationFrame = 0;
    let startTime = 0;
    let observer: IntersectionObserver | undefined;
    const duration = 1450;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const linearProgress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);

      setProgress(easedProgress);

      if (linearProgress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            startAnimation();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -16% 0px", threshold: 0.35 }
      );
      observer.observe(animationTarget);
    } else {
      startAnimation();
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const primaryValue = Math.round(end * progress);
  const secondaryValue = typeof rangeEnd === "number" ? Math.round(rangeEnd * progress) : undefined;
  const label = `${prefix}${formatCountNumber(primaryValue)}${
    typeof secondaryValue === "number" ? `-${formatCountNumber(secondaryValue)}` : ""
  }${suffix}`;

  return (
    <span ref={ref} className="roi-count" aria-label={finalLabel}>
      {label}
    </span>
  );
}

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" }
];

const proofPills: IconCard[] = [
  {
    title: "Legal-first design",
    description: "Built with legal professionals",
    icon: Scale
  },
  {
    title: "AI-assisted workflow",
    description: "From intake to filing",
    icon: Sparkles
  },
  {
    title: "360° support",
    description: "Phone, Email, Zoom, How-to, 1-on-1",
    icon: MessageCircle
  }
];

const metrics = [
  {
    value: "$105K/year",
    label: "Potential savings for typical law firm through reduced software cost and admin time."
  },
  {
    value: "<1h",
    label: "Estimated staff time per file after workflow automation."
  },
  {
    value: "360°",
    label: "Support across onboarding, training, and daily use."
  },
  {
    value: "All case types",
    label: "Residential and commercial workflows for purchase, sale, refinance, and family transfer matters."
  }
];

const painCards: IconCard[] = [
  {
    title: "AI-powered features",
    description:
      "Deep automation supports accurate conveyancing, reduces manual errors, minimizes re-keying, and helps generate case-specific files.",
    icon: Sparkles
  },
  {
    title: "Make complex conveyancing simple",
    description:
      "A calm, legal-first interface keeps the workflow simple to learn, easy to use, and tailored to your practice",
    icon: LineChart,
    tone: "green"
  },
  {
    title: "Streamlined workflow",
    description:
      "All-in-one form and one-click file generation that greatly simplify the conveyancing process from intake to filing.",
    icon: FolderOpen,
    tone: "dark"
  }
];

const productStages: ProductStage[] = [
  {
    title: "Create New Case",
    headerCopy: "Simplified file automation offers only case-relevant details, allowing for a concise and focused layout that offers feasibility with simplified design and minimal setup.",
    status: "Case foundation"
  },
  {
    title: "Data Import",
    headerCopy: "Auto-data import directly populates case details from contract, commission report, tax certificate, and more, eliminating re-keying and errors.",
    status: "AI assisted"
  },
  {
    title: "Review & Adjust",
    headerCopy: "Maintain full control by reviewing key details and updating only as needed. Open files anytime to continue editing or to upload more documents.",
    status: "Counsel visible"
  },
  {
    title: "More Automation",
    headerCopy: "One-click file generation smartly recognizes cases and generates only files needed by the case. Third-party integration further automates title search, insurance ordering, and web filing.",
    status: "Filing ready"
  }
];

const integrationLogos: IntegrationLogo[] = [
  {
    name: "LTSA",
    description: "Web filing",
    logo: "/integrations/ltsa-logo.svg"
  },
  {
    name: "FCT",
    description: "Title insurance",
    logo: "/integrations/fct-logo.svg"
  },
  {
    name: "Stripe",
    description: "Payments",
    logo: "/integrations/stripe-logo.svg"
  }
];

const featureCards: IconCard[] = [
  {
    title: "All conveyancing files",
    description:
      "Residential and commercial matters for purchase, sales, refinance, and family transfer.",
    icon: CheckCircle2
  },
  {
    title: "AI-assisted workflow",
    description:
      "Auto calculation, auto data import, and one-click file generation, within the All-in-One form.",
    icon: FileText
  },
  {
    title: "Third-party integrations",
    description:
      "Support for title search, webfiling, title insurance ordering.",
    icon: Workflow,
    tone: "green"
  },
  {
    title: "Smart templates",
    description:
      "Customizable firm templates and consistent document generation.",
    icon: PenLine,
    tone: "green"
  },
  {
    title: "Case progress tracking",
    description:
      "Track matter state, review checkpoints, status updates, and audit activity.",
    icon: BarChart3,
    tone: "dark"
  },
  {
    title: "Law-firm control",
    description:
      "Role-aware workflow, audit trails, legal review points, and consistent file state support firm confidence.",
    icon: ShieldCheck,
    tone: "dark"
  }
];

const outcomes: IconCard[] = [
  { icon: DollarSign, title: "Save $150+ per case", description: "Reduce the cost of repeat administrative work." },
  { icon: Clock3, title: "Save hours per case", description: "Free time from manual entry and status chasing.", tone: "green" },
  { icon: RefreshCw, title: "Workflow consistency", description: "Use repeatable steps for every matter." },
  { icon: BadgeCheck, title: "Precision conveyancing", description: "Review matters with cleaner information.", tone: "green" },
  { icon: TrendingUp, title: "Productivity", description: "Increase case capacity without adding complexity." },
  { icon: UsersRound, title: "Confidence", description: "Give lawyers and conveyancers a shared state of truth.", tone: "green" },
  { icon: ListChecks, title: "In-control", description: "See what is done, what is flagged, and what is next." },
  { icon: LockKeyhole, title: "Security", description: "Support legal workflows with structured controls.", tone: "green" }
];

const supportSteps: IconCard[] = [
  {
    title: "Discovery Call",
    description: "Learn and map our AI-driven solutions to your workflow.",
    icon: Phone
  },
  {
    title: "Quick onboarding",
    description: "Fast-track setup built for your team's immediate transition.",
    icon: ArrowRight,
    tone: "green"
  },
  {
    title: "Seamless training",
    description: "Embedded guidance and hands-on training help your team move with confidence.",
    icon: BookOpen,
    tone: "dark"
  },
  {
    title: "Conveyancing",
    description: "Automation, AI features, third-party integrations, and 360° support.",
    icon: LineChart
  }
];

const supportFlowSegments = [
  "M 82 20 C 100 24 94 29 18 28",
  "M 18 44 C 0 48 6 53 82 52",
  "M 82 68 C 100 72 94 77 18 76"
];

const pricingPlans = [
  {
    name: "Free Trial",
    description: "Validate the workflow with your team before committing to volume usage.",
    price: "$0",
    suffix: " / case",
    features: ["Guided walkthrough", "Sample matter setup", "Workflow fit assessment", "No long-term commitment"]
  },
  {
    name: "Basic",
    description: "Pay per case with core features included for residential and commercial workflows.",
    price: "$79",
    suffix: " / case",
    badge: "Most popular",
    features: ["All conveyancing matters", "AI data import", "One-click file generation", "LTSA workflow support", "360° support included"]
  },
  {
    name: "Premium",
    description: "For firms that need deeper configuration, templates, training, and rollout support.",
    price: "Custom",
    suffix: "",
    features: ["Advanced workflow setup", "Custom firm templates", "Team training plan", "Implementation support", "Priority onboarding"]
  }
];

const roiBubbles: RoiBubble[] = [
  {
    value: "Save $65-351",
    metric: { end: 65, finalLabel: "Save $65-351", prefix: "$", rangeEnd: 351 },
    title: "per case",
    description: "Save $65-351/case using SmartConveyance compared to others.",
    icon: DollarSign,
    tone: "green"
  },
  {
    value: "Save $105,300",
    metric: { end: 105300, finalLabel: "Save $105,300", prefix: "$" },
    title: "per year",
    description: "Save up to $105,300/year for a typical firm processing 300+ cases per year.",
    icon: BarChart3
  },
  {
    value: "Save 4h",
    metric: { end: 4, finalLabel: "Save 4h", suffix: "h" },
    title: "per case",
    description: "Save up to 4 hours/case operation time, freeing legal professionals for higher-value work.",
    icon: Clock3
  }
];

const testimonials = [
  {
    quote:
      "SmartConveyance focuses on what is truly essential. Training new staff was straightforward, and the workflow is easy to learn without disrupting the team.",
    name: "Jeremy",
    role: "Lawyer",
    initial: "J"
  },
  {
    quote:
      "Tasks that used to take hours are now done in minutes. Smart data entry, auto-completion, and document generation have streamlined my work.",
    name: "Amber",
    role: "Paralegal",
    initial: "A"
  },
  {
    quote:
      "Adopting SmartConveyance has been transformative. We can manage more cases with the same team and give lawyers more time to focus on clients.",
    name: "Richard",
    role: "Firm Owner",
    initial: "R"
  }
];

const values: IconCard[] = [
  {
    title: "Simplicity",
    description: "Creating user-friendly systems that are easy to adopt and practical for daily legal work.",
    icon: CheckCircle2,
    tone: "green"
  },
  {
    title: "Quality",
    description: "Delivering dependable solutions and responsive support that legal professionals can trust.",
    icon: ShieldCheck,
    tone: "green"
  },
  {
    title: "Productivity",
    description: "Driving automation, integration, and workflow optimization that save time and reduce repetitive effort.",
    icon: LineChart
  },
  {
    title: "Innovation",
    description: "Advancing our platforms with intelligent capabilities that improve user experience and enable firms to grow with confidence.",
    icon: Sparkles
  },
];

const faqGroups: FaqGroup[] = [
  {
    title: "Getting Started",
    description: "Onboarding, payment, cancellation, and team support.",
    items: [
      {
        question: "Do you offer on-boarding support?",
        answer: [
          "Yes. Project managers and product specialists help the firm navigate organizational change, engage stakeholders, and handle software adoption smoothly."
        ]
      },
      {
        question: "What forms of payment are accepted?",
        answer: [
          "We are currently accepting credit and debit cards as payment methods."
        ]
      },
      {
        question: "What is SmartConveyance's cancellation and refund policy?",
        answer: [
          "SmartConveyance charges per file or transaction. Once a transaction or file is initiated, the payment is non-refundable, and completed transactions or generated documents are treated as final.",
          "Requests for refunds caused by technical issues are reviewed individually. If SmartConveyance failed to perform as advertised because of a verified platform issue, support may provide a credit or refund."
        ]
      }
    ]
  },
  {
    title: "Product Fit",
    description: "Coverage, province availability, and integrations.",
    items: [
      {
        question: "Is SmartConveyance for both residential & commercial use?",
        answer: [
          "Yes. SmartConveyance is built for both residential and commercial property transactions and includes workflows designed for purchase, sale, refinance, and family-transfer matters."
        ]
      },
      {
        question: "Which provinces currently support SmartConveyance?",
        answer: [
          "SmartConveyance currently supports British Columbia, with additional provinces planned as the platform expands."
        ]
      },
      {
        question: "What tools and platforms currently integrate with SmartConveyance?",
        answer: [
          "Our system connects with LTSA for title searches and FCT for title insurance, providing a unified workflow for your firm."
        ]
      }
    ]
  },
  {
    title: "Data And Security",
    description: "Protection, third-party data handling, residency, and retention.",
    items: [
      {
        question: "How does SmartConveyance protect my data?",
        answer: [
          "SmartConveyance protects user data through secure encryption practices, controlled access, and regular security assessments.",
          "More detail is available in the Privacy Policy linked from the site footer."
        ]
      },
      {
        question: "How do you handle my data when I use third-party integrations?",
        answer: [
          "When SmartConveyance connects with third-party services, only the data needed to support the requested workflow is shared.",
          "Each integration is handled through secure protocols, and users are encouraged to review the privacy policies of the connected services."
        ]
      },
      {
        question: "What is your procedure for data residency and retention?",
        answer: [
          "SmartConveyance stores and processes data in accordance with applicable data protection laws and keeps data only as long as needed to deliver services and meet legal obligations.",
          "Retention periods depend on the type of data and service agreement, and deletion can be requested through customer support."
        ]
      }
    ]
  },
  {
    title: "Support And Migration",
    description: "Customer support, legacy data, and direct contact.",
    items: [
      {
        question: "What level of customer support does SmartConveyance provide?",
        answer: [
          "SmartConveyance offers 360-degree support, including phone, email, Zoom assistance, embedded how-to guides, webinars, and one-on-one expert training."
        ]
      },
      {
        question: "Is there a way to import my old data to SmartConveyance?",
        answer: [
          "If you are interested in migrating data from your previous software or filing system, please contact us at support@innobridge.ca. We will work with you to better assess your needs and options."
        ]
      },
      {
        question: "I still have questions. Who can I reach out to?",
        answer: [
          "Questions can be sent to support@innobridge.ca. The support team can help with setup, workflow fit, platform questions, and next steps."
        ]
      }
    ]
  }
];

const faqCount = faqGroups.reduce((count, group) => count + group.items.length, 0);

function Brand({ variant = "color" }: { variant?: "color" | "light" }) {
  const logoSrc =
    variant === "light" ? "/brand/smartconveyance-primary-light.png" : "/brand/smartconveyance-primary-dark.png";

  return (
    <span className="brand">
      <img
        className="brand-logo"
        src={logoSrc}
        alt="SmartConveyance by Innobridge"
        decoding="async"
      />
    </span>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const sectionProbe = scrollY + 220;
      let currentSection = "";
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .sort((a, b) => a.offsetTop - b.offsetTop);

      for (const section of sections) {
        if (section.offsetTop <= sectionProbe) {
          currentSection = section.id;
        }
      }

      setScrolled(scrollY > 18);
      setScrollProgress(documentHeight > 0 ? Math.min(scrollY / documentHeight, 1) : 0);
      setActiveSection(currentSection);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a href="#top" aria-label="SmartConveyance by Innobridge home">
            <Brand variant={scrolled ? "color" : "light"} />
          </a>
          <div className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
            {navLinks.map((link) => (
              <a
                className={activeSection === link.href.slice(1) ? "active" : undefined}
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="signin" href="https://smartconveyance.innobridge.ca/">
              Sign in
            </a>
            <a className="btn btn-primary" href="#demo">
              Book a Demo
            </a>
            <button
              className="nav-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X className="icon" aria-hidden="true" /> : <Menu className="icon" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

function CardIcon({ icon: Icon, tone }: { icon: LucideIcon; tone?: IconCard["tone"] }) {
  return (
    <div className={`card-icon${tone === "green" ? " green" : ""}${tone === "dark" ? " dark" : ""}`}>
      <Icon className="icon" aria-hidden="true" />
    </div>
  );
}

function HeroPortalPreview() {
  const overviewItems = [
    ["Completion Date", "2023-06-21"],
    ["Buyer", "Nathanael Cormier"],
    ["Seller", "Annetta Upton"],
    ["Strata", "267 Maybell Springs\nApt. 136\nVancouver, BC"]
  ];

  const tabs = [
    "Case",
    "Property",
    "Buyer & Seller",
    "Mortgage",
    "Purchase",
    "Adjustments",
    "Services"
  ];

  const fields = [
    ["Case Number", "9230375", "input"],
    ["Representing", "Buyer", "select"],
    ["Property ID (PID)", "025-728-857", "input"],
    ["Property Type", "Strata", "select"],
    ["Completion Date", "2023-06-21", "input"],
    ["Adjustment Date", "2023-06-22", "input"],
    ["Possession Date", "2023-06-22", "input"],
    ["Contract Date", "2023-05-17", "input"]
  ];

  return (
    <section className="hero-portal-preview" aria-label="SmartConveyance portal preview">
      <div className="portal-preview-shell">
        <div className="portal-preview-browserbar" aria-hidden="true">
          <div className="portal-window-controls">
            <span />
            <span />
            <span />
          </div>
          <div className="portal-preview-address">
            smartconveyance.innobridge.ca <span>/</span> matter <span>/</span> 9230375
          </div>
          <div className="portal-live-pill">
            <i />
            Live matter
          </div>
        </div>

        <aside className="portal-preview-sidebar">
          <div className="portal-preview-logo">
            <img
              src="/brand/smartconveyance-primary-dark.png"
              alt="SmartConveyance"
              decoding="async"
            />
          </div>

          <div className="portal-user-card">
            <div className="portal-avatar">JS</div>
            <div>
              <strong>John Smith</strong>
              <span>SmartConveyance</span>
            </div>
          </div>

          <button className="portal-nav-button">
            Navigation
            <span>⌄</span>
          </button>

          <div className="portal-overview-card">
            <div className="portal-overview-title">Overview</div>

            {overviewItems.map(([label, value]) => (
              <div className="portal-overview-item" key={label}>
                <div className="portal-overview-icon" />
                <div>
                  <strong>{label}</strong>
                  <span>
                    {value.split("\n").map((line) => (
                      <span className="portal-line" key={line}>
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="portal-preview-main">
          <header className="portal-preview-header">
            <div>
              <div className="portal-breadcrumb">
                <span>Home</span>
                <em>›</em>
                <strong>Case 9230375</strong>
              </div>

              <div className="portal-case-heading">
                <div>
                  <span>PURCHASE</span>
                  <h3>Case</h3>
                </div>

                <div className="portal-case-number">9230375</div>
                <div className="portal-status-pill">
                  <span>✓</span>
                  In progress
                </div>
              </div>
            </div>

            <div className="portal-actions" aria-hidden="true">
              <button>▣</button>
              <button>↱</button>
              <button>⇩</button>
              <button>◉</button>
            </div>
          </header>

          <nav className="portal-tabs" aria-label="Case sections">
            {tabs.map((tab, index) => (
              <button className={index === 0 ? "active" : ""} key={tab}>
                <span className="portal-tab-icon" />
                {tab}
                {index > 0 && <em>⌄</em>}
              </button>
            ))}
          </nav>

          <section className="portal-form-card">
            <div className="portal-section-title">
              <h4>General Information</h4>
              <span>i</span>
            </div>

            <div className="portal-form-grid">
              {fields.map(([label, value, type], index) => (
                <div
                  className={`portal-field ${
                    index >= 4 ? "portal-field-separated" : ""
                  }`}
                  key={label}
                >
                  <label>
                    {label}
                    <sup>*</sup>
                  </label>

                  <div className="portal-input">
                    <span>{value}</span>
                    {type === "select" && <em>⌄</em>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className="portal-floating-card portal-floating-card-one">
          <strong>AI import complete</strong>
          <span>Case fields matched from source documents</span>
        </div>

        <div className="portal-floating-card portal-floating-card-two">
          <strong>Ready for review</strong>
          <span>Required fields organized by workflow</span>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="heroTitle">
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <div className="hero-kicker">
            <i />
            SmartConveyance by Innobridge
          </div>
          <h1 id="heroTitle">
            <span className="title-word">Technology</span>{" "}
            <span className="title-word">that</span>{" "}
            <span className="title-word">Speaks</span>{" "}
            <span>Legal.</span>
          </h1>
          <p className="hero-sub">
            Software that adapts to your workflow. SmartConveyance helps law firms streamline real estate conveyancing,
            reduce manual errors, and move from intake to filing with confidence.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#demo">
              Book a Demo
              <ArrowRight className="icon" aria-hidden="true" />
            </a>
            <a className="btn btn-ghost" href="#product">
              See how it works
              <ArrowRight className="icon" aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof" aria-label="Product strengths">
            {proofPills.map((pill) => {
              const Icon = pill.icon;

              return (
                <div className="proof-pill" key={pill.title}>
                  <Icon className="icon" aria-hidden="true" />
                  <div>
                    <span>{pill.title}</span>
                    <em>{pill.description}</em>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <HeroPortalPreview />
        </Reveal>
      </div>
    </section>
  );
}

function MetricStrip() {
  return (
    <div className="metric-strip">
      <Reveal className="container metric-inner">
        {metrics.map((metric) => (
          <div className="metric" key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="section" id="problem" aria-labelledby="problemTitle">
      <div className="container problem-layout">
        <Reveal className="sticky-note">
          <div className="eyebrow">WHY SMARTCONVEYANCE</div>
          <h2 id="problemTitle">Faster conveyancing. Fewer errors.</h2>
          <p className="lead">
            The real problem is not a lack of software. It is fragmented work: re-keying, switching tools, and checking
            the same file across multiple places.
          </p>
          <div className="tax-card">
            <strong>Context Tax</strong>
            <span>The invisible cost of disconnected legal work.</span>
          </div>
          <div className="context-integration-card" aria-label="SmartConveyance ecosystem integrations">
            <span>Connected ecosystem</span>
            <div className="context-logo-row">
              {integrationLogos.map((integration) => (
                <div className={`context-logo-pill ${integration.name.toLowerCase()}`} key={integration.name}>
                  <img src={integration.logo} alt={`${integration.name} logo`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="problem-cards">
          {painCards.map((card, index) => (
            <Reveal className="pain-card" delay={index * 80} key={card.title}>
              <CardIcon icon={card.icon} tone={card.tone} />
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="bridge-card">
            <div>
              <h3>The Innobridge Bridge</h3>
              <p>
                One legal operating layer that turns matter data into documents, review checkpoints, collaboration, and
                filing-ready workflows.
              </p>
            </div>
            <a className="btn btn-primary" href="#product">
              Explore product
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StageOne() {
  const fields = [
    ["Case Number", "Enter firm case number", "empty"],
    ["Property ID (PID)", "XXX-XXX-XXX"],
    ["Representing", "Buyer", "select"],
    ["Property Type", "Single Family House", "select"]
  ];

  return (
    <div className="case-create-preview">
      <div className="case-preview-topline">
        <span>Required setup</span>
        <strong>New conveyance file</strong>
      </div>
      <div className="case-form-stack">
        {fields.map(([label, value, variant]) => (
          <div
            className={`app-field${variant === "empty" ? " app-field-empty" : ""}${variant === "select" ? " app-select" : ""}`}
            key={label}
          >
            <label>
              {label} <b>*</b>
            </label>
            {variant === "empty" ? <span>{value}</span> : <strong>{value}</strong>}
            {variant === "select" ? <i aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function StageTwo() {
  const documentOptions = [
    ["Tax Certificate", "Import roll number, taxes, and adjustment data."],
    ["Contract of Purchase and Sale (CPS)", "Extract parties, dates, price, deposits, and property details."],
    ["Conveyancer's Instruction Report (CIR)", "Bring instruction data into the matter record."]
  ];

  return (
    <div className="data-import-preview">
      <div className="document-picker">
        <label>Document Type</label>
        <div className="select-shell">
          <span>Document Type</span>
          <i aria-hidden="true" />
        </div>
        <div className="doc-menu">
          {documentOptions.map(([title, copy], index) => (
            <div className={`doc-option${index === 0 ? " active" : ""}`} key={title}>
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="upload-dropzone">
        <div className="upload-icon">PDF</div>
        <div>
          <strong>Drop file or browse to upload</strong>
          <span>SmartConveyance reads the selected document type, then prepares extracted fields for review.</span>
        </div>
      </div>
      <div className="import-footer">
        <span>Next step: review extracted fields before they update the case.</span>
        <button type="button">Next</button>
      </div>
    </div>
  );
}

function StageThree() {
  const rows = [
    ["Buyer names", "Verified", "ok"],
    ["Tax adjustment", "Needs review", "flag"],
    ["Lender reference", "Verified", "ok"],
    ["Possession terms", "Counsel check", "flag"]
  ];

  return (
    <div className="review-list">
      {rows.map(([title, state, className]) => (
        <div className="review-card" key={title}>
          <strong>{title}</strong>
          <span className={className}>{state}</span>
        </div>
      ))}
    </div>
  );
}

function StageFour() {
  const rows = [
    ["Generate closing package", "Only case-required files are generated."],
    ["Title search integration", "Start from the same matter record."],
    ["Insurance ordering", "Reusable matter data reduces re-entry."],
    ["Web filing", "Prepared data moves into the filing workflow."]
  ];

  return (
    <div className="automation-preview">
      <div className="automation-integrations" aria-label="Connected automation partners">
        {integrationLogos.map((integration) => (
          <div className={`integration-logo-card ${integration.name.toLowerCase()}`} key={integration.name}>
            <img src={integration.logo} alt={`${integration.name} logo`} loading="lazy" />
            <span>{integration.description}</span>
          </div>
        ))}
      </div>
      <div className="automation-grid">
        {rows.map(([title, copy]) => (
          <div className="automation-card" key={title}>
            <strong>{title}</strong>
            <span>{copy}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StageContent({ index }: { index: number }) {
  const titles = ["New Case Setup", "Import Sources", "Review Queue", "Automation Center"];
  const pills = ["Residential Purchase", "4 files matched", "2 items flagged", "One-click package"];
  const content = [<StageOne key="stage-one" />, <StageTwo key="stage-two" />, <StageThree key="stage-three" />, <StageFour key="stage-four" />];

  return (
    <div className="screen-preview">
      {index < 2 ? (
        content[index]
      ) : (
        <div className="mini-dashboard">
          <div className="mini-toolbar">
            <strong>{titles[index]}</strong>
            <span>{pills[index]}</span>
          </div>
          {content[index]}
        </div>
      )}
      {index > 1 ? (
        <div className="product-cursor" aria-hidden="true">
          <span />
        </div>
      ) : null}
    </div>
  );
}

function ProductSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="section section-tight" id="product" aria-labelledby="productTitle">
      <div className="container">
        <Reveal className="section-head center">
          <div className="eyebrow">The product</div>
          <h2 id="productTitle">AI-assisted intake-to-filing.</h2>
          <p className="lead">
            A guided product flow that starts with a new case, imports the relevant data, surfaces review moments, and
            generates the right files for the matter.
          </p>
        </Reveal>
        <Reveal className="product-shell">
          <div className="tab-list" role="tablist" aria-label="Product workflow">
            {productStages.map((stage, index) => (
              <button
                className="product-tab"
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                aria-controls={`stage${index + 1}`}
                id={`tab${index + 1}`}
                key={stage.title}
                onClick={() => setActiveStage(index)}
              >
                <span className="tab-num">{index + 1}</span>
                <strong className="tab-title">{stage.title}</strong>
              </button>
            ))}
          </div>
          <div
            className="product-stage"
            onPointerMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;

              event.currentTarget.style.setProperty("--stage-x", `${x.toFixed(1)}%`);
              event.currentTarget.style.setProperty("--stage-y", `${y.toFixed(1)}%`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--stage-x", "76%");
              event.currentTarget.style.setProperty("--stage-y", "16%");
            }}
          >
            {productStages.map((stage, index) => (
              <div
                className={`stage-panel${activeStage === index ? " active" : ""}`}
                id={`stage${index + 1}`}
                role="tabpanel"
                aria-labelledby={`tab${index + 1}`}
                key={stage.title}
              >
                <div className="stage-head">
                  <div>
                    <strong>{index === 3 ? "More Automation" : stage.title}</strong>
                    <span>{stage.headerCopy}</span>
                  </div>
                  <span className="status-pill">{stage.status}</span>
                </div>
                <StageContent index={index} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section" id="features" aria-labelledby="featuresTitle">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Feature list</div>
          <h2 id="featuresTitle">Specialized tools for conveyancing practitioners.</h2>
          <p className="lead">
            From easy data entry and auto-calculations to title searches, file generation, templates, and productivity
            reporting, the essentials are covered in one workflow.
          </p>
        </Reveal>
        <div className="features-grid">
          {featureCards.map((card, index) => (
            <Reveal className="feature-card" delay={(index % 3) * 80} key={card.title}>
              <div className="feature-top">
                <CardIcon icon={card.icon} tone={card.tone} />
                <span className="feature-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className="section section-dark" id="outcomes" aria-labelledby="outcomesTitle">
      <div className="container">
        <Reveal className="section-head center">
          <div className="eyebrow eyebrow-light">Impact</div>
          <h2 id="outcomesTitle">Digital conveyancing, re-engineered.</h2>
        </Reveal>
        <div className="outcome-grid">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;

            return (
            <Reveal className={`outcome-card${outcome.tone === "green" ? " outcome-card--green" : ""}`} delay={(index % 4) * 70} key={outcome.title}>
              <div className="card-icon">
                <Icon className="icon" aria-hidden="true" />
              </div>
              <strong>{outcome.title}</strong>
              <span>{outcome.description}</span>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonialsTitle">
      <div className="container">
        <Reveal className="section-head center">
          <div className="eyebrow">Testimonials</div>
          <h2 id="testimonialsTitle">Trusted by conveyancing professionals.</h2>
        </Reveal>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <Reveal className="quote-card" delay={index * 80} key={testimonial.name}>
              <div className="stars" aria-label="Five star rating">
                ★★★★★
              </div>
              <blockquote>{testimonial.quote}</blockquote>
              <div className="author">
                <div className="avatar">{testimonial.initial}</div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className="section" id="support" aria-labelledby="supportTitle">
      <div className="container onboarding-wrap">
        <Reveal className="flow-board" aria-label="Onboarding flow">
          <svg className="flow-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="supportRouteGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#171D1A" />
                <stop offset="55%" stopColor="#187D9E" />
                <stop offset="100%" stopColor="#187D9E" />
              </linearGradient>
              <marker id="supportRouteArrow" markerHeight="5.5" markerWidth="5.5" orient="auto" refX="4.8" refY="2.75">
                <path d="M .6 .6 L 5 2.75 L .6 4.9 Z" fill="#171D1A" />
              </marker>
            </defs>
            {supportFlowSegments.map((segment, index) => (
              <g className="flow-route-segment" key={segment}>
                <path className="flow-route-glow" d={segment} vectorEffect="non-scaling-stroke" />
                <path
                  className="flow-route-track"
                  d={segment}
                  markerEnd="url(#supportRouteArrow)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="flow-route-motion"
                  d={segment}
                  vectorEffect="non-scaling-stroke"
                  style={{ animationDelay: `${index * 0.34}s` }}
                />
                <circle className="flow-route-dot" r=".95">
                  <animateMotion begin={`${index * 0.5}s`} dur="3.8s" path={segment} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
          {supportSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className={`flow-card flow-card-${index + 1}`} key={step.title}>
                <CardIcon icon={Icon} tone={step.tone} />
                <div>
                  <strong>{step.title}</strong>
                  <span>{step.description}</span>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="support-panel" id="supportDetails">
          <div className="eyebrow eyebrow-light">Onboarding and training</div>
          <h2 id="supportTitle">Sign up, and start conveyancing today.</h2>
          <p className="lead">
            Accessible support is available through phone, email, Zoom, embedded guides, and one-on-one training from
            onboarding to daily management.
          </p>
          <div className="support-list">
            {["Phone and email support", "Live Zoom walkthroughs", "Embedded how-to guidance", "One-on-one onboarding and training"].map((item) => (
              <div key={item}>
                <i />
                {item}
              </div>
            ))}
          </div>
          <a className="btn btn-primary support-panel-cta" href="#demo">
            Book a Demo
            <ArrowRight className="icon" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section" id="pricing" aria-labelledby="pricingTitle">
      <div className="container">
        <Reveal className="section-head center">
          <div className="eyebrow">Pricing plan</div>
          <h2 id="pricingTitle">Enterprise-grade efficiency without enterprise-level cost.</h2>
          <p className="lead">Simple pricing <b>no contract or hidden fees</b>, that makes operational gains visible without long-term lock-in.</p>
        </Reveal>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <Reveal className={`price-card${plan.badge ? " featured" : ""}`} delay={index * 80} key={plan.name}>
              <div className="price-card-top">
                <h3>{plan.name}</h3>
                {plan.badge ? <span className="price-badge">{plan.badge}</span> : null}
              </div>
              <p>{plan.description}</p>
              <div className="price">
                <strong>{plan.price}</strong>
                {plan.suffix ? <span>{plan.suffix}</span> : null}
              </div>
              <ul className="price-list">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="pricing-action" delay={260}>
          <a className="btn btn-primary pricing-expert-cta" href="#demo">
            Talk to an Expert
            <ArrowRight className="icon" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function RoiSection() {
  return (
    <section className="section section-dark roi-decision-section" id="roi" aria-labelledby="roiTitle">
      <div className="container">
        <Reveal className="section-head center roi-decision-head">
          <div className="eyebrow eyebrow-light">Impact</div>
          <h2 id="roiTitle">Smart choice that empower your growth.</h2>
        </Reveal>

        <Reveal className="fin-table-card">
          <div className="fin-table-scroll">
            <table className="fin-table" aria-label="Financial justification comparison table">
              <thead>
                <tr>
                  <th>Metric (Per Case)</th>
                  <th className="col-legacy">Legacy Digital Conveyancing</th>
                  <th className="col-smart">
                    <span className="fin-head-smart">
                      <span className="fin-check">✓</span>
                      SmartConveyance
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Staff Labour / File</th>
                  <td className="col-legacy">2-5 hrs</td>
                  <td className="col-smart">Less than 1 hr</td>
                </tr>
                <tr>
                  <th scope="row">
                    Labour Cost <small>at $45 / hr</small>
                  </th>
                  <td className="col-legacy">$180-270</td>
                  <td className="col-smart">$67.50</td>
                </tr>
                <tr>
                  <th scope="row">Software / Filing Fees</th>
                  <td className="col-legacy">$150-400</td>
                  <td className="col-smart">$79.00</td>
                </tr>
                <tr className="fin-total">
                  <th scope="row">Total Cost / Case</th>
                  <td className="col-legacy">$333-670</td>
                  <td className="col-smart">$146.50</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="fin-table-note">
            Illustrative comparison based on Innobridge&apos;s financial justification model. Figures use a $45/hr
            staff labour rate. Results may vary by firm size, matter volume, and workflow configuration.
          </div>
        </Reveal>

        <div className="roi-bubble-grid">
          {roiBubbles.map((bubble, index) => {
            const Icon = bubble.icon;

            return (
              <Reveal
                className={`roi-bubble${bubble.tone === "green" ? " roi-bubble-primary" : ""}`}
                delay={index * 90}
                key={bubble.value}
              >
                <div className="roi-bubble-metric">
                  <strong>
                    <AnimatedMetric {...bubble.metric} />
                    <span className="roi-count-label">{bubble.title}</span>
                  </strong>
                  <span className="roi-bubble-icon">
                    <Icon className="icon" aria-hidden="true" />
                  </span>
                </div>
                <p>{bubble.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section" id="story" aria-labelledby="storyTitle">
      <div className="container story-wrap">
        <Reveal className="story-card">
          <img
            className="story-logo"
            src="/brand/innobridge-primary-light.png"
            alt="Innobridge"
            decoding="async"
          />
          <div className="eyebrow eyebrow-light">Our story</div>
          <h2 id="storyTitle">Legal DNA, engineered into the product.</h2>
          <p>
            Our vision is to shape a future where intelligent legal technology makes legal practice more efficient, accessible, and empowering. We strive to equip legal professionals with tools that streamline work, strengthen accuracy, and support sustainable growth, enabling them to serve clients with confidence and redefine what excellent legal service can look like in a modern world.
          </p>
          <div className="story-facts" aria-label="Company highlights">
          </div>
        </Reveal>
        <div className="values-grid">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
            <Reveal className={`value-card${value.tone === "green" ? " value-card--green" : ""}`} delay={(index % 2) * 80} key={value.title}>
              <div className="value-card-icon">
                <Icon className="icon" aria-hidden="true" />
              </div>
              <strong>{value.title}</strong>
              <span>{value.description}</span>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [form, setForm] = useState<DemoFormValues>(initialDemoFormValues);
  const [touched, setTouched] = useState<DemoFormTouched>({});
  const [errors, setErrors] = useState<DemoFormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitState, setSubmitState] = useState<DemoSubmitState>({ status: "idle", message: "" });
  const isSubmitting = submitState.status === "loading";

  const getFieldError = (field: DemoFormField) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target;
    const field = target.name as DemoFormField;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    const nextForm = { ...form, [field]: value };

    setForm(nextForm);

    if (submitAttempted || touched[field]) {
      setErrors(validateDemoForm(nextForm));
    }

    if (submitState.status !== "idle" && submitState.status !== "loading") {
      setSubmitState({ status: "idle", message: "" });
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.target.name as DemoFormField;

    setTouched((currentTouched) => ({ ...currentTouched, [field]: true }));
    setErrors(validateDemoForm(form));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedForm = normalizeDemoForm(form);
    const validationErrors = validateDemoForm(normalizedForm);
    const firstInvalidField = getFirstDemoFormError(validationErrors);

    setSubmitAttempted(true);
    setTouched(Object.fromEntries(demoFormFieldOrder.map((field) => [field, true])) as DemoFormTouched);
    setErrors(validationErrors);

    if (firstInvalidField) {
      setSubmitState({ status: "error", message: "Please fix the highlighted fields before submitting." });
      focusDemoFormField(firstInvalidField);
      return;
    }

    setSubmitState({ status: "loading", message: "Submitting..." });

    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(normalizedForm)
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as DemoErrorResponse | null;
        const serverErrors = mapServerErrors(body?.errors);
        const firstServerError = getFirstDemoFormError(serverErrors);

        if (firstServerError) {
          setErrors(serverErrors);
          setSubmitState({ status: "error", message: body?.message || "Please check the highlighted fields." });
          focusDemoFormField(firstServerError);
          return;
        }

        throw new Error(body?.message || "The request could not be submitted.");
      }

      setForm(initialDemoFormValues);
      setTouched({});
      setErrors({});
      setSubmitAttempted(false);
      setSubmitState({
        status: "success",
        message: "Your request was received. Innobridge will follow up with demo scheduling details."
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "The request could not be submitted."
      });
    }
  };

  return (
    <section className="section" id="demo" aria-labelledby="demoTitle">
      <div className="container demo-grid">
        <Reveal>
          <div className="eyebrow">Book a demo</div>
          <h2 id="demoTitle">Start with a legal workflow fit assessment.</h2>
          <p className="lead">
            A solutions expert can show how SmartConveyance fits your practice, team structure, and current conveyancing
            process.
          </p>
          <div className="demo-benefits">
            {["Personalized 15-minute walkthrough", "No contract, pay per case", "Same-day onboarding path", "Ongoing 360° support from day one"].map((benefit) => (
              <div key={benefit}>
                <i />
                {benefit}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="demo-card">
          <form className="demo-form" id="demoForm" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  maxLength={80}
                  required
                  placeholder="Jane"
                  value={form.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("firstName"))}
                  aria-describedby={getFieldError("firstName") ? "firstNameError" : undefined}
                />
                {getFieldError("firstName") ? <span className="field-error" id="firstNameError">{getFieldError("firstName")}</span> : null}
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  maxLength={80}
                  required
                  placeholder="Smith"
                  value={form.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("lastName"))}
                  aria-describedby={getFieldError("lastName") ? "lastNameError" : undefined}
                />
                {getFieldError("lastName") ? <span className="field-error" id="lastNameError">{getFieldError("lastName")}</span> : null}
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="firmName">Firm name</label>
                <input
                  id="firmName"
                  name="firmName"
                  autoComplete="organization"
                  maxLength={160}
                  required
                  placeholder="Smith & Associates LLP"
                  value={form.firmName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("firmName"))}
                  aria-describedby={getFieldError("firmName") ? "firmNameError" : undefined}
                />
                {getFieldError("firmName") ? <span className="field-error" id="firmNameError">{getFieldError("firmName")}</span> : null}
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  maxLength={180}
                  required
                  type="email"
                  placeholder="jane@firm.ca"
                  value={form.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("email"))}
                  aria-describedby={getFieldError("email") ? "emailError" : undefined}
                />
                {getFieldError("email") ? <span className="field-error" id="emailError">{getFieldError("email")}</span> : null}
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="phone">Phone <span>(optional)</span></label>
                <input
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  maxLength={40}
                  type="tel"
                  placeholder="+1 (604) 000-0000"
                  value={form.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("phone"))}
                  aria-describedby={getFieldError("phone") ? "phoneError" : undefined}
                />
                {getFieldError("phone") ? <span className="field-error" id="phoneError">{getFieldError("phone")}</span> : null}
              </div>
              <div className="field">
                <label htmlFor="role">Your role</label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("role"))}
                  aria-describedby={getFieldError("role") ? "roleError" : undefined}
                >
                  <option value="">Select role</option>
                  <option>Lawyer / Partner</option>
                  <option>Conveyancer</option>
                  <option>Legal Assistant</option>
                  <option>Paralegal</option>
                  <option>Firm Owner / Administrator</option>
                </select>
                {getFieldError("role") ? <span className="field-error" id="roleError">{getFieldError("role")}</span> : null}
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="caseload">Monthly matter volume</label>
                <select
                  id="caseload"
                  name="caseload"
                  value={form.caseload}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={Boolean(getFieldError("caseload"))}
                  aria-describedby={getFieldError("caseload") ? "caseloadError" : undefined}
                >
                  <option value="">Select volume</option>
                  <option>1-10</option>
                  <option>11-30</option>
                  <option>31-60</option>
                  <option>61-100</option>
                  <option>100+</option>
                </select>
                {getFieldError("caseload") ? <span className="field-error" id="caseloadError">{getFieldError("caseload")}</span> : null}
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">What should the demo focus on? <span>(optional)</span></label>
              <textarea
                id="message"
                name="message"
                maxLength={1200}
                placeholder="LTSA workflow, document generation, team collaboration..."
                value={form.message}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={Boolean(getFieldError("message"))}
                aria-describedby={getFieldError("message") ? "messageError messageMeta" : "messageMeta"}
              />
              <span className="field-meta" id="messageMeta">{form.message.length}/1200 characters</span>
              {getFieldError("message") ? <span className="field-error" id="messageError">{getFieldError("message")}</span> : null}
            </div>
            <label className={`checkbox${getFieldError("consent") ? " checkbox-error" : ""}`}>
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                required
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={Boolean(getFieldError("consent"))}
                aria-describedby={getFieldError("consent") ? "consentError" : undefined}
              />{" "}
              <span>
                I agree to be contacted by Innobridge about SmartConveyance. We respect your privacy and will never share
                your information.
              </span>
            </label>
            {getFieldError("consent") ? <span className="field-error checkbox-field-error" id="consentError">{getFieldError("consent")}</span> : null}
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book your demo today"}
            </button>
            <div
              className={`form-note form-note--${submitState.status}${submitState.status !== "idle" ? " show" : ""}`}
              id="formNote"
              aria-live="polite"
              role={submitState.status === "error" ? "alert" : "status"}
            >
              {submitState.message}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState("faq-0-0");

  return (
    <section className="section section-tight" id="faq" aria-labelledby="faqTitle">
      <div className="container faq-wrap">
        <Reveal className="faq-intro">
          <div className="eyebrow">FAQ</div>
          <h2 id="faqTitle">Common questions.</h2>
          <p className="lead">
            Practical answers from the Innobridge FAQ, arranged for teams comparing fit, rollout, security, and support.
          </p>
          <div className="faq-summary">
            <span>{faqCount} answers</span>
            <strong>Need something specific?</strong>
            <p>Reach support directly or book a guided workflow assessment with the SmartConveyance team.</p>
            <div className="faq-summary-actions">
              <a className="btn btn-primary" href="#demo">Book a Demo</a>
              <a className="btn btn-subtle" href="mailto:support@innobridge.ca">Email support</a>
            </div>
          </div>
        </Reveal>
        <Reveal className="faq-list">
          {faqGroups.map((group, groupIndex) => (
            <div className="faq-group" key={group.title}>
              <div className="faq-group-head">
                <div>
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <strong>{group.title}</strong>
                </div>
                <p>{group.description}</p>
              </div>
              <div className="faq-items">
                {group.items.map((faq, itemIndex) => {
                  const faqId = `faq-${groupIndex}-${itemIndex}`;
                  const panelId = `${faqId}-panel`;
                  const isOpen = openFaqId === faqId;

                  return (
                    <div className={`faq-item${isOpen ? " open" : ""}`} key={faq.question}>
                      <button
                        className="faq-q"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaqId(isOpen ? "" : faqId)}
                      >
                        {faq.question}
                        <span aria-hidden="true">+</span>
                      </button>
                      <div className="faq-a" id={panelId}>
                        <div>
                          {faq.answer.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#top" aria-label="SmartConveyance by Innobridge home">
              <Brand variant="light" />
            </a>
            <p>Technology that Speaks Legal. Built for conveyancing teams that need precision, speed, and control.</p>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#problem">Pain points</a>
            <a href="#product">Workflow</a>
            <a href="#features">Features</a>
            <a href="#outcomes">Outcomes</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#pricing">Pricing</a>
            <a href="#support">Support</a>
            <a href="#story">Our story</a>
            <a href="#demo">Book a Demo</a>
          </div>
          <div>
            <h4>360° Support</h4>
            <a href="mailto:support@innobridge.ca">support@innobridge.ca</a>
            <a href="tel:+18882669010">+1 (888) 266-9010</a>
            <a href="https://smartconveyance.innobridge.ca/">Sign in</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Innobridge Consulting Inc. All rights reserved.</span>
          <span>
            <a href="https://smartconveyance.innobridge.ca/files/PrivacyPolicy.pdf">Privacy</a>
            <a href="https://smartconveyance.innobridge.ca/files/TermsOfUse.pdf">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function SmartConveyanceLanding() {
  usePremiumPointerGlow();

  return (
    <>
      <SiteNav />
      <main id="main">
        <HeroSection />
        <MetricStrip />
        <ProblemSection />
        <ProductSection />
        <FeaturesSection />
        <OutcomesSection />
        <TestimonialsSection />
        <SupportSection />
        <PricingSection />
        <RoiSection />
        <StorySection />
        <DemoSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
