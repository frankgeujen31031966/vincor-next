import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import ScrollReveal from '@/components/ScrollReveal'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

/* eslint-disable @typescript-eslint/no-explicit-any */
const validSlugs = ['cmd-herkennen', 'kaak-en-rug', 'occlusiescan', 'kaaksplint-nodig']

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!validSlugs.includes(slug)) return {}
  const content = await getContent(locale, `kennisbank/${slug}`)
  return buildMetadata({ locale, path: `/kennisbank/${slug}`, title: `${content.hero.title} — Vincor`, description: content.hero.description })
}

function BodyBlock({ block }: { block: any }) {
  switch (block.type) {
    case 'intro':
      return <p className="text-lg text-gray-600 leading-relaxed font-medium">{block.text}</p>
    case 'paragraph':
      return <p className="text-gray-600 leading-relaxed">{block.text}</p>
    case 'heading':
      if (block.level === 2) return <h2 className="text-2xl font-bold mt-8 mb-4">{block.text}</h2>
      if (block.level === 3) return <h3 className="text-xl font-semibold mt-6 mb-3">{block.text}</h3>
      return <h4 className="text-lg font-semibold mt-4 mb-2">{block.text}</h4>
    case 'list':
      return (
        <ul className="space-y-2 my-4">
          {block.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <svg className="w-5 h-5 text-teal mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default async function KennisbankArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!validSlugs.includes(slug)) notFound()

  const content = await getContent(locale, `kennisbank/${slug}`)

  return (
    <>
      <PageHero
        breadcrumb={content.hero.breadcrumb.map((label: string, i: number) => ({
          label,
          href: i === 0 ? `/${locale}` : i === 1 ? `/${locale}/kennisbank` : undefined,
        }))}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        description={content.hero.description}
      />

      <article className="section-padding">
        <div className="max-w-[720px] mx-auto px-8">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            {content.meta.category && <span className="bg-teal/10 text-teal px-3 py-1 rounded-full font-medium">{content.meta.category}</span>}
            {content.meta.readingTime && <span>{content.meta.readingTime}</span>}
            {content.meta.publishDate && <span>{content.meta.publishDate}</span>}
          </div>

          {/* Featured Image */}
          {content.featuredImage && (
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-10">
              <Image src={`/images/${content.featuredImage.src}`} alt={content.featuredImage.alt} fill className="object-cover" />
            </div>
          )}

          {/* Body */}
          <div className="space-y-4">
            {content.body.map((block: any, i: number) => (
              <BodyBlock key={i} block={block} />
            ))}
          </div>

          {/* Related Articles */}
          {content.relatedArticles && content.relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold mb-4">Gerelateerde artikelen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.relatedArticles.map((article: { title: string; slug: string; image: string }) => (
                  <Link key={article.slug} href={`/${locale}/${article.slug}`} className="group flex items-center gap-4 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image src={`/images/${article.image}`} alt={article.title} fill className="object-cover" />
                    </div>
                    <span className="font-medium text-sm group-hover:text-teal transition-colors">{article.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CtaBanner
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonLink}
      />
    </>
  )
}
