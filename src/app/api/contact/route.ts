import { NextRequest, NextResponse } from 'next/server'

// ─── Rate limiting (in-memory, resets on deploy) ───
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5       // max submissions
const RATE_LIMIT_WINDOW = 3600 // per hour (seconds)

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW * 1000 })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// ─── Validation ───
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().slice(0, 2000)
}

// ─── POST handler ───
export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
      { status: 429 }
    )
  }

  // Origin check (basic CSRF protection)
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: 'Ongeldig verzoek.' }, { status: 403 })
  }

  // Parse body
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig formaat.' }, { status: 400 })
  }

  // Honeypot field (spam protection)
  if (body._gotcha) {
    return NextResponse.json({ success: true }) // silently ignore bots
  }

  // Required fields
  const { naam, email, telefoon, onderwerp, bericht } = body
  if (!naam || !email || !bericht) {
    return NextResponse.json(
      { error: 'Vul alle verplichte velden in.' },
      { status: 400 }
    )
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: 'Ongeldig e-mailadres.' },
      { status: 400 }
    )
  }

  // Sanitize all inputs
  const data = {
    naam: sanitize(naam),
    email: sanitize(email),
    telefoon: sanitize(telefoon || ''),
    onderwerp: sanitize(onderwerp || ''),
    bericht: sanitize(bericht),
  }

  // ─── Send email via Resend ───
  // Only requires: RESEND_API_KEY and CONTACT_EMAIL_TO in .env
  const apiKey = process.env.RESEND_API_KEY
  const emailTo = process.env.CONTACT_EMAIL_TO
  const emailFrom = process.env.CONTACT_EMAIL_FROM || 'Vincor Website <noreply@vincorscan.nl>'

  if (!apiKey || !emailTo) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL_TO env vars')
    return NextResponse.json(
      { error: 'Serverfout. Neem telefonisch contact op.' },
      { status: 500 }
    )
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        reply_to: data.email,
        subject: `Contactformulier: ${data.onderwerp || 'Nieuw bericht'} — ${data.naam}`,
        html: `
          <h2>Nieuw contactformulier bericht</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Naam</td><td style="padding:8px;border-bottom:1px solid #eee">${data.naam}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Telefoon</td><td style="padding:8px;border-bottom:1px solid #eee">${data.telefoon || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Onderwerp</td><td style="padding:8px;border-bottom:1px solid #eee">${data.onderwerp || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Bericht</td><td style="padding:8px;white-space:pre-wrap">${data.bericht}</td></tr>
          </table>
          <p style="color:#999;font-size:12px;margin-top:20px">Verzonden via vincorscan.nl contactformulier</p>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend API error:', err)
      return NextResponse.json(
        { error: 'Verzenden mislukt. Probeer het later opnieuw.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json(
      { error: 'Verzenden mislukt. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}
