import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Geist } from 'next/font/google'
import { routing } from '@/i18n/routing'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { OrganizationJsonLd } from '@/lib/seo'
import { getContent } from '@/lib/content'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-primary',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()
  const nav = getContent(locale, 'navigation')

  return (
    <html lang={locale} className={geist.variable}>
      <body className="font-[family-name:var(--font-primary)] text-gray-700 bg-white overflow-x-hidden leading-relaxed">
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Navigation items={nav.nav} cta={nav.cta} />
          <main>{children}</main>
          <Footer />
          <CookieBanner text={nav.cookie.text} accept={nav.cookie.accept} decline={nav.cookie.decline} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
