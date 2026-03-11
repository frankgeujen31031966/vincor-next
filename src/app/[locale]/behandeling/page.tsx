import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  )
}

export default async function BehandelingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale, 'behandeling/overzicht')

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

      {/* Introduction */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.introduction.sectionLabel} title={content.introduction.title} description={content.introduction.description} />
          </ScrollReveal>
        </div>
      </section>

      {/* Overview Steps */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-teal/20" />
            {content.overviewSteps.map((step: any) => (
              <ScrollReveal key={step.number}>
                <div className="text-center">
                  <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Cards */}
      <section className="section-padding bg-dark text-gray-300">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.phaseCards.sectionLabel} title={content.phaseCards.title} description={content.phaseCards.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {content.phaseCards.phases.map((p: any) => (
              <ScrollReveal key={p.phase}>
                <div className={`relative rounded-xl border p-6 h-full flex flex-col ${p.featured ? 'border-teal bg-gradient-to-b from-teal/10 to-transparent' : 'border-white/10 bg-dark-card'}`}>
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {p.badge}
                    </div>
                  )}
                  <div className="text-sm text-teal font-semibold mb-1">{p.phase}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                  <div className="text-3xl font-bold text-white mb-3">€{p.price}</div>
                  <p className="text-gray-400 text-sm mb-4">{p.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.map((f: any) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-teal"><CheckIcon /></span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-500 mb-4">{p.location}</div>
                  <Link
                    href={`/${locale}/behandeling/${p.phase === 'Fase 1' ? 'fase-1-relaxatiesplint' : p.phase === 'Fase 2' ? 'fase-2-repositioneringssplint' : 'fase-3-reconstructie'}`}
                    className={`text-center py-2.5 rounded-full font-semibold text-sm transition block ${p.featured ? 'bg-teal text-white hover:brightness-110' : 'border border-white/20 text-white hover:bg-white/5'}`}
                  >
                    Meer over {p.phase}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BodySplint */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={content.bodySplint.sectionLabel} title={content.bodySplint.title} />
                <div className="mt-4 space-y-4">
                  {content.bodySplint.paragraphs.map((p: any, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
                <ul className="space-y-3 mt-6">
                  {content.bodySplint.features.map((f: any) => (
                    <li key={f} className="flex items-center gap-3 text-gray-600">
                      <span className="text-teal"><CheckIcon /></span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={`/images/${content.bodySplint.image}`} alt={content.bodySplint.imageAlt} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 py-6">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {content.trustBar.map((item: any) => (
              <div key={item} className="flex items-center gap-2 text-gray-600 font-medium">
                <span className="text-teal"><CheckIcon /></span>
                {item}
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
