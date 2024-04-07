import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@/services/auth.service';
import { JWT } from 'next-auth/jwt';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/token/refresh/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: token.refresh_token }),
      }
    );

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access,
      access_expires_at: refreshedTokens.expires_at,
    };
  } catch (error: any) {
    console.log('error', error);

    return {
      ...token,
      access_token: '',
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      id: 'CredentialsSignIn',
      name: 'CredentialsSignIn',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const res = await authService.signIn(credentials);

        if (res.access) return res;

        return null;
      },
    }),
    CredentialsProvider({
      id: 'CredentialsRefresh',
      name: 'CredentialsRefresh',
      credentials: {
        access: {},
        expires_at: {},
        refresh: {},
        refresh_expires_at: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (credentials.access) {
          return {
            access: credentials.access,
            access_expires_at: credentials.expires_at,
            refresh: credentials.refresh,
            refresh_expires_at: credentials.refresh_expires_at,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials) {
        user.email = credentials.email as string;
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.error = token.error;
        session.user.access_expires_at = token.access_expires_at;
        session.user.refresh_expires_at = token.refresh_expires_at;
        session.user.email = token.email;
        session.user.access_token = token.access_token;
        session.user.refresh_token = token.refresh_token;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          access_token: user.access,
          refresh_token: user.refresh,
          access_expires_at: user.access_expires_at,
          refresh_expires_at: user.refresh_expires_at,
          email: user.email as string,
        };
      }

      if (
        dayjs.utc().valueOf() < dayjs.utc(token.access_expires_at).valueOf()
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
  },
};
