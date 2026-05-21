import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ChangeEvent, FocusEvent, FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import barChartBlueIcon from "../assets/icons/bar-chart-187D93.svg";
import barChartCharcoalIcon from "../assets/icons/bar-chart-CharcoalBlue.svg";
import barChartLightBlueIcon from "../assets/icons/bar-chart-LightBlue.svg";
import bookCharcoalIcon from "../assets/icons/book-CharcoalBlue.svg";
import badgeCheckGreenIcon from "../assets/icons/noun-badge-check-2804255-LightGreen.svg";
import checkCircleBlueIcon from "../assets/icons/check-circle-CGBlue.svg";
import checkCircleGreenIcon from "../assets/icons/check-circle-AsparagusGreen.svg";
import checklistBlueIcon from "../assets/icons/checklist-LightBlue.svg";
import clockLightBlueIcon from "../assets/icons/clock-LightBlue.svg";
import clockGreenIcon from "../assets/icons/clock-LightGreen.svg";
import documentBlueIcon from "../assets/icons/document-CGBlue.svg";
import folderCharcoalIcon from "../assets/icons/folder-open-CharcoalBlue.svg";
import gearBlueIcon from "../assets/icons/noun-gear-8381225-LightBlue.svg";
import handshakeGreenIcon from "../assets/icons/handshake-AsparagusGreen.svg";
import linkGreenIcon from "../assets/icons/link-AsparagusGreen.svg";
import lockGreenIcon from "../assets/icons/lock-LightGreen.svg";
import penGreenIcon from "../assets/icons/pen-AsparagusGreen.svg";
import phoneBlueIcon from "../assets/icons/phone-CGBlue.svg";
import savingsBlueIcon from "../assets/icons/savings-LightBlue.svg";
import savingsGreenIcon from "../assets/icons/savings-LightGreen.svg";
import scalesBlueIcon from "../assets/icons/scales-LightBlue.svg";
import shieldCharcoalIcon from "../assets/icons/shield-check-CharcoalBlue.svg";
import shieldGreenIcon from "../assets/icons/shield-check-AsparagusGreen.svg";
import sparkleBlueIcon from "../assets/icons/sparkle-CGBlue.svg";
import sparkleLightBlueIcon from "../assets/icons/sparkle-LightBlue.svg";
import speechBubbleBlueIcon from "../assets/icons/speech-bubble-LightBlue.svg";
import usersGreenIcon from "../assets/icons/users-LightGreen.svg";
import {
  ArrowRight,
  BookOpen,
  Mail,
  Menu,
  Phone,
  UsersRound,
  Video,
  X
} from "lucide-react";
import { Reveal } from "../components/Reveal";

type IconGraphic = LucideIcon | string;

type IconCard = {
  title: string;
  description: string;
  icon: IconGraphic;
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
  mobileSummary: string;
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

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const demoFormMode = import.meta.env.VITE_DEMO_FORM_MODE || (import.meta.env.PROD ? "static" : "api");
const isStaticDemoMode = demoFormMode === "static";
const staticDemoStorageKey = "smartconveyance-demo-preview-requests";

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

function saveStaticDemoRequest(values: DemoFormValues) {
  try {
    const existingRequests = window.localStorage.getItem(staticDemoStorageKey);
    const requests = existingRequests ? (JSON.parse(existingRequests) as unknown[]) : [];

    requests.push({
      ...values,
      submittedAt: new Date().toISOString()
    });

    window.localStorage.setItem(staticDemoStorageKey, JSON.stringify(requests.slice(-25)));
  } catch {
    // Static previews should keep the form flow working even when localStorage is unavailable.
  }
}

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
  ".fin-table-card",
  ".matter-coverage-card"
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
  { label: "Home", href: "#top" },
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Support", href: "#support" },
  { label: "Pricing", href: "#pricing" }
];

const navSectionTargets = [
  { sectionId: "problem", navId: "" },
  { sectionId: "product", navId: "product" },
  { sectionId: "features", navId: "features" },
  { sectionId: "impact", navId: "impact" },
  { sectionId: "testimonials", navId: "" },
  { sectionId: "support", navId: "support" },
  { sectionId: "pricing", navId: "pricing" },
  { sectionId: "roi", navId: "" },
  { sectionId: "story", navId: "" },
  { sectionId: "demo", navId: "" },
  { sectionId: "faq", navId: "" }
] as const;

const navSectionIdToNavId = new Map<string, string>(navSectionTargets.map(({ sectionId, navId }) => [sectionId, navId]));

const proofPills: IconCard[] = [
  {
    title: "Legal-first design",
    description: "Built with legal professionals",
    icon: scalesBlueIcon
  },
  {
    title: "AI-assisted workflow",
    description: "From intake to filing",
    icon: sparkleLightBlueIcon
  },
  {
    title: "360° support",
    description: "Phone, Email, Zoom, How-to, 1-on-1",
    icon: speechBubbleBlueIcon
  }
];

const metrics = [
  {
    value: "Save on|Every case",
    label: "Potential savings for typical law firm through reduced software fee, labour cost and admin time."
  },
  {
    value: "Save up to 4 hrs/case",
    label: "Streamline and simplified conveyancing process through workflow automation."
  },
  {
    value: "Save Training time",
    label: "Simple to learn, easy to use, and requires minimal training."
  },
  {
    value: "Residential and Commercial|All case types",
    label: "Residential and commercial workflows for purchase, sale, refinance, and family transfer matters."
  }
];

const painCards: IconCard[] = [
  {
    title: "AI-powered features",
    description:
      "Smart automation supports accurate conveyancing, reduces manual errors, minimizes re-keying, and helps generate case-specific files.",
    icon: sparkleBlueIcon
  },
  {
    title: "Make complex conveyancing simple",
    description:
      "A legal-first interface keeps the workflow simple to learn, easy to use, and tailored to your practice",
    icon: barChartBlueIcon,
    tone: "green"
  },
  {
    title: "Streamlined workflow",
    description:
      "All-in-one form and one-click file generation that greatly simplify the conveyancing process from intake to filing.",
    icon: folderCharcoalIcon,
    tone: "dark"
  }
];

const productStages: ProductStage[] = [
  {
    title: "Create New Case",
    headerCopy: "Simplified file automation offers only case-relevant details, allowing for a concise and focused layout that offers feasibility with simplified design and minimal setup.",
    status: "Case foundation",
    mobileSummary: "Only case-relevant fields appear, keeping it simple and focused."
  },
  {
    title: "Auto Data Import",
    headerCopy: "Auto-data import directly populates case details from contract, commission report, tax certificate, and more, eliminating re-keying and errors.",
    status: "AI assisted",
    mobileSummary: "Eliminate errors due to manual data entry with AI-powered document import."
  },
  {
    title: "Review & Adjust",
    headerCopy: "Maintain full control by reviewing key details and updating only as needed. Open files anytime to continue editing or to upload more documents.",
    status: "Case customization",
    mobileSummary: "Review key details and adjust only as needed — full control at every step."
  },
  {
    title: "More Automation",
    headerCopy: "One-click file generation smartly recognizes cases and generates only files needed by the case. Third-party integration further automates title search, insurance ordering, and web filing.",
    status: "3rd-party integrations",
    mobileSummary: "Title search, insurance ordering, web filing, and one-click file generation."
  }
];

const matterCoverage = ["Purchase", "Sale", "Refinance", "Family Transfer"];

const integrationLogos: IntegrationLogo[] = [
  {
    name: "LTSA",
    description: "Web filing",
    logo: assetPath("/integrations/ltsa-logo.svg")
  },
  {
    name: "FCT",
    description: "Title insurance",
    logo: assetPath("/integrations/fct-logo.svg")
  },
  {
    name: "Stripe",
    description: "Payments",
    logo: assetPath("/integrations/stripe-logo.svg")
  }
];

const featureCards: IconCard[] = [
  {
    title: "All conveyancing files",
    description:
      "Residential and commercial matters for purchase, sales, refinance, and family transfer.",
    icon: checkCircleBlueIcon
  },
  {
    title: "AI-assisted workflow",
    description:
      "Auto calculation, auto data import, and one-click file generation, within the All-in-One form.",
    icon: documentBlueIcon
  },
  {
    title: "Third-party integrations",
    description:
      "Support for title search, webfiling and title insurance.",
    icon: linkGreenIcon,
    tone: "green"
  },
  {
    title: "Smart templates",
    description:
      "Customizable firm templates and consistent document generation.",
    icon: penGreenIcon,
    tone: "green"
  },
  {
    title: "Case progress tracking",
    description:
      "Track matter state, review checkpoints, status updates, and audit activity.",
    icon: barChartCharcoalIcon,
    tone: "dark"
  },
  {
    title: "Law firm control",
    description:
      "Role-aware workflow, audit trails, legal review points, and consistent file state support firm confidence.",
    icon: shieldCharcoalIcon,
    tone: "dark"
  }
];

const outcomes: IconCard[] = [
  { icon: savingsBlueIcon, title: "Save on every case", description: "Fair, transparent pricing with no hidden fees for tools supporting firm's needs." },
  { icon: clockGreenIcon, title: "Save hours", description: "AI-driven for instant imports, one-click features, and smooth case completion.", tone: "green" },
  { icon: gearBlueIcon, title: "Workflow consistency", description: "Facilitate consistent practice among cases with automation and activity tracking." },
  { icon: badgeCheckGreenIcon, title: "Precision conveyancing", description: "From PDF imports to financial statements, automated precision ensures accuracy in every step.", tone: "green" },
  { icon: barChartLightBlueIcon, title: "Productivity", description: "Simplify training, streamline workflows, and empower your firm to do more with less." },
  { icon: usersGreenIcon, title: "Confidence", description: "Fewer errors, smoother workflows, and 360° support, enabling firms to grow and scale with confidence.", tone: "green" },
  { icon: checklistBlueIcon, title: "In-control", description: "From user permissions to activity tracking to case progress, have complete control." },
  { icon: lockGreenIcon, title: "Security", description: "Keep sensitive legal information secure, private, protected. Safeguarding your clients’ trust.", tone: "green" }
];

const supportSteps: IconCard[] = [
  {
    title: "Discovery Call",
    description: "Learn and map our AI-driven solutions to your workflow.",
    icon: phoneBlueIcon
  },
  {
    title: "Quick onboarding",
    description: "Fast-track setup built for your team's immediate transition.",
    icon: handshakeGreenIcon,
    tone: "green"
  },
  {
    title: "Seamless training",
    description: "Embedded guidance and hands-on training help your team move with confidence.",
    icon: bookCharcoalIcon,
    tone: "dark"
  },
  {
    title: "Conveyancing",
    description: "Automation, AI features, third-party integrations, and 360° support.",
    icon: barChartBlueIcon
  }
];

type SupportFlowRoute = {
  id: string;
  d: string;
};

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Builds an organic S-curve SVG path between two cards using cubic bezier segments.
 *
 * Uses two chained cubics (C … S …) so the path always exits each card horizontally,
 * sweeps to the board's outer edges, crosses at the vertical midpoint, and arrives
 * at the next card horizontally. The SVG S command auto-reflects the prior CP,
 * guaranteeing C1 continuity at the crossing point.
 *
 * Fixed board-edge routing lanes (rather than card-relative offsets) ensure every
 * path gets a generous, symmetric sweep regardless of which side the card sits on.
 */
function buildSupportFlowPath(previousRect: DOMRect, nextRect: DOMRect, boardRect: DOMRect) {
  const portGap = 12;
  const n = (v: number) => Number(v.toFixed(1));

  // Connection points: mid-height of each card's outer edge
  const startX = clampNumber(previousRect.right - boardRect.left + portGap, 10, boardRect.width - 10);
  const startY = previousRect.top - boardRect.top + previousRect.height / 2;
  const endX   = clampNumber(nextRect.left  - boardRect.left - portGap, 10, boardRect.width - 10);
  const endY   = nextRect.top  - boardRect.top  + nextRect.height  / 2;

  // Fixed routing lanes at the board edges — gives maximum arc regardless of card position
  const margin    = clampNumber(boardRect.width * 0.04, 10, 22);
  const rightLane = boardRect.width - margin;   // always near the right wall
  const leftLane  = margin;                      // always near the left wall
  const centerX   = boardRect.width / 2;

  // Vertical crossing point (40% of the way down keeps the first arc shorter & tighter)
  const bridgeY = startY + (endY - startY) * 0.5;

  // Cubic 1: exit startX horizontally → rightLane arc → center crossing
  // Cubic 2 (smooth S): mirror CP → leftLane arc → arrive endX horizontally
  return (
    `M ${n(startX)} ${n(startY)} ` +
    `C ${n(rightLane)} ${n(startY)} ${n(rightLane)} ${n(bridgeY)} ${n(centerX)} ${n(bridgeY)} ` +
    `S ${n(leftLane)} ${n(endY)} ${n(endX)} ${n(endY)}`
  );
}

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
    features: ["Everything in basic","Advanced workflow setup", "Custom firm templates", "Team training plan", "Implementation support", "Priority onboarding"]
  }
];

const roiBubbles: RoiBubble[] = [
  {
    value: "Save $65-351",
    metric: { end: 65, finalLabel: "Save $65-351", prefix: "Save $", rangeEnd: 351 },
    title: "per case",
    description: "Save $65-351/case using SmartConveyance compared to using others.",
    icon: savingsGreenIcon,
    tone: "green"
  },
  {
    value: "Save $105,300",
    metric: { end: 105300, finalLabel: "Save $105,300", prefix: "Save $" },
    title: "per year",
    description: "Save up to $105,300/year for a typical firm processing 300+ cases per year.",
    icon: barChartLightBlueIcon
  },
  {
    value: "Save 4 hrs",
    metric: { end: 4, finalLabel: "Save 4 hrs", suffix: " hrs", prefix: "Save up to " },
    title: "per case",
    description: "Save up to 4 hours/case operation time, freeing legal professionals for higher-value work.",
    icon: clockLightBlueIcon
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
    icon: checkCircleGreenIcon,
    tone: "green"
  },
  {
    title: "Quality",
    description: "Delivering dependable solutions and responsive support that legal professionals can trust.",
    icon: shieldGreenIcon,
    tone: "green"
  },
  {
    title: "Productivity",
    description: "Driving automation, integration, and workflow optimization that save time and reduce repetitive effort.",
    icon: barChartBlueIcon
  },
  {
    title: "Innovation",
    description: "Advancing our platforms with intelligent capabilities that improve user experience and enable firms to grow with confidence.",
    icon: sparkleBlueIcon
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
    title: "Data and Security",
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
    title: "Support and Migration",
    description: "Customer support, legacy data, and direct contact.",
    items: [
      {
        question: "What level of customer support does SmartConveyance provide?",
        answer: [
          "SmartConveyance offers  360º support, including phone, email, Zoom assistance, embedded how-to guides, webinars, and one-on-one expert training."
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
    variant === "light"
      ? assetPath("/brand/innobridge-primary-light.png")
      : assetPath("/brand/innobridge-primary-dark.png");

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
    const sectionIds = navSectionTargets.map(({ sectionId }) => sectionId);
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const activationLine = Math.min(Math.max(window.innerHeight * 0.34, 280), 420);
      let currentSectionId = "";
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .sort((a, b) => a.offsetTop - b.offsetTop);

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSectionId = section.id;
        }
      }

      setScrolled(scrollY > 18);
      setScrollProgress(documentHeight > 0 ? Math.min(scrollY / documentHeight, 1) : 0);
      setActiveSection(navSectionIdToNavId.get(currentSectionId) ?? "");
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
              Talk to an Expert
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

function IconArtwork({ icon, className = "icon" }: { icon: IconGraphic; className?: string }) {
  if (typeof icon === "string") {
    return (
      <span
        className={`${className} svg-icon`}
        style={{ "--icon-url": `url("${icon}")` } as CSSProperties}
        aria-hidden="true"
      />
    );
  }

  const Icon = icon;

  return <Icon className={className} aria-hidden="true" />;
}

function CardIcon({ icon, tone }: { icon: IconGraphic; tone?: IconCard["tone"] }) {
  return (
    <div className={`card-icon${tone === "green" ? " green" : ""}${tone === "dark" ? " dark" : ""}`}>
      <IconArtwork icon={icon} />
    </div>
  );
}

function BridgeIllustration() {
  return (
    <svg className="bridge-illustration" viewBox="0 0 320 128" aria-hidden="true" focusable="false">
      <path className="bridge-deck" d="M22 88H298" />
      <path className="bridge-base" d="M34 101H286" />
      <path className="bridge-tower" d="M86 35V113" />
      <path className="bridge-tower" d="M234 35V113" />
      <path className="bridge-arch" d="M36 88C70 54 104 50 160 82C216 50 250 54 284 88" />
      <path className="bridge-cable" d="M86 35C108 72 131 83 160 83C189 83 212 72 234 35" />
      <path className="bridge-cable" d="M86 35C66 65 48 80 34 88" />
      <path className="bridge-cable" d="M234 35C254 65 272 80 286 88" />
      <path className="bridge-rail" d="M22 76H298" />
      <path className="bridge-posts" d="M55 80V101M86 76V101M117 80V101M148 82V101M172 82V101M203 80V101M234 76V101M265 80V101" />
      <circle className="bridge-light" cx="86" cy="35" r="6" />
      <circle className="bridge-light" cx="234" cy="35" r="6" />
    </svg>
  );
}

function HeroPortalPreview() {
  const overviewItems = [
    ["Completion Date", "2023-06-21"],
    ["Buyer", "John Doe"],
    ["Seller", "Jane Doe"],
    ["Strata", "267 Maybell Springs\nApt. 136\nSpringfield, BC"]
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
    ["Case Number", "A512B39", "input"],
    ["Representing", "Buyer", "select"],
    ["Property ID (PID)", "123-456-789", "input"],
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
            smartconveyance.innobridge.ca <span>/</span> case <span>/</span> A512B39
          </div>
          <div className="portal-live-pill">
            <i />
            Live case
          </div>
        </div>

        <aside className="portal-preview-sidebar">
          <div className="portal-preview-logo">
            <img
              src={assetPath("/brand/smartconveyance-primary-dark.png")}
              alt="SmartConveyance"
              decoding="async"
            />
          </div>

          <div className="portal-user-card">
            <div className="portal-avatar">JS</div>
            <div>
              <strong>John Smith</strong>
              <span>Smith Law</span>
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
                <strong>Case A512B39</strong>
              </div>

              <div className="portal-case-heading">
                <div>
                  <span>PURCHASE</span>
                  <h3>Case</h3>
                </div>

                <div className="portal-case-number">A512B39</div>
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

        <div className="portal-floating-card portal-floating-card-one" aria-hidden="true">
          <strong>AI import complete</strong>
          <span>Case fields matched from source documents</span>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="heroTitle">
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <div className="hero-kicker">
            <i />
            SmartConveyance by Innobridge
          </div>
          <h1 id="heroTitle">
            <span className="title-word">Spend</span>{" "}
            <span className="title-word">Less.</span>{" "}
            <span className="title-word">Conveyance</span>{" "}
            <span>More.</span>
          </h1>
          <p className="hero-sub">
            Software that adapts to your workflow. SmartConveyance helps law firms streamline real estate conveyancing,
            reduce manual errors, and move from intake to filing with confidence.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#demo">
              Talk to an Expert
              <ArrowRight className="icon" aria-hidden="true" />
            </a>
            <a className="btn btn-ghost" href="#product">
              See how it works
              <ArrowRight className="icon" aria-hidden="true" />
            </a>
          </div>
          <div className="hero-proof" aria-label="Product strengths">
            {proofPills.map((pill) => (
              <div className="proof-pill" key={pill.title}>
                <IconArtwork icon={pill.icon} />
                <div>
                  <span>{pill.title}</span>
                  <em>{pill.description}</em>
                </div>
              </div>
            ))}
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
  function renderMetricValue(value: string) {
    // 1) Pipe-separated: explicit "Prefix|Bold value" split
    const pipeMatch = value.match(/^(.+)\|(.+)$/);

    if (pipeMatch) {
      const [, prefix, rest] = pipeMatch;

      return (
        <>
          <span className="metric-prefix">{prefix.trim()}</span>
          <strong className="metric-number metric-number--text">{rest.trim()}</strong>
        </>
      );
    }

    // 2) Numeric values: capture prefix / number / suffix
    const numericMatch = value.match(/^(.*?)\s*([\$£€]?\d[\d,\.\-\s]*\w*)(.*)$/);

    if (numericMatch) {
      const [, prefix, number, suffix] = numericMatch;

      return (
        <>
          <span className="metric-prefix">{prefix ? prefix.trim() : ""}</span>
          <strong className="metric-number">{number.trim()}</strong>
          {suffix ? <span className="metric-suffix">{suffix.trim()}</span> : null}
        </>
      );
    }

    // 3) Values that start with 'Save' — make 'Save' the small prefix
    const saveMatch = value.match(/^(Save(?: up to)?)(?:\s+)(.+)$/i);

    if (saveMatch) {
      const [, prefix, rest] = saveMatch;

      return (
        <>
          <span className="metric-prefix">{prefix}</span>
          <strong className="metric-number metric-number--text">{rest}</strong>
        </>
      );
    }

    // 4) Fallback: render the whole value as the emphasized metric text
    return (
      <>
        <span className="metric-prefix"></span>
        <strong className="metric-number metric-number--text">{value}</strong>
      </>
    );
  }

  return (
    <div className="metric-strip">
      <Reveal className="container metric-inner">
        {metrics.map((metric) => (
          <div className="metric" key={metric.value}>
            {renderMetricValue(metric.value)}
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
            The real challenge is not a lack of software. It is fragmented work: re-keying, switching tools, and checking
            the same file across multiple places.
          </p>
          <div className="tax-card">
            <strong>Context Tax</strong>
            <span>The invisible cost of fragmented legal work.</span>
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
        </div>

        {/* <Reveal className="bridge-card">
          <BridgeIllustration />
          <div className="bridge-card-copy">
            <h3>The Innobridge Bridge</h3>
            <p>
              One legal operating layer that turns matter data into documents, review checkpoints, collaboration, and
              filing-ready workflows.
            </p>
          </div>
          <a className="btn btn-primary" href="#product">
            Explore product
            <ArrowRight className="icon" aria-hidden="true" />
          </a>
        </Reveal> */}

        <div className="why-proof-row" aria-label="SmartConveyance coverage and integrations">
          <Reveal className="context-integration-card why-proof-card">
            <span>Connected ecosystem</span>
            <div className="context-logo-row">
              {integrationLogos.map((integration) => (
                <div className={`context-logo-pill ${integration.name.toLowerCase()}`} key={integration.name}>
                  <img src={integration.logo} alt={`${integration.name} logo`} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="matter-coverage-card problem-coverage-card" delay={90}>
            <span className="coverage-kicker">Matter coverage</span>
            <strong>
              <span>Residential &</span>
              <span>Commercial</span>
            </strong>
            <div className="matter-coverage-list">
              {matterCoverage.map((matterType) => (
                <span key={matterType}>{matterType}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StageOne() {
  type StageOneSelectKey = "representing" | "propertyType";

  const [selectedValues, setSelectedValues] = useState<Record<StageOneSelectKey, string>>({
    representing: "Buyer",
    propertyType: ""
  });

  const representingOptions = ["Buyer", "Seller", "Borrower", "Transferor", "Transferee"];
  const propertyTypeOptions = [
    {
      value: "Single Family House",
      label: "Single Family",
      helper: "Detached residential purchase"
    },
    {
      value: "Strata",
      label: "Strata",
      helper: "Condo or strata property"
    },
    {
      value: "Bare Land",
      label: "Bare Land",
      helper: "Land-only conveyance"
    }
  ];

  return (
    <div className="case-create-preview case-create-preview-refined">
      <div className="case-preview-topline">
        <span>Required setup</span>
        <strong>New conveyance file</strong>
      </div>

      <div className="case-form-stack case-form-stack-refined">
        <div className="app-field app-field-empty">
          <label>
            Case Number <b>*</b>
          </label>
          <span>Enter firm case number</span>
        </div>

        <div className="app-field">
          <label>
            Property ID (PID) <b>*</b>
          </label>
          <span>XXX-XXX-XXX</span>
        </div>

        <div className="case-choice-block">
          <div className="case-choice-head">
            <span>
              Representing <b>*</b>
            </span>
            <em>{selectedValues.representing}</em>
          </div>

          <div className="case-pill-options" role="listbox" aria-label="Representing">
            {representingOptions.map((option) => (
              <button
                className={selectedValues.representing === option ? "selected" : ""}
                type="button"
                role="option"
                aria-selected={selectedValues.representing === option}
                key={option}
                onClick={() =>
                  setSelectedValues((currentValues) => ({
                    ...currentValues,
                    representing: option
                  }))
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="case-choice-block case-property-block">
          <div className="case-choice-head">
            <span>
              Property Type <b>*</b>
            </span>
            <em>{selectedValues.propertyType}</em>
          </div>

          <div className="case-property-options" role="listbox" aria-label="Property type">
            {propertyTypeOptions.map((option) => (
              <button
                className={selectedValues.propertyType === option.value ? "selected" : ""}
                type="button"
                role="option"
                aria-selected={selectedValues.propertyType === option.value}
                key={option.value}
                onClick={() =>
                  setSelectedValues((currentValues) => ({
                    ...currentValues,
                    propertyType: option.value
                  }))
                }
              >
                <strong>{option.label}</strong>
                <span>{option.helper}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="case-preview-footer">
          <div>
            <strong>Only case-relevant fields shown</strong>
            <span>SmartConveyance adapts the setup based on matter type and representation.</span>
          </div>
          <button type="button">Continue</button>
        </div>
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
      </div>
    </div>
  );
}

function StageThree() {
  return (
    <div className="review-editor-focused review-editor-no-sidebar">
      <main className="review-editor-workspace">
        <div className="review-editor-topbar">
          <div>
            <strong>Engagement Letter</strong>
            <span>Purchase Case · A512B39 · Generated document</span>
          </div>

          <div className="review-editor-tabs">
            <button className="active">Preview</button>
            <button>Comments</button>
          </div>
        </div>

        <div className="review-document-wrap">
          <article className="review-letter-page">
            <header className="review-letterhead-real">
              <div className="review-law-logo">
                <div className="review-law-mark">SL</div>
                <div>
                  <h4>Smith Law</h4>
                  <span>Conveyancing & Real Estate Law</span>
                </div>
              </div>

              <div className="review-law-address">
                <p>200 – 123 Legal Avenue</p>
                <p>Springfield, BC V5V 5V5</p>
                <p>Phone: 604-555-0182</p>
                <p>Fax: 604-555-0183</p>
              </div>
            </header>

            <div className="review-letter-rule" />

            <div className="review-letter-meta">
              <div>
                <p>
                  <strong>Our File No:</strong>{" "}
                  <span>A512B39</span>
                </p>
                <p>June 21, 2023</p>
              </div>
            </div>

            <div className="review-letter-address">
              <p><strong>John Doe</strong></p>
              <p>267 Maybell Springs, Apt. 136</p>
              <p>Springfield, BC V5V 5V5 Canada</p>
            </div>

            <p className="review-greeting">Dear Sirs/Mesdames:</p>

            <div className="review-letter-re">
              <strong>Re:</strong>
              <p>
                Purchase of{" "}
                <span className="review-chip warning">267 Maybell Springs, Apt. 136</span>
                , Springfield, BC V5V 5V5 from{" "}
                <span className="review-chip">Jane Doe</span>{" "}
                (the "Seller")
              </p>
            </div>

            <p className="review-letter-body">
              Thank you for selecting Smith Law to act as your representative in the above matter. The purpose of this
              engagement letter is to outline the nature of the engagement and our respective responsibilities and
              expectations.
            </p>

            <section className="review-letter-section">
              <h5>1. Scope of Engagement</h5>
              <p>We will act for you in connection with the purchase of the Property, including:</p>

              <ul>
                <li>
                  <span>Reviewing the Contract of Purchase and Sale and related documents</span>
                </li>
                <li>
                  <span className="needs-check">Confirming title, tax, lender, and possession information</span>
                </li>
                <li>
                  <span className="soft-highlight">Preparing case-specific closing documents</span>
                </li>
              </ul>
            </section>

            <section className="review-letter-section">
              <h5>2. Fees and Disbursements</h5>
              <p>
                Legal fees:{" "}
                <span className="review-chip success">$1,450.00</span>{" "}
                plus applicable taxes.
              </p>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}

function StageFour() {
  const rows = [
    ["One-click file generation", "Only case-required files are generated."],
    ["Title search integration", "One-click order from myLTSA."],
    ["Insurance ordering", "Full integration with FCT and more coming soon."],
    ["Web filing", "Automatically fills all required Web filing forms."]
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
  const titles = ["New Case Setup", "Import Sources", "", "Automation Center"];
  const pills = ["Residential Purchase", "4 files matched", "", "3rd-party integrations"];

  const content = [
    <StageOne key="stage-one" />,
    <StageTwo key="stage-two" />,
    <StageThree key="stage-three" />,
    <StageFour key="stage-four" />
  ];

  if (index === 2) {
    return (
      <div className="screen-preview screen-preview-review">
        {content[index]}
      </div>
    );
  }

  return (
    <div className={`screen-preview${index === 0 ? " screen-preview-scroll" : ""}`}>
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
    </div>
  );
}

function ProductSection() {
  const [activeStage, setActiveStage] = useState(0);

  const selectStage = (index: number) => {
    setActiveStage(index);
  };

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
                onClick={() => selectStage(index)}
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

        <div className="product-mobile-steps" aria-label="Product workflow">
          {productStages.map((stage, index) => (
            <div
              className={`product-mobile-card product-mobile-card-${index % 2 === 0 ? "dark" : "green"}`}
              key={stage.title}
            >
              <span className="product-mobile-num">{index + 1}</span>
              <div className="product-mobile-body">
                <strong>{stage.title}</strong>
                <p>{stage.mobileSummary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section" id="features" aria-labelledby="featuresTitle">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Features</div>
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
          <h2 id="outcomesTitle">Digital conveyancing, <br /> re-engineered.</h2>
        </Reveal>
        <div className="outcome-grid">
          {outcomes.map((outcome, index) => (
            <Reveal className={`outcome-card${outcome.tone === "green" ? " outcome-card--green" : ""}`} delay={(index % 4) * 70} key={outcome.title}>
              <div className={`card-icon${outcome.tone === "green" ? " green" : ""}`}>
                <IconArtwork icon={outcome.icon} />
              </div>
              <strong>{outcome.title}</strong>
              <span>{outcome.description}</span>
            </Reveal>
          ))}
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flowRoutes, setFlowRoutes] = useState<SupportFlowRoute[]>([]);
  const [flowSize, setFlowSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let animationFrame = 0;

    const getCards = () =>
      cardRefs.current
        .slice(0, supportSteps.length)
        .filter((card): card is HTMLDivElement => Boolean(card));

    const calculateFlow = () => {
      const cards = getCards();
      const board = cards[0]?.parentElement;

      if (!board || cards.length < 2) {
        setFlowRoutes([]);
        return;
      }

      const boardRect = board.getBoundingClientRect();
      const nextSize = {
        width: Math.max(1, Math.round(boardRect.width)),
        height: Math.max(1, Math.round(boardRect.height))
      };

      const nextRoutes = cards.slice(0, -1).map((card, index) => ({
        id: `${supportSteps[index].title}-${supportSteps[index + 1].title}`,
        d: buildSupportFlowPath(card.getBoundingClientRect(), cards[index + 1].getBoundingClientRect(), boardRect)
      }));

      setFlowSize((currentSize) =>
        currentSize.width === nextSize.width && currentSize.height === nextSize.height ? currentSize : nextSize
      );
      setFlowRoutes((currentRoutes) =>
        currentRoutes.length === nextRoutes.length &&
        currentRoutes.every((route, index) => route.d === nextRoutes[index].d)
          ? currentRoutes
          : nextRoutes
      );
    };

    const scheduleCalculation = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(calculateFlow);
    };

    scheduleCalculation();

    const cards = getCards();
    const board = cards[0]?.parentElement;
    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(scheduleCalculation)
        : undefined;

    if (resizeObserver) {
      if (board) {
        resizeObserver.observe(board);
      }

      cards.forEach((card) => resizeObserver.observe(card));
    }

    window.addEventListener("resize", scheduleCalculation, { passive: true });
    window.addEventListener("orientationchange", scheduleCalculation);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleCalculation);
      window.removeEventListener("orientationchange", scheduleCalculation);
    };
  }, []);

  return (
    <section className="section" id="support" aria-labelledby="supportTitle">
      <div className="container onboarding-wrap">
        <Reveal className="flow-board" aria-label="Onboarding flow">
          <svg
            className="flow-route"
            viewBox={`0 0 ${flowSize.width} ${flowSize.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="supportRouteGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#171D1A" />
                <stop offset="55%" stopColor="#187D9E" />
                <stop offset="100%" stopColor="#90A668" />
              </linearGradient>
              <marker
                id="supportRouteArrow"
                markerWidth="12"
                markerHeight="12"
                refX="10.5"
                refY="6"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path className="flow-route-arrow-head" d="M 1.5 1.5 L 10.5 6 L 1.5 10.5 Z" />
              </marker>
            </defs>
            {flowRoutes.map((route, index) => (
              <g className="flow-route-segment" key={route.id}>
                <path className="flow-route-glow" d={route.d} vectorEffect="non-scaling-stroke" />
                <path
                  className="flow-route-track"
                  d={route.d}
                  stroke="url(#supportRouteGradient)"
                  markerEnd="url(#supportRouteArrow)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="flow-route-motion"
                  d={route.d}
                  pathLength={1}
                  stroke="url(#supportRouteGradient)"
                  vectorEffect="non-scaling-stroke"
                  style={{ animationDelay: `${index * 0.34}s` }}
                />
                <circle className="flow-route-dot" r="4">
                  <animate
                    attributeName="opacity"
                    begin={`${index * 0.42}s`}
                    dur="3.8s"
                    keyTimes="0;0.14;0.82;1"
                    repeatCount="indefinite"
                    values="0;1;1;0"
                  />
                  <animateMotion begin={`${index * 0.42}s`} dur="3.8s" path={route.d} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
          {supportSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                className={`flow-card flow-card-${index + 1}`}
                key={step.title}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
              >
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
            Talk to an Expert
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
          <p className="lead">Simple pricing with <b>no contract or hidden fees</b>, that makes operational gains visible without long-term lock-in.</p>
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
          <div className="eyebrow eyebrow-light">Return on Investment</div>
          <h2 id="roiTitle">Smart choice that empowers your growth.</h2>
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
                  <td className="col-legacy">Up to 5 hrs</td>
                  <td className="col-smart">Less than 1 hr</td>
                </tr>
                <tr>
                  <th scope="row">
                    Labour Cost <small>at $45 / hr</small>
                  </th>
                  <td className="col-legacy">$90-225</td>
                  <td className="col-smart">Less than $45</td>
                </tr>
                <tr>
                  <th scope="row">Software Fees</th>
                  <td className="col-legacy">$99-$250 + contract and hidden fees</td>
                  <td className="col-smart">$79.00 no contract, no hidden fees</td>
                </tr>
                <tr className="fin-total">
                  <th scope="row">Total Cost / Case</th>
                  <td className="col-legacy">$189-475</td>
                  <td className="col-smart">$124</td>
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
          {roiBubbles.map((bubble, index) => (
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
                    <IconArtwork icon={bubble.icon} />
                  </span>
                </div>
                <p>{bubble.description}</p>
              </Reveal>
          ))}
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
            src={assetPath("/brand/innobridge-primary-light.png")}
            alt="Innobridge"
            decoding="async"
          />
          <div className="eyebrow eyebrow-light">Our story</div>
          <h2 id="storyTitle">Where Legal Wisdom Meets Technical Excellence.</h2>
          <p>
            Our vision is to shape a future where intelligent legal technology makes legal practice more efficient, accessible, and empowering. We strive to equip legal professionals with tools that streamline work, strengthen accuracy, and support sustainable growth, enabling them to serve clients with confidence and redefine what excellent legal service can look like in a modern world.
          </p>
        </Reveal>
        <div className="values-grid">
          {values.map((value, index) => (
            <Reveal className={`value-card${value.tone === "green" ? " value-card--green" : ""}`} delay={(index % 2) * 80} key={value.title}>
              <div className="value-card-icon">
                <IconArtwork icon={value.icon} />
              </div>
              <strong>{value.title}</strong>
              <span>{value.description}</span>
            </Reveal>
          ))}
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

    if (isStaticDemoMode) {
      await new Promise((resolve) => window.setTimeout(resolve, 550));
      saveStaticDemoRequest(normalizedForm);
      setForm(initialDemoFormValues);
      setTouched({});
      setErrors({});
      setSubmitAttempted(false);
      setSubmitState({
        status: "success",
        message: "Preview mode: your request was validated locally. Connect the backend before launch to save requests to the database."
      });
      return;
    }

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
          <div className="eyebrow">Talk to an Expert</div>
          <h2 id="demoTitle">Start with a legal <br></br> workflow fit assessment.</h2>
          <p className="lead">
            A solutions expert can show how SmartConveyance fits your practice, team structure, and current conveyancing
            process.
          </p>
          <div className="demo-benefits">
            {["Personalized walkthrough", "No contract, pay per case", "Same-day onboarding path", "Ongoing 360° support from day one"].map((benefit) => (
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
                <label htmlFor="phone">Phone</label>
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
              {isSubmitting ? "Submitting..." : "Submit"}
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
            <strong>Need something specific?</strong>
            <p>Book a guided workflow assessment with the SmartConveyance team.</p>
            <div className="faq-summary-actions">
              <a className="btn btn-primary" href="#demo">Talk to an Expert</a>
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
                        <span className="faq-q-text">{faq.question}</span>
                        <span aria-hidden="true" className="faq-q-icon">+</span>
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
            <a href="#problem">Why SmartConveyance</a>
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#impact">Impact</a>
            <a href="https://smartconveyance.innobridge.ca/">Sign in to Portal</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#pricing">Pricing</a>
            <a href="#support">Support</a>
            <a href="#story">Our story</a>
          </div>
          <div>
            <div className="footer-support-card">
              <div className="footer-support-header">
                <h4>360° Support</h4>
              </div>
              <div className="footer-support-item">
                <Mail className="icon" size={13} aria-hidden="true" />
                Available to clients only
              </div>
              <a href="tel:+18882669010" className="footer-support-item">
                <Phone className="icon" size={13} aria-hidden="true" />
                +1 (888) 266-9010
              </a>
              <div className="footer-support-item">
                <Video className="icon" size={13} aria-hidden="true" />
                Live Zoom walkthroughs
              </div>
              <div className="footer-support-item">
                <BookOpen className="icon" size={13} aria-hidden="true" />
                Embedded how-to guides
              </div>
              <div className="footer-support-item">
                <UsersRound className="icon" size={13} aria-hidden="true" />
                One-on-one expert training
              </div>
              <a href="https://smartconveyance.innobridge.ca/" className="footer-support-signin">
                Talk to an Expert
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
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
        {/* <RoiSection /> */}
        <StorySection />
        <DemoSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
