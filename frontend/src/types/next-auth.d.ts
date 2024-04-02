import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    access: string;
    refresh: string;
    id?: string;
  }

  interface Session {
    user: {
      access_token: string;
      name: string;
      email: string;
      image: string;
    };
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
  }
}
