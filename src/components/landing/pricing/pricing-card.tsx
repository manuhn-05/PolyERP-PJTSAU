import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@chakra-ui/react"

// import { LuCheckCircle2 } from "react-icons/lu"

type PricingCardProps = {
  tier: "Freemium" | "Pro" | "Enterprise"
  headline: string
  price?: string
  ctaLabel: string
  features: string[]
  highlight?: boolean
}

export function PricingCard({ tier, headline, price, ctaLabel, features, highlight }: PricingCardProps) {
  return (
    <Card
      className={[
        "flex h-full flex-col justify-between rounded-2xl border shadow-sm transition-shadow",
        highlight ? "ring-1 ring-primary/20" : "",
      ].join(" ")}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{tier}</span>
        </div>
        <CardTitle className="mt-1 text-2xl">{headline}</CardTitle>
        {price ? (
          <p className="mt-2 text-3xl font-semibold">
            {price}
            <span className="text-sm font-normal text-muted-foreground"> {tier === "Pro" ? "" : ""}</span>
          </p>
        ) : (
          <p className="mt-2 text-3xl font-semibold">Contact Sales</p>
        )}
      </CardHeader>
      <CardContent>
        <ul className="mt-2 space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {/* <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> */}
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" 
        variant={highlight ? "default" : "outline"} 
        bg={highlight ? "green" : "transparent"} 
        color={highlight ? "white" : "black"}
        >
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}