import Image from 'next/image'
import HeroImage from "@/images/assets/background/hero.jpg"
import HeroMobileImage from "@/images/assets/background/hero-mobile.png"

const HeroSection = () => {
  return (
    <>
        <div className="min-w-full h-[100dvh] md:h-[calc(100vh-3.5vh)] ">
          <div className="w-full h-full  absolute top-0" />
          <Image src={HeroImage} alt="Hero Image Large" className="w-full h-full object-fill hidden md:block" />
          <Image src={HeroMobileImage} alt="Hero Image Mobile" className="w-full h-full object-fill block md:hidden" />
        </div>
    </>
  )
}

export default HeroSection