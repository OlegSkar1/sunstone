'use client';
import { authOptions } from '@/config/nextAuth';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { SessionProvider, signOut } from 'next-auth/react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: Infinity,
      retry: false,
    },
  },
});

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session?.error === 'RefreshAccessTokenError') signOut();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
