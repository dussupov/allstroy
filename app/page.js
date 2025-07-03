import Banner from "@/components/Banner/Banner";
import Partners from "@/components/Partners/Partners";
import Projects from "@/components/Projects/Projects";
import WhyUs from "@/components/WhyUs/WhyUs";
import PricingCards from "@/components/Pricing/PricingCards";
import RenovationCalculator from "@/components/RenovationCalculator/RenovationCalculator";
import Cta from "@/components/Cta/Cta";

export default function Home() {
  return (
    <main>
      <Banner />
      <Partners />
      <Projects />
      <WhyUs />
      <PricingCards />
      <RenovationCalculator />
      <Cta />
    </main>
  );
}
