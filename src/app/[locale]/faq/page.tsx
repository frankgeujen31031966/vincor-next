import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import FaqAccordion from '@/components/FaqAccordion'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata, FaqJsonLd } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = await getContent(locale, 'faq')
  return buildMetadata({ locale, path: '/faq', title: content.meta.title, description: content.meta.description })
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale, 'faq')

  const allFaqItems = content.categories.flatMap((cat: any) => cat.items)

  return (
    <>
      <FaqJsonLd items={allFaqItems} />
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: any, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : undefined,
        }))}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        description={content.hero.description}
      />

      {content.categories.map((category: any) => (
        <section key={category.title} className="section-padding odd:bg-gray-50">
          <div className="max-w-[800px] mx-auto px-8">
            <ScrollReveal>
              <SectionHeader centered label={category.sectionLabel} title={category.title} />
            </ScrollReveal>
            <div className="mt-8">
              <FaqAccordion items={category.items} />
            </div>
          </div>
        </section>
      ))}

      <CtaBanner
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonLink}
      />
    </>
  )
}
