import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminMode = process.env.ADMIN_MODE === 'true'
  const isCustomerMode = process.env.CUSTOMER_MODE === 'true'

  // If running in admin mode (port 3001)
  if (isAdminMode) {
    // Only allow admin routes and API routes
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/api') && !pathname.startsWith('/_next') && pathname !== '/favicon.ico') {
      // Redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // If running in customer mode (port 3000)
  if (isCustomerMode) {
    // Redirect admin routes to admin server
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL(`http://localhost:3001${pathname}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}