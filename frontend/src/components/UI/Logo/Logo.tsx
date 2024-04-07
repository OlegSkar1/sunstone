import Link from 'next/link';
import IconLogo from '@/assets/icons/logo_24.svg';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex gap-3 items-center">
        <IconLogo />
        <span className="text-lg font-semibold max-sm:hidden">Sunstone</span>
      </div>
    </Link>
  );
};
