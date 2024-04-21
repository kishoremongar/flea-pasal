import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    // console.log(request.nextUrl.pathname);
    // console.log('TOOOKWN', request.nextauth.token);
    //if the user is not authenticated then redirecting to the login page
    if (!request.nextauth.token) {
      const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`;
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth|api).*)',
  ],
};
