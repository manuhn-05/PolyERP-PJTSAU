import { ContactForm } from '@/components/landing/contact-us/contact-us-form'
import { ContactDetailsCard } from '@/components/landing/contact-us/address-details-card'
import MapPreviewComponent from '@/components/landing/contact-us/map-preview'
import { CONTACT_FORM_TITLE_TEXT, GET_IN_TOUCH_BTN_TEXT, LOCTION_PREVIEW_TITLE, WE_LOVE_TO_HEAR_FROM_YOU } from '@/components/landing/landing-page-constants'

const ContactUsComponent = () => {
  return (
    <main className="min-h-dvh">
      {/* Hero */}
      <section className="bg-leaf-tech" aria-labelledby="contact-hero-title">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-20">
          <h1 id="contact-hero-title" className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {GET_IN_TOUCH_BTN_TEXT}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            {WE_LOVE_TO_HEAR_FROM_YOU}
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section aria-labelledby="contact-content-title">
        <h2 id="contact-content-title" className="sr-only">
          {CONTACT_FORM_TITLE_TEXT}
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-8">
          <div className="flex">
            <ContactForm />
          </div>
          <div className="flex">
            <ContactDetailsCard />
          </div>
        </div>
      </section>

      {/* Map / Illustration */}
      <section aria-labelledby="map-preview-title" className="pb-12">
        <h2 id="map-preview-title" className="sr-only">
          {LOCTION_PREVIEW_TITLE}
        </h2>
        <div className="mx-auto max-w-6xl px-4">
          <MapPreviewComponent />
        </div>
      </section>
    </main>
  )
}

export default ContactUsComponent;