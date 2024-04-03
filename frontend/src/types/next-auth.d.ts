import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    access: string;
    refresh: string;
    access_expires_at: string;
    refresh_expires_at: string;
    id?: string;
  }

  interface Session {
    user: {
      access_token: string;
      name: string;
      email?: string;
      image: string;
      expires_at: string;
    };
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    access_expires_at: string;
    refresh_expires_at: string;
    email?: string;
    error?: 'RefreshAccessTokenError';
  }
}
