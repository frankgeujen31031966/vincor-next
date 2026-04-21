'use client'

import Script from 'next/script'
import { useConsent } from './ConsentContext'

export default function AnalyticsScripts() {
  const { consent, hydrated } = useConsent()
  if (!hydrated || !consent.analytics) return null
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token":"03ac6e8d302a43a0b5f1be3e418d80bc"}'
      strategy="afterInteractive"
    />
  )
}
