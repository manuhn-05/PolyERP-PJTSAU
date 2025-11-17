"use client";
import { useState } from "react"
import { PricingCard } from "@/components/landing/pricing/pricing-card"
import { BillingToggle } from "@/components/landing/pricing/billing-toggle"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const proPrice = isAnnual ? "₹3999/yr" : "₹399/mo"
  const proSub = isAnnual ? "billed annually" : "billed monthly"

  return (
    <div className="mx-auto max-w-6xl">
      <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          tier="Freemium"
          headline="Start monitoring for free"
          price="$0"
          ctaLabel="Get Started Free"
          features={[
            "Onboard up to 2 Polyhouses",
            "Manage up to 3 Plots per Polyhouse",
            "Limited user access",
            "Basic climate & irrigation monitoring",
            "Community support",
            "14 days of Pro features trial",
          ]}
        />

        <PricingCard
          tier="Pro"
          headline={`Scale with AI insights • ${isAnnual ? "Annual" : "Monthly"}`}
          price={`${proPrice}`}
          ctaLabel="Upgrade to Pro"
          highlight
          features={[
            "Onboard up to 10 Polyhouses",
            "Advanced analytics & AI recommendations",
            "Unlimited user onboarding",
            "Real-time alerts & automation control",
            "Priority email support",
            `Pro plan ${proSub}`,
          ]}
        />

        <PricingCard
          tier="Enterprise"
          headline="Custom solutions for enterprises"
          ctaLabel="Contact Sales"
          features={[
            "Custom number of polyhouses & plots",
            "Dedicated dashboard & IoT integration",
            "Personalized data insights",
            "24x7 support & maintenance",
          ]}
        />
      </div>
    </div>
  )
}
