"use client";
import React from 'react'

import RegisterNewPlot from './_components/register-new-plots';

type Props = {}

const PolyhousePlots = (props: Props) => {
  return (
    <main className="mx-auto max-w-5xl p-6 md:p-8">
      {/* <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">Register Polyhouse Plots</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add one or more plots under a polyhouse. Grouped by details, fertiliser, and watering.
        </p>
      </header> */}

      <RegisterNewPlot />
    </main>
  )
}

export default PolyhousePlots;