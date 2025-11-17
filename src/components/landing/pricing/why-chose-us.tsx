import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WHY_CHOOSE_US, WHY_CHOOSE_US_DESC, PRICING_PAGE_ITEMS_LIST } from "@/components/landing/landing-page-constants"



export function WhyChooseUs() {
  return (
    <div aria-labelledby="why-choose-us">
      <header className="mx-auto mb-6 max-w-3xl text-center">
        <h2 id="why-choose-us" className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          {WHY_CHOOSE_US}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {WHY_CHOOSE_US_DESC}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PRICING_PAGE_ITEMS_LIST.map(({ title, description, Icon, test_id }) => (
          <Card data-testid={test_id} key={title} className="rounded-xl border bg-card/70 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-200/30">
                <Icon className="h-5 w-5 text-green-800" aria-hidden="true" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}