import Image from 'next/image';
import GreenHouseImage from "@/images/assets/background/greenhouse-hero.jpg"
import { ABOUT_US_HERO_IMAGE_TEXT, REVOLUTIONIZING_SMAR_FARM_DESC, 
  REVOLUTIONIZING_SMART_FARMING, SUSTAINABLE_DATA_DRIVEN_AUTOMATED } from '@/components/landing/landing-page-constants';

const AboutPolyhouseHeroComponent = () => {
  return (
    <>
      <header className="relative overflow-hidden ">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={GreenHouseImage}
            alt={`${ABOUT_US_HERO_IMAGE_TEXT}`}
            fill
            className="object-cover"
            priority
          />

          {/* Dark gradient overlay from top to bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/10" />

          {/* Subtle blur for better text clarity */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>


        {/* Content */}
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-border/60 bg-[#D5DED9]/40 px-3 py-1 text-xs md:text-sm">
              {SUSTAINABLE_DATA_DRIVEN_AUTOMATED}
            </p>
            <h1 className="mt-4 text-pretty text-4xl md:text-5xl font-semibold tracking-tight text-hero-foreground">
              {REVOLUTIONIZING_SMART_FARMING}
            </h1>
            <p className="mt-4 text-pretty text-base md:text-lg text-hero-foreground/90 ">
              {REVOLUTIONIZING_SMAR_FARM_DESC}
            </p>
          </div>
        </div>

        {/* Soft curve separator */}
        <div className="relative bottom-0">
          <svg
          
            aria-hidden="true"
            className="block w-full text-white"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,64 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,80 L0,80 Z"
            ></path>
          </svg>
        </div>
        

      </header>
    </>
  )
}

export default AboutPolyhouseHeroComponent;