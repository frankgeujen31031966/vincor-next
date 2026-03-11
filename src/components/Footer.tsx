import Link from 'next/link'
import Image from 'next/image'
import { getLocale } from 'next-intl/server'
import { getContent } from '@/lib/content'

export default async function Footer() {
  const locale = await getLocale()
  const nav = getContent(locale, 'navigation')
  const f = nav.footer

  // Reuse klachten links from nav items
  const klachtenItem = nav.nav.find((item: any) => item.href === '/klachten')
  const klachtenLinks = klachtenItem?.children || []

  return (
    <footer className="bg-[#0e0e0e] text-gray-300 py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/vincor-logo.webp"
                alt="Vincor Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              {f.description}
            </p>
          </div>

          {/* Column 2: Klachten */}
          <div>
            <h4 className="text-white font-semibold mb-4">{f.klachtenTitle}</h4>
            <ul className="space-y-2">
              {klachtenLinks.map((link: any) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="text-gray-400 hover:text-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Behandeling */}
          <div>
            <h4 className="text-white font-semibold mb-4">{f.behandelingTitle}</h4>
            <ul className="space-y-2">
              {f.behandelingLinks.map((link: any) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="text-gray-400 hover:text-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{f.contactTitle}</h4>
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
          <span>&copy; {new Date().getFullYear()} Vincor</span>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-teal transition-colors">
              {f.privacy}
            </Link>
            <Link href={`/${locale}/voorwaarden`} className="hover:text-teal transition-colors">
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
