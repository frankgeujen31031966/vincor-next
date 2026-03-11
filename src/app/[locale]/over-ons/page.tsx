import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import SectionHeader from '@/components/SectionHeader'
import ScrollReveal from '@/components/ScrollReveal'
import CtaBanner from '@/components/CtaBanner'
import { getContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const content = getContent(locale, 'over-ons')
  return buildMetadata({ locale, path: '/over-ons', title: `${content.hero.title} — Vincor`, description: content.hero.description })
}

export default async function OverOnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale, 'over-ons')

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

      {/* Story */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader label={content.story.sectionLabel} title={content.story.title} />
                <div className="mt-4 space-y-4">
                  {content.story.paragraphs.map((p: any, i: number) => (
                    <p key={i} className="text-gray-500">{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={`/images/${content.story.image}`} alt={content.story.imageAlt} fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.philosophy.sectionLabel} title={content.philosophy.title} description={content.philosophy.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {content.philosophy.pillars.map((pillar: any) => (
              <ScrollReveal key={pillar.title}>
                <div className="bg-white rounded-xl p-6 shadow-sm h-full text-center">
                  <h3 className="text-lg font-bold mb-2">{pillar.title}</h3>
                  <p className="text-gray-500 text-sm">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.team.sectionLabel} title={content.team.title} description={content.team.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {content.team.members.map((member: any) => (
              <ScrollReveal key={member.name}>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                    <Image src={`/images/${member.image}`} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-teal text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label={content.partners.sectionLabel} title={content.partners.title} description={content.partners.description} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {content.partners.items.map((partner: any) => (
              <ScrollReveal key={partner.name}>
                <div className="bg-white rounded-xl p-8 shadow-sm h-full">
                  <h3 className="text-lg font-bold mb-3">{partner.name}</h3>
                  <p className="text-gray-500">{partner.description}</p>
                </div>
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
