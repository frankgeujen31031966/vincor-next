'use client'

import { useState } from 'react'
import { useConsent } from './ConsentContext'

type CookieBannerContent = {
  title: string
  description: string
  acceptAll: string
  rejectAll: string
  customize: string
  save: string
  essential: { label: string; description: string }
  analytics: { label: string; description: string }
  maps: { label: string; description: string }
}

export default function CookieBanner({ content }: { content: CookieBannerContent }) {
  const { consent, settingsOpen, acceptAll, rejectAll, save, closeSettings, hasChosen } = useConsent()
  const [mode, setMode] = useState<'summary' | 'customize'>('summary')
  const [local, setLocal] = useState({ analytics: consent.analytics, maps: consent.maps })

  if (!settingsOpen) return null

  const close = () => {
    setMode('summary')
    if (hasChosen) closeSettings()
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[500] p-4 md:p-6 pointer-events-none">
      <div className="max-w-[32rem] ml-auto pointer-events-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">{content.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{content.description}</p>

          {mode === 'customize' && (
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-1 accent-teal cursor-not-allowed opacity-60"
                  id="consent-essential"
                />
                <label htmlFor="consent-essential" className="flex-1 cursor-not-allowed">
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{content.essential.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{content.essential.description}</div>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={local.analytics}
                  onChange={(e) => setLocal({ ...local, analytics: e.target.checked })}
                  className="mt-1 accent-teal"
                  id="consent-analytics"
                />
                <label htmlFor="consent-analytics" className="flex-1 cursor-pointer">
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{content.analytics.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{content.analytics.description}</div>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={local.maps}
                  onChange={(e) => setLocal({ ...local, maps: e.target.checked })}
                  className="mt-1 accent-teal"
                  id="consent-maps"
                />
                <label htmlFor="consent-maps" className="flex-1 cursor-pointer">
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{content.maps.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{content.maps.description}</div>
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            {mode === 'summary' ? (
              <>
                <button
                  type="button"
                  onClick={() => { rejectAll(); close() }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {content.rejectAll}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('customize')}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {content.customize}
                </button>
                <button
                  type="button"
                  onClick={() => { acceptAll(); close() }}
                  className="flex-1 bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition"
                >
                  {content.acceptAll}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMode('summary')}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => { save(local); close() }}
                  className="flex-1 bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition"
                >
                  {content.save}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
