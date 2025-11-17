"use client";

import { FormEvent, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button, Input, Textarea } from "@chakra-ui/react"
import { CONACT_US_FORM_ELEMENTS_LIST, SEND_US_MESSAGE } from "@/components/landing/landing-page-constants";

export function ContactForm() {

  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      // In a real app, send to an API route or server action.
      console.log("[v0] Contact form submitted", Object.fromEntries(data.entries()))
      //   toast({
      //     title: "Message sent",
      //     description: "Thank you! We’ll get back to you shortly.",
      //   })
      form.reset()
    } catch (err) {
      console.error("[v0] Error submitting contact form", err)
      //   toast({
      //     title: "Something went wrong",
      //     description: "Please try again.",
      //     variant: "destructive",
      //   })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full border-border/60 shadow-md">
      <CardHeader>
        <CardTitle role="heading" className="text-xl">{SEND_US_MESSAGE}</CardTitle>
      </CardHeader>
      <CardContent>
        <form role={"form"} onSubmit={onSubmit} className="grid gap-4">
          {
            CONACT_US_FORM_ELEMENTS_LIST.map((element) => (
              <div data-testid={element.test_id} key={element.test_id}>
                <label htmlFor="name" className="text-sm font-medium">
                  {element.label}
                </label>
                {
                  element.type === "textarea" ? (
                    <Textarea id={element.test_id} name={element.test_id} placeholder={element.placeholder} rows={6} required />
                  ) : (
                    <Input id={element.test_id} name={element.test_id} type={element.type} placeholder={element.placeholder} autoComplete={element.test_id} required />
                  )
                }
              </div>
            ))
          }

          <div className="pt-2">
            <Button
            data-testid="submit-button"
              type="submit"
              role={"button"}
              disabled={loading}
              className={cn(
                "rounded-full px-6",
                // Use brand tokens for color; ensures contrast and consistency
                "bg-brand text-brand-foreground hover:opacity-90",
                "focus-visible:ring-2 focus-visible:ring-brand/40",
              )}
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}