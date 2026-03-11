import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
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
              <li>
                <Link href="/klachten/kaakpijn" className="text-gray-400 hover:text-teal transition-colors">
                  Kaakpijn
                </Link>
              </li>
              <li>
                <Link href="/klachten/hoofdpijn-migraine" className="text-gray-400 hover:text-teal transition-colors">
                  Hoofdpijn & Migraine
                </Link>
              </li>
              <li>
                <Link href="/klachten/tinnitus" className="text-gray-400 hover:text-teal transition-colors">
                  Tinnitus
                </Link>
              </li>
              <li>
                <Link href="/klachten/zenuwpijn" className="text-gray-400 hover:text-teal transition-colors">
                  Zenuwpijn
                </Link>
              </li>
              <li>
                <Link href="/klachten/tandenknarsen" className="text-gray-400 hover:text-teal transition-colors">
                  Tandenknarsen
                </Link>
              </li>
              <li>
                <Link href="/klachten/stijve-nek" className="text-gray-400 hover:text-teal transition-colors">
                  Stijve Nek
                </Link>
              </li>
              <li>
                <Link href="/klachten/rug-nekklachten" className="text-gray-400 hover:text-teal transition-colors">
                  Rug- & Nekklachten
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Behandeling */}
          <div>
            <h4 className="text-white font-semibold mb-4">Behandeling</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/behandeling/fase-1" className="text-gray-400 hover:text-teal transition-colors">
                  Fase 1 — Relaxatiesplint
                </Link>
              </li>
              <li>
                <Link href="/behandeling/fase-2" className="text-gray-400 hover:text-teal transition-colors">
                  Fase 2 — Repositioneringssplint
                </Link>
              </li>
              <li>
                <Link href="/behandeling/fase-3" className="text-gray-400 hover:text-teal transition-colors">
                  Fase 3 — Reconstructie
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Eindhoven</li>
              <li className="text-gray-400">040-1234567</li>
              <li className="text-gray-400">
                <Link href="/contact" className="hover:text-teal transition-colors">
                  info@vincorscan.nl
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex justify-between text-sm text-gray-500">
          <span>© 2026 Vincor</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-teal transition-colors">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="hover:text-teal transition-colors">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}