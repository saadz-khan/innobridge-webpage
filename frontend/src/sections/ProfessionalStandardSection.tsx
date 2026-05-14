import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { professionalStandards } from "../data/siteContent";

export function ProfessionalStandardSection() {
  return (
    <section className="section section--professional" id="professional-standard" aria-labelledby="professional-standard-title">
      <div className="container professional-layout">
        <SectionHeader
          id="professional-standard-title"
          eyebrow="Professional standard"
          title="Built to feel at home inside a serious law firm."
          description="Modern conveyancing software needs more than speed. It needs disciplined matter control, clear accountability, and a product experience legal teams can trust under pressure."
        />

        <div className="professional-board">
          <Reveal className="professional-lead">
            <span className="professional-lead__label">Legal DNA</span>
            <h3>Simple on the surface. Rigorous underneath.</h3>
            <p>
              SmartConveyance gives conveyancers a clean operating surface while keeping legal structure, data
              relationships, and review moments intact across every matter.
            </p>
          </Reveal>

          <div className="professional-grid">
            {professionalStandards.map((standard, index) => {
              const Icon = standard.icon;

              return (
                <Reveal className="professional-card" delay={index * 70} key={standard.title}>
                  <Icon size={22} />
                  <h3>{standard.title}</h3>
                  <p>{standard.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
