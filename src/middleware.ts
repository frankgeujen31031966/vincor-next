import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ─── Basic Auth for /admin ───
  if (pathname.startsWith('/admin')) {
    const adminUser = process.env.ADMIN_USER || 'admin'
    const adminPass = process.env.ADMIN_PASSWORD

    // If no password configured, block access entirely
    if (!adminPass) {
      return new NextResponse('CMS niet geconfigureerd.', { status: 503 })
    }

    const authHeader = request.headers.get('authorization')
    if (authHeader) {
      const [scheme, encoded] = authHeader.split(' ')
      if (scheme === 'Basic' && encoded) {
        const decoded = atob(encoded)
        const [user, pass] = decoded.split(':')
        if (user === adminUser && pass === adminPass) {
          return NextResponse.next()
        }
      }
    }

    return new NextResponse('Toegang geweigerd', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Vincor CMS"' },
    })
  }

  // ─── Skip intl middleware for static files and API ───
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // ─── i18n routing for everything else ───
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|images|.*\\..*).*)'],
}
