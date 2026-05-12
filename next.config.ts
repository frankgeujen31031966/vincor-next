import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // Permanent (301) so search engines update their index.
    // Locale-less clean URLs (/contact, /klachten, ...) are already handled
    // by next-intl's default-locale routing, so no need to list them here.
    return [
      // Webflow legacy slugs
      { source: '/algemene-voorwaarden', destination: '/nl/voorwaarden', permanent: true },
      { source: '/contact-us', destination: '/nl/contact', permanent: true },
      { source: '/privacy-waarborg', destination: '/nl/privacy', permanent: true },

      // Compbell legacy .html (hoofdpagina's)
      { source: '/index.html', destination: '/nl', permanent: true },
      { source: '/contact.html', destination: '/nl/contact', permanent: true },
      { source: '/faq.html', destination: '/nl/faq', permanent: true },
      { source: '/privacy.html', destination: '/nl/privacy', permanent: true },
      { source: '/voorwaarden.html', destination: '/nl/voorwaarden', permanent: true },
      { source: '/resultaten.html', destination: '/nl/resultaten', permanent: true },

      // Compbell legacy .html (klachten)
      { source: '/klachten/kaakpijn.html', destination: '/nl/klachten/kaakpijn', permanent: true },
      { source: '/klachten/hoofdpijn-migraine.html', destination: '/nl/klachten/hoofdpijn-migraine', permanent: true },
      { source: '/klachten/tinnitus.html', destination: '/nl/klachten/tinnitus', permanent: true },
      { source: '/klachten/zenuwpijn.html', destination: '/nl/klachten/zenuwpijn', permanent: true },
      { source: '/klachten/tandenknarsen.html', destination: '/nl/klachten/tandenknarsen', permanent: true },
      { source: '/klachten/stijve-nek.html', destination: '/nl/klachten/stijve-nek', permanent: true },
      { source: '/klachten/rug-nekklachten.html', destination: '/nl/klachten/rug-nekklachten', permanent: true },

      // Compbell legacy .html (behandeling)
      { source: '/behandeling/overzicht.html', destination: '/nl/behandeling', permanent: true },
      { source: '/behandeling/fase-1.html', destination: '/nl/behandeling/fase-1', permanent: true },
      { source: '/behandeling/fase-2.html', destination: '/nl/behandeling/fase-2', permanent: true },
      { source: '/behandeling/fase-3.html', destination: '/nl/behandeling/fase-3', permanent: true },

      // Compbell legacy .html (kennisbank)
      { source: '/kennisbank/overzicht.html', destination: '/nl/kennisbank', permanent: true },
      { source: '/kennisbank/cmd-herkennen.html', destination: '/nl/kennisbank/cmd-herkennen', permanent: true },
      { source: '/kennisbank/kaak-en-rug.html', destination: '/nl/kennisbank/kaak-en-rug', permanent: true },
      { source: '/kennisbank/occlusiescan.html', destination: '/nl/kennisbank/occlusiescan', permanent: true },
      { source: '/kennisbank/kaaksplint-nodig.html', destination: '/nl/kennisbank/kaaksplint-nodig', permanent: true },

      // Compbell legacy .html (diagnostiek & over ons)
      { source: '/diagnostiek/index.html', destination: '/nl/diagnostiek', permanent: true },
      { source: '/diagnostiek/shining-3d.html', destination: '/nl/diagnostiek/shining-3d', permanent: true },
      { source: '/over-ons/index.html', destination: '/nl/over-ons', permanent: true },
      { source: '/over-ons/dr-arash-zarrinpour.html', destination: '/nl/over-ons/dr-arash-zarrinpour', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://identity.netlify.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "frame-src https://www.google.com https://maps.google.com",
              "connect-src 'self' https://api.github.com https://github.com https://cloudflareinsights.com",
            ].join('; '),
          },
        ],
      },
      {
        source: '/admin/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
