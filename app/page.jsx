import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import ProductGridSection from "@/components/ProductGridSection";
import AbsorptionSection from "@/components/AbsorptionSection";
import { FormulaFinderInline } from "@/components/FormulaFinder";
import IngredientSpotlight from "@/components/IngredientSpotlight";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ProductGridSection />
      <AbsorptionSection />
      <FormulaFinderInline />
      <IngredientSpotlight />
    </>
  );
}
