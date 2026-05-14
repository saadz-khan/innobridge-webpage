import { ArrowRight, Boxes, FileWarning, Layers3 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

const frictionItems = [
  { label: "Re-keyed data", icon: FileWarning },
  { label: "Disconnected apps", icon: Boxes },
  { label: "Information silos", icon: Layers3 }
];

export function ProblemSection() {
  return (
    <section className="section section--problem" id="problem" aria-labelledby="problem-title">
      <div className="container two-column">
        <SectionHeader
          id="problem-title"
          eyebrow="The cost of fragmented legal tech"
          title="Eliminate the Context Tax."
          description="Every minute spent re-keying data, switching between disconnected tools, or managing siloed information is time lost to technical friction."
        />

        <Reveal className="context-tax">
          <div className="context-tax__side">
            <p>Disconnected Apps & Information Silos</p>
            <div className="friction-stack">
              {frictionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="friction-item" key={item.label}>
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bridge-divider">
            <ArrowRight size={24} />
            <span>The Innobridge Bridge</span>
          </div>

          <div className="context-tax__side context-tax__side--resolved">
            <p>One legal operating layer</p>
            <div className="resolved-flow">
              <span>Intake</span>
              <span>Documents</span>
              <span>Collaboration</span>
              <span>Filing</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
