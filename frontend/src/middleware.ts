export { default } from 'next-auth/middleware';
export const config = {
  matcher: [
    '/',
    '/materials/:path*',
    '/sections/:path*',
    '/sections',
    '/materials',
  ],
};
