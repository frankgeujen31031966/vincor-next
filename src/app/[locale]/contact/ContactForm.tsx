'use client'

import { useState } from 'react'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm({ form, locale }: { form: any; locale: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setFormData({})
        // Reset form fields
        const formEl = e.target as HTMLFormElement
        formEl.reset()
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Er is iets misgegaan.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Kan geen verbinding maken. Controleer uw internetverbinding.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-teal/5 border border-teal/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="text-xl font-bold mb-2">{form.successTitle || 'Bericht verzonden!'}</h3>
        <p className="text-gray-500">{form.successMessage || 'Wij nemen zo snel mogelijk contact met u op.'}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-teal font-semibold hover:underline"
        >
          {form.sendAnother || 'Nog een bericht sturen'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{form.title}</h2>
      <p className="text-gray-500 mb-6">{form.description}</p>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
          {errorMsg}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Honeypot field — hidden from users, catches bots */}
        <input
          type="text"
          name="_gotcha"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute opacity-0 h-0 w-0 overflow-hidden"
          onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
        />

        {form.fields.map((field: any) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition"
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                disabled={status === 'submitting'}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                name={field.id}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition"
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                disabled={status === 'submitting'}
              >
                <option value="">{field.placeholder}</option>
                {field.options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition"
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                disabled={status === 'submitting'}
              />
            )}
          </div>
        ))}
        {form.checkboxes.map((cb: any) => (
          <label key={cb.id} className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" required={cb.required} className="mt-1 accent-teal" disabled={status === 'submitting'} />
            <span>
              {cb.label.split(cb.link.text).map((part: string, i: number) =>
                i === 0 ? (
                  <span key={i}>{part}<Link href={`/${locale}${cb.link.href}`} className="text-teal underline">{cb.link.text}</Link></span>
                ) : <span key={i}>{part}</span>
              )}
            </span>
          </label>
        ))}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-teal text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Verzenden...
            </span>
          ) : form.submitButton}
        </button>
      </form>
    </div>
  )
}
