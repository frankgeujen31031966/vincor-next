'use client'

import Script from 'next/script'
import { useConsent } from './ConsentContext'

const CF_TOKEN = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN

export default function AnalyticsScripts() {
  const { consent, hydrated } = useConsent()
  if (!hydrated || !consent.analytics || !CF_TOKEN) return null
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_TOKEN })}
      strategy="afterInteractive"
    />
  )
}
