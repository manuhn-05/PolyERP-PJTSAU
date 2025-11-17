import React from 'react'
import AboutPolyhouseHeroComponent from '@/components/landing/about/about-polyhouse-hero';
import MissionVisionStory from '@/components/landing/about//mission-vision-story';
import GetInTouchBanner from '@/components/landing/about//get-in-touch';
import { WhatWeDo } from '@/components/landing/about//what-we-do';
import { Team } from '@/components/landing/about//our-team';
import { OUR_TEAM, WHAT_WE_DO } from '@/components/landing/landing-page-constants';

const AboutPolyhouseComponent = () => {
  return (
    <article className={`min-h-dvh`}>
      <AboutPolyhouseHeroComponent />

      <section aria-labelledby="about-sections" className="container mx-auto px-4 py-12 md:py-16">
        <h2 id="about-sections" className="sr-only">
          About Sections
        </h2>
        <MissionVisionStory />
      </section>

      <section aria-labelledby="what-we-do" className="container mx-auto px-4 py-12 md:py-16">
        <h2 id="what-we-do" className="text-balance text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          {WHAT_WE_DO}
        </h2>
        <WhatWeDo />
      </section>
      <section aria-labelledby="our-team" className="container mx-auto px-4 py-12 md:py-16">
        <h2 id="our-team" className="text-balance text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          {OUR_TEAM}
        </h2>
        <Team />
      </section>

      <GetInTouchBanner />
    </article>
  )
}

export default AboutPolyhouseComponent;