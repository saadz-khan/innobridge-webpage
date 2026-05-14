import { legalWorkflowPillars } from "../data/siteContent";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function SolutionSection() {
  return (
    <section className="section section--solution" id="solution" aria-labelledby="solution-title">
      <div className="container">
        <SectionHeader
          eyebrow="Software with Legal DNA"
          title="Built with Legal DNA."
          description="Innobridge bridges legal expertise and elite systems design to create a native conveyancing platform that fits real legal work."
        />

        <div className="pillar-grid">
          {legalWorkflowPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <Reveal className="pillar-card" delay={index * 90} key={pillar.title}>
                <div className="pillar-card__icon">
                  <Icon size={24} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
