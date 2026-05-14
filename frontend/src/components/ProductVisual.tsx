import { CheckCircle2, FileSearch, FileText, Landmark, ShieldCheck, Sparkles } from "lucide-react";
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
          Live conveyance workspace
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

      <div className="automation-panel">
        <div className="automation-panel__header">
          <span>AI import review</span>
          <strong>High confidence</strong>
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

      <div className="filing-strip">
        <CheckCircle2 size={18} />
        <span>One authoritative matter record powering documents, collaboration, and filing.</span>
      </div>
    </Reveal>
  );
}
