'use client'

import { useState } from 'react'
import Link from 'next/link'

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ContactForm({ form, locale }: { form: any; locale: string }) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{form.title}</h2>
      <p className="text-gray-500 mb-6">{form.description}</p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {form.fields.map((field: any) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition"
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition"
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
              >
                <option value="">{field.placeholder}</option>
                {field.options?.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:border-teal focus:ring-1 focus:ring-teal outline-none transition"
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
              />
            )}
          </div>
        ))}
        {form.checkboxes.map((cb: any) => (
          <label key={cb.id} className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" required={cb.required} className="mt-1 accent-teal" />
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
          className="bg-teal text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition w-full"
        >
          {form.submitButton}
        </button>
      </form>
    </div>
  )
}
