import NextUIProvider from '@/components/NextUIProvider';
import SessionProvider from '@/components/SessionProvider';
import { authOptions } from '@/config/nextAuth';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session?.error === 'RefreshAccessTokenError') signOut();
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
