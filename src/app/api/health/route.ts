import { NextResponse } from 'next/server'

// Lightweight liveness probe for uptime monitoring (UptimeRobot,
// Pingdom, Cloudflare Health Check, etc.). Returns HTTP 200 + a tiny
// JSON payload — nothing that would expose secrets or user data.
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'vincor-next',
      timestamp: new Date().toISOString(),
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  )
}

export const runtime = 'edge'
