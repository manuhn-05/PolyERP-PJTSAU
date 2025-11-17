import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LuMapPin, LuPhone, LuMail, LuClock } from "react-icons/lu"
import { CONTACT_DETAILS_TITLE, CONTACT_US_ADDRESS,CONTACT_US_OFFICE,CONTACT_US_EMAIL, CONTACT_US_EMAIL_TITLE,
  CONTACT_US_PHONE_TITLE, CONTACT_US_PHONE, CONTACT_US_WORKING_HOURS,CONTACT_US_WORKING_HOURS_TITLE
} from "@/components/landing/landing-page-constants"

export function ContactDetailsCard() {
  return (
    <Card className="w-full border-border/60 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{CONTACT_DETAILS_TITLE}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-brand/10 p-2 text-brand">
            <LuMapPin className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium">{CONTACT_US_OFFICE}</p>
            <p className="text-sm text-muted-foreground">
              {CONTACT_US_ADDRESS}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-brand/10 p-2 text-brand">
            <LuPhone className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium">{CONTACT_US_PHONE_TITLE}</p>
            <p className="text-sm text-muted-foreground">{CONTACT_US_PHONE}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-brand/10 p-2 text-brand">
            <LuMail className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium">{CONTACT_US_EMAIL_TITLE}</p>
            <p className="text-sm text-muted-foreground">{CONTACT_US_EMAIL}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-brand/10 p-2 text-brand">
            <LuClock className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium">{CONTACT_US_WORKING_HOURS_TITLE}</p>
            <p className="text-sm text-muted-foreground">{CONTACT_US_WORKING_HOURS}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}