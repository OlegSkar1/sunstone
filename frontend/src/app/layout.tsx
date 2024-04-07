import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/nextAuth';
import { signOut } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Sunstone',
  description: 'Sunstone - самообучение',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ru">
      <body className="container mx-auto bg-background p-10 min-h-screen font-montserrat font-normal text-base">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
