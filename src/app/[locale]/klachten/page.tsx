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

export default async function KlachtenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale, 'klachten/overzicht')
  const conditionCards = content.conditionCards

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: any, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : undefined,
        }))}
        title={content.hero.title}
        description={content.hero.description}
      />

      {/* Intro */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader
              centered
              label={content.intro.label}
              title={content.intro.title}
              description={content.intro.description}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Condition Cards Grid */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditionCards.map((card: any) => (
              <ScrollReveal key={card.title}>
                <Link
                  href={`/${locale}${card.href}`}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] block"
                >
                  <Image src={card.image} alt={card.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={content.approach.label} title={content.approach.title} description={content.approach.description} />
                <ul className="space-y-3 mt-6 mb-8">
                  {content.approach.items.map((item: any) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600">
                      <span className="text-teal"><CheckIcon /></span> {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}${content.approach.buttonHref}`} className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-full font-semibold hover:brightness-110 transition">
                  {content.approach.buttonText}
                </Link>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <Image src={content.approach.image} alt="DIERS 4D Spinescan" fill className="object-cover" unoptimized />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Not found */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-4">{content.nietGevonden.title}</h2>
            <p className="text-gray-500 mb-6">{content.nietGevonden.description}</p>
            <Link href={`/${locale}${content.nietGevonden.buttonHref}`} className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition">
              {content.nietGevonden.buttonText}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonHref}
      />
    </>
  )
}
