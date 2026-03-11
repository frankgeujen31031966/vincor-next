import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vincor — Occlusie & Houdingsdiagnostiek',
  description: 'Ontdek de oorzaak van uw kaak-, nek- of migraineklachten met een gratis 4D scan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
