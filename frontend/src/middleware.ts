import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  //Authenticated conditionals
  if (req.nextUrl.pathname.startsWith('/signin') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/signup') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  //Unauthenticated conditionals
  if (req.nextUrl.pathname.startsWith('/signup') && !isAuthenticated) {
    return;
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: '/signin',
    },
  });

  return authMiddleware(req, event);
}
export const config = {
  matcher: [
    '/',
    '/materials/:path*',
    '/sections/:path*',
    '/sections',
    '/materials',
  ],
};
