import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import { IoChevronBack } from 'react-icons/io5';

interface IBackButtonProps {
  href: string;
  className?: string;
}

export const BackButton: FC<IBackButtonProps> = ({ className, href }) => {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-2 font-semibold text-medium text-secondary hover:opacity-70 transition-all border-2 border-secondary rounded-xl p-1',
        className
      )}
    >
      <IoChevronBack />
      назад
    </Link>
  );
};
