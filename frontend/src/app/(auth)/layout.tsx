import { Logo } from '@/components/UI/Logo/Logo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-10">
      <Logo />
      {children}
    </div>
  );
}
