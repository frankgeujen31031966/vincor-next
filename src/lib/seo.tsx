import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vincorscan.nl'
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

const ORG_DESCRIPTIONS: Record<string, string> = {
  nl: 'Gespecialiseerd in occlusie & houdingsdiagnostiek. De relatie tussen kaak en wervelkolom.',
  en: 'Specialised in occlusion and posture diagnostics. Exploring the connection between jaw and spine.',
  fr: 'Spécialisé en diagnostic de l\'occlusion et de la posture. La relation entre mâchoire et colonne vertébrale.',
}

export function OrganizationJsonLd({ locale = 'nl' }: { locale?: string } = {}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Vincor',
    alternateName: 'Vinculum Corporis',
    description: ORG_DESCRIPTIONS[locale] || ORG_DESCRIPTIONS.nl,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/vincor-logo.webp`,
    image: `${SITE_URL}/images/hero-bg.png`,
    telephone: '+31402450023',
    email: 'info@vincorscan.nl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dokter Cuyperslaan 76',
      addressLocality: 'Eindhoven',
      postalCode: '5623 BB',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.4381,
      longitude: 5.4752,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '17:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        description: 'By appointment',
      },
    ],
    sameAs: [
      'https://www.instagram.com/vincor.kliniek',
      'https://www.facebook.com/vincor.eindhoven',
      'https://www.linkedin.com/company/vincor-kliniek',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '32',
      bestRating: '5',
    },
    priceRange: '€195 - €7000',
    medicalSpecialty: 'Dentistry',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Occlusie-analyse (3D)',
        procedureType: 'https://schema.org/DiagnosticProcedure',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Houdingsdiagnostiek (DIERS Formetric 4D)',
        procedureType: 'https://schema.org/DiagnosticProcedure',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Splinttherapie (relaxatie & repositionering)',
        procedureType: 'https://schema.org/TherapeuticProcedure',
      },
    ],
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

interface PersonJsonLdProps {
  name: string
  jobTitle: string
  description: string
  image?: string
  url: string
  nationality?: string
  worksForUrl?: string
  sameAs?: string[]
  knowsLanguage?: string[]
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  image,
  url,
  nationality,
  worksForUrl,
  sameAs,
  knowsLanguage,
}: PersonJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    worksFor: {
      '@type': 'MedicalClinic',
      name: 'Vincor',
      url: worksForUrl || SITE_URL,
    },
  }
  if (image) data.image = image.startsWith('http') ? image : `${SITE_URL}${image}`
  if (nationality) data.nationality = nationality
  if (sameAs && sameAs.length) data.sameAs = sameAs
  if (knowsLanguage && knowsLanguage.length) data.knowsLanguage = knowsLanguage

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
