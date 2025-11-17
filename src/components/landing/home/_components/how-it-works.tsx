import type React from "react"

import { HOW_IT_WORKS_DESC, HOW_IT_WORKS, steps } from "@/components/landing/landing-page-constants";


export default function HowItWorksSection() {
  return (
    <section aria-labelledby="how-it-works-container" className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2
          data-testid={`how-it-works-heading`}
            id="how-it-works-heading"
            className="text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {HOW_IT_WORKS}
          </h2>
          <p data-testid="how-it-works-description" className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {HOW_IT_WORKS_DESC}
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, description, Icon, test_id }, idx) => (
            <li key={title} className="h-full" data-testid={test_id}>
              <article className="group h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md">
                <div className="flex items-start gap-4">
                  {/* Icon + Step number */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#60a5fa]/10 p-2.5 text-[#60a5fa] ring-1 ring-[#60a5fa]/20">
                      <Icon aria-hidden="true" className="size-6" />
                    </div>
                    <span
                      className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground ring-1 ring-border"
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    <span className="sr-only">{`Step ${idx + 1}`}</span>
                  </div>

                  <div>
                    <h3 className="text-foreground text-lg font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
