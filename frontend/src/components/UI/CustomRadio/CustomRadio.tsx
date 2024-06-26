import { Radio, RadioProps } from '@nextui-org/react';
import clsx from 'clsx';
import React, { FC, ReactNode, forwardRef } from 'react';

interface ICustomRadioProps extends RadioProps {
  children: ReactNode;
}

export const CustomRadio = forwardRef<HTMLElement, ICustomRadioProps>(
  ({ children, ...props }, radioRef) => {
    return (
      <Radio
        ref={radioRef}
        {...props}
        classNames={{
          base: clsx(
            'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between transition-all',
            'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
            'data-[selected=true]:border-primary '
          ),
        }}
      >
        {children}
      </Radio>
    );
  }
);

CustomRadio.displayName = 'CustomRadio';
