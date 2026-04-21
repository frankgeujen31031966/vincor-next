'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type ConsentState = {
  analytics: boolean
  maps: boolean
}

const DEFAULT: ConsentState = { analytics: false, maps: false }
const STORAGE_KEY = 'vincor-consent-v2'

type ConsentCtx = {
  consent: ConsentState
  hydrated: boolean
  hasChosen: boolean
  settingsOpen: boolean
  save: (next: ConsentState) => void
  acceptAll: () => void
  rejectAll: () => void
  openSettings: () => void
  closeSettings: () => void
}

const Ctx = createContext<ConsentCtx | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT)
  const [hasChosen, setHasChosen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ConsentState>
        setConsent({ ...DEFAULT, ...parsed })
        setHasChosen(true)
      }
    } catch {
      // localStorage unavailable — treat as not chosen, essential-only
    }
    setHydrated(true)
  }, [])

  const persist = (next: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // best-effort persistence
    }
    setConsent(next)
    setHasChosen(true)
    setSettingsOpen(false)
  }

  const value: ConsentCtx = {
    consent,
    hydrated,
    hasChosen,
    settingsOpen: hydrated && (settingsOpen || !hasChosen),
    save: persist,
    acceptAll: () => persist({ analytics: true, maps: true }),
    rejectAll: () => persist({ analytics: false, maps: false }),
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useConsent() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider')
  return ctx
}
