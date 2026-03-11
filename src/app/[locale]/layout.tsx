import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Geist } from 'next/font/google'
import { routing } from '@/i18n/routing'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

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

  return (
    <html lang={locale} className={geist.variable}>
      <body className="font-[family-name:var(--font-primary)] text-gray-700 bg-white overflow-x-hidden leading-relaxed">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
