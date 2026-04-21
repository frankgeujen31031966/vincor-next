import Link from 'next/link'
import { getLocale } from 'next-intl/server'

const MESSAGES: Record<string, { title: string; description: string; cta: string }> = {
  nl: {
    title: 'Pagina niet gevonden',
    description: 'De pagina die u zoekt bestaat niet of is verplaatst. Ga terug naar de startpagina of gebruik het menu.',
    cta: 'Terug naar home',
  },
  en: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has been moved. Go back to the homepage or use the menu.',
    cta: 'Back to home',
  },
  fr: {
    title: 'Page introuvable',
    description: "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou utilisez le menu.",
    cta: "Retour à l'accueil",
  },
}

export default async function NotFound() {
  const locale = await getLocale()
  const m = MESSAGES[locale] || MESSAGES.nl

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24 bg-dark">
      <div className="max-w-[640px] mx-auto px-8 text-center">
        <div className="text-7xl font-bold text-teal mb-6">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{m.title}</h1>
        <p className="text-gray-300 mb-8">{m.description}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
        >
          {m.cta}
        </Link>
      </div>
    </section>
  )
}
