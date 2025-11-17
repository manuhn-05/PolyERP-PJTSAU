export default function FooterPageComponent() {
    return (
      <section className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight">Welcome to PolyERP</h1>
          <p className="mt-2 text-pretty text-sm text-[var(--muted-foreground)]">
            {"Smart ERP for modern polyhouse management."}
          </p>
        </header>
  
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <p className="text-sm leading-relaxed">
            Explore the features, pricing, and documentation using the navigation. The site layout includes a global
            footer with quick links, contact info, social icons, and an optional newsletter signup.
          </p>
        </div>
      </section>
    )
  }
  