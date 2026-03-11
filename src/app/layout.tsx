import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-primary',
})

export const metadata: Metadata = {
  title: 'Vincor — Occlusie & Houdingsdiagnostiek',
  description: 'Ontdek de oorzaak van uw kaak-, nek- of migraineklachten met een gratis 4D scan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={geist.variable}>
      <body className="font-[family-name:var(--font-primary)] text-gray-700 bg-white overflow-x-hidden leading-relaxed">
        {children}
      </body>
    </html>
  )
}
