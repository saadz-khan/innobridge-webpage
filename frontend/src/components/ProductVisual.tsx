import {
  AlertCircle,
  CheckCircle2,
  FileSearch,
  FileText,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRoundCheck
} from "lucide-react";
import { Reveal } from "./Reveal";

const workflowSteps = [
  { label: "Matter intake", detail: "Contract + tax data imported", icon: FileSearch },
  { label: "Legal review", detail: "Exceptions routed to counsel", icon: ShieldCheck },
  { label: "Generation", detail: "Closing package prepared", icon: FileText },
  { label: "LTSA filing", detail: "Submission ready", icon: Landmark }
];

export function ProductVisual() {
  return (
    <Reveal className="product-visual">
      <div className="product-visual__topline">
        <div>
          <span className="status-dot" aria-hidden="true" />
          SmartConveyance command centre
        </div>
        <span>File SC-1048</span>
      </div>

      <div className="matter-summary">
        <div>
          <p className="matter-summary__label">Active matter</p>
          <h3>Purchase - Vancouver, BC</h3>
        </div>
        <div className="matter-summary__score" aria-label="Automation readiness 94 percent">
          <Sparkles size={18} />
          <strong>94%</strong>
          <span>ready</span>
        </div>
      </div>

      <div className="product-command-grid">
        <aside className="matter-panel" aria-label="Matter facts">
          <div className="matter-panel__header">
            <span>Matter facts</span>
            <strong>Synced</strong>
          </div>
          <dl className="matter-facts">
            <div>
              <dt>Completion</dt>
              <dd>June 18</dd>
            </div>
            <div>
              <dt>Jurisdiction</dt>
              <dd>BC</dd>
            </div>
            <div>
              <dt>Lender</dt>
              <dd>Instruction received</dd>
            </div>
          </dl>
          <div className="review-queue">
            <span><AlertCircle size={15} /> Counsel review</span>
            <strong>2 items</strong>
          </div>
        </aside>

        <div className="workflow-track" aria-label="SmartConveyance workflow preview">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="workflow-step" key={step.label}>
                <div className="workflow-step__icon">
                  <Icon size={18} />
                </div>
                <div>
                  <p>{step.label}</p>
                  <span>{step.detail}</span>
                </div>
                {index < workflowSteps.length - 1 ? <div className="workflow-step__bridge" aria-hidden="true" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="automation-panel">
        <div className="automation-panel__header">
          <span>Legal automation layer</span>
          <strong>High confidence import</strong>
        </div>
        <div className="data-grid">
          <div>
            <span>Buyer</span>
            <strong>Matched</strong>
          </div>
          <div>
            <span>PID</span>
            <strong>Verified</strong>
          </div>
          <div>
            <span>Adjustments</span>
            <strong>Calculated</strong>
          </div>
          <div>
            <span>Documents</span>
            <strong>Queued</strong>
          </div>
        </div>
      </div>

      <div className="assurance-row" aria-label="Professional safeguards">
        <div>
          <Scale size={16} />
          <span>Review checkpoints</span>
        </div>
        <div>
          <UserRoundCheck size={16} />
          <span>Team-ready handoffs</span>
        </div>
        <div>
          <ShieldCheck size={16} />
          <span>Structured source data</span>
        </div>
      </div>

      <div className="filing-strip">
        <CheckCircle2 size={18} />
        <span>One authoritative matter record powering documents, collaboration, and filing.</span>
      </div>
    </Reveal>
  );
}
