import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = await getContent(locale, 'kennisbank/overzicht')
  return buildMetadata({ locale, path: '/kennisbank', title: content.meta.title, description: content.meta.description })
}

export default async function KennisbankPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale, 'kennisbank/overzicht')

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.articles.map((article: any) => (
              <ScrollReveal key={article.slug}>
                <Link href={`/${locale}/${article.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition h-full">
                  <div className="relative aspect-[16/9]">
                    <Image src={`/images/${article.image}`} alt={article.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full">{article.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-teal transition-colors">{article.title}</h2>
                    <p className="text-gray-500 text-sm mb-3">{article.excerpt}</p>
                    <span className="text-xs text-gray-400">{article.readingTime}</span>
                  </div>
                </Link>
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
