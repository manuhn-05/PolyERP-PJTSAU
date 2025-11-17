import PolyInsideImage from "@/images/assets/background/modern-polyhouse-greenhouse-interior.jpg"
import Image from "next/image";
import KeyFeaturesSection from "./key-features";
import { A_SMART_ERP_SOLUTION, POLYERP } from "@/components/landing/landing-page-constants";

const PolyErpInside = () => {
  return (
    <main>
    {/* Simple hero placeholder to demonstrate natural placement */}
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {POLYERP}
            </h1>
            <p data-testid="polyerp-description" className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
             {A_SMART_ERP_SOLUTION}
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            {/* Using the built-in placeholder utility with a clear query */}
            <Image
            data-testid="polyhouse-interior"
            id="polyhouse-interior"
              src={PolyInsideImage}                
              alt="Polyhouse interior with structured greenhouse rows"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Key Features section */}
    <KeyFeaturesSection />
  </main>
  )
}

export default PolyErpInside