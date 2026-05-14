import { featureModules } from "../data/siteContent";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function FeaturesSection() {
  return (
    <section className="section section--features" id="features" aria-labelledby="features-title">
      <div className="container">
        <SectionHeader
          id="features-title"
          eyebrow="Outcome-based modules"
          title="Conveyancing workflows, not feature clutter."
          description="SmartConveyance focuses on the work firms actually need to move matters forward with speed, clarity, and control."
        />

        <div className="feature-grid">
          {featureModules.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal className="feature-card" delay={index * 60} key={feature.title}>
                <div className="feature-card__icon">
                  <Icon size={22} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.outcome}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
