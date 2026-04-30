import { NextResponse } from 'next/server'

// Lightweight liveness probe for uptime monitoring (UptimeRobot,
// Pingdom, Cloudflare Health Check, etc.). Returns HTTP 200 + a tiny
// JSON payload — nothing that would expose secrets or user data.
export async function GET() {
  // Temporary diagnostic — remove after secrets are confirmed working
  const expected = ['RESEND_API_KEY', 'CONTACT_EMAIL_TO', 'CONTACT_EMAIL_FROM']
  const envStatus = expected.reduce((acc, key) => {
    const v = process.env[key]
    acc[key] = v ? `present (${v.length} chars)` : 'MISSING'
    return acc
  }, {} as Record<string, string>)

  return NextResponse.json(
    {
      status: 'ok',
      service: 'vincor-next',
      timestamp: new Date().toISOString(),
      env: envStatus,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  )
}

