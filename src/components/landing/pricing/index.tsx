import { cn } from '@/lib/utils';
import React from 'react';
import { MotifBackground } from '@/components/landing/pricing/motif-background';
import { PricingSection } from '@/components/landing/pricing/pricing-section';
import { WhyChooseUs } from '@/components/landing/pricing/why-chose-us';
import { CTABanner } from '@/components/landing/pricing/cta-banner';
import { SMART_POLYHOUSE_PLATFORM ,CHOOSE_RIGHT_PLAN,CHOOSE_RIGHT_PLAN_DESC} from '@/components/landing/landing-page-constants';
const PricingPageComponent = () => {
  return (
    <main className={`md:pt-[3%]`}>
      <section aria-labelledby="pricing-hero" className="relative">
        <MotifBackground>
          <div className="container mx-auto px-4 py-16 md:py-24">
            <header className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border bg-accent/60 px-3 py-1 text-xs font-medium text-foreground/70">
                {SMART_POLYHOUSE_PLATFORM}
              </span>
              <h1
                id="pricing-hero"
                className={cn("mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl")}
              >
                {CHOOSE_RIGHT_PLAN}
              </h1>
              <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
                {CHOOSE_RIGHT_PLAN_DESC}
              </p>
            </header>

            <div className="mx-auto mt-10">
              <PricingSection />
            </div>
          </div>
        </MotifBackground>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <WhyChooseUs />
      </section>

      <section aria-labelledby="final-cta" className="container mx-auto px-4 py-12 md:py-16">
        <CTABanner />
      </section>
    </main>
  )
}

export default PricingPageComponent;