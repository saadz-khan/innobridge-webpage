import { Navigation } from "./components/Navigation";
import { ComparisonSection } from "./sections/ComparisonSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { EcosystemSection } from "./sections/EcosystemSection";
import { OperatingModelSection } from "./sections/OperatingModelSection";
import { ProblemSection } from "./sections/ProblemSection";
import { RoiSection } from "./sections/RoiSection";
import { SolutionSection } from "./sections/SolutionSection";
import { SupportSection } from "./sections/SupportSection";

export function App() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <EcosystemSection />
        <ProblemSection />
        <SolutionSection />
        <OperatingModelSection />
        <FeaturesSection />
        <ComparisonSection />
        <RoiSection />
        <SupportSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
