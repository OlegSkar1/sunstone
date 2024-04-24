import { Button, ButtonProps, ButtonVariantProps } from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import { IoChevronBack } from 'react-icons/io5';

interface IBackButtonProps extends ButtonProps, ButtonVariantProps {}

export const BackButton: FC<IBackButtonProps> = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {
        <p className="flex items-center gap-2 font-semibold text-medium">
          <IoChevronBack />
          назад
        </p>
      }
    </Button>
  );
};
