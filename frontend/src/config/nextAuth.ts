import { NextAuthOptions, TokenSet } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchConfig } from './fetchConfig';
import { authService } from '@/services/auth.service';
import { JWT } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
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

    console.log('refresh', refreshedTokens);

    return {
      ...token,
      access_token: refreshedTokens.access,
    };
  } catch (error: any) {
    console.log('error', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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

        // console.log('res', res);
        if (res.access) return res;

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 10,
  },
  callbacks: {
    async signIn({ user, credentials, account, email, profile }) {
      if (credentials) {
        user.email = credentials.email as string;
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.error = token.error;
        session.user.exp = token.exp as number;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // console.log('user1', user);
      // console.log('token1', token);

      if (user) {
        console.log('test user');
        return {
          access_token: user.access,
          refresh_token: user.refresh,
          exp: token.exp,
        };
      }
      console.log(token);

      if (Date.now().valueOf() < (token.exp * 1000).valueOf()) {
        console.log('test');
        return token;
      }

      // console.log('token111', token);

      return refreshAccessToken(token);
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
  },
};
