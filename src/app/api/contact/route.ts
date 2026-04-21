import { NextRequest, NextResponse } from 'next/server'

type Locale = 'nl' | 'en' | 'fr'
const MESSAGES: Record<Locale, Record<string, string>> = {
  nl: {
    rateLimited: 'Te veel verzoeken. Probeer het later opnieuw.',
    invalidRequest: 'Ongeldig verzoek.',
    invalidFormat: 'Ongeldig formaat.',
    missingConsent: 'Uitdrukkelijke toestemming voor verwerking van gezondheidsgegevens is vereist (AVG art. 9).',
    missingFields: 'Vul alle verplichte velden in.',
    invalidEmail: 'Ongeldig e-mailadres.',
    serverError: 'Serverfout. Neem telefonisch contact op.',
    sendFailed: 'Verzenden mislukt. Probeer het later opnieuw.',
  },
  en: {
    rateLimited: 'Too many requests. Please try again later.',
    invalidRequest: 'Invalid request.',
    invalidFormat: 'Invalid format.',
    missingConsent: 'Explicit consent for processing of health data is required (GDPR art. 9).',
    missingFields: 'Please fill in all required fields.',
    invalidEmail: 'Invalid email address.',
    serverError: 'Server error. Please contact us by phone.',
    sendFailed: 'Sending failed. Please try again later.',
  },
  fr: {
    rateLimited: 'Trop de requêtes. Veuillez réessayer plus tard.',
    invalidRequest: 'Requête invalide.',
    invalidFormat: 'Format invalide.',
    missingConsent: 'Consentement explicite requis pour le traitement des données de santé (RGPD art. 9).',
    missingFields: 'Veuillez remplir tous les champs obligatoires.',
    invalidEmail: 'Adresse e-mail invalide.',
    serverError: 'Erreur serveur. Veuillez nous contacter par téléphone.',
    sendFailed: "Échec de l'envoi. Veuillez réessayer plus tard.",
  },
}

function pickLocale(req: NextRequest): Locale {
  const header = req.headers.get('accept-language') || ''
  const first = header.split(',')[0]?.slice(0, 2).toLowerCase()
  if (first === 'en' || first === 'fr') return first
  return 'nl'
}

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
  const msgs = MESSAGES[pickLocale(request)]

  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: msgs.rateLimited }, { status: 429 })
  }

  // Origin check (basic CSRF protection)
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: msgs.invalidRequest }, { status: 403 })
  }

  // Parse body
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: msgs.invalidFormat }, { status: 400 })
  }

  // Honeypot field (spam protection)
  if (body._gotcha) {
    return NextResponse.json({ success: true }) // silently ignore bots
  }

  // GDPR Art. 9 — explicit consent required for any processing of health data
  // in the message. Without this consent the submission is rejected even if the
  // privacy-policy checkbox is ticked, because generic Art. 6 consent does not
  // cover special category data.
  if (body.healthDataConsent !== true) {
    return NextResponse.json({ error: msgs.missingConsent }, { status: 400 })
  }

  // Required fields
  const naam = typeof body.name === 'string' ? body.name : (typeof body.naam === 'string' ? body.naam : '')
  const email = typeof body.email === 'string' ? body.email : ''
  const telefoon = typeof body.phone === 'string' ? body.phone : (typeof body.telefoon === 'string' ? body.telefoon : '')
  const onderwerp = typeof body.subject === 'string' ? body.subject : (typeof body.onderwerp === 'string' ? body.onderwerp : '')
  const bericht = typeof body.message === 'string' ? body.message : (typeof body.bericht === 'string' ? body.bericht : '')

  if (!naam || !email || !bericht) {
    return NextResponse.json({ error: msgs.missingFields }, { status: 400 })
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: msgs.invalidEmail }, { status: 400 })
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
    return NextResponse.json({ error: msgs.serverError }, { status: 500 })
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
      return NextResponse.json({ error: msgs.sendFailed }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: msgs.sendFailed }, { status: 500 })
  }
}
