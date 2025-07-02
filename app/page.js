import Banner from "@/components/Banner/Banner";
import Partners from "@/components/Partners/Partners";
import Projects from "@/components/Projects/Projects";
import WhyUs from "@/components/WhyUs/WhyUs";
import PricingCards from "@/components/Pricing/PricingCards";

export default function Home() {
  return (
    <main>
      <Banner />
      <Partners />
      <Projects />
      <WhyUs />
      <PricingCards />
    </main>
  );
}
