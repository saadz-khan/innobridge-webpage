import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  FileCheck2,
  FileText,
  FolderKanban,
  Gavel,
  Handshake,
  Headphones,
  Network,
  PanelTop,
  Phone,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UsersRound,
  Workflow
} from "lucide-react";

export const navigationLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Features", href: "#features" },
  { label: "ROI", href: "#roi" },
  { label: "Support", href: "#support" }
];

export const ecosystemSignals = [
  {
    title: "myLTSA-ready workflows",
    description: "Matter data and filing steps are organized around the electronic filing reality conveyancers already work in.",
    image: "/brand/ecosystem/ltsa-logo.jpg",
    imageAlt: "LTSA logo"
  },
  {
    title: "FCT-aware conveyancing",
    description: "Title insurance and legal professional workflows are treated as part of the transaction, not an afterthought.",
    image: "/brand/ecosystem/fct-logo.svg",
    imageAlt: "FCT logo",
    dark: true
  },
  {
    title: "Law firm operating rhythm",
    description: "Designed for lawyers, conveyancers, assistants, and practice leaders who need visibility without extra admin.",
    textMark: "Legal teams",
    icon: Gavel
  },
  {
    title: "Lender and document flow",
    description: "Keeps instructions, parties, documents, and completion requirements connected through one matter record.",
    textMark: "Lender workflow",
    icon: PanelTop
  }
];

export const operatingModel = [
  {
    title: "Authoritative matter record",
    description: "One structured source for parties, property, title, lender, tax, and filing data.",
    icon: DatabaseZap
  },
  {
    title: "Legal review checkpoints",
    description: "Conveyancers can move quickly while exceptions stay visible to counsel.",
    icon: ShieldCheck
  },
  {
    title: "Completion-ready workflow",
    description: "Documents, filing steps, and support prompts stay tied to the current matter state.",
    icon: FileCheck2
  }
];

export const legalWorkflowPillars = [
  {
    title: "Native Architecture",
    description: "Built to mirror real conveyancing workflows, from intake through filing and completion.",
    icon: Workflow
  },
  {
    title: "Semantic Alignment",
    description: "Connects client, property, title, tax, lender, and filing data so meaning travels with the matter.",
    icon: Network
  },
  {
    title: "Elite Systems Design",
    description: "Powerful underneath, simple on the surface, and designed for the reliability legal teams expect.",
    icon: BrainCircuit
  }
];

export const featureModules = [
  {
    title: "LTSA Intelligent Filing",
    outcome: "Move from prepared matter data to filing-ready work with fewer handoffs and less duplicate entry.",
    icon: FileCheck2
  },
  {
    title: "Frictionless Document Generation",
    outcome: "Generate consistent closing documents from one authoritative matter record.",
    icon: FileText
  },
  {
    title: "Real-Time Collaboration",
    outcome: "Keep lawyers, conveyancers, and support staff aligned around live matter status.",
    icon: UsersRound
  },
  {
    title: "AI-driven Automation",
    outcome: "Import and structure transaction data so teams spend less time copying and checking.",
    icon: Bot
  },
  {
    title: "Workflow Optimization",
    outcome: "Turn repeatable steps into guided progress so more files move cleanly through the system.",
    icon: FolderKanban
  },
  {
    title: "360-Degree Support",
    outcome: "Give teams expert help, embedded guidance, and practical onboarding when it matters.",
    icon: Headphones
  }
];

export const comparison = {
  smartConveyance: [
    "Affordable flat-rate pricing",
    "Easy to learn",
    "Eliminates manual data entry",
    "One-click file generation",
    "AI data importing with high accuracy",
    "360-degree support by email, phone, Zoom, webinars, FAQ, and embedded how-to guides"
  ],
  others: [
    "Expensive per-case pricing and hidden fees",
    "Steep learning curve",
    "Manual workflows",
    "Limited automation",
    "Limited support"
  ]
};

export const roiOutcomes = [
  {
    title: "Faster matter completion",
    description: "Matter data, documents, and filing steps move through one guided operating layer.",
    icon: Clock3
  },
  {
    title: "Lower admin burden",
    description: "Reduce the work of re-keying, chasing status, and reconciling data across tools.",
    icon: BriefcaseBusiness
  },
  {
    title: "Increased case capacity",
    description: "Help the same team handle more files by removing repeatable technical friction.",
    icon: ArrowRight
  },
  {
    title: "Reduced training time",
    description: "Embedded how-to guidance makes common workflows easier for new staff to adopt.",
    icon: BadgeCheck
  },
  {
    title: "More predictable workflows",
    description: "Clear checkpoints give firms better visibility from file opening to completion.",
    icon: ShieldCheck
  }
];

export const supportChannels = [
  {
    title: "Onboarding in minutes",
    detail: "Start with a practical setup path for real conveyancing work.",
    icon: Sparkles
  },
  {
    title: "Training in hours",
    detail: "Focused walkthroughs help staff become productive quickly.",
    icon: Clock3
  },
  {
    title: "Conveyancing on the same day",
    detail: "Go from platform access to working files without a long migration cycle.",
    icon: UploadCloud
  },
  {
    title: "360-degree ongoing support",
    detail: "Email, phone, Zoom, webinars, FAQ, embedded guides, and 1-on-1 expert training.",
    icon: Handshake
  }
];

export const contact = {
  phone: "+1 (888) 266-9010",
  phoneHref: "tel:+18882669010",
  email: "support@innobridge.ca",
  emailHref: "mailto:support@innobridge.ca"
};

export const contactActions = [
  { label: contact.phone, href: contact.phoneHref, icon: Phone },
  { label: contact.email, href: contact.emailHref, icon: Headphones }
];

export const footerLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Comparison", href: "#comparison" },
  { label: "Support", href: "#support" },
  { label: "Privacy", href: "#" },
  { label: "Legal", href: "#" }
];

export const checkIcon = CheckCircle2;
