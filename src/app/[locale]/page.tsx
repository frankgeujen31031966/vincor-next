import Link from 'next/link'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import SectionHeader from '@/components/SectionHeader'
import CounterAnimation from '@/components/CounterAnimation'
import FaqAccordion from '@/components/FaqAccordion'

const klachten = [
  { title: 'Kaakpijn', image: '/images/kaakpijn.jpg', slug: 'kaakpijn' },
  { title: 'Hoofdpijn & Migraine', image: '/images/migraine.jpg', slug: 'hoofdpijn-migraine' },
  { title: 'Tinnitus', image: '/images/Tinnitus-2.jpg', slug: 'tinnitus' },
  { title: 'Zenuwpijn', image: '/images/zenuwpijn.jpg', slug: 'zenuwpijn' },
  { title: 'Tandenknarsen & Bruxisme', image: '/images/Tandenknarsen.jpg', slug: 'tandenknarsen' },
  { title: 'Stijve Nek & Schouders', image: '/images/stijve-nek.jpg', slug: 'stijve-nek' },
  { title: 'Rug- en Nekklachten', image: '/images/rug-nek.jpg', slug: 'rug-nekklachten' },
]

const phases = [
  {
    phase: 'Fase 1', title: 'Relaxatiesplint', price: '€195',
    description: 'De eerste stap naar ontspanning van de kaakmusculatuur en vermindering van acute klachten.',
    features: ['Op maat gemaakte splint', 'Verlichting binnen 2-4 weken', 'Inclusief controlebezoek'],
    slug: 'fase-1-relaxatiesplint', location: 'Bij Vincor, Eindhoven', featured: false,
  },
  {
    phase: 'Fase 2', title: 'Repositioneringssplint', price: '€595', badge: 'Meest gekozen',
    description: 'Correctie van de kaakpositie voor structurele verbetering van de kaak-wervelkolom balans.',
    features: ['Digitaal ontworpen splint', 'Structurele kaakcorrectie', 'Tussentijdse 4D metingen', 'Persoonlijke begeleiding'],
    slug: 'fase-2-repositioneringssplint', location: 'Bij Vincor, Eindhoven', featured: true,
  },
  {
    phase: 'Fase 3', title: 'Reconstructie', price: '€3.000–7.000',
    description: 'Definitieve reconstructie van het gebit voor een blijvend resultaat en optimale functie.',
    features: ['Volledige gebitreconstructie', 'Blijvend resultaat', 'Uitgevoerd door PDA-tandarts'],
    slug: 'fase-3-reconstructie', location: 'Bij PDA, partnerlocatie', featured: false,
  },
]

const reviews = [
  { stars: 5, timeAgo: '3 weken geleden', text: 'Na jaren van hoofdpijn eindelijk een duidelijke diagnose. De 4D scan liet precies zien wat er aan de hand was. Heel blij met het resultaat van de splint.', author: 'Mark V.', initial: 'M' },
  { stars: 5, timeAgo: '1 maand geleden', text: 'Professioneel en vriendelijk team. De uitleg over de relatie tussen mijn kaak en nekklachten was erg verhelderend. Aanrader!', author: 'Sandra K.', initial: 'S' },
  { stars: 5, timeAgo: '2 maanden geleden', text: 'De repositioneringssplint heeft mijn leven veranderd. Geen migraine meer sinds 4 maanden. Kan Vincor niet genoeg aanbevelen.', author: 'Peter de J.', initial: 'P' },
  { stars: 4, timeAgo: '3 weken geleden', text: 'Goede ervaring. Scan was snel en pijnloos. Wel jammer dat niet alles vergoed wordt door de verzekering, maar de kosten zijn transparant.', author: 'Lisa M.', initial: 'L' },
]

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
              Gratis 4D Scan
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Ontdek de <span className="highlight">oorzaak</span> van uw kaak-, nek- of migraineklachten
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Met de DIERS 4D Spinescan brengen wij de verbinding tussen kaak en wervelkolom objectief in beeld — stralingsvrij en binnen enkele minuten.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-teal text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition shadow-glow">
                Boek Gratis Scan <ArrowIcon />
              </Link>
              <a href="#hoe-werkt-het" className="inline-flex items-center gap-2 border border-white/25 text-white/85 px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                Meer Informatie
              </a>
            </div>
          </div>
          <div className="flex gap-8 mt-16">
            {[{ n: '82%', l: 'Minder pijn' }, { n: '500+', l: 'Scans uitgevoerd' }, { n: '85%', l: 'Minder spanning' }].map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-3xl font-bold text-white">{s.n}</div>
                <div className="text-sm text-gray-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm">
          <span>Scroll</span>
          <div className="w-px h-8 bg-teal/50 animate-scroll-line" />
        </div>
      </section>

      {/* TRUST BAR */}
      <ScrollReveal>
        <section className="bg-gray-50 py-6">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {['Stralingsvrij', 'Geen verplichting', 'Objectieve meting', 'Direct inzicht'].map((item) => (
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
            <SectionHeader centered label="Klachten" title="Last van deze klachten?" description="Veel chronische klachten in het hoofd-, nek- en schoudergebied hebben een gemeenschappelijke oorzaak: een verstoorde kaakpositie." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {klachten.map((k) => (
              <Link key={k.title} href={`/${locale}/klachten/${k.slug}`} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={k.image} alt={k.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
            <SectionHeader centered label="Werkwijze" title="Hoe werkt het?" description="In drie heldere stappen van klacht naar oplossing — volledig afgestemd op uw situatie." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-teal/20" />
            {[
              { n: 1, t: 'Gratis 4D Scan', d: 'Binnen enkele minuten brengt de DIERS scanner uw houding en kaakpositie objectief in beeld — volledig stralingsvrij.' },
              { n: 2, t: 'Diagnose & Advies', d: 'Onze specialist analyseert de resultaten en bespreekt een persoonlijk behandelplan met u.' },
              { n: 3, t: 'Behandeling op Maat', d: 'Een gefaseerd traject van relaxatie tot reconstructie, afgestemd op de ernst van uw klachten.' },
            ].map((s) => (
              <ScrollReveal key={s.n}>
                <div className="text-center">
                  <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">{s.n}</div>
                  <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                  <p className="text-gray-500">{s.d}</p>
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
                <Image src="/images/spine-model.gif" alt="DIERS 4D Spinescan" fill className="object-cover" unoptimized />
              </div>
              <div>
                <SectionHeader label="Diagnostiek" title="DIERS 4D Spinescan technologie" />
                <p className="text-gray-500 mt-4 mb-6">
                  De DIERS 4D Spinescan is een geavanceerd diagnostisch systeem dat de wervelkolom, houding en beweging in real-time analyseert. Zonder straling of fysiek contact krijgt u direct inzicht in de relatie tussen uw kaakpositie en lichaamshouding.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Stralingsvrije 3D-oppervlakteanalyse', 'Dynamische houdingsmeting in beweging', 'Objectieve voor- en nameting', 'Meting duurt slechts enkele minuten'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-600">
                      <span className="text-teal"><CheckIcon /></span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/diagnostiek`} className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-full font-semibold hover:brightness-110 transition">
                  Meer over onze diagnostiek <ArrowIcon />
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
            <SectionHeader centered label="Behandeling" title="Van inzicht naar herstel" description="Ons behandeltraject bestaat uit drie fasen. Elke fase bouwt voort op de vorige en wordt afgestemd op uw specifieke situatie." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {phases.map((p) => (
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
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-teal"><CheckIcon /></span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-500 mb-4">{p.location}</div>
                  <Link href={`/${locale}/behandeling/${p.slug}`} className={`text-center py-2.5 rounded-full font-semibold text-sm transition ${p.featured ? 'bg-teal text-white hover:brightness-110' : 'border border-white/20 text-white hover:bg-white/5'}`}>
                    Meer over {p.phase}
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
            <SectionHeader centered label="Resultaten" title="Echte resultaten, blijvende verbetering" description="Onze aanpak levert meetbare verbetering op — bevestigd door objectieve 4D metingen en de ervaringen van honderden patiënten." />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            {[
              { target: 82, suffix: '%', label: 'Minder pijn na behandeling' },
              { target: 85, suffix: '%', label: 'Minder spanning in kaak & nek' },
              { target: 72, suffix: '%', label: 'Betere slaapkwaliteit' },
            ].map((s) => (
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
                <SectionHeader label="Samenwerking" title="Partnerschap met Balans Rugcentrum Eindhoven" />
                <p className="text-gray-500 mt-4 mb-4">
                  Vincor werkt nauw samen met Balans Rugcentrum Eindhoven. Samen combineren wij expertise op het gebied van occlusie en houdingstherapie voor een integrale benadering van uw klachten.
                </p>
                <p className="text-gray-500">
                  Onze DIERS 4D Spinescan staat bij Balans Rugcentrum, waar u terecht kunt voor uw gratis scan en persoonlijk adviesgesprek.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-video">
                <Image src="/images/balans-clinic.png" alt="Balans Rugcentrum Eindhoven" fill className="object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <SectionHeader centered label="Reviews" title="Wat onze patiënten zeggen" />
            <div className="flex items-center justify-center gap-2 mt-4 mb-8">
              <div className="flex text-amber">{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}</div>
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-gray-500 text-sm">— 32 reviews op Google</span>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((r) => (
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
            <SectionHeader centered label="Ervaringen" title="Patiëntverhalen" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              { text: 'Na jaren van hoofdpijn en kaakklachten kreeg ik eindelijk inzicht in de oorzaak. De 4D scan liet duidelijk zien hoe mijn kaakpositie mijn hele houding beïnvloedde. Na de behandeling met de repositioneringssplint is de hoofdpijn bijna helemaal verdwenen.', name: 'Annelies, 43', role: 'Patiënt sinds 2024', avatar: '/images/testimonial-annelies.jpg' },
              { text: 'Ik had al maanden last van nekpijn en spanning in mijn schouders. Mijn fysiotherapeut kon de oorzaak niet vinden. Bij Vincor bleek mijn kaakpositie de boosdoener. De splintbehandeling heeft mijn leven enorm verbeterd — ik slaap beter en heb nauwelijks nog nekpijn.', name: 'Tom, 39', role: 'Patiënt sinds 2025', avatar: '/images/testimonial-tom.jpg' },
            ].map((t) => (
              <ScrollReveal key={t.name}>
                <div className="bg-gray-50 rounded-xl p-8">
                  <p className="text-gray-600 italic mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
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
      <section className="section-padding bg-dark">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-4">Boek uw gratis 4D scan</h2>
            <p className="text-gray-400 mb-8">
              Ervaar zelf hoe de DIERS 4D Spinescan de oorzaak van uw klachten in beeld brengt — geheel vrijblijvend en stralingsvrij.
            </p>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-full font-semibold text-lg hover:brightness-110 transition shadow-glow">
              Maak een afspraak <ArrowIcon />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
