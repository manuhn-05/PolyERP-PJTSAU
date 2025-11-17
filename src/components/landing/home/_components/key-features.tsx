import { features, KEY_FEATURES, KEY_FEATURES_DESC } from "@/components/landing/landing-page-constants";

export default function KeyFeaturesSection() {
  return (
    <section aria-labelledby="key-features-heading" className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2

            id="key-features-heading"
            className="text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {KEY_FEATURES}
          </h2>
          <p data-testid="key-features-description" className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {KEY_FEATURES_DESC}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, Icon,test_id }) => (
            <article
              key={title}
              data-testid={test_id}
              className="group h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-[#60a5fa]/10 p-2.5 text-[#60a5fa] ring-1 ring-[#60a5fa]/50">
                  <Icon aria-hidden="true" className="size-6" />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}