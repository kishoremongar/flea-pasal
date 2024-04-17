import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    // console.log(request.nextUrl.pathname);
    // console.log('TOOOKWN', request.nextauth.token);
    // if (request.nextauth.token) {
    //   console.log('token==>', request.nextauth.token);
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
    // return NextResponse.rewrite(new URL('/404', request.url));
    // const protectedRoutes = ['/', '/products', '/products:path*'];
    if (!request.nextauth.token) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
    // if (
    //   request.nextUrl.pathname.startsWith('/client') &&
    //   request.nextauth.token?.role !== 'admin' &&
    //   request.nextauth.token?.role !== 'manager'
    // ) {
    //   return NextResponse.rewrite(new URL('/denied', request.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token),
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/dashboard', '/dashboard:path*'],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   '/((?!_next/static|_next/image|favicon.ico|auth).*)',
  // ],
};
