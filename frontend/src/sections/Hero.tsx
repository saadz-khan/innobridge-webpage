import { ArrowRight, CirclePlay, ShieldCheck } from "lucide-react";
import { Button } from "../components/Button";
import { ProductVisual } from "../components/ProductVisual";
import { Reveal } from "../components/Reveal";

export function Hero() {
  return (
    <section className="hero section-band" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <Reveal>
            <p className="eyebrow">SmartConveyance by Innobridge</p>
            <h1 id="hero-title">Technology that Speaks Legal.</h1>
            <p className="hero__copy">
              Stop forcing your practice to fit your software. SmartConveyance is a legal-first operating layer built for
              conveyancers, combining legal expertise, intelligent automation, and frictionless workflows.
            </p>
            <div className="hero__actions">
              <Button href="#demo" variant="primary" icon={<ArrowRight size={18} />}>
                Book your demo
              </Button>
              <Button href="#solution" variant="secondary" icon={<CirclePlay size={18} />}>
                See how it works
              </Button>
            </div>
          </Reveal>

          <Reveal className="trust-row" delay={120}>
            <div>
              <ShieldCheck size={19} />
              <span>Built with legal workflow context</span>
            </div>
            <div>
              <ShieldCheck size={19} />
              <span>Designed for conveyancing teams</span>
            </div>
          </Reveal>
        </div>

        <ProductVisual />
      </div>
      <div className="hero-next-signal" aria-hidden="true">
        <span>Eliminate the Context Tax</span>
      </div>
    </section>
  );
}
