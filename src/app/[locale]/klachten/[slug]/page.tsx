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
import { buildMetadata, FaqJsonLd } from '@/lib/seo'

/* eslint-disable @typescript-eslint/no-explicit-any */
const validSlugs = [
  'kaakpijn', 'hoofdpijn-migraine', 'tinnitus', 'zenuwpijn',
  'tandenknarsen', 'stijve-nek', 'rug-nekklachten', 'apneu-snurken',
]

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!validSlugs.includes(slug)) return {}
  const content = await getContent(locale, `klachten/${slug}`)
  return buildMetadata({
    locale,
    path: `/klachten/${slug}`,
    title: `${content.hero.title} — Vincor`,
    description: content.hero.description,
    image: content.watIsHet?.image,
  })
}

export default async function KlachtPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!validSlugs.includes(slug)) notFound()

  const content = await getContent(locale, `klachten/${slug}`)

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: string, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : i === 1 ? `/${locale}/klachten` : undefined,
        }))}
        title={content.hero.title}
        description={content.hero.description}
      />

      {/* Wat is het */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={content.watIsHet.label} title={content.watIsHet.title} />
                <div className="mt-4 space-y-4">
                  {content.watIsHet.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={content.watIsHet.image} alt={content.hero.title} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Symptomen */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered title={content.symptomen.title} description={content.symptomen.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-[48rem] mx-auto">
            {content.symptomen.items.map((item: string) => (
              <ScrollReveal key={item}>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-teal mt-0.5 shrink-0"><CheckIcon /></span>
                  <span className="text-gray-600">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Oorzaken */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] order-2 lg:order-1">
                <Image src={content.oorzaken.image} alt={content.oorzaken.title} fill className="object-cover" />
              </div>
              <div className="order-1 lg:order-2">
                <SectionHeader label={content.oorzaken.label} title={content.oorzaken.title} />
                <div className="mt-4 space-y-4">
                  {content.oorzaken.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Diagnostiek */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered title={content.diagnostiek.title} description={content.diagnostiek.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {content.diagnostiek.cards.map((card: any) => (
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

      {/* Behandeling */}
      <section className="section-padding bg-dark text-gray-300">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered title={content.behandeling.title} description={content.behandeling.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {content.behandeling.phases.map((phase: any) => (
              <ScrollReveal key={phase.phase}>
                <div className={`rounded-xl border p-6 h-full ${phase.featured ? 'border-teal bg-gradient-to-b from-teal/10 to-transparent' : 'border-white/10 bg-dark-card'}`}>
                  {'badge' in phase && phase.badge && (
                    <span className="inline-block bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{phase.badge}</span>
                  )}
                  <div className="text-sm text-teal font-semibold mb-1">{phase.phase}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-teal"><CheckIcon /></span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="max-w-[800px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered title={content.faq.title} />
          </ScrollReveal>
          <div className="mt-8">
            <FaqAccordion items={content.faq.items} />
          </div>
        </div>
      </section>

      <CtaBanner
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonHref}
      />

      <FaqJsonLd items={content.faq.items} />
    </>
  )
}
