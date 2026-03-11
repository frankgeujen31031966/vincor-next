import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vincorscan.nl'
const SITE_NAME = 'Vincor — Occlusie & Houdingsdiagnostiek'

interface PageSeoOptions {
  locale: string
  path: string // e.g. '/klachten/kaakpijn'
  title: string
  description: string
  image?: string // relative path like '/images/kaakpijn.jpg'
}

export function buildMetadata({ locale, path, title, description, image }: PageSeoOptions): Metadata {
  const url = `${SITE_URL}/${locale}${path}`
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/images/og-default.jpg`

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        'nl': `${SITE_URL}/nl${path}`,
        'en': `${SITE_URL}/en${path}`,
        'fr': `${SITE_URL}/fr${path}`,
        'x-default': `${SITE_URL}/nl${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === 'nl' ? 'nl_NL' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// ─── JSON-LD Structured Data ───

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Vincor',
    alternateName: 'Vinculum Corporis',
    description: 'Gespecialiseerd in occlusie & houdingsdiagnostiek. De relatie tussen kaak en wervelkolom.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/vincor-logo.webp`,
    image: `${SITE_URL}/images/hero-bg.png`,
    telephone: '+31402450023',
    email: 'info@vincorscan.nl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vestdijk 25',
      addressLocality: 'Eindhoven',
      postalCode: '5611 CA',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.4381,
      longitude: 5.4752,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '32',
      bestRating: '5',
    },
    priceRange: '€195 - €7000',
    medicalSpecialty: 'Gnathology',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
