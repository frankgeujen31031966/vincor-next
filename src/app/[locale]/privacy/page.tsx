import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ScrollReveal from '@/components/ScrollReveal'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = await getContent(locale, 'privacy')
  return buildMetadata({ locale, path: '/privacy', title: content.meta.title, description: content.meta.description, image: '/images/og/privacy.jpg' })
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale, 'privacy')

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
            {content.sections.map((section: any) => (
              <ScrollReveal key={section.title}>
                <div>
                  <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  {'list' in section && section.list && (
                    <ul className="mt-3 space-y-2">
                      {section.list.map((item: any) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600">
                          <span className="text-teal mt-1 shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {'additionalContent' in section && section.additionalContent && (
                    <p className="text-gray-600 leading-relaxed mt-3">{section.additionalContent}</p>
                  )}
                  {'contactDetails' in section && section.contactDetails && (
                    <div className="mt-3 text-gray-600">
                      <p>{section.contactDetails.name}</p>
                      <p>{section.contactDetails.street}</p>
                      <p>{section.contactDetails.postcode}</p>
                      <p>{section.contactDetails.email}</p>
                      <p>{section.contactDetails.phone}</p>
                    </div>
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
