import { CheckCircle2, MinusCircle } from "lucide-react";
import { comparison } from "../data/siteContent";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function ComparisonSection() {
  return (
    <section className="section section--comparison" id="comparison" aria-labelledby="comparison-title">
      <div className="container">
        <SectionHeader
          id="comparison-title"
          eyebrow="SmartConveyance vs others"
          title="Designed to reduce friction, not add another system to manage."
          description="The difference is not a longer feature list. It is how naturally the platform fits conveyancing work."
        />

        <div className="comparison-grid">
          <Reveal className="comparison-card comparison-card--smart">
            <div className="comparison-card__header">
              <img src="/brand/smartconveyance-primary-light.png" alt="SmartConveyance by Innobridge" />
            </div>
            <ul>
              {comparison.smartConveyance.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="comparison-card comparison-card--others" delay={120}>
            <div className="comparison-card__header">
              <h3>Others</h3>
            </div>
            <ul>
              {comparison.others.map((item) => (
                <li key={item}>
                  <MinusCircle size={19} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
