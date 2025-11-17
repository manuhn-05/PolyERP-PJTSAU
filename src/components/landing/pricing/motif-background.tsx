import { LuLeaf, LuCircuitBoard } from "react-icons/lu";
import type { ReactNode } from "react"

export function MotifBackground({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        // soft green/white radial gradients using design tokens
        backgroundImage:
          "radial-gradient(60% 60% at 20% 0%, color-mix(in oklab, var(--color-primary) 12%, transparent), transparent), radial-gradient(50% 50% at 100% 0%, color-mix(in oklab, var(--color-accent) 60%, transparent), transparent)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" role={"presentation"}>
        {/* top-left leaf */}
        <LuLeaf className="absolute left-6 top-6 h-8 w-8 text-green-500/10" />
        {/* top-right circuit */}
        <LuCircuitBoard className="absolute right-10 top-10 h-10 w-10 text-green-500/10" />
        {/* bottom background subtle pattern */}
        <LuLeaf className="absolute bottom-10 left-1/3 h-12 w-12 rotate-12 text-green-500/5" />
      </div>
      {children}
    </div>
  )
}