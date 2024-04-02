import { NextAuthOptions, TokenSet } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetchConfig } from './fetchConfig';
import { authService } from '@/services/auth.service';

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

        console.log(credentials);

        const res = await authService.signIn(credentials);

        console.log('res', res);
        if (res.access) return res;

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials, account, email, profile }) {
      if (credentials) {
        user.email = credentials.email as string;
      }
      return true;
    },
    async session({ session, token, user }) {
      console.log('user', user);
      console.log('token', token);
      console.log('session', session);
      session.error = token.error;
      session.user.access_token = token.access_token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
