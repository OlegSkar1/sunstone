'use client';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: Infinity,
      retry: false,
    },
  },
});

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <AuthProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </AuthProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
