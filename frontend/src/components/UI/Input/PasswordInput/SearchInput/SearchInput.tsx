'use client';
import { Input, InputProps } from '@nextui-org/react';
import React, { FC } from 'react';
import { CiSearch } from 'react-icons/ci';

export const SearchInput: FC<InputProps> = (props) => {
  return (
    <Input
      placeholder="Search..."
      size="sm"
      startContent={<CiSearch />}
      classNames={{
        inputWrapper: 'bg-transparent shadow-none',
      }}
      isClearable
      {...props}
    />
  );
};
