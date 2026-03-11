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

export default async function Shining3DPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale, 'diagnostiek/shining-3d')

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: any, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : i === 1 ? `/${locale}/diagnostiek` : undefined,
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

      {/* Specs */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[800px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.specs.sectionLabel} title={content.specs.title} />
          </ScrollReveal>
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            {content.specs.items.map((spec: any, i: number) => (
              <div key={spec.label} className={`flex justify-between px-6 py-4 ${i < content.specs.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="font-medium text-gray-700">{spec.label}</span>
                <span className="text-teal font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MetiSmile */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.metismile.sectionLabel} title={content.metismile.title} />
            <div className="max-w-2xl mx-auto mt-4 space-y-4">
              {content.metismile.paragraphs.map((p: any, i: number) => (
                <p key={i} className="text-gray-500 text-center">{p}</p>
              ))}
            </div>
            <ul className="max-w-xl mx-auto mt-6 space-y-3">
              {content.metismile.features.map((f: any) => (
                <li key={f} className="flex items-center gap-3 text-gray-600">
                  <span className="text-teal"><CheckIcon /></span> {f}
                </li>
              ))}
            </ul>
          </ScrollReveal>
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
