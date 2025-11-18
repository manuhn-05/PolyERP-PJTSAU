'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background with greenhouse theme */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgb(245,244,242);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(235,232,228);stop-opacity:1" /></linearGradient><linearGradient id="skyDark" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:rgb(30,28,25);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(45,42,36);stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23sky)" class="light-mode"/><g opacity="0.1"><path d="M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z" stroke="rgb(120,180,100)" strokeWidth="2" fill="none"/><path d="M0,450 Q300,400 600,450 T1200,450 L1200,800 L0,800 Z" stroke="rgb(100,160,80)" strokeWidth="1.5" fill="none"/><line x1="100" y1="300" x2="100" y2="800" stroke="rgb(150,150,150)" strokeWidth="1" opacity="0.3"/><line x1="300" y1="250" x2="300" y2="800" stroke="rgb(150,150,150)" strokeWidth="1" opacity="0.3"/><line x1="500" y1="300" x2="500" y2="800" stroke="rgb(150,150,150)" strokeWidth="1" opacity="0.3"/><line x1="700" y1="280" x2="700" y2="800" stroke="rgb(150,150,150)" strokeWidth="1" opacity="0.3"/><line x1="900" y1="320" x2="900" y2="800" stroke="rgb(150,150,150)" strokeWidth="1" opacity="0.3"/><line x1="1100" y1="300" x2="1100" y2="800" stroke="rgb(150,150,150)" strokeWidth="1" opacity="0.3"/></g></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark mode background */}
      <div className="dark:absolute dark:inset-0 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 hidden" />

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/80 backdrop-blur-sm dark:from-background/85 dark:via-background/75 dark:to-background/85" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className={`w-full max-w-md text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Status code with animation */}
          <div className="mb-6">
            <h1 className="text-7xl font-bold tracking-tighter text-foreground sm:text-8xl">
              404
            </h1>
            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto rounded-full" />
          </div>

          {/* Headline */}
          <h2 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-pretty">
            Page Not Found
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-lg text-muted-foreground">
            The page you're looking for isn't available right now. It might have been moved or temporarily unavailable.
          </p>

          {/* Alternative message for maintenance */}
          <p className="mt-2 text-base text-muted-foreground">
            We're working hard to bring you the best experience.
          </p>

          {/* Buttons */}
          <div className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <Button
              onClick={() => router.back()}
              variant="outline"
              size="lg"
              className="rounded-full px-8 font-semibold"
            >
              Go Back
            </Button>
            <Button
              onClick={() => router.push('/')}
              size="lg"
              className="rounded-full px-8 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Go Home
            </Button>
          </div>

          {/* Decorative element */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-foreground/20 animate-pulse" />
            <div className="h-2 w-2 rounded-full bg-foreground/30 animate-pulse delay-100" />
            <div className="h-2 w-2 rounded-full bg-foreground/20 animate-pulse delay-200" />
          </div>
        </div>
      </div>
    </div>
  )
}