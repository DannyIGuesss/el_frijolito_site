/**
 * Middleware for route protection and authentication
 * Protects admin routes and handles redirects
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/admin/login');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin') && !isAuthPage;

    // Redirect authenticated users away from login page
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Redirect unauthenticated users to login page
    if (isAdminPage && !isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/admin/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Check role-based permissions for specific admin routes
    if (isAdminPage && isAuth) {
      const userRole = token?.role;
      
      // Super admin routes
      if (req.nextUrl.pathname.startsWith('/admin/users') || 
          req.nextUrl.pathname.startsWith('/admin/settings/advanced')) {
        if (userRole !== 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
        }
      }

      // Admin routes (require ADMIN or SUPER_ADMIN)
      if (req.nextUrl.pathname.startsWith('/admin/seo') ||
          req.nextUrl.pathname.startsWith('/admin/analytics')) {
        if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin/unauthorized', req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};