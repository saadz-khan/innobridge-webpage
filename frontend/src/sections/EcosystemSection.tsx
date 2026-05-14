import { BadgeCheck } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ecosystemSignals } from "../data/siteContent";

export function EcosystemSection() {
  return (
    <section className="section section--ecosystem" id="ecosystem" aria-labelledby="ecosystem-title">
      <div className="container">
        <SectionHeader
          id="ecosystem-title"
          eyebrow="Conveyancing ecosystem"
          title="Built around the systems and services your firm already recognizes."
          description="SmartConveyance is designed around BC conveyancing realities: electronic filing, title insurance, lender instructions, and the day-to-day operating rhythm of legal teams."
        />

        <div className="ecosystem-grid" aria-label="Conveyancing ecosystem references">
          {ecosystemSignals.map((signal, index) => {
            const Icon = signal.icon;

            return (
              <Reveal className={`ecosystem-card ${signal.dark ? "ecosystem-card--dark" : ""}`} delay={index * 70} key={signal.title}>
                <div className="ecosystem-card__mark">
                  {signal.image ? <img src={signal.image} alt={signal.imageAlt} /> : null}
                  {signal.textMark ? <strong>{signal.textMark}</strong> : null}
                  {Icon ? <Icon size={24} aria-hidden="true" /> : null}
                </div>
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="ecosystem-note">
          <BadgeCheck size={18} />
          <span>
            Logos and names identify relevant conveyancing ecosystem touchpoints. They do not imply endorsement or a formal partnership unless separately stated.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
