"use client";
import { Button } from '@chakra-ui/react'
import React from 'react'
import { GET_IN_TOUCH_BTN_TEXT, JOIN_US_HEADER_TEXT } from '@/components/landing/landing-page-constants'

const GetInTouchBanner = () => {
  function handleGetInTouchClick() {
    console.log('Clicked')
  }
  return (
    <section aria-labelledby="cta" className="relative overflow-hidden">
      <div className="bg-[#96DCA5]">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 id="cta" className="text-pretty text-2xl md:text-3xl font-semibold tracking-tight text-hero-foreground">
              {JOIN_US_HEADER_TEXT}
            </h2>
            {/* <p className="mt-3 text-hero-foreground/90">
              Partner with us to deploy sustainable, automated polyhouse solutions at scale.
            </p> */}
            <div className="mt-6 flex items-center justify-center">
              <Button data-testid="get-in-touch-btn" onClick={handleGetInTouchClick} className="rounded-full px-6 bg-[#27eb52]" colorScheme="green">
                {GET_IN_TOUCH_BTN_TEXT}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouchBanner