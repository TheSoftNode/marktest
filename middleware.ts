import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
    '/login', 
    '/signup', 
    '/forgot-password', 
    '/reset-password', 
    '/', 
    '/request-password-reset',
    '/verify-email',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Make all API routes dynamic
  if (path.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-middleware-cache', 'no-cache');
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Allow public routes
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // For all other routes, redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    // Match API routes
    '/api/:path*',
    // Match all routes except Next.js internals and public files
    '/((?!_next|_static|[\\w-]+\\.\\w+).*)',
  ],
};