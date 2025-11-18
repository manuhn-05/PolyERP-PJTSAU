"use client";
import Image from "next/image";
import Link from "next/link";
// import { LuFacebook, LuTwitter, LuLinkedin, LuInstagram } from "react-icons/lu";
// import { useState } from "react";
import PolyLight from "@/images/assets/logos/logo1-dark-no-bg.png"
import { COPY_RIGHT, FOOTER_SMART_ERP } from "@/components/landing/landing-page-constants";

export function PolyErpFooter() {
  // const [email, setEmail] = useState("")

  // function onSubscribe(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   console.log("[v0] Newsletter subscribe:", email)
  //   setEmail("")
  // }

  return (
    <footer className="text-[var(--footer-foreground)] w-full bg-poly-footer bg-cover bg-[#6BBBE9]/20">

      <div className="mx-auto md:w-[90%] px-6 py-4 md:py-8 text-[#f8f8ff]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 w-full">
              <Image
                src={PolyLight}
                alt="PolyERP logo"
                width={300}
                height={36}
                className="h-[70%] w-[70%]"
                priority
              />
              {/* <span className="text-lg font-semibold tracking-tight">PolyERP</span> */}
            </div>
            <p data-testid={`footer-smart-erp`} role={"paragraph"} className="text-sm leading-relaxed text-[var(--footer-muted-foreground)]">
              {FOOTER_SMART_ERP}
            </p>
          </div>

      

          {/* Contact */}
          {/* todo : Change anchor - a tags to Link tag from nextJs */}
          <div className="flex flex-col gap-3">
            {/* <h3  className="text-sm font-medium tracking-wide text-[var(--footer-foreground)]">Contact</h3>
            <ul className="space-y-2 text-sm text-[var(--footer-muted-foreground)]">
              <li>
                <span className="block">Email</span>
                <a className="hover:text-[var(--color-primary)] transition-colors" href="mailto:support@polyerp.com">
                  support@polyerp.com
                </a>
              </li>
              <li>
                <span className="block">Phone</span>
                <a className="hover:text-[var(--color-primary)] transition-colors" href="tel:+910000000000">
                  +91-9876543201
                </a>
              </li>
              <li className="leading-relaxed">
                <span className="block">Address</span>
                Bangalore, Karnataka, India
              </li>
            </ul> */}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            {/* <h3 className="text-sm font-medium tracking-wide text-[var(--footer-foreground)]">Newsletter</h3>
            <p className="text-sm text-[var(--footer-muted-foreground)]">Subscribe for updates</p> */}
            {/* <form onSubmit={onSubscribe} className="flex w-full gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" "
              />
              <Button type="submit" className="shrink-0">
                Subscribe
              </Button>
            </form> */}
            <div className="mt-4 flex items-center gap-3" aria-label="Social media">
              {/* <SocialIcon href="https://facebook.com" label="Facebook">
                <LuFacebook className="size-5" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter">
                <LuTwitter className="size-5" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <LuLinkedin className="size-5" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <LuInstagram className="size-5" aria-hidden="true" />
              </SocialIcon> */}
            </div>
          </div>

              {/* Quick Links */}
              <nav aria-label="Footer quick links" className="grid grid-cols-2 gap-3 sm:grid-cols-1">
            <h3 className="sr-only">Quick Links</h3>
            <FooterLink href="/">Home</FooterLink>
            {/* <FooterLink href="/features">Features</FooterLink> */}
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact-us">Contact</FooterLink>
            {/* <FooterLink href="/faq">FAQ</FooterLink> */}
          </nav>
        </div>

        {/* Divider and Legal */}
        <div className="mt-10 border-t border-[var(--footer-border)] pt-6 text-sm text-[var(--footer-muted-foreground)]">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p>{COPY_RIGHT}</p>
            <div className="flex gap-4">
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-sm text-[var(--footer-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
    >
      {children}
    </Link>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center rounded-md border border-[var(--footer-border)] p-2 text-[var(--footer-muted-foreground)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
    >
      {children}
    </a>
  )
}