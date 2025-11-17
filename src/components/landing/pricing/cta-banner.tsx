
import { Card } from "@/components/ui/card"
import { Button } from "@chakra-ui/react"
import { GET_STARTED_FREE, READY_TO_MODERNIZE, START_FREE_TRIAL } from "@/components/landing/landing-page-constants"

export function CTABanner() {
  return (
    <Card
    data-testid={`pricing-cta-banner`}
      className="relative overflow-hidden rounded-2xl border bg-card shadow-sm"
      style={{
        backgroundImage:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 40%, transparent), transparent)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-between gap-4 px-6 py-10 text-center md:flex-row md:text-left">
        <div>
          <h3 id="final-cta" className="text-balance text-2xl font-semibold md:text-3xl">
            {READY_TO_MODERNIZE}
          </h3>
          <p data-testid={`pricing-cta-banner-desc`} className="mt-1 text-muted-foreground">{START_FREE_TRIAL}</p>
        </div>
        <Button role={'button'} size="lg" className="rounded-full" borderRadius={50} bg="green.500" color="white">
          {GET_STARTED_FREE}
        </Button>
      </div>
    </Card>
  )
}
