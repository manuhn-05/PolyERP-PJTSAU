import HeroSection from "@/components/landing/home/_components/hero-section";
import PolyErpInside from "./_components/poly-erp-inside";
import HowItWorksSection from "./_components/how-it-works";




const HomeHeroSection = () => {
  return (
    <article className="w-full relative text-[4vw] md:text-[2.2vw]">

 <HeroSection />
<PolyErpInside />
<HowItWorksSection />

    </article>
  )
}

export default HomeHeroSection