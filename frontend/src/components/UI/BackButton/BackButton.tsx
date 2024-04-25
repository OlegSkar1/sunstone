import { Button, ButtonProps, ButtonVariantProps } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { IoChevronBack } from 'react-icons/io5';

interface IBackButtonProps extends ButtonProps, ButtonVariantProps {
  href: string;
}

export const BackButton: FC<IBackButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  return (
    <Link href={href} className={className}>
      <Button {...props}>
        {
          <p className="flex items-center gap-2 font-semibold text-medium">
            <IoChevronBack />
            назад
          </p>
        }
      </Button>
    </Link>
  );
};
