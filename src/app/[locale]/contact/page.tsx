'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import ScrollReveal from '@/components/ScrollReveal'
import content from '@/../content/contact.json'

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string>>({})

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: any, i: number) => ({
          label,
          href: i === 0 ? '/nl' : undefined,
        }))}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        description={content.hero.description}
      />

      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal>
              <div>
                <h2 className="text-2xl font-bold mb-2">{content.form.title}</h2>
                <p className="text-gray-500 mb-6">{content.form.description}</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {content.form.fields.map((field) => (
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
                          {field.options?.map((opt) => (
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
                  {content.form.checkboxes.map((cb) => (
                    <label key={cb.id} className="flex items-start gap-3 text-sm text-gray-600">
                      <input type="checkbox" required={cb.required} className="mt-1 accent-teal" />
                      <span>
                        {cb.label.split(cb.link.text).map((part, i) =>
                          i === 0 ? (
                            <span key={i}>{part}<Link href={cb.link.href} className="text-teal underline">{cb.link.text}</Link></span>
                          ) : <span key={i}>{part}</span>
                        )}
                      </span>
                    </label>
                  ))}
                  <button
                    type="submit"
                    className="bg-teal text-white px-8 py-3 rounded-full font-semibold hover:brightness-110 transition w-full"
                  >
                    {content.form.submitButton}
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">{content.contactInfo.title}</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-1">{content.contactInfo.address.label}</h3>
                      <p className="text-gray-700">{content.contactInfo.address.street}</p>
                      <p className="text-gray-700">{content.contactInfo.address.postcode} {content.contactInfo.address.city}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-1">{content.contactInfo.phone.label}</h3>
                      <a href={content.contactInfo.phone.href} className="text-teal font-medium hover:underline">{content.contactInfo.phone.number}</a>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-1">{content.contactInfo.email.label}</h3>
                      <a href={content.contactInfo.email.href} className="text-teal font-medium hover:underline">{content.contactInfo.email.address}</a>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-1">{content.contactInfo.openingHours.label}</h3>
                      {content.contactInfo.openingHours.hours.map((h) => (
                        <div key={h.days} className="flex justify-between text-gray-700 text-sm py-1">
                          <span>{h.days}</span>
                          <span>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden aspect-video">
                  <iframe
                    src={content.map.src}
                    title={content.map.title}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA - Call directly */}
      <section className="section-padding bg-dark">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{content.cta.title}</h2>
          <p className="text-gray-400 mb-8">{content.cta.description}</p>
          <a
            href={content.cta.buttonLink}
            className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-full font-semibold text-lg hover:brightness-110 transition shadow-glow"
          >
            {content.cta.buttonText}
          </a>
        </div>
      </section>
    </>
  )
}
