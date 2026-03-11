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

export default async function DrArashPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale, 'team/dr-arash-zarrinpour')

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: any, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : i === 1 ? `/${locale}/over-ons` : undefined,
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
                  {content.intro.paragraphs.map((p: any, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                <Image src={`/images/${content.intro.image}`} alt={content.intro.imageAlt} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.expertise.sectionLabel} title={content.expertise.title} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {content.expertise.items.map((item: any) => (
              <ScrollReveal key={item.title}>
                <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader label={content.approach.sectionLabel} title={content.approach.title} />
            <div className="mt-4 space-y-4">
              {content.approach.paragraphs.map((p: any, i: number) => (
                <p key={i} className="text-gray-500">{p}</p>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {content.approach.features.map((f: any) => (
                <li key={f} className="flex items-center gap-3 text-gray-600">
                  <span className="text-teal"><CheckIcon /></span> {f}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[800px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.credentials.sectionLabel} title={content.credentials.title} />
            <ul className="mt-8 space-y-3">
              {content.credentials.items.map((item: any) => (
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <span className="text-teal mt-0.5 shrink-0"><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact info */}
      <section className="section-padding">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <ScrollReveal>
            <SectionHeader centered label={content.contact.sectionLabel} title={content.contact.title} description={content.contact.description} />
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="bg-gray-50 rounded-lg px-5 py-3">
                <span className="text-sm text-gray-400">Locatie</span>
                <p className="font-medium">{content.contact.location}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-5 py-3">
                <span className="text-sm text-gray-400">Talen</span>
                <p className="font-medium">{content.contact.languages.join(', ')}</p>
              </div>
            </div>
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
