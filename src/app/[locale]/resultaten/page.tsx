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
  const content = await getContent(locale, 'resultaten')
  return buildMetadata({ locale, path: '/resultaten', title: content.meta.title, description: content.meta.description, image: '/images/og/resultaten.jpg' })
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  )
}

export default async function ResultatenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale, 'resultaten')

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

      {/* Stats */}
      <section className="section-padding bg-teal-lightest">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.stats.sectionLabel} title={content.stats.title} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10">
            {content.stats.items.map((stat: any) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-teal">{stat.value}</div>
                <p className="text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.caseStudies.sectionLabel} title={content.caseStudies.title} description={content.caseStudies.description} />
          </ScrollReveal>
          <div className="space-y-12 mt-10">
            {content.caseStudies.cases.map((caseItem: any, index: number) => (
              <ScrollReveal key={caseItem.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <Image src={`/images/${caseItem.image}`} alt={caseItem.imageAlt} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{caseItem.title}</h3>
                    <div className="space-y-3">
                      <div><span className="font-semibold text-gray-700">{content.caseStudies.labels.patient}:</span> <span className="text-gray-500">{caseItem.patient}</span></div>
                      <div><span className="font-semibold text-gray-700">{content.caseStudies.labels.complaint}:</span> <span className="text-gray-500">{caseItem.complaint}</span></div>
                      <div><span className="font-semibold text-gray-700">{content.caseStudies.labels.diagnosis}:</span> <span className="text-gray-500">{caseItem.diagnosis}</span></div>
                      <div><span className="font-semibold text-gray-700">{content.caseStudies.labels.treatment}:</span> <span className="text-gray-500">{caseItem.treatment}</span></div>
                      <div className="bg-teal/5 border border-teal/20 rounded-lg p-4 mt-4">
                        <span className="font-semibold text-teal">{content.caseStudies.labels.result}:</span> <span className="text-gray-600">{caseItem.result}</span>
                      </div>
                    </div>
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
                <p className="text-gray-500 mt-4 mb-6">{content.measurements.text}</p>
                <div className="space-y-3">
                  {content.measurements.parameters.map((param: any) => (
                    <div key={param.name} className="flex items-start gap-3">
                      <span className="text-teal mt-0.5 shrink-0"><CheckIcon /></span>
                      <div>
                        <span className="font-semibold">{param.name}</span>
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

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.testimonials.sectionLabel} title={content.testimonials.title} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {content.testimonials.items.map((t: any) => (
              <ScrollReveal key={t.author}>
                <div className="bg-gray-50 rounded-xl p-6 h-full">
                  <p className="text-gray-600 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <p className="font-semibold text-sm">{t.author}, {t.age}</p>
                </div>
              </ScrollReveal>
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
