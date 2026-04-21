import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ScrollReveal from '@/components/ScrollReveal'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import ContactForm from './ContactForm'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = await getContent(locale, 'contact')
  return buildMetadata({ locale, path: '/contact', title: content.meta.title, description: content.meta.description })
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale, 'contact')

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: any, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : undefined,
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
              <ContactForm
                form={content.form}
                locale={locale}
              />
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
                      {content.contactInfo.openingHours.hours.map((h: any) => (
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
