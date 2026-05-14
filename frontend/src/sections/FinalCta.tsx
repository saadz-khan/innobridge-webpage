import { ArrowRight } from "lucide-react";
import { Button } from "../components/Button";
import { DemoForm } from "../components/DemoForm";
import { Reveal } from "../components/Reveal";

export function FinalCta() {
  return (
    <section className="section section--final-cta" id="demo" aria-labelledby="final-cta-title">
      <div className="container final-cta-grid">
        <Reveal className="final-cta-copy">
          <p className="eyebrow">Ready for Instant Velocity?</p>
          <h2 id="final-cta-title">Start today with a platform designed around how conveyancing actually works.</h2>
          <p>
            SmartConveyance gives legal teams a calmer, faster operating layer for matter data, document generation,
            collaboration, and filing.
          </p>
          <Button href="#demo-form" variant="light" icon={<ArrowRight size={18} />}>
            Book your demo today
          </Button>
        </Reveal>

        <Reveal className="demo-panel" delay={120}>
          <div className="demo-panel__header">
            <span>Demo request</span>
            <strong>Legal workflow fit assessment</strong>
          </div>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}
