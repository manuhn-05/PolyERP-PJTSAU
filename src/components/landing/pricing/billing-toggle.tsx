"use client"

import { Button } from "@chakra-ui/react"
import { SAVE_MONEY_UP_TO } from "@/components/landing/landing-page-constants"


type BillingToggleProps = {
  isAnnual: boolean
  onChange: (value: boolean) => void
}

export function BillingToggle({ isAnnual, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div role="tablist" aria-label="Billing period" className="inline-flex rounded-full border bg-card p-1">
        <Button
          role="tab"
          aria-selected={!isAnnual}
          variant={!isAnnual ? "default" : "ghost"}
          size="sm"
          color={!isAnnual ? "white" : "black"}
          bg={!isAnnual ? "green" : "white"}
          className={!isAnnual ? "rounded-full" : "rounded-full"}
          onClick={() => onChange(false)}
          borderRadius={50}
          _hover={{ bg: !isAnnual ? "green" : "green.100" }}
        >
          Monthly
        </Button>
        <Button
          role="tab"
          aria-selected={isAnnual}
          variant={isAnnual ? "default" : "ghost"}
          size="sm"
          color={isAnnual ? "white" : "black"}
          bg={isAnnual ? "green" : "white"}
          className={`rounded-xl`}
          onClick={() => onChange(true)}
          borderRadius={50}
          _hover={{ bg: isAnnual ? "green" : "green.100" }}
        >
          Annual
        </Button>
      </div>
      <span className="text-xs text-muted-foreground">{SAVE_MONEY_UP_TO}</span>
    </div>
  )
}
