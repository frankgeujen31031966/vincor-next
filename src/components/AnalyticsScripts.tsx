'use client'

import Script from 'next/script'
import { useConsent } from './ConsentContext'

const CF_TOKEN = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function AnalyticsScripts() {
  const { consent, hydrated } = useConsent()
  if (!hydrated || !consent.analytics) return null
  return (
    <>
      {CF_TOKEN && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CF_TOKEN })}
          strategy="afterInteractive"
        />
      )}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
    </>
  )
}
