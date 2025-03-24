import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith('/dashboard');
  
  // Define which paths are auth paths (login/register)
  const isAuthPath = path === '/login' || path === '/registration';

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // If the user is on a protected path but not authenticated, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated and trying to access auth paths, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next (Next.js internals)
     * - api (API routes)
     * - static files (images, etc.)
     * - favicon.ico (favicon)
     */
    '/((?!_next|api|images|favicon.ico).*)',
  ],
}; 