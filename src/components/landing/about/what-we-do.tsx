"use client";
import { Card, CardContent } from "@/components/ui/card"
import { ABOUT_FEATURES } from "@/components/landing/landing-page-constants";

export function WhatWeDo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ABOUT_FEATURES.map(({ title, description, Icon , test_id}) => (
        <Card data-testid={test_id} key={title} className="rounded-2xl border-border/60 transition-shadow hover:shadow-sm">
          <CardContent className="p-5">
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#86efac]/50">
              <Icon aria-hidden="true" className="size-5 text-primary" />
            </div>
            <h3 className="text-base font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
