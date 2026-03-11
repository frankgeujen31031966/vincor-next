import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = getContent(locale, 'diagnostiek')
  return buildMetadata({ locale, path: '/diagnostiek', title: `${content.hero.title} — Vincor`, description: content.hero.description })
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  )
}

export default async function DiagnostiekPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale, 'diagnostiek')

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

      {/* Technology */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <Image src={`/images/${content.technology.image}`} alt={content.technology.imageAlt} fill className="object-cover" unoptimized />
              </div>
              <div>
                <SectionHeader label={content.technology.sectionLabel} title={content.technology.title} />
                <div className="mt-4 space-y-4">
                  {content.technology.paragraphs.map((p: any, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.benefits.sectionLabel} title={content.benefits.title} description={content.benefits.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {content.benefits.items.map((item: any) => (
              <ScrollReveal key={item.title}>
                <div className="bg-white rounded-xl p-6 shadow-sm h-full text-center">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.howItWorks.sectionLabel} title={content.howItWorks.title} description={content.howItWorks.description} />
          </ScrollReveal>
          <div className="max-w-2xl mx-auto mt-10 space-y-0">
            {content.howItWorks.steps.map((step: any, i: number) => (
              <ScrollReveal key={step.title}>
                <div className="flex gap-6 pb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
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

      {/* Measurements */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={content.measurements.sectionLabel} title={content.measurements.title} />
                <p className="text-gray-500 mt-4 mb-6">{content.measurements.description}</p>
                <div className="space-y-4">
                  {content.measurements.parameters.map((param: any) => (
                    <div key={param.title} className="flex items-start gap-3">
                      <span className="text-teal mt-0.5 shrink-0"><CheckIcon /></span>
                      <div>
                        <span className="font-semibold">{param.title}</span>
                        <span className="text-gray-500"> — {param.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={`/images/${content.measurements.image}`} alt={content.measurements.imageAlt} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-teal-lightest">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {content.stats.map((stat: any) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-teal">{stat.value}</div>
                <p className="text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonLink}
      />
    </>
  )
}
