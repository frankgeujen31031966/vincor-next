import Link from 'next/link'

interface CtaBannerProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export default function CtaBanner({ title, description, buttonText, buttonHref }: CtaBannerProps) {
  return (
    <section className="section-padding bg-dark">
      <div className="max-w-[800px] mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400 mb-8">{description}</p>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 bg-teal text-white px-8 py-4 rounded-full font-semibold text-lg hover:brightness-110 transition shadow-glow"
        >
          {buttonText}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  )
}
