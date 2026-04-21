'use client'

import { useConsent } from './ConsentContext'

type MapEmbedProps = {
  src: string
  title: string
  placeholderTitle: string
  placeholderDescription: string
  loadButton: string
}

export default function MapEmbed({ src, title, placeholderTitle, placeholderDescription, loadButton }: MapEmbedProps) {
  const { consent, hydrated, save } = useConsent()

  if (!hydrated) {
    // Avoid flash: render neutral placeholder while reading localStorage
    return <div className="w-full h-full bg-gray-100 rounded-xl" aria-hidden="true" />
  }

  if (consent.maps) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <div className="w-full h-full bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center p-6 text-center">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mb-3">
        <path d="M9 2 3 5v17l6-3 6 3 6-3V2l-6 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 2v17M15 5v17" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="font-semibold text-gray-800 mb-1">{placeholderTitle}</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-sm">{placeholderDescription}</p>
      <button
        type="button"
        onClick={() => save({ analytics: consent.analytics, maps: true })}
        className="bg-teal text-white text-sm font-semibold px-5 py-2 rounded-full hover:brightness-110 transition"
      >
        {loadButton}
      </button>
    </div>
  )
}
