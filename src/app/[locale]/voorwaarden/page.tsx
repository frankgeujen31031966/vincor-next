import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ScrollReveal from '@/components/ScrollReveal'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = await getContent(locale, 'voorwaarden')
  return buildMetadata({ locale, path: '/voorwaarden', title: `${content.hero.title} — Vincor`, description: content.hero.description })
}

export default async function VoorwaardenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale, 'voorwaarden')

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
        <div className="max-w-[720px] mx-auto px-8">
          <p className="text-sm text-gray-400 mb-8">Laatst bijgewerkt: {content.lastUpdated}</p>

          <div className="space-y-10">
            {content.articles.map((article: any) => (
              <ScrollReveal key={article.number}>
                <div>
                  <h2 className="text-xl font-bold mb-3">
                    Artikel {article.number} — {article.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{article.content}</p>
                  {'list' in article && article.list && (
                    <ul className="mt-3 space-y-2">
                      {article.list.map((item: any) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600">
                          <span className="text-teal mt-1 shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {'additionalContent' in article && article.additionalContent && (
                    <p className="text-gray-600 leading-relaxed mt-3">{article.additionalContent}</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
