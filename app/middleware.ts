import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /api/confirm-collaboration)
  const pathname = request.nextUrl.pathname

  // Check if it's a confirmation/rejection request
  if (pathname.startsWith('/api/confirm-collaboration')) {
    // Get the token and action from the URL
    const token = request.nextUrl.searchParams.get('token')
    const action = request.nextUrl.searchParams.get('action')

    if (token && action) {
      // Create the URL for the collaboration status page with query parameters
      const url = new URL('/collaboration-status', request.url)
      url.searchParams.set('token', token)
      url.searchParams.set('action', action)

      // Redirect to the collaboration status page
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to only run on specific paths
export const config = {
  matcher: ['/api/confirm-collaboration']
} 