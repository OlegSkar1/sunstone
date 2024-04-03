import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    access: string;
    refresh: string;
    exp?: number;
    id?: string;
  }

  interface Session {
    user: {
      access_token: string;
      name: string;
      email: string;
      image: string;
      exp: number;
    };
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    exp: number;
    error?: 'RefreshAccessTokenError';
  }
}
