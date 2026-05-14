import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CirclePlay,
  Clock3,
  Code2,
  Database,
  DatabaseZap,
  FileCheck2,
  FileText,
  FolderKanban,
  Layers,
  Mail,
  MessageCircle,
  MonitorCog,
  Network,
  PenLine,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  UploadCloud,
  UsersRound,
  X
} from "lucide-react";
import { DemoForm } from "../components/DemoForm";
import { Reveal } from "../components/Reveal";

type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type DetailRow = {
  key: string;
  value: string;
  icon: LucideIcon;
};

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "How It Works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" }
];

const problemCards: IconItem[] = [
  {
    title: "Re-keyed data",
    description: "The same client, property, and lender facts typed into 3 different systems - by hand, every single matter.",
    icon: FileText
  },
  {
    title: "Disconnected tools",
    description: "Six tabs open - LTSA portal, lender email, tax cert PDF, calendar, CMS, spreadsheet. Nothing speaks to anything else.",
    icon: MonitorCog
  },
  {
    title: "Information silos",
    description: "No one knows the true matter status without asking someone else. Visibility costs time. And time costs money.",
    icon: Database
  }
];

const steps: Array<{
  number: string;
  title: string;
  description: string;
  alternate?: boolean;
  details: DetailRow[];
}> = [
  {
    number: "01",
    title: "Matter Intake",
    description: "AI imports contract, tax certificate, and lender instructions. Data is structured and matched automatically.",
    details: [
      { key: "Contract PDF", value: "Imported", icon: UploadCloud },
      { key: "Tax cert", value: "Matched", icon: UploadCloud },
      { key: "Lender", value: "Synced", icon: UploadCloud }
    ]
  },
  {
    number: "02",
    title: "Review & Collaborate",
    description: "One matter record keeps the team aligned. Exceptions surface to counsel automatically - no hunting required.",
    details: [
      { key: "Buyer", value: "Verified", icon: CheckCircle2 },
      { key: "Adjustments", value: "Calculated", icon: CheckCircle2 },
      { key: "Counsel", value: "2 items flagged", icon: Clock3 }
    ]
  },
  {
    number: "03",
    title: "Generate & File",
    description: "One-click document generation. Closing package prepared. LTSA filing ready to submit - all from the same record.",
    alternate: true,
    details: [
      { key: "Documents", value: "Queued", icon: FileText },
      { key: "LTSA filing", value: "Ready", icon: ArrowRight },
      { key: "Completion", value: "June 18", icon: CheckCircle2 }
    ]
  }
];

const featureItems: IconItem[] = [
  {
    title: "Built for BC from day one",
    description: "myLTSA-ready workflows and FCT-aware conveyancing are native to the platform - not bolted on after the fact.",
    icon: Layers
  },
  {
    title: "AI that earns its keep",
    description: "High-confidence import from PDFs, contracts, and tax certs means your team reviews, not retypes. Adjustments calculated automatically.",
    icon: Sparkles
  },
  {
    title: "Law-firm grade control",
    description: "Role-aware workflows, legal review checkpoints, and consistent matter state give partners and conveyancers confidence at scale.",
    icon: ShieldCheck
  },
  {
    title: "Grows with your firm",
    description: "Solo practice, busy conveyancing desk, or multi-user team - same platform, no migration, no complexity ceiling.",
    icon: UsersRound
  }
];

const legalLayer = [
  { title: "Authoritative matter record", status: "One source", color: "blue" },
  { title: "Legal review checkpoints", status: "Counsel-visible", color: "green" },
  { title: "Completion-ready workflow", status: "Filing tied", color: "charcoal" },
  { title: "Audit trail & activity log", status: "Full history", color: "gold" }
];

const modules: IconItem[] = [
  {
    title: "LTSA Intelligent Filing",
    description: "Move from prepared matter data to filing-ready work with fewer handoffs and zero duplicate entry.",
    icon: FileCheck2
  },
  {
    title: "Frictionless Document Generation",
    description: "Generate consistent, complete closing documents from one authoritative matter record. One click.",
    icon: DatabaseZap
  },
  {
    title: "AI-Driven Data Import",
    description: "Import and structure transaction data from PDFs, contracts, and tax certs with high accuracy. Teams spend less time copying and checking.",
    icon: Bot
  },
  {
    title: "Real-Time Collaboration",
    description: "Keep lawyers, conveyancers, and support staff aligned around live matter status - without email chains or status check-ins.",
    icon: UsersRound
  },
  {
    title: "Workflow Optimization",
    description: "Repeatable steps become guided progress. More files move cleanly through the system with fewer blockers.",
    icon: FolderKanban
  },
  {
    title: "360-Degree Support",
    description: "Expert help, embedded guidance, and practical onboarding. Email, phone, Zoom, webinars, FAQ, and 1-on-1 training included.",
    icon: Phone
  }
];

const smartRows = [
  "Affordable flat-rate pricing - $79/matter",
  "Easy to learn - up and running same day",
  "Eliminates manual data entry",
  "One-click file generation",
  "AI data import with high accuracy",
  "LTSA + FCT native integration",
  "360-degree support: email, phone, Zoom, guides",
  "No contract. No hidden fees."
];

const otherRows = [
  "Expensive per-case pricing and hidden fees",
  "Steep learning curve, weeks of onboarding",
  "Manual workflows with heavy re-keying",
  "Multi-click, multi-system file generation",
  "Limited or no AI automation",
  "LTSA and FCT as afterthoughts or add-ons",
  "Ticket-based support with long wait times",
  "Long contracts, locked-in pricing"
];

const testimonials = [
  {
    quote:
      "SmartConveyance focuses on what's truly essential. Training new staff was straightforward - a multi-month process now takes only days. Its simplicity and well-designed features made it incredibly easy to learn and use, allowing us to stay on track without disruption.",
    name: "Jeremy",
    role: "Lawyer",
    initial: "J",
    tone: "blue"
  },
  {
    quote:
      "With SmartConveyance, tasks that used to take me hours are now done in minutes. Its smart data entry, auto-completion, and document generation streamline my work so I can be far more productive. Efficient by design.",
    name: "Amber",
    role: "Paralegal",
    initial: "A",
    tone: "green"
  },
  {
    quote:
      "Adopting SmartConveyance has been transformative for our practice. We can now manage more cases with the same team, giving lawyers more time to focus on clients and growth. It truly empowers the firm to scale with confidence.",
    name: "Richard",
    role: "Firm Owner",
    initial: "R",
    tone: "gold"
  }
];

const pricingBenefits = [
  {
    title: "Faster matter completion",
    description: "Matter data, documents, and filing steps move through one guided operating layer."
  },
  {
    title: "Lower admin burden",
    description: "Reduce the work of re-keying, chasing status, and reconciling data across tools."
  },
  {
    title: "Increased case capacity",
    description: "Help the same team handle more files by removing repeatable technical friction."
  },
  {
    title: "More predictable workflows",
    description: "Clear checkpoints give firms better visibility from file opening to completion."
  }
];

const pricingFeatures = [
  "Purchase and sales - residential & commercial",
  "LTSA web filing integration",
  "AI data import (contracts, tax certs, commissions)",
  "One-click smart file generation",
  "Simplified financial form completion",
  "Customizable firm templates",
  "Case progress tracking & audit trail",
  "360-degree support: email, phone, Zoom, guides"
];

const supportCards: Array<IconItem & { tone: string }> = [
  {
    title: "Onboarding in minutes",
    description: "Start with a practical setup path for real conveyancing work. No multi-week migration cycle.",
    icon: Sparkles,
    tone: "blue"
  },
  {
    title: "Training in hours",
    description: "Focused walkthroughs help staff become productive quickly. Embedded how-to guidance is built right in.",
    icon: PenLine,
    tone: "green"
  },
  {
    title: "Conveyancing same day",
    description: "Go from platform access to working files without a long migration cycle. Same day, every firm.",
    icon: Code2,
    tone: "charcoal"
  },
  {
    title: "Ongoing 1-on-1 support",
    description: "Email, phone, Zoom, webinars, FAQ, embedded guides, and 1-on-1 expert training - whenever you need it.",
    icon: MessageCircle,
    tone: "orange"
  }
];

const demoPerks = [
  "Onboarding in minutes",
  "Start conveyancing the same day",
  "No contract - pay per matter",
  "Personalized 15-minute walkthrough",
  "360-degree support from day one"
];

const faqs = [
  {
    question: "Do you offer onboarding support?",
    answer:
      "Yes. Our project teams will be by your side to help navigate the change and successfully engage all stakeholders. We understand that adopting new software means adopting a new way of working."
  },
  {
    question: "Which provinces currently support SmartConveyance?",
    answer:
      "SmartConveyance fully supports conveyancing workflows in British Columbia, with additional provinces coming soon. Our LTSA and FCT integrations are BC-native."
  },
  {
    question: "Is SmartConveyance for both residential and commercial?",
    answer:
      "Yes, SmartConveyance supports both residential and commercial conveyancing at the same flat-rate pricing per matter."
  },
  {
    question: "What tools and platforms integrate with SmartConveyance?",
    answer:
      "Our system connects natively with myLTSA for title searches and electronic filing, and with FCT for title insurance - providing a unified workflow from one platform."
  },
  {
    question: "How does SmartConveyance protect my data?",
    answer:
      "SmartConveyance runs on AWS infrastructure with SOC 2, PCI DSS Level 1, and ISO 27001 compliance. Core application data is stored and processed on Canadian servers."
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Your pay-per-use subscription may be cancelled by written request at any time. Cancellations still incur costs for services used. Refunds are considered on a case-by-case basis - contact support@innobridge.ca."
  },
  {
    question: "What forms of payment are accepted?",
    answer: "We currently accept credit and debit cards. No long-term payment commitments required."
  },
  {
    question: "Can I import data from my previous system?",
    answer:
      "If you're interested in migrating data from a previous system, contact support@innobridge.ca. We'll work with you to assess your needs and migration options."
  }
];

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""} aria-label="Primary navigation">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="SmartConveyance by Innobridge home">
          <img src="/brand/smartconveyance-primary-light.png" alt="SmartConveyance by Innobridge" decoding="async" />
        </a>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <a href="https://smartconveyance.innobridge.ca/" className="nav-signin">
            Sign in
          </a>
          <a href="#demo" className="btn btn--primary nav-demo-btn">
            Book a Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <div className="hero-bg" />
      <div className="hero-inner hero-layout">
        <div className="hero-copy">
          <div className="hero-tag hero-enter hero-enter-1">SMARTCONVEYANCE BY INNOBRIDGE</div>
          <h1 id="hero-title" className="hero-headline hero-enter hero-enter-2">
            Technology that Speaks
            <br />
            <em>Legal.</em>
          </h1>
          <p className="hero-sub hero-enter hero-enter-3">
            We design software solutions that adapt to your workflow. SmartConveyance helps law firms streamline real estate conveyancing, minimize errors, and boost productivity.
          </p>
          <div className="hero-cta hero-enter hero-enter-4">
            <a href="#demo" className="btn btn--primary">
              <FileText size={16} />
              Book a Demo
            </a>
            <a href="#how" className="btn btn--ghost">
              See workflow
              <CirclePlay size={16} />
            </a>
          </div>
          <div className="hero-trust hero-enter hero-enter-5">
            <div className="trust-item">
              <span className="trust-dot" />
              Legal-first design and built with legal professionals
            </div>
            <div className="trust-item">
              <span className="trust-dot" />
              AI-assisted workflow from intake to filing
            </div>
            <div className="trust-item">
              <span className="trust-dot" />
              360º-support for smooth transition and personalized help
            </div>
          </div>
        </div>

        <div className="hero-visual hero-enter hero-enter-6" aria-label="SmartConveyance portal preview">
          <div className="portal-callout portal-callout--status" aria-hidden="true">
            <span className="portal-callout__icon portal-callout__icon--green">
              <CheckCircle2 size={16} />
            </span>
            <span>
              <strong>Case status</strong>
              <em>Ready for review</em>
            </span>
          </div>
          <div className="portal-frame">
            <div className="portal-bar">
              <div className="portal-dots" aria-hidden="true">
                <span className="portal-dot" />
                <span className="portal-dot" />
                <span className="portal-dot" />
              </div>
              <div className="portal-url">smartconveyance.innobridge.ca / case / 9230375</div>
            </div>
            <div className="portal-shot-wrap">
              <img
                className="portal-shot"
                src="/portal/smartconveyance-portal-preview.png"
                alt="SmartConveyance portal showing purchase case details, property information, buyer and seller navigation, and completion dates."
                fetchPriority="high"
              />
            </div>
            <div className="portal-caption">
              <span>
                <strong>Real portal preview:</strong> matter details, status, dates, and workflow tabs in one place.
              </span>
              <span className="portal-live-pill">In progress</span>
            </div>
          </div>
          <div className="portal-callout portal-callout--filing" aria-hidden="true">
            <span className="portal-callout__icon">
              <FileCheck2 size={16} />
            </span>
            <span>
              <strong>LTSA workflow</strong>
              <em>Filing data organized</em>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="section" aria-labelledby="problem-title">
      <div className="container">
        <Reveal className="problem-intro">
          <div className="eyebrow">The Cost of Fragmented Legal Tech</div>
          <h2 id="problem-title">You're paying a Context Tax every day.</h2>
          <p className="lead">
            Every minute spent re-keying data, switching between disconnected tools, or chasing matter status is time your
            firm will never bill back.
          </p>
        </Reveal>

        <div className="problem-cards">
          {problemCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal className="problem-card" delay={index * 100} key={card.title}>
                <div className="problem-icon">
                  <Icon size={20} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="problem-bridge">
          <div className="eyebrow eyebrow--light">The Innobridge Bridge</div>
          <h3>One legal operating layer. Intake through filing.</h3>
          <p>
            SmartConveyance replaces the stack with <strong>one authoritative matter record</strong> that drives documents,
            collaboration, and LTSA filing - without switching tools or retyping data.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function HowSection() {
  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="how-intro">
          <div className="eyebrow">How It Works</div>
          <h2 id="how-title">Three steps. One record. Done.</h2>
          <p className="lead">
            A clear, guided flow from intake to completion - designed for how BC conveyancing teams actually work.
          </p>
        </Reveal>

        <div className="steps">
          {steps.map((step, index) => (
            <Reveal className="step" delay={index * 100} key={step.number}>
              <div className={step.alternate ? "step-num step-num--alt" : "step-num"}>{step.number}</div>
              <h3>{step.title}</h3>
              <p className="step-copy">{step.description}</p>
              <div className="step-detail">
                {step.details.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div className="step-detail-row" key={detail.key}>
                      <Icon className="step-detail-icon" size={16} />
                      <span className="step-detail-key">{detail.key}</span>
                      <span className="step-detail-val">{detail.value}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="container">
        <div className="features-top">
          <Reveal className="features-text">
            <div className="eyebrow">Software with Legal DNA</div>
            <h2 id="features-title">Built for conveyancers, not adapted for them.</h2>
            <p className="lead">
              Innobridge bridges legal expertise and elite systems design to create a platform that fits real conveyancing
              work from day one.
            </p>
            <div className="feature-list">
              {featureItems.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div className="feature-item" key={feature.title}>
                    <div className="feature-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="feature-side-panel" delay={180}>
            <div className="legal-layer-card">
              <div className="eyebrow">Legal Operating Layer</div>
              <div className="legal-layer-list">
                {legalLayer.map((item) => (
                  <div className="legal-layer-row" key={item.title}>
                    <span className={`legal-layer-dot legal-layer-dot--${item.color}`} />
                    <span>{item.title}</span>
                    <strong>{item.status}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rigor-card">
              <div>Simple on the surface. Rigorous underneath.</div>
              <p>
                SmartConveyance gives conveyancers a clean operating surface while keeping legal structure, data
                relationships, and review moments intact across every matter.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="module-wrap">
          <div className="eyebrow module-eyebrow">Outcome-Based Modules</div>
          <div className="module-grid">
            {modules.map((module, index) => {
              const Icon = module.icon;

              return (
                <Reveal className="module-card" delay={(index % 3) * 100} key={module.title}>
                  <div className="module-card-icon">
                    <Icon size={16} />
                  </div>
                  <h4>{module.title}</h4>
                  <p>{module.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="compare" className="section" aria-labelledby="compare-title">
      <div className="container">
        <Reveal className="compare-intro">
          <div className="eyebrow">SmartConveyance vs Others</div>
          <h2 id="compare-title">Designed to reduce friction, not add another system to manage.</h2>
          <p>The difference is not a longer feature list. It is how naturally the platform fits conveyancing work.</p>
        </Reveal>

        <div className="compare-grid">
          <Reveal className="compare-col compare-col--ours">
            <div className="compare-header compare-header--ours">
              <CheckCircle2 size={16} />
              SmartConveyance
            </div>
            <div className="compare-body">
              {smartRows.map((row) => (
                <div className="compare-row" key={row}>
                  <CheckCircle2 className="compare-check check-yes" size={18} />
                  {row}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="compare-col" delay={100}>
            <div className="compare-header compare-header--theirs">
              <X size={16} />
              Other Legal Tech
            </div>
            <div className="compare-body">
              {otherRows.map((row) => (
                <div className="compare-row" key={row}>
                  <X className="compare-check check-no" size={18} />
                  {row}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal className="testimonials-intro">
          <div className="eyebrow eyebrow--light">What Legal Teams Say</div>
          <h2 id="testimonials-title">Trusted by conveyancing professionals.</h2>
          <p>Real feedback from lawyers, paralegals, and firm owners using SmartConveyance today.</p>
        </Reveal>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Reveal className="testimonial-card" delay={index * 100} key={testimonial.name}>
              <div className="stars" aria-label="Five star rating">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star className="star" size={13} key={starIndex} />
                ))}
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className={`author-avatar author-avatar--${testimonial.tone}`}>{testimonial.initial}</div>
                <div>
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="container">
        <div className="pricing-wrap">
          <Reveal className="pricing-text">
            <div className="eyebrow">Pricing</div>
            <h2 id="pricing-title">Enterprise-grade efficiency. Without enterprise-level cost.</h2>
            <p className="lead">
              SmartConveyance makes operational gains visible without asking firms to accept enterprise complexity or
              enterprise pricing.
            </p>
            <div className="pricing-benefits">
              {pricingBenefits.map((benefit) => (
                <div className="pricing-benefit" key={benefit.title}>
                  <div className="pricing-benefit-icon">
                    <CheckCircle2 size={12} />
                  </div>
                  <div className="pricing-benefit-text">
                    <strong>{benefit.title}</strong>
                    <span>{benefit.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="pricing-card" delay={120}>
            <div className="pricing-card-header">
              <div className="pricing-card-label">Pay-per-matter - No contract</div>
              <div className="pricing-amount">
                <div className="pricing-dollar">$</div>
                <div className="pricing-num">79</div>
                <div className="pricing-per">/ matter</div>
              </div>
              <div className="pricing-sub">All core features included. No hidden fees.</div>
            </div>
            <div className="pricing-card-body">
              <div className="pricing-features">
                {pricingFeatures.map((feature) => (
                  <div className="pricing-feature" key={feature}>
                    <CheckCircle2 size={16} />
                    {feature}
                  </div>
                ))}
              </div>
              <hr className="pricing-divider" />
              <a href="#demo" className="btn btn--primary form-submit">
                Book your demo today
              </a>
              <div className="no-contract">
                <ShieldCheck size={14} />
                No contract - Cancel anytime - Credit & debit accepted
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section id="support" className="section" aria-labelledby="support-title">
      <div className="container">
        <Reveal className="support-intro">
          <div className="eyebrow">360-Degree Support</div>
          <h2 id="support-title">Real support, whenever you need it.</h2>
          <p>
            Innobridge supports legal professionals with practical training, live walkthroughs, and embedded guidance that
            keeps work moving.
          </p>
        </Reveal>
        <div className="support-grid">
          {supportCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal className="support-card" delay={index * 100} key={card.title}>
                <div className={`support-icon si-${card.tone}`}>
                  <Icon size={22} />
                </div>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="support-contacts">
          <a className="support-contact" href="tel:+18882669010">
            <div className="sc-icon sc-icon--blue">
              <Phone size={16} />
            </div>
            <div>
              <div className="sc-label">Phone</div>
              <div className="sc-value">+1 (888) 266-9010</div>
            </div>
          </a>
          <a className="support-contact" href="mailto:support@innobridge.ca">
            <div className="sc-icon sc-icon--green">
              <Mail size={16} />
            </div>
            <div>
              <div className="sc-label">Email</div>
              <div className="sc-value">support@innobridge.ca</div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="section" aria-labelledby="demo-title">
      <div className="container">
        <div className="demo-inner">
          <Reveal className="demo-text">
            <div className="eyebrow eyebrow--light">Ready for Instant Velocity?</div>
            <h2 id="demo-title">Start today with a platform built around how conveyancing actually works.</h2>
            <p>
              SmartConveyance gives legal teams a calmer, faster operating layer for matter data, document generation,
              collaboration, and filing.
            </p>
            <div className="demo-perks">
              {demoPerks.map((perk) => (
                <div className="demo-perk" key={perk}>
                  <CheckCircle2 size={18} />
                  {perk}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <DemoForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section section--sm" aria-labelledby="faq-title">
      <div className="container">
        <Reveal className="faq-intro">
          <div className="eyebrow">FAQ</div>
          <h2 id="faq-title">Common questions.</h2>
        </Reveal>
        <div className="faq-grid">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={faq.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {faq.question}
                  <span className="faq-toggle" aria-hidden="true">
                    <X size={18} />
                  </span>
                </button>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label="SmartConveyance by Innobridge home">
              <img src="/brand/smartconveyance-primary-light.png" alt="SmartConveyance by Innobridge" decoding="async" />
            </a>
            <p>Technology that Speaks Legal. Built for BC conveyancing teams by Innobridge.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <a href="#problem">The Problem</a>
            <a href="#how">How It Works</a>
            <a href="#features">Features</a>
            <a href="#compare">Comparison</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#pricing">Pricing</a>
            <a href="#support">Support</a>
            <a href="#demo">Book a Demo</a>
            <a href="https://smartconveyance.innobridge.ca/">Sign In</a>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <a href="https://smartconveyance.innobridge.ca/files/PrivacyPolicy.pdf">Privacy Policy</a>
            <a href="https://smartconveyance.innobridge.ca/files/TermsOfUse.pdf">Terms of Use</a>
            <a href="mailto:support@innobridge.ca">support@innobridge.ca</a>
            <a href="tel:+18882669010">+1 (888) 266-9010</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Innobridge Consulting Inc. All rights reserved. - 500 - 4th Avenue SW Suite 2500, Calgary, AB</p>
          <div className="footer-legal">
            <a href="https://smartconveyance.innobridge.ca/files/PrivacyPolicy.pdf">Privacy</a>
            <a href="https://smartconveyance.innobridge.ca/files/TermsOfUse.pdf">Terms</a>
          </div>
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
        <ProblemSection />
        <HowSection />
        <FeaturesSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <SupportSection />
        <DemoSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
