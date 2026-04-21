import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="nl">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '6rem 2rem', background: '#1F2937', color: '#F3F4F6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 640, textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', fontWeight: 700, color: '#0D9488', marginBottom: '1rem' }}>404</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Pagina niet gevonden</h1>
          <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>
            De pagina die u zoekt bestaat niet of is verplaatst.
          </p>
          <Link
            href="/nl"
            style={{ display: 'inline-block', background: '#0D9488', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '9999px', textDecoration: 'none', fontWeight: 600 }}
          >
            Terug naar home
          </Link>
        </div>
      </body>
    </html>
  )
}
