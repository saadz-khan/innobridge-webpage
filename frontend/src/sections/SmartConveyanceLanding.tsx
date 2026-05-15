import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CirclePlay,
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

type ProductStage = {
  title: string;
  tabCopy: string;
  headerCopy: string;
  status: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const navLinks = [
  { label: "Pain points", href: "#problem" },
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
    description: "Phone, Zoom, guides, training",
    icon: MessageCircle
  }
];

const metrics = [
  {
    value: "$150+",
    label: "Potential savings per matter through reduced admin time."
  },
  {
    value: "~1.5h",
    label: "Estimated staff time per file after workflow automation."
  },
  {
    value: "10:1",
    label: "Revenue-to-cost capacity narrative for growth-minded firms."
  },
  {
    value: "360°",
    label: "Support across onboarding, training, and daily use."
  }
];

const painCards: IconCard[] = [
  {
    title: "AI-empowered features",
    description:
      "Deep automation supports accurate conveyancing, reduces manual errors, minimizes re-keying, and helps generate case-specific files from a cleaner matter record.",
    icon: Sparkles
  },
  {
    title: "Make complex conveyancing simple",
    description:
      "A calm, legal-first interface keeps the work easy to learn, easy to use, and tailored to the way conveyancing practitioners actually operate.",
    icon: LineChart,
    tone: "green"
  },
  {
    title: "Streamlined workflow",
    description:
      "All-in-one forms and one-click generation simplify the process from intake to filing so the file moves forward without tool switching.",
    icon: FolderOpen,
    tone: "dark"
  }
];

const productStages: ProductStage[] = [
  {
    title: "Create New Case",
    tabCopy: "Only case-relevant fields appear, keeping setup simple and focused.",
    headerCopy: "Case-type logic keeps setup focused.",
    status: "Focused setup"
  },
  {
    title: "Auto Data Import",
    tabCopy: "Contracts, reports, tax certificates, and lender details populate the matter record.",
    headerCopy: "Extract, match, and populate fields with review confidence.",
    status: "AI assisted"
  },
  {
    title: "Review & Adjust",
    tabCopy: "Review key details and adjust only the items that need attention.",
    headerCopy: "Focus attention where judgment is needed.",
    status: "Counsel visible"
  },
  {
    title: "Generate & File",
    tabCopy: "Generate only the files needed by the case, then move into integrations.",
    headerCopy: "Files, title search, insurance ordering, and web filing support.",
    status: "Filing ready"
  }
];

const featureCards: IconCard[] = [
  {
    title: "Purchase and sale files",
    description:
      "Support for residential and commercial matters, with workflows that stay relevant to the selected file type.",
    icon: CheckCircle2
  },
  {
    title: "Smart templates",
    description:
      "Customizable firm templates and consistent document generation from one authoritative matter record.",
    icon: PenLine,
    tone: "green"
  },
  {
    title: "Case progress tracking",
    description:
      "Track matter state, review checkpoints, status updates, and audit activity without asking around.",
    icon: BarChart3,
    tone: "dark"
  },
  {
    title: "AI data import",
    description:
      "Populate matter fields from contracts, commission reports, certificates, and other source files.",
    icon: FileText
  },
  {
    title: "Third-party workflow",
    description:
      "Support for title search, insurance ordering, and filing workflows tied back to the same matter.",
    icon: Workflow,
    tone: "green"
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

const supportSteps: Array<IconCard & { linkCopy: string; linkHref?: string }> = [
  {
    title: "Discovery Call",
    description: "and map AI-driven solutions to your workflow.",
    linkCopy: "Book a demo",
    linkHref: "#demo",
    icon: Phone
  },
  {
    title: "Quick onboarding",
    description: "with a fast-track path built for your team.",
    linkCopy: "Start setup",
    linkHref: "#demo",
    icon: ArrowRight,
    tone: "green"
  },
  {
    title: "Seamless training",
    description: "Use embedded guides and visit the",
    linkCopy: "support section",
    linkHref: "#supportDetails",
    icon: BookOpen,
    tone: "dark"
  },
  {
    title: "Conveyancing",
    description: "Automation, AI features, third-party integrations, and",
    linkCopy: "360° support",
    linkHref: "#supportDetails",
    icon: LineChart
  }
];

const pricingPlans = [
  {
    name: "Free Trial",
    description: "Validate the workflow with your team before committing to volume usage.",
    price: "$0",
    suffix: " / trial",
    cta: "Start trial",
    buttonClass: "btn-subtle",
    features: ["Guided walkthrough", "Sample matter setup", "Workflow fit assessment", "No long-term commitment"]
  },
  {
    name: "Basic",
    description: "Pay per matter with core features included for residential and commercial workflows.",
    price: "$79",
    suffix: " / case",
    cta: "Book your demo",
    buttonClass: "btn-primary",
    badge: "Most focused",
    features: ["Purchase and sale files", "AI data import", "One-click file generation", "LTSA workflow support", "360° support included"]
  },
  {
    name: "Premium",
    description: "For firms that need deeper configuration, templates, training, and rollout support.",
    price: "Custom",
    suffix: "",
    cta: "Talk to sales",
    buttonClass: "btn-dark",
    features: ["Advanced workflow setup", "Custom firm templates", "Team training plan", "Implementation support", "Priority onboarding"]
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
    title: "Innovation",
    description: "Fusing systems design with research-backed AI to keep legal teams ahead of the curve.",
    icon: Sparkles
  },
  {
    title: "Simplicity",
    description: "Believing that in legal tech, simple is the ultimate sophistication.",
    icon: CheckCircle2,
    tone: "green"
  },
  {
    title: "Productivity",
    description: "Removing technical bottlenecks so the same team can increase case capacity.",
    icon: LineChart
  },
  {
    title: "Quality",
    description: "Delivering reliable workflows through native architecture built for the legal landscape.",
    icon: ShieldCheck,
    tone: "green"
  }
];

const faqs: FaqItem[] = [
  {
    question: "Do you offer onboarding support?",
    answer:
      "Yes. Our project teams help firms navigate change, engage stakeholders, and adopt the workflow confidently."
  },
  {
    question: "Which provinces currently support SmartConveyance?",
    answer:
      "SmartConveyance currently focuses on British Columbia conveyancing workflows, with additional provinces planned."
  },
  {
    question: "Is it for both residential and commercial matters?",
    answer:
      "Yes. The workflow supports residential and commercial conveyancing with matter-specific setup and generated files."
  },
  {
    question: "What tools does it integrate with?",
    answer:
      "The product narrative includes myLTSA workflow support and FCT-aware conveyancing, plus third-party automation for title search, insurance ordering, and web filing."
  },
  {
    question: "Can I import data from my previous system?",
    answer:
      "Contact support@innobridge.ca to assess migration needs and available import options for your firm."
  }
];

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a href="#top" aria-label="SmartConveyance by Innobridge home">
            <Brand variant={scrolled ? "color" : "light"} />
          </a>
          <div className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
            {navLinks.map((link) => (
              <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
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
  const caseRows = [
    ["Buyer", "Jordan Lee and Priya Sharma"],
    ["Seller", "M. Henderson Holdings Ltd."],
    ["Completion", "June 18, 2026"],
    ["Lender", "Royal Bank of Canada"]
  ];

  const progressRows = [
    ["✓", "Intake created", "Case-relevant fields shown", "Done"],
    ["✓", "Data imported", "Contract, tax certificate, lender", "Done"],
    ["3", "Counsel review", "Two flagged values need approval", "Now"],
    ["4", "Generate and file", "Completion package and LTSA", "Next"]
  ];

  const docRows = [
    ["Statement of Adjustments", "Ready"],
    ["Form A Transfer", "Ready"],
    ["Buyer Report Letter", "Queued"],
    ["LTSA Filing Package", "Ready"]
  ];

  return (
    <div className="hero-visual" aria-label="SmartConveyance portal preview">
      <div className="portal-frame">
        <div className="portal-topbar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="url-pill">smartconveyance.innobridge.ca / matter / SC-4821</div>
          <span className="status-pill">Live matter</span>
        </div>
        <div className="portal-app">
          <aside className="portal-sidebar">
            <div className="portal-logo">
              <img
                className="portal-logo-img"
                src="/brand/smartconveyance-primary-dark.png"
                alt="SmartConveyance"
                decoding="async"
              />
            </div>
            <nav className="portal-nav" aria-label="Portal preview navigation">
              {["Overview", "Parties", "Property", "Documents", "LTSA Filing", "Audit Trail"].map((item, index) => (
                <a className={index === 0 ? "active" : undefined} href="#product" key={item}>
                  <span />
                  {item}
                </a>
              ))}
            </nav>
            <div className="portal-sidebar-card">
              <strong>AI import complete</strong>
              <span>Contract, commission report, and tax certificate matched into the file.</span>
            </div>
          </aside>
          <div className="portal-main">
            <div className="portal-head">
              <div className="portal-title">
                <small>Residential Purchase</small>
                <strong>2518 Alder Street, Vancouver</strong>
              </div>
              <span className="status-pill">Ready for review</span>
            </div>
            <div className="portal-grid">
              <div className="portal-card">
                <h4>
                  Case details <span>Updated now</span>
                </h4>
                <div className="case-rows">
                  {caseRows.map(([label, value]) => (
                    <div className="case-row" key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="portal-card ai-panel">
                <h4>
                  AI confidence <span>4 sources</span>
                </h4>
                <div className="ai-lines">
                  {[96, 92, 88, 94].map((value) => (
                    <div className="ai-line" key={value}>
                      <div className="ai-bar">
                        <i style={{ width: `${value}%` }} />
                      </div>
                      <span>{value}%</span>
                    </div>
                  ))}
                </div>
                <div className="portal-action">
                  <div className="portal-button">Review fields</div>
                  <div className="portal-button secondary">Import report</div>
                </div>
              </div>

              <div className="portal-card">
                <h4>
                  Workflow status <span>Intake to filing</span>
                </h4>
                <div className="progress-list">
                  {progressRows.map(([step, title, copy, state]) => (
                    <div className="progress-item" key={title}>
                      <div className="progress-check">{step}</div>
                      <div className="progress-copy">
                        <strong>{title}</strong>
                        <span>{copy}</span>
                      </div>
                      <em>{state}</em>
                    </div>
                  ))}
                </div>
              </div>

              <div className="portal-card">
                <h4>
                  Generated files <span>One click</span>
                </h4>
                <div className="doc-list">
                  {docRows.map(([label, state]) => (
                    <div className="doc-row" key={label}>
                      {label} <span>{state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-card one">
        <div className="float-card-icon">AI</div>
        <div>
          <strong>Case data extracted</strong>
          <span>No duplicate entry required</span>
        </div>
      </div>
      <div className="float-card two">
        <div className="float-card-icon">✓</div>
        <div>
          <strong>LTSA workflow ready</strong>
          <span>Filing data organized</span>
        </div>
      </div>
    </div>
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
              <CirclePlay className="icon" aria-hidden="true" />
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
          <div className="eyebrow">The pain point</div>
          <h2 id="problemTitle">Faster conveyancing. Fewer errors.</h2>
          <p className="lead">
            The real problem is not a lack of software. It is fragmented work: re-keying, switching tools, and checking
            the same file across multiple places.
          </p>
          <div className="tax-card">
            <strong>Context Tax</strong>
            <span>The invisible cost of disconnected legal work.</span>
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
    ["Matter type", "Purchase"],
    ["Property class", "Residential"],
    ["Property address", "2518 Alder Street, Vancouver BC", "wide"],
    ["Completion date", "June 18, 2026"],
    ["Required workflow", "Buyer side, lender file"]
  ];

  return (
    <div className="screen-grid">
      {fields.map(([label, value, className]) => (
        <div className={`field-card${className ? ` ${className}` : ""}`} key={label}>
          <label>{label}</label>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function StageTwo() {
  const rows = [
    ["PDF", "Contract of Purchase and Sale", "Buyer, seller, property, dates", "96%"],
    ["TAX", "Tax Certificate", "Roll number and adjustments", "92%"],
    ["LDR", "Lender Instructions", "Mortgage and insurance details", "89%"],
    ["COM", "Commission Report", "Brokerage details and calculations", "94%"]
  ];

  return (
    <div className="import-stack">
      {rows.map(([fileType, title, copy, confidence]) => (
        <div className="import-row" key={title}>
          <div className="file-icon">{fileType}</div>
          <div>
            <strong>{title}</strong>
            <span>{copy}</span>
          </div>
          <div className="confidence">{confidence}</div>
        </div>
      ))}
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
    ["Generate closing package", "Only case-required files are selected."],
    ["Title search integration", "Start from the same matter record."],
    ["Insurance ordering", "Reusable matter data reduces re-entry."],
    ["Web filing", "Prepared data moves into the filing workflow."]
  ];

  return (
    <div className="automation-grid">
      {rows.map(([title, copy]) => (
        <div className="automation-card" key={title}>
          <strong>{title}</strong>
          <span>{copy}</span>
        </div>
      ))}
    </div>
  );
}

function StageContent({ index }: { index: number }) {
  const titles = ["New Matter Setup", "Import Sources", "Review Queue", "Automation Center"];
  const pills = ["Residential Purchase", "4 files matched", "2 items flagged", "One-click package"];
  const content = [<StageOne key="stage-one" />, <StageTwo key="stage-two" />, <StageThree key="stage-three" />, <StageFour key="stage-four" />];

  return (
    <div className="screen-preview">
      <div className="mini-dashboard">
        <div className="mini-toolbar">
          <strong>{titles[index]}</strong>
          <span>{pills[index]}</span>
        </div>
        {content[index]}
      </div>
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
                <span>
                  <strong>{stage.title}</strong>
                  <span>{stage.tabCopy}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="product-stage">
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
          <p className="lead">A calmer operating layer that creates measurable operational outcomes for legal teams.</p>
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

function SupportSection() {
  return (
    <section className="section" id="support" aria-labelledby="supportTitle">
      <div className="container onboarding-wrap">
        <Reveal className="flow-board" aria-label="Onboarding flow">
          {supportSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="flow-card" key={step.title}>
                <CardIcon icon={Icon} tone={step.tone} />
                <div>
                  <strong>{step.title}</strong>
                  <span>
                    {index === 0 || index === 1 ? (
                      <>
                        <a href={step.linkHref}>{step.linkCopy}</a> {step.description}
                      </>
                    ) : index === 2 ? (
                      <>
                        {step.description} <a href={step.linkHref}>{step.linkCopy}</a> for help.
                      </>
                    ) : (
                      <>
                        {step.description} <a href={step.linkHref}>{step.linkCopy}</a>.
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="flow-arrow arrow-1" />
          <div className="flow-arrow arrow-2" />
          <div className="flow-arrow arrow-3" />
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
          <p className="lead">Simple pricing that makes operational gains visible without long-term lock-in.</p>
        </Reveal>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <Reveal className={`price-card${plan.badge ? " featured" : ""}`} delay={index * 80} key={plan.name}>
              {plan.badge ? <span className="price-badge">{plan.badge}</span> : null}
              <h3>{plan.name}</h3>
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
              <a className={`btn ${plan.buttonClass}`} href="#demo">
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoiSection() {
  return (
    <section className="section section-dark" id="roi" aria-labelledby="roiTitle">
      <div className="container roi-layout">
        <Reveal>
          <div className="eyebrow eyebrow-light">ROI</div>
          <h2 id="roiTitle">Growth-ready infrastructure for serious firms.</h2>
          <p className="lead">
            Your tech stack should accelerate the practice instead of throttling it. SmartConveyance is positioned around
            immediate ROI and increased billable capacity.
          </p>
        </Reveal>
        <Reveal className="roi-card">
          <div className="roi-stat">
            <strong>10:1</strong>
            <span>revenue-to-cost capacity narrative</span>
          </div>
          <div className="comparison">
            <div className="bar-row">
              <strong>
                <span>Manual staff time per file</span>
                <span>4 to 6 hours</span>
              </strong>
              <div className="bar-track">
                <div className="bar-fill manual" />
              </div>
            </div>
            <div className="bar-row">
              <strong>
                <span>With SmartConveyance</span>
                <span>~1.5 hours</span>
              </strong>
              <div className="bar-track">
                <div className="bar-fill innobridge" />
              </div>
            </div>
          </div>
          <div className="savings-box">
            <strong>$81,000+ projected annual savings</strong>
            <span>Illustrative annual savings for a mid-sized firm, based on the website plan narrative.</span>
          </div>
        </Reveal>
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
          <p className="lead">
            A serious product page needs proof that speaks in the language of lawyers, paralegals, and firm owners.
          </p>
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
            Innobridge was launched in Alberta in 2022 to build a bridge between legal processes and digital solutions.
            The platform is designed around how law actually works, not around generic software habits.
          </p>
          <div className="story-facts" aria-label="Company highlights">
            <span><strong>2022</strong> Alberta launch</span>
            <span><strong>Legal-first</strong> process design</span>
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section" id="demo" aria-labelledby="demoTitle">
      <div className="container demo-grid">
        <Reveal>
          <div className="eyebrow">Book a demo</div>
          <h2 id="demoTitle">Start with a legal workflow fit assessment.</h2>
          <p className="lead">
            A solutions expert can show how SmartConveyance fits your file types, team structure, and current conveyancing
            process.
          </p>
          <div className="demo-benefits">
            {["Personalized 15-minute walkthrough", "No contract, pay per matter", "Same-day onboarding path", "360° support from day one"].map((benefit) => (
              <div key={benefit}>
                <i />
                {benefit}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="demo-card">
          <form className="demo-form" id="demoForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input id="firstName" name="firstName" autoComplete="given-name" required placeholder="Jane" />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" name="lastName" autoComplete="family-name" required placeholder="Smith" />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="firm">Firm name</label>
                <input id="firm" name="firm" required placeholder="Smith & Associates LLP" />
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input id="email" name="email" autoComplete="email" required type="email" placeholder="jane@firm.ca" />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="role">Your role</label>
                <select id="role" name="role">
                  <option value="">Select role</option>
                  <option>Lawyer / Partner</option>
                  <option>Conveyancer</option>
                  <option>Legal Assistant</option>
                  <option>Paralegal</option>
                  <option>Firm Owner / Administrator</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="volume">Monthly matter volume</label>
                <select id="volume" name="volume">
                  <option value="">Select volume</option>
                  <option>1-10</option>
                  <option>11-30</option>
                  <option>31-60</option>
                  <option>61-100</option>
                  <option>100+</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">What should the demo focus on?</label>
              <textarea id="message" name="message" placeholder="LTSA workflow, document generation, team collaboration..." />
            </div>
            <label className="checkbox">
              <input type="checkbox" required />{" "}
              <span>
                I agree to be contacted by Innobridge about SmartConveyance. We respect your privacy and will never share
                your information.
              </span>
            </label>
            <button className="btn btn-primary" type="submit">
              Book your demo today
            </button>
            <div className={`form-note${submitted ? " show" : ""}`} id="formNote" aria-live="polite">
              Thanks. This front-end prototype captured the request locally. Connect this form to your CRM or email service
              before production.
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section-tight" id="faq" aria-labelledby="faqTitle">
      <div className="container faq-wrap">
        <Reveal>
          <div className="eyebrow">FAQ</div>
          <h2 id="faqTitle">Common questions.</h2>
          <p className="lead">Clear answers reduce friction and help buyers understand fit before they book.</p>
        </Reveal>
        <Reveal className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={faq.question}>
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  {faq.question}
                  <span>+</span>
                </button>
                <div className="faq-a">{faq.answer}</div>
              </div>
            );
          })}
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
            <p>Technology that Speaks Legal. Built for conveyancing teams that need clarity, speed, and control.</p>
            <div className="support-footer-box">
              <strong>360° support</strong>
              <span>
                Phone, email, Zoom, embedded guides, webinars, and one-on-one expert training from onboarding to daily
                management.
              </span>
            </div>
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
            <h4>Contact</h4>
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
        <SupportSection />
        <PricingSection />
        <RoiSection />
        <TestimonialsSection />
        <StorySection />
        <DemoSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
