import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import SectionHeader from '@/components/SectionHeader'
import CounterAnimation from '@/components/CounterAnimation'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = getContent(locale, 'homepage')
  return buildMetadata({
    locale,
    path: '',
    title: content.meta.title,
    description: content.meta.description,
    image: '/images/hero-bg.png',
  })
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  )
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
  )
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale, 'homepage')

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 w-full py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-1.5 text-sm text-teal-light mb-6">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse-dot" />
              {c.hero.badge}
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              {c.hero.title}<span className="highlight">{c.hero.titleHighlight}</span>{c.hero.titleAfter}
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              {c.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}${c.hero.ctaPrimary.href}`} className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition shadow-glow">
                {c.hero.ctaPrimary.text} <ArrowIcon />
              </Link>
              <a href={c.hero.ctaSecondary.href} className="inline-flex items-center gap-2 border border-white/25 text-white/85 px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                {c.hero.ctaSecondary.text}
              </a>
            </div>
          </div>
          <div className="flex gap-8 mt-16">
            {c.hero.stats.map((s: any) => (
              <div key={s.number} className="text-center">
                <div className="text-3xl font-bold text-white">{s.number}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm">
          <span>{c.hero.scrollIndicator}</span>
          <div className="w-px h-8 bg-teal/50 animate-scroll-line" />
        </div>
      </section>

      {/* TRUST BAR */}
      <ScrollReveal>
        <section className="bg-gray-50 py-6">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {c.trustBar.map((item: string) => (
                <div key={item} className="flex items-center gap-2 text-gray-600 font-medium">
                  <span className="text-teal"><CheckIcon /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* KLACHTEN */}
      <section className="section-padding" id="klachten">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={c.klachten.label} title={c.klachten.title} description={c.klachten.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {c.klachten.items.map((k: any) => (
              <Link key={k.title} href={`/${locale}/klachten/${k.slug}`} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={`/images/${k.image}`} alt={k.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-semibold text-lg">{k.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-gray-50" id="hoe-werkt-het">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={c.howItWorks.label} title={c.howItWorks.title} description={c.howItWorks.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-teal/20" />
            {c.howItWorks.steps.map((s: any, i: number) => (
              <ScrollReveal key={s.title}>
                <div className="text-center">
                  <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">{i + 1}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-500">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIEK */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <Image src={`/images/${c.diagnostiek.image}`} alt={c.diagnostiek.imageAlt} fill className="object-cover" unoptimized />
              </div>
              <div>
                <SectionHeader label={c.diagnostiek.label} title={c.diagnostiek.title} />
                <p className="text-gray-500 mt-4 mb-6">{c.diagnostiek.description}</p>
                <ul className="space-y-3 mb-8">
                  {c.diagnostiek.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-3 text-gray-600">
                      <span className="text-teal"><CheckIcon /></span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}${c.diagnostiek.ctaHref}`} className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-full font-semibold hover:brightness-110 transition">
                  {c.diagnostiek.ctaText} <ArrowIcon />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BEHANDELING */}
      <section className="section-padding bg-dark text-gray-300">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={c.behandeling.label} title={c.behandeling.title} description={c.behandeling.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {c.behandeling.phases.map((p: any) => (
              <ScrollReveal key={p.phase}>
                <div className={`relative rounded-xl border p-6 h-full flex flex-col ${p.featured ? 'border-teal bg-gradient-to-b from-teal/10 to-transparent' : 'border-white/10 bg-dark-card'}`}>
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {p.badge}
                    </div>
                  )}
                  <div className="text-sm text-teal font-semibold mb-1">{p.phase}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                  <div className="text-3xl font-bold text-white mb-3">{p.price}</div>
                  <p className="text-gray-400 text-sm mb-4">{p.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-teal"><CheckIcon /></span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-500 mb-4">{p.location}</div>
                  <Link href={`/${locale}/behandeling/${p.slug}`} className={`text-center py-2.5 rounded-full font-semibold text-sm transition ${p.featured ? 'bg-teal text-white hover:brightness-110' : 'border border-white/20 text-white hover:bg-white/5'}`}>
                    {p.ctaText}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTATEN */}
      <section className="section-padding bg-teal-lightest">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={c.resultaten.label} title={c.resultaten.title} description={c.resultaten.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            {c.resultaten.stats.map((s: any) => (
              <div key={s.label}>
                <CounterAnimation target={s.target} suffix={s.suffix} />
                <p className="text-gray-500 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={c.partners.label} title={c.partners.title} />
                {c.partners.paragraphs.map((p: string, i: number) => (
                  <p key={i} className="text-gray-500 mt-4">{p}</p>
                ))}
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <Image src={`/images/${c.partners.image}`} alt={c.partners.imageAlt} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={c.googleReviews.label} title={c.googleReviews.title} />
            <div className="flex items-center justify-center gap-2 mt-4 mb-8">
              <div className="flex text-amber">{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}</div>
              <span className="text-2xl font-bold">{c.googleReviews.overallRating}</span>
              <span className="text-gray-500 text-sm">— {c.googleReviews.totalReviews}</span>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.googleReviews.items.map((r: any) => (
              <ScrollReveal key={r.author}>
                <div className="bg-white rounded-xl p-5 shadow-sm h-full flex flex-col">
                  <div className="flex text-amber mb-2">{Array.from({ length: r.stars }).map((_, i) => <StarIcon key={i} />)}</div>
                  <p className="text-sm text-gray-600 flex-1 mb-4">{r.text}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-8 h-8 bg-teal/10 text-teal rounded-full flex items-center justify-center font-semibold text-sm">{r.initial}</div>
                    <div>
                      <div className="font-semibold text-sm">{r.author}</div>
                      <div className="text-xs text-gray-400">{r.timeAgo}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={c.testimonials.label} title={c.testimonials.title} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {c.testimonials.items.map((t: any) => (
              <ScrollReveal key={t.name}>
                <div className="bg-gray-50 rounded-xl p-8">
                  <p className="text-gray-600 italic mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={`/images/${t.avatar}`} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner
        title={c.cta.title}
        description={c.cta.description}
        buttonText={c.cta.buttonText}
        buttonHref={c.cta.buttonLink}
      />
    </>
  )
}
