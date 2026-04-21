import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import FaqAccordion from '@/components/FaqAccordion'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

/* eslint-disable @typescript-eslint/no-explicit-any */
const slugToFile: Record<string, string> = {
  'fase-1-relaxatiesplint': 'behandeling/fase-1',
  'fase-2-repositioneringssplint': 'behandeling/fase-2',
  'fase-3-reconstructie': 'behandeling/fase-3',
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const contentPath = slugToFile[slug]
  if (!contentPath) return {}
  const content = await getContent(locale, contentPath) as any
  return buildMetadata({ locale, path: `/behandeling/${slug}`, title: content.meta.title, description: content.meta.description })
}

export default async function BehandelingDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const contentPath = slugToFile[slug]
  if (!contentPath) notFound()

  const content = await getContent(locale, contentPath) as any

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: string, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : i === 1 ? `/${locale}/behandeling` : undefined,
        }))}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        description={content.hero.description}
      />

      {/* Intro */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={content.intro.sectionLabel} title={content.intro.title} />
                <div className="mt-4 space-y-4">
                  {content.intro.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={`/images/${content.intro.image}`} alt={content.intro.imageAlt} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What you get / What it includes */}
      {(content.whatYouGet || content.whatItIncludes) && (() => {
        const section = content.whatYouGet || content.whatItIncludes
        return (
          <section className="section-padding bg-gray-50">
            <div className="max-w-[1200px] mx-auto px-8">
              <ScrollReveal>
                <SectionHeader centered label={section.sectionLabel} title={section.title} description={section.description} />
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {section.cards.map((card: { title: string; description: string }) => (
                  <ScrollReveal key={card.title}>
                    <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                      <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                      <p className="text-gray-500 text-sm">{card.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* How it works / Science */}
      {(content.howItWorks || content.science) && (() => {
        const section = content.howItWorks || content.science
        return (
          <section className="section-padding">
            <div className="max-w-[1200px] mx-auto px-8">
              <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] order-2 lg:order-1">
                    <Image src={`/images/${section.image}`} alt={section.imageAlt} fill className="object-cover" />
                  </div>
                  <div className="order-1 lg:order-2">
                    <SectionHeader label={section.sectionLabel} title={section.title} />
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((p: string, i: number) => (
                        <p key={i} className="text-gray-500">{p}</p>
                      ))}
                    </div>
                    {section.features && (
                      <ul className="space-y-3 mt-6">
                        {section.features.map((f: string) => (
                          <li key={f} className="flex items-center gap-3 text-gray-600">
                            <span className="text-teal"><CheckIcon /></span> {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )
      })()}

      {/* Timeline */}
      {content.timeline && (
        <section className="section-padding bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-8">
            <ScrollReveal>
              <SectionHeader centered label={content.timeline.sectionLabel} title={content.timeline.title} description={content.timeline.description} />
            </ScrollReveal>
            <div className="max-w-[42rem] mx-auto mt-10 space-y-0">
              {content.timeline.steps.map((step: { number: number; title: string; description: string }) => (
                <ScrollReveal key={step.number}>
                  <div className="flex gap-6 pb-8 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{step.number}</div>
                      <div className="w-px flex-1 bg-teal/20 mt-2" />
                    </div>
                    <div className="pb-4">
                      <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-gray-500">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      {content.stats && Array.isArray(content.stats) && (
        <section className="section-padding bg-teal-lightest">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {content.stats.map((stat: { value: string; label: string }) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-teal">{stat.value}</div>
                  <p className="text-gray-500 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results (fase 2) */}
      {content.results && (
        <section className="section-padding bg-teal-lightest">
          <div className="max-w-[1200px] mx-auto px-8">
            <ScrollReveal>
              <SectionHeader centered label={content.results.sectionLabel} title={content.results.title} description={content.results.description} />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10">
              {content.results.stats.map((stat: { value: string; label: string }) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-teal">{stat.value}</div>
                  <p className="text-gray-500 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
            {content.results.testimonial && (
              <div className="max-w-[42rem] mx-auto mt-10 bg-white rounded-xl p-8 shadow-sm text-center">
                <p className="text-gray-600 italic mb-4">&ldquo;{content.results.testimonial.quote}&rdquo;</p>
                <p className="font-semibold">{content.results.testimonial.author}, {content.results.testimonial.age}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing */}
      {content.pricing && (
        <section className="section-padding">
          <div className="max-w-[600px] mx-auto px-8">
            <ScrollReveal>
              <SectionHeader centered label={content.pricing.sectionLabel} title={content.pricing.title} />
              <div className="mt-8 border border-teal rounded-xl p-8 text-center">
                {content.pricing.badge && (
                  <span className="inline-block bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{content.pricing.badge}</span>
                )}
                <div className="text-sm text-teal font-semibold">{content.pricing.phase}</div>
                <h3 className="text-xl font-bold mb-1">{content.pricing.name}</h3>
                <div className="text-4xl font-bold mb-4">€{content.pricing.price}</div>
                {content.pricing.description && <p className="text-gray-500 text-sm mb-6">{content.pricing.description || content.pricing.priceDescription}</p>}
                {content.pricing.features && (
                <ul className="space-y-2 text-left mb-6">
                  {content.pricing.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-teal"><CheckIcon /></span> {f}
                    </li>
                  ))}
                </ul>
                )}
                <p className="text-xs text-gray-400 mb-4">{content.pricing.location}</p>
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition w-full justify-center">
                  {content.pricing.buttonText || 'Afspraak maken'}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faq && content.faq.items && content.faq.items.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="max-w-[800px] mx-auto px-8">
            <ScrollReveal>
              <SectionHeader centered title={content.faq.title} />
            </ScrollReveal>
            <div className="mt-8">
              <FaqAccordion items={content.faq.items} />
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonLink}
      />
    </>
  )
}
