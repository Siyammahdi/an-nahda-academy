import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith('/dashboard');
  
  // Define which paths are admin paths (require admin role) - commented out as not used now
  // const isAdminPath = path.startsWith('/admin');
  
  // Define which paths are auth paths (login/register)
  const isAuthPath = path === '/login' || path === '/registration';

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // If there's a token in the Authorization header, consider the user authenticated
  // This handles the case where cookie-based auth fails but localStorage auth is working
  const authHeader = request.headers.get('Authorization');
  const hasAuthHeader = authHeader && authHeader.startsWith('Bearer ');

  // Check if user is authenticated
  const isAuthenticated = !!token || !!hasAuthHeader;

  // Extract user role from cookies if available - commented out as not used now
  // const userCookie = request.cookies.get('auth-user')?.value;
  // const isAdmin = userCookie ? JSON.parse(userCookie)?.role === 'admin' : false;

  // If the user is on a protected path but not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    // Store the current path for redirecting after login
    const url = new URL('/login', request.url);
    url.searchParams.set('returnUrl', path);
    return NextResponse.redirect(url);
  }

  // Remove admin path checks to allow direct access
  // Comment out or remove this block to allow free access to admin paths
  /*
  if (isAdminPath) {
    if (!isAuthenticated) {
      // Store the current path for redirecting after login
      const url = new URL('/login', request.url);
      url.searchParams.set('returnUrl', path);
      return NextResponse.redirect(url);
    }

    if (!isAdmin) {
      // Redirect to dashboard if authenticated but not admin
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  */

  // If the user is authenticated and trying to access auth paths, redirect to dashboard
  if (isAuthPath && isAuthenticated) {
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