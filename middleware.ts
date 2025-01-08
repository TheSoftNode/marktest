// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const publicRoutes = [
//     '/login', 
//     '/signup', 
//     '/forgot-password', 
//     '/reset-password', 
//     '/', 
//     '/request-password-reset',
//     'verify-email',
// ];

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // Allow public routes and API routes
//   if (publicRoutes.some(route => path.startsWith(route))) {
//     return NextResponse.next();
//   }

//   // For all other routes, redirect to login
//   return NextResponse.redirect(new URL('/login', request.url));
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all routes except:
//      * 1. /api routes
//      * 2. /_next (Next.js internals)
//      * 3. /_static (inside /public)
//      * 4. all root files inside /public (e.g. /favicon.ico)
//      */
//     '/((?!api|_next|_static|[\\w-]+\\.\\w+).*)',
//   ],
// };

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