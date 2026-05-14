import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { operatingModel } from "../data/siteContent";

export function OperatingModelSection() {
  return (
    <section className="section section--operating-model" id="operating-model" aria-labelledby="operating-model-title">
      <div className="container operating-model">
        <SectionHeader
          eyebrow="Legal operating layer"
          title="A calmer command centre for high-volume conveyancing."
          description="The product experience should feel familiar to a conveyancing team, but disciplined enough for a law firm that cares about control, consistency, and professional risk."
        />

        <div className="operating-model__flow">
          {operatingModel.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal className="operating-step" delay={index * 100} key={item.title}>
                <div className="operating-step__index">0{index + 1}</div>
                <div className="operating-step__icon">
                  <Icon size={24} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {index < operatingModel.length - 1 ? (
                  <ArrowRight className="operating-step__connector" size={22} aria-hidden="true" />
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
