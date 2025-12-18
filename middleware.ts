import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl

  // Ignore Next internals and public files
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static') || pathname.includes('.')) {
    return
  }

  // Allow auth routes
  // Allow auth routes (route groups are not part of the URL)
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return
  }

  // Check for our simple cookie-based token set after login
  const token = req.cookies.get('sb_token')?.value
  if (!token) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/transactions/:path*', '/statistics/:path*', '/profile/:path*'],
}
