import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vincorscan.nl'
  const locales = ['nl', 'en', 'fr']

  const staticPages = [
    '',
    '/klachten',
    '/diagnostiek',
    '/diagnostiek/shining-3d',
    '/behandeling',
    '/over-ons',
    '/over-ons/dr-arash-zarrinpour',
    '/faq',
    '/kennisbank',
    '/resultaten',
    '/contact',
    '/privacy',
    '/voorwaarden',
  ]

  const klachtenSlugs = [
    'kaakpijn', 'hoofdpijn-migraine', 'tinnitus', 'zenuwpijn',
    'tandenknarsen', 'stijve-nek', 'rug-nekklachten', 'apneu-snurken',
  ]

  const behandelingSlugs = [
    'fase-1-relaxatiesplint', 'fase-2-repositioneringssplint', 'fase-3-reconstructie',
  ]

  const kennisbankSlugs = [
    'cmd-herkennen', 'kaak-en-rug', 'occlusiescan', 'kaaksplint-nodig',
  ]

  const dynamicPages = [
    ...klachtenSlugs.map((s) => `/klachten/${s}`),
    ...behandelingSlugs.map((s) => `/behandeling/${s}`),
    ...kennisbankSlugs.map((s) => `/kennisbank/${s}`),
  ]

  const allPages = [...staticPages, ...dynamicPages]

  return allPages.flatMap((page) => {
    const alternates: Record<string, string> = {}
    for (const locale of locales) {
      alternates[locale] = `${baseUrl}/${locale}${page}`
    }
    alternates['x-default'] = `${baseUrl}/nl${page}`

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly' as const,
      priority: page === '' ? 1.0 : page.includes('/') ? 0.6 : 0.8,
      alternates: { languages: alternates },
    }))
  })
}
