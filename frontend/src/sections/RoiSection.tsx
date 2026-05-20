import { roiOutcomes } from "../data/siteContent";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

const savingsHighlights = [
  {
    label: "Save upto",
    value: "40%",
    context: "on repetitive admin effort"
  },
  {
    label: "Save",
    value: "8+ hrs",
    context: "per week in routine matter workflows"
  }
];

export function RoiSection() {
  return (
    <section className="section section--roi" id="roi" aria-labelledby="roi-title">
      <div className="container roi-layout">
        <SectionHeader
          id="roi-title"
          eyebrow="Growth-ready infrastructure"
          title="Enterprise-Grade Efficiency Without Enterprise-Level Cost."
          description="SmartConveyance is designed to make operational gains visible without asking firms to accept enterprise complexity."
        />

        <div className="roi-highlight-grid" aria-label="Savings highlights">
          {savingsHighlights.map((highlight, index) => (
            <Reveal className="roi-highlight-card" delay={index * 70} key={highlight.label}>
              <p className="roi-highlight-card__label">{highlight.label}</p>
              <strong>{highlight.value}</strong>
              <span>{highlight.context}</span>
            </Reveal>
          ))}
        </div>

        <div className="roi-grid">
          {roiOutcomes.map((outcome, index) => {
            const Icon = outcome.icon;

            return (
              <Reveal className="roi-card" delay={index * 70} key={outcome.title}>
                <Icon size={21} />
                <div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="projection-note">
          <p>
            ROI should be modeled against each firm's matter volume, staffing mix, and current process. Demo projections
            are examples, not guaranteed outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
