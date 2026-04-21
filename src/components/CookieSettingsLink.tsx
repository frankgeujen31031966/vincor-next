'use client'

import { useConsent } from './ConsentContext'

export default function CookieSettingsLink({ label }: { label: string }) {
  const { openSettings } = useConsent()
  return (
    <button
      type="button"
      onClick={openSettings}
      className="hover:text-teal transition-colors cursor-pointer"
    >
      {label}
    </button>
  )
}
