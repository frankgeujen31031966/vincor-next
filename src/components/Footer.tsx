import Link from 'next/link'
import Image from 'next/image'
import { getLocale } from 'next-intl/server'

export default async function Footer() {
  const locale = await getLocale()

  const klachtenLinks = [
    { label: 'Kaakpijn', slug: 'kaakpijn' },
    { label: 'Hoofdpijn & Migraine', slug: 'hoofdpijn-migraine' },
    { label: 'Tinnitus', slug: 'tinnitus' },
    { label: 'Zenuwpijn', slug: 'zenuwpijn' },
    { label: 'Tandenknarsen', slug: 'tandenknarsen' },
    { label: 'Stijve Nek', slug: 'stijve-nek' },
    { label: 'Rug- & Nekklachten', slug: 'rug-nekklachten' },
  ]

  const behandelingLinks = [
    { label: 'Fase 1 — Relaxatiesplint', slug: 'fase-1-relaxatiesplint' },
    { label: 'Fase 2 — Repositioneringssplint', slug: 'fase-2-repositioneringssplint' },
    { label: 'Fase 3 — Reconstructie', slug: 'fase-3-reconstructie' },
  ]

  return (
    <footer className="bg-[#0e0e0e] text-gray-300 py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Vincor Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Vincor (Vinculum Corporis — de band van het lichaam). Gespecialiseerd in occlusie & houdingsdiagnostiek.
            </p>
          </div>

          {/* Column 2: Klachten */}
          <div>
            <h4 className="text-white font-semibold mb-4">Klachten</h4>
            <ul className="space-y-2">
              {klachtenLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${locale}/klachten/${link.slug}`} className="text-gray-400 hover:text-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Behandeling */}
          <div>
            <h4 className="text-white font-semibold mb-4">Behandeling</h4>
            <ul className="space-y-2">
              {behandelingLinks.map((link) => (
                <li key={link.slug}>
                  <Link href={`/${locale}/behandeling/${link.slug}`} className="text-gray-400 hover:text-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Eindhoven</li>
              <li className="text-gray-400">040-1234567</li>
              <li className="text-gray-400">
                <Link href={`/${locale}/contact`} className="hover:text-teal transition-colors">
                  info@vincorscan.nl
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex justify-between text-sm text-gray-500">
          <span>&copy; 2026 Vincor</span>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-teal transition-colors">
              Privacy
            </Link>
            <Link href={`/${locale}/voorwaarden`} className="hover:text-teal transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
